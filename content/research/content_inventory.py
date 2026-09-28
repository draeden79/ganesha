#!/usr/bin/env python3
"""Join known videos/pages with study state; discovery is never full consumption."""
import hashlib
import json
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlsplit

from research import canonical

ROOT = Path(__file__).resolve().parent


def read(path, default):
    return json.loads(path.read_text()) if path.exists() else default


def jsonl(path):
    return [json.loads(x) for x in path.read_text().splitlines() if x.strip()] if path.exists() else []


def page_kind(url):
    path = urlsplit(url).path.rstrip('/')
    if '/courses/' in path:
        parts = path.strip('/').split('/')
        return 'course_index' if len(parts) == 2 else 'lesson_or_assessment'
    if path.startswith('/p/') or (path.startswith('/blog/') and not path.startswith('/blog/page/') and not path.startswith('/blog/feed/')):
        return 'article_candidate'
    if path.startswith('/docs/'):
        return 'official_document'
    return 'index_or_utility'


def build(root=ROOT):
    items = {}

    def add(url, source_ids=(), title=None, kind=None):
        url = canonical(url)
        video = url.startswith('https://www.youtube.com/watch?v=')
        key = 'youtube:' + url.split('v=')[1] if video else 'page:' + hashlib.sha256(url.encode()).hexdigest()[:20]
        if key not in items:
            items[key] = {'id': key, 'url': url, 'kind': 'video' if video else kind or page_kind(url),
                          'title': title, 'source_ids': [], 'discovery': [], 'resource_ids': [],
                          'studies': [], 'text_fully_read': False, 'source_fully_analyzed': False,
                          'full_video_watched': False, 'status': 'discovered_not_studied'}
        row = items[key]
        row['source_ids'] = sorted(set(row['source_ids']) | set(source_ids))
        if title and not row['title']:
            row['title'] = title
        return row

    for video in jsonl(root / 'video-inventory/videos.jsonl'):
        row = add(video['url'], video['source_ids'], video.get('title'))
        row.update(video_id=video['id'], transcript_status=video['transcript_status'])
        row['discovery'] = video.get('discovery', [])
    for path in sorted((root / 'video-inventory/page-discovery').glob('*.json')):
        data = read(path, {})
        if not isinstance(data.get('pages'), dict):
            continue
        for url, page in data['pages'].items():
            row = add(url, [data['source_id']], page.get('title'))
            row['discovery'].append({'index_artifact': str(path.relative_to(root)),
                                     'observed_at': page.get('observed_at')})
            row['last_observed_http_status'] = page.get('http_status')
            row['embedded_video_urls'] = sorted(set(canonical(u) for u in page.get('video_links', [])
                                                     if '/watch?' in u or 'youtu.be/' in u))
        for url, block in data.get('blocked', {}).items():
            row = add(url, [data['source_id']])
            row['access_issue'] = block
            row['status'] = 'access_issue_pending_review'
    resources = jsonl(root / 'resources.jsonl')
    resource_urls = {r['id']: r['canonical_url'] for r in resources}
    for resource in resources:
        row = add(resource['canonical_url'], [resource['source_id']], resource['title'])
        row['resource_ids'].append(resource['id'])
        row['registry_ingestion_status'] = resource['ingestion_status']
        # Legacy excerpt_ingested is deliberately NOT treated as full reading.
    for video in read(root / 'transcripts/manifest.json', {'videos': []})['videos']:
        row = add(video['url'], video.get('source_ids') or [video['source_id']], video.get('title'))
        row['text_fully_read'] = video.get('full_transcript_read', False)
        row['source_fully_analyzed'] = video.get('full_source_analyzed', False)
        row['full_video_watched'] = video.get('full_video_watched', False)
        row['transcript_status'] = video['status']
        row['status'] = video.get('study_status', 'acquired_not_studied')
    study_manifest = read(root / 'studies/manifest.json', {'studies': []})
    for study in study_manifest['studies']:
        if 'sources' in study:
            candidates = [{**source, 'study_path': study['study_path'],
                           'text_read_complete': source.get('full_text_analyzed', False)}
                          for source in study['sources']]
        else:
            candidates = [study]
        for candidate in candidates:
            url = candidate.get('url') or candidate.get('source_url') or resource_urls.get(candidate.get('resource_id'))
            if not url and candidate.get('video_id'):
                url = 'https://www.youtube.com/watch?v=' + candidate['video_id']
            if not url:
                raise ValueError('Study lacks source identity: ' + repr(candidate.get('id')))
            row = add(url, [candidate['source_id']] if candidate.get('source_id') else (), candidate.get('title'))
            study_ref = {'id': study.get('id') or study.get('video_id'),
                         'study_path': candidate['study_path'],
                         'status': candidate.get('status') or candidate.get('study_status')}
            if study_ref not in row['studies']:
                row['studies'].append(study_ref)
            row['text_fully_read'] |= any(candidate.get(k, False) for k in ('text_read_complete', 'all_exported_text_read', 'full_transcript_read'))
            row['source_fully_analyzed'] |= candidate.get('full_source_analyzed', False)
            row['full_video_watched'] |= candidate.get('full_video_watched', False)
            row['status'] = 'studied_with_declared_scope'
    for blocked in study_manifest.get('blocked_sources', []):
        row = add(blocked['url'], [blocked['source_id']], blocked.get('title'))
        row['access_issue'] = {key: blocked.get(key) for key in ('status', 'reason', 'source_manifest', 'next_action')}
        row['status'] = blocked['status']
        # A partial text and a paywall screenshot never certify full reading.
    rows = sorted(items.values(), key=lambda x: x['id'])
    assert len({r['url'] for r in rows}) == len(rows), 'Canonical URL collision'
    coverage = {'generated_at': datetime.now(timezone.utc).isoformat(),
                'known_items': len(rows), 'by_kind': dict(Counter(r['kind'] for r in rows)),
                'items_with_study': sum(bool(r['studies']) for r in rows),
                'items_with_complete_text_read': sum(r['text_fully_read'] for r in rows),
                'items_with_full_source_analysis': sum(r['source_fully_analyzed'] for r in rows),
                'full_videos_watched': sum(r['full_video_watched'] for r in rows),
                'access_issues': sum('access_issue' in r for r in rows),
                'exhaustive_goal_active': True, 'historical_denominator_verified': False,
                'scope_note': 'Known URLs only. Page discovery includes indices/utility pages and article candidates; it does not prove complete archives, free access, complete source reading or complete audiovisual review.'}
    target = root / 'content-inventory'
    target.mkdir(exist_ok=True)
    for name, value in [('items.jsonl', ''.join(json.dumps(r, ensure_ascii=False) + '\n' for r in rows)),
                        ('coverage.json', json.dumps(coverage, ensure_ascii=False, indent=2) + '\n')]:
        path = target / name
        temp = path.with_suffix('.tmp')
        temp.write_text(value)
        temp.replace(path)
    return coverage


if __name__ == '__main__':
    print(json.dumps(build(), ensure_ascii=False))
