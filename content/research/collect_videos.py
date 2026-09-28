#!/usr/bin/env python3
"""Inventory public channel uploads with yt-dlp; never reads browser credentials.

Run with the separately installed yt-dlp module on PYTHONPATH. Results contain
public metadata only. A successful traversal is narrower than complete source
coverage: embedded/unlisted links and playlist membership still need inspection.
"""
import argparse
import json
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def now():
    return datetime.now(timezone.utc).isoformat()


def write(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix('.tmp')
    tmp.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')
    tmp.replace(path)


def flatten(node, surfaces, parent_url):
    if node.get('_type') == 'playlist':
        url = node.get('webpage_url') or parent_url
        children = node.get('entries', [])
        if any(x and x.get('_type') == 'playlist' for x in children):
            for child in children:
                if child:
                    flatten(child, surfaces, url)
        else:
            items = []
            for child in children:
                if child is None:
                    raise ValueError('Null entry: traversal cannot be declared complete')
                item = {k: child.get(k) for k in (
                    'id', 'title', 'url', 'duration', 'channel_id', 'channel',
                    'upload_date', 'release_timestamp', 'availability', 'live_status')}
                item['date_status'] = 'known' if item['upload_date'] else 'pending_watch_page'
                items.append(item)
            surfaces.append({'url': url, 'title': node.get('title'),
                             'reported_count': node.get('playlist_count'),
                             'returned_count': len(items), 'pagination_exhausted': True,
                             'items': items})
    else:
        raise ValueError('Expected channel playlist result')


def collect(source):
    import yt_dlp
    from yt_dlp.version import __version__
    out = ROOT / 'video-inventory' / 'youtube-crawls' / (source['id'] + '.json')
    result = {'source_id': source['id'], 'url': source['canonical_url'],
              'started_at': now(), 'tool': 'yt-dlp', 'tool_version': __version__,
              'authentication': 'anonymous; no cookies', 'status': 'running',
              'pagination_exhausted': False, 'source_inventory_complete': False,
              'surfaces': [], 'log': []}
    write(out, result)

    class Logger:
        def debug(self, msg):
            result['log'].append({'level': 'debug', 'message': msg})
        def info(self, msg):
            result['log'].append({'level': 'info', 'message': msg})
        def warning(self, msg):
            result['log'].append({'level': 'warning', 'message': msg})
        def error(self, msg):
            result['log'].append({'level': 'error', 'message': msg})

    try:
        with yt_dlp.YoutubeDL({'extract_flat': True, 'skip_download': True,
                              'cachedir': False, 'socket_timeout': 20,
                              'retries': 1, 'extractor_retries': 1,
                              'logger': Logger(), 'ignoreerrors': False}) as ydl:
            info = ydl.extract_info(source['canonical_url'], download=False)
            flatten(info, result['surfaces'], source['canonical_url'])
        result.update(status='public_uploads_traversed', pagination_exhausted=True,
                      channel_id=info.get('channel_id'), channel_title=info.get('title'))
        result['unique_videos'] = len({i['id'] for s in result['surfaces'] for i in s['items']})
        result['remaining_scope'] = 'Reconcile playlists/podcasts, embedded and unlisted links; exact dates and transcripts per video.'
    except Exception as exc:
        result.update(status='blocked', error=str(exc),
                      next_action='Inspect public channel UI; resume failed surface without declaring completeness.')
    result['finished_at'] = now()
    write(out, result)
    print(json.dumps({k: result.get(k) for k in ('source_id', 'status', 'unique_videos', 'error')}, ensure_ascii=False), flush=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('sources', nargs='*', help='IDs from sources.json; defaults to all channels')
    args = parser.parse_args()
    sources = json.loads((ROOT / 'sources.json').read_text())['sources']
    for source in sources:
        if source['type'] == 'video_channel' and (not args.sources or source['id'] in args.sources):
            collect(source)


if __name__ == '__main__':
    main()
