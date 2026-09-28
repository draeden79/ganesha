#!/usr/bin/env python3
"""Validate parallel deliveries before merging acquisition and study indexes.

Hash verification proves file identity, not learning or speech completeness.
The declarations from reviewed study manifests retain their original scope.
"""
import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def read(path, fallback=None):
    return json.loads(path.read_text()) if path.exists() else fallback


def jsonl(path):
    return [json.loads(line) for line in path.read_text().splitlines() if line.strip()] if path.exists() else []


def verify(path, spec):
    data = path.read_bytes()
    assert hashlib.sha256(data).hexdigest() == spec['sha256'], str(path) + ': hash mismatch'
    if 'bytes' in spec:
        assert len(data) == spec['bytes'], str(path) + ': size mismatch'
    return data


def verify_full_read(data, ranges, expected_lines=None):
    count = len(data.decode().splitlines())
    if expected_lines is not None:
        assert count == expected_lines
    through = 0
    for lo, hi in sorted(ranges):
        assert 1 <= lo <= hi <= count and lo <= through + 1, 'Gap or invalid reading range'
        through = max(through, hi)
    assert through == count, 'Reading does not cover complete artifact'


def write(path, data):
    tmp = path.with_suffix('.tmp')
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
    tmp.replace(path)


def main():
    transcript_path = ROOT / 'transcripts/manifest.json'
    manifest = read(transcript_path)
    videos = {v['video_id']: v for v in manifest['videos']}
    artifact_root = Path(manifest['artifact_root'])
    study_path = ROOT / 'studies/manifest.json'
    study_manifest = read(study_path)
    studies = {s.get('id') or s['video_id']: s for s in study_manifest['studies']}
    backfill = []
    for batch in sorted((ROOT / 'studies/backfill').glob('*/manifest.json')):
        for study in read(batch, {'studies': []})['studies']:
            backfill.append({**study, 'source_manifest': str(batch.relative_to(ROOT))})
    checks = 0
    for record in jsonl(ROOT / 'acquisition/manifest.jsonl'):
        assert Path(record['artifact_root']) == artifact_root, 'Unexpected artifact root'
        for a in record['artifacts']:
            verify(artifact_root / a['path'], a)
            checks += 1
        previous = videos.get(record['video_id'])
        if previous:
            for a in record['artifacts']:
                if a['sha256'] not in {x['sha256'] for x in previous['artifacts']}:
                    previous['artifacts'].append(a)
        else:
            record['source_id'] = record['source_ids'][0]
            videos[record['video_id']] = record
    for record in jsonl(ROOT / 'transcripts/academy-acquisition.jsonl'):
        verify(ROOT / record['artifact_path'], record)
        checks += 1
        artifact = {k: record[k] for k in ('bytes', 'sha256', 'collected_at', 'language', 'caption_origin')}
        artifact.update(path=Path(record['artifact_path']).name, format='publisher_transcript_plaintext',
                        paragraph_count=record['paragraph_count'], track_export_complete=True,
                        cue_count=None, first_cue_start_seconds=None,
                        last_cue_start_seconds=None, last_cue_end_seconds=None)
        if record['video_id'] not in videos:
            videos[record['video_id']] = {
                **{k: record[k] for k in ('video_id', 'source_id', 'url', 'title', 'collected_at')},
                'source_page': record['page_url'], 'published_at': None, 'duration_seconds': None,
                'status': 'exported_track', 'pending_reason': 'untimed_publisher_transcript_pending_study_and_speech_verification',
                'next_action': 'Read selected source integrally and inspect relevant demonstration before curriculum use.',
                'full_transcript_read': False, 'full_video_watched': False,
                'full_source_analyzed': False, 'full_speech_coverage_verified': False, 'artifacts': [artifact]}
        elif artifact['sha256'] not in {a['sha256'] for a in videos[record['video_id']]['artifacts']}:
            videos[record['video_id']]['artifacts'].append(artifact)
    for study in read(ROOT / 'studies/videos/manifest.json', {'videos': []})['videos']:
        caption = study['caption_artifact']
        data = verify(ROOT.parents[1] / caption['path'], caption)
        verify_full_read(data, caption['sequential_read_ranges'], caption['logical_line_count'])
        verify(ROOT / 'studies/videos' / study['study_artifact']['path'], study['study_artifact'])
        for capture in study.get('visual_review', {}).get('captures', []):
            verify(ROOT / 'studies/videos' / capture['path'], capture)
            checks += 1
        assert study['video_id'] in videos
        v = videos[study['video_id']]
        assert caption['sha256'] in {a['sha256'] for a in v['artifacts']}
        for key in ('full_transcript_read', 'full_video_watched', 'full_speech_coverage_verified', 'full_source_analyzed', 'study_status'):
            v[key] = study[key]
        v['study_path'] = 'studies/videos/' + study['study_artifact']['path']
        studies[study['video_id']] = {**study, 'study_path': v['study_path'],
                                     'all_exported_text_read': study['full_transcript_read']}
        checks += 2
    document_studies = read(ROOT / 'studies/official/manifest.json', {'studies': []})['studies']
    document_studies += read(ROOT / 'studies/scheduling/manifest.json', {'studies': []})['studies']
    document_studies += [s for s in backfill if 'caption_artifact' not in s]
    for study in document_studies:
        assert (ROOT / study['study_path']).is_file()
        if study.get('study_artifact'):
            verify(ROOT / study['study_artifact']['path'], study['study_artifact'])
            checks += 1
        read_texts = []
        for a in study['artifacts']:
            data = verify(ROOT / a['path'], a)
            # Raw HTML and media inventories prove acquisition, not reading.
            # A complete-text declaration applies to the study's text artifact.
            if study['text_read_complete'] and a.get('kind', 'text') == 'text':
                verify_full_read(data, a['read_lines'], a['line_count'])
                read_texts.append(data.decode())
            checks += 1
        if study['text_read_complete']:
            assert read_texts, study['id'] + ': complete reading requires a text artifact'
        for visual in study.get('visual_artifacts', []):
            verify(ROOT / visual['path'], visual)
            checks += 1
        for complement in study.get('complements', []):
            if 'artifact' in complement:
                verify(ROOT / complement['artifact']['path'], complement['artifact'])
                checks += 1
        vid = study.get('video_id')
        if vid in videos and study['status'] == 'transcript_analyzed_visual_pending':
            # Publisher article may include both transcript and companion text.
            # Confirm every paragraph of the separately saved clean transcript
            # was included in the source the study actually read.
            evidence = ' '.join(' '.join(read_texts).split())
            for a in videos[vid]['artifacts']:
                if a['format'] == 'publisher_transcript_plaintext':
                    paragraphs = (artifact_root / a['path']).read_text().split('\n\n')
                    assert all(' '.join(p.split()) in evidence for p in paragraphs if p.strip())
                    videos[vid].update(full_transcript_read=True,
                        study_status='transcript_analyzed_visual_pending',
                        study_path=study['study_path'], full_source_analyzed=False,
                        study_scope='Complete publisher transcript and written lesson; audiovisual pending')
        studies[study['id']] = study
    publishing = read(ROOT / 'studies/publishing/manifest.json')
    if publishing:
        verify(ROOT / 'studies' / publishing['study_artifact']['path'], publishing['study_artifact'])
        checks += 1
        for source in publishing['sources']:
            a = source['artifact']
            data = verify(ROOT / 'studies' / a['path'], a)
            if source['full_text_analyzed']:
                verify_full_read(data, a['sequential_read_ranges'], a['logical_line_count'])
            checks += 1
            for capture in source.get('visual_review', {}).get('captures', []):
                verify(ROOT / 'studies' / capture['path'], capture)
                checks += 1
        studies['publishing-netlify-static'] = {
            **publishing, 'id': 'publishing-netlify-static',
            'study_path': 'studies/' + publishing['study_artifact']['path'],
            'status': 'text_analyzed_operational_validation_pending',
            'full_source_analyzed': all(s['full_source_analyzed'] for s in publishing['sources']),
            'source_manifest': 'studies/publishing/manifest.json',
            'artifact_path_base': 'studies/'}
    video_batches = [read(ROOT / f'studies/{category}/manifest.json', {'studies': []})['studies']
                     for category in ('site', 'app', 'automation')]
    video_batches.append([s for s in backfill if 'caption_artifact' in s])
    for video_batch in video_batches:
        for study in video_batch:
            caption = study['caption_artifact']
            data = verify(ROOT / caption['path'], caption)
            if study['full_transcript_read']:
                verify_full_read(data, caption['sequential_read_ranges'], caption['logical_line_count'])
            verify(ROOT / study['study_artifact']['path'], study['study_artifact'])
            checks += 2
            for capture in study.get('visual_artifacts', []):
                verify(ROOT / capture['path'], capture)
                checks += 1
            v = videos[study['video_id']]
            assert caption['sha256'] in {a['sha256'] for a in v['artifacts']}
            for key in ('full_transcript_read', 'full_video_watched', 'full_speech_coverage_verified', 'full_source_analyzed'):
                v[key] = v.get(key, False) or study[key]
            v['study_path'] = study['study_path']
            v['study_status'] = study.get('study_status', study.get('status', 'transcript_analyzed_visual_pending'))
            studies[study['id']] = study
    # All input artifacts are checked before the first write.
    manifest['videos'] = sorted(videos.values(), key=lambda v: v['video_id'])
    manifest['updated_at'] = datetime.now(timezone.utc).isoformat()
    study_manifest['studies'] = list(studies.values())
    study_manifest['updated_at'] = manifest['updated_at']
    study_manifest['scope_note'] = 'Text acquisition, complete reading, visual inspection and product execution are distinct. See individual scope and pending fields.'
    write(transcript_path, manifest)
    write(study_path, study_manifest)
    print(json.dumps({'acquired_videos': len(videos), 'studies': len(studies), 'artifact_checks': checks,
                      'text_tracks_read': sum(v.get('full_transcript_read', False) for v in videos.values()),
                      'full_audiovisual_studies': sum(v.get('full_source_analyzed', False) for v in videos.values())}))


if __name__ == '__main__':
    main()
