#!/usr/bin/env python3
"""Build a deduplicated acquisition ledger from saved primary observations."""
import argparse
import hashlib
import json
import re
from pathlib import Path
from urllib.parse import parse_qs, urlsplit

ROOT = Path(__file__).resolve().parent


def youtube_id(url):
    p = urlsplit(url)
    host = p.netloc.lower().removeprefix('www.')
    if host == 'youtu.be':
        value = p.path.strip('/').split('/')[0]
    elif host in ('youtube.com', 'youtube-nocookie.com', 'm.youtube.com'):
        value = parse_qs(p.query).get('v', [''])[0]
        if not value and p.path.startswith(('/embed/', '/shorts/', '/live/')):
            value = p.path.split('/')[2]
    else:
        return None
    return value if re.fullmatch(r'[A-Za-z0-9_-]{11}', value) else None


def dump(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')


def build():
    videos = {}
    def add(vid, title, source, locator, observed, duration=None, date=None):
        if not vid or not re.fullmatch(r'[A-Za-z0-9_-]{11}', vid):
            return
        row = videos.setdefault(vid, {'id': vid, 'provider': 'youtube',
            'url': 'https://www.youtube.com/watch?v=' + vid, 'title': title,
            'published_at': date, 'date_status': 'known' if date else 'pending_watch_page',
            'duration_seconds': duration, 'first_observed_at': observed,
            'source_ids': [], 'discovery': [], 'transcript_status': 'pending',
            'pending_reason': 'not_yet_attempted',
            'next_action': 'Export accessible caption track; record language, provenance and temporal coverage.'})
        if source not in row['source_ids']:
            row['source_ids'].append(source)
        ref = {'source_id': source, 'locator': locator}
        if ref not in row['discovery']:
            row['discovery'].append(ref)
        if date:
            row.update(published_at=date, date_status='known')
        if duration:
            row['duration_seconds'] = duration

    crawls = []
    for path in sorted((ROOT / 'video-inventory/youtube-crawls').glob('*.json')):
        crawl = json.loads(path.read_text())
        crawls.append(crawl)
        for surface in crawl['surfaces']:
            for item in surface['items']:
                add(item['id'], item['title'], crawl['source_id'], surface['url'], crawl['finished_at'], item['duration'], item['upload_date'])
    seeds = json.loads((ROOT / 'video-inventory/page-discovery/initial-indices.json').read_text())
    for item in seeds['openai']:
        add(youtube_id(item['url']), item['title'].split('\n')[0], 'openai-learn-codex',
            'https://developers.openai.com/learn/codex', seeds['observed_at'])
    for path in sorted((ROOT / 'video-inventory/page-discovery').glob('*-rendered-*.json')):
        observation = json.loads(path.read_text())
        for item in observation.get('links', []) + observation.get('media', []):
            url = item.get('url') or item.get('src') or ''
            add(youtube_id(url), item.get('title'), observation['source_id'],
                observation['url'], observation['observed_at'])
    other_media = []
    page_states = []
    for path in sorted((ROOT / 'video-inventory/page-discovery').glob('*.json')):
        state = json.loads(path.read_text())
        if 'pages' not in state:
            continue
        page_states.append(state)
        for page in state['pages'].values():
            urls = page['video_links'] + [m.get('src', '') for m in page['media_elements']]
            for url in urls:
                vid = youtube_id(url)
                if vid:
                    add(vid, None, state['source_id'], page['url'], page['observed_at'])
                elif url and any(x in url for x in ('vimeo', 'wistia', 'mux', '.mp4', '.m3u8')):
                    item = {'url': url, 'page_url': page['url'], 'source_id': state['source_id'],
                            'status': 'player_discovered', 'next_action': 'Inspect public player and available captions; do not infer transcript from lesson text.'}
                    if item not in other_media:
                        other_media.append(item)
            for media in page['media_elements']:
                if media.get('playback-id') or media.get('media-id'):
                    other_media.append({'player': media, 'page_url': page['url'], 'source_id': state['source_id'],
                                        'status': 'player_discovered', 'next_action': 'Inspect public player captions.'})
    manifest = json.loads((ROOT / 'transcripts/manifest.json').read_text())
    for record in manifest['videos']:
        add(record['video_id'], record['title'], record['source_id'], record['url'],
            record['collected_at'], record['duration_seconds'], record['published_at'])
        videos[record['video_id']].update(transcript_status=record['status'],
            pending_reason=record['pending_reason'], next_action=record['next_action'],
            full_transcript_read=record.get('full_transcript_read', False),
            full_source_analyzed=record.get('full_source_analyzed', False),
            full_video_watched=record.get('full_video_watched', False),
            study_status=record.get('study_status', 'not_started'),
            transcript_manifest='transcripts/manifest.json#' + record['video_id'])
    for row in videos.values():
        row['source_ids'].sort()
    out = ROOT / 'video-inventory'
    (out / 'videos.jsonl').write_text(''.join(json.dumps(videos[k], ensure_ascii=False, sort_keys=True) + '\n' for k in sorted(videos)))
    dump(out / 'other-media.json', other_media)
    by_source = []
    sources = json.loads((ROOT / 'sources.json').read_text())['sources']
    for source in sources:
        rows = [r for r in videos.values() if source['id'] in r['source_ids']]
        crawl = next((c for c in crawls if c['source_id'] == source['id']), None)
        page_state = next((p for p in page_states if p['source_id'] == source['id']), None)
        by_source.append({'source_id': source['id'], 'youtube_discovered': len(rows),
            'public_uploads_discovered': crawl.get('unique_videos') if crawl else None,
            'public_upload_pagination_exhausted': crawl.get('pagination_exhausted', False) if crawl else None,
            'source_inventory_complete': False, 'full_source_denominator': None,
            'full_verified': sum(r['transcript_status'] == 'full_verified' for r in rows),
            'exported_tracks_pending_verification': sum(r['transcript_status'] == 'exported_track' for r in rows),
            'partial_transcripts': sum(r['transcript_status'] == 'partial' for r in rows),
            'without_transcript': sum(r['transcript_status'] == 'pending' for r in rows),
            'transcripts_read_integrally': sum(r.get('full_transcript_read', False) for r in rows),
            'full_sources_analyzed': sum(r.get('full_source_analyzed', False) for r in rows),
            'full_videos_watched': sum(r.get('full_video_watched', False) for r in rows),
            'html_pages_examined': len(page_state['pages']) if page_state else None,
            'html_pages_pending': len(page_state['pending']) if page_state else None,
            'html_pages_blocked': len(page_state['blocked']) if page_state else None})
    summary = {'unique_youtube_videos': len(videos),
               'public_upload_ids_across_five_channels': sum(c.get('unique_videos', 0) for c in crawls),
               'full_verified': sum(r['transcript_status'] == 'full_verified' for r in videos.values()),
               'exported_tracks_pending_verification': sum(r['transcript_status'] == 'exported_track' for r in videos.values()),
               'partial_transcripts': sum(r['transcript_status'] == 'partial' for r in videos.values()),
               'without_transcript': sum(r['transcript_status'] == 'pending' for r in videos.values()),
               'transcripts_read_integrally': sum(r.get('full_transcript_read', False) for r in videos.values()),
               'full_sources_analyzed': sum(r.get('full_source_analyzed', False) for r in videos.values()),
               'full_videos_watched': sum(r.get('full_video_watched', False) for r in videos.values()),
               'other_media_references': len(other_media), 'all_sources_complete': False, 'sources': by_source}
    dump(out / 'coverage.json', summary)
    print(json.dumps({k: v for k, v in summary.items() if k != 'sources'}, ensure_ascii=False))


def validate(artifacts=False):
    videos = [json.loads(line) for line in (ROOT / 'video-inventory/videos.jsonl').read_text().splitlines()]
    ids = [v['id'] for v in videos]
    assert len(ids) == len(set(ids)), 'Duplicate video ID'
    assert all(youtube_id(v['url']) == v['id'] for v in videos)
    summary = json.loads((ROOT / 'video-inventory/coverage.json').read_text())
    assert summary['unique_youtube_videos'] == len(videos)
    for source in summary['sources']:
        rows = [v for v in videos if source['source_id'] in v['source_ids']]
        assert source['youtube_discovered'] == len(rows)
        assert source['youtube_discovered'] == sum(source[k] for k in ('full_verified', 'exported_tracks_pending_verification', 'partial_transcripts', 'without_transcript'))
    manifest = json.loads((ROOT / 'transcripts/manifest.json').read_text())
    for video in manifest['videos']:
        assert video['video_id'] in ids
        for artifact in video['artifacts']:
            assert artifact['bytes'] > 0 and len(artifact['sha256']) == 64
            if artifacts:
                data = (Path(manifest['artifact_root']) / artifact['path']).read_bytes()
                assert len(data) == artifact['bytes']
                assert hashlib.sha256(data).hexdigest() == artifact['sha256']
    print('Inventory, counts, references' + (' and local artifact hashes' if artifacts else '') + ': valid')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('command', choices=['build', 'validate'])
    parser.add_argument('--artifacts', action='store_true')
    args = parser.parse_args()
    build() if args.command == 'build' else validate(args.artifacts)
