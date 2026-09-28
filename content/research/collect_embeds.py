#!/usr/bin/env python3
"""Resume a public HTML link/media inventory. No credentials or hidden APIs.

HTML exhaustion does not prove a JS-rendered archive is exhausted. Browser
reconciliation remains explicit in the output, even after the queue is empty.
"""
import argparse
import json
import time
import urllib.error
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from pathlib import Path
from collect_videos import now, write

ROOT = Path(__file__).resolve().parent


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.media = []
        self.title = ''
        self.in_title = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'a' and a.get('href'):
            self.links.append(a['href'])
        if tag in ('iframe', 'video', 'source', 'track', 'mux-player', 'wistia-player'):
            allowed = ('src', 'title', 'kind', 'srclang', 'playback-id', 'media-id')
            self.media.append({'tag': tag, **{k: a[k] for k in allowed if a.get(k)}})
        if tag == 'title':
            self.in_title = True

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data


def canonical(url):
    p = urllib.parse.urlsplit(url)
    return urllib.parse.urlunsplit((p.scheme, p.netloc, p.path.rstrip('/') or '/', '', ''))


def allowed(source, url, courses):
    p = urllib.parse.urlsplit(url)
    if source == 'builder-blog':
        return p.netloc == 'www.builder.io' and p.path.startswith('/blog') and '/topics/' not in p.path
    if source == 'peter-yang-newsletter':
        return p.netloc == 'creatoreconomy.so' and (p.path.startswith('/p/') or p.path == '/archive')
    if source == 'claude-academy':
        return p.netloc == 'academy.claude.com' and any(p.path == c or p.path.startswith(c + '/') for c in courses)
    return False


def run(source, limit):
    seeds = json.loads((ROOT / 'video-inventory/page-discovery/initial-indices.json').read_text())
    groups = {'builder-blog': 'builder', 'peter-yang-newsletter': 'newsletter', 'claude-academy': 'academy'}
    group = groups[source]
    courses = sorted({urllib.parse.urlsplit(x['url']).path for x in seeds['academy']})
    out = ROOT / 'video-inventory/page-discovery' / (source + '.json')
    state = json.loads(out.read_text()) if out.exists() else {
        'source_id': source, 'started_at': now(), 'method': 'anonymous public HTML links and media elements',
        'source_inventory_complete': False, 'browser_reconciliation_pending': True,
        'pages': {}, 'pending': [], 'blocked': {}}
    starts = [x['url'] for x in seeds[group]]
    if source == 'builder-blog':
        starts.append('https://www.builder.io/blog')
    if source == 'peter-yang-newsletter':
        starts.append('https://creatoreconomy.so/archive')
    for url in starts:
        url = canonical(url)
        if allowed(source, url, courses) and url not in state['pages'] and url not in state['blocked'] and url not in state['pending']:
            state['pending'].append(url)
    processed = 0
    while state['pending'] and (not limit or processed < limit):
        url = state['pending'].pop(0)
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'GaneshaResearch/1.0 (public metadata inventory)'})
            with urllib.request.urlopen(req, timeout=30) as response:
                html = response.read().decode('utf-8', errors='replace')
                final_url, status = response.url, response.status
            parser = Links()
            parser.feed(html)
            links = sorted({urllib.parse.urljoin(final_url, u) for u in parser.links})
            videos = [u for u in links if any(host in urllib.parse.urlsplit(u).netloc for host in ('youtube.com', 'youtu.be', 'vimeo.com', 'wistia.com'))]
            media = [m for m in parser.media if m['tag'] != 'iframe' or any(h in m.get('src', '') for h in ('youtube', 'vimeo', 'wistia', 'mux', 'player'))]
            state['pages'][url] = {'url': final_url, 'http_status': status, 'observed_at': now(),
                                   'title': parser.title, 'video_links': videos, 'media_elements': media,
                                   'linked_pages': sorted({canonical(u) for u in links if allowed(source, canonical(u), courses)}),
                                   'video_absence_confirmed': False}
            for child in state['pages'][url]['linked_pages']:
                if child not in state['pages'] and child not in state['blocked'] and child not in state['pending']:
                    state['pending'].append(child)
        except Exception as exc:
            state['blocked'][url] = {'attempted_at': now(), 'error': str(exc),
                                     'next_action': 'Inspect visible public page in browser; do not infer absence.'}
            if isinstance(exc, urllib.error.HTTPError) and exc.code == 429:
                state['rate_limit_pause'] = now()
                write(out, state)
                break
        processed += 1
        state['updated_at'] = now()
        state['html_link_queue_exhausted'] = not state['pending']
        write(out, state)
        if processed % 25 == 0:
            print(json.dumps({'source': source, 'pages': len(state['pages']), 'pending': len(state['pending']), 'blocked': len(state['blocked'])}), flush=True)
        time.sleep(0.5)
    write(out, state)
    print(json.dumps({'source': source, 'pages': len(state['pages']), 'pending': len(state['pending']), 'blocked': len(state['blocked'])}), flush=True)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('source', choices=['builder-blog', 'peter-yang-newsletter', 'claude-academy'])
    parser.add_argument('--limit', type=int, default=0, help='Optional checkpoint size; 0 exhausts discovered links')
    args = parser.parse_args()
    run(args.source, args.limit)
