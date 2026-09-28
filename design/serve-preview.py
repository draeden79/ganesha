#!/usr/bin/env python3
"""Preview design assets while reading authoritative curriculum without copying it."""
import argparse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse

parser = argparse.ArgumentParser()
parser.add_argument('--port', type=int, default=4176)
parser.add_argument('--content-dir', type=Path, default=Path(__file__).resolve().parents[1] / 'content')
args = parser.parse_args()
root = Path(__file__).resolve().parent
content = args.content_dir.resolve()
class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw): super().__init__(*a, directory=str(root), **kw)
    def translate_path(self, path):
        route = unquote(urlparse(path).path)
        if route.startswith('/content/'):
            candidate = (content / route[len('/content/'):]).resolve()
            if not candidate.is_relative_to(content): return str(root / '__not_found__')
            return str(candidate)
        return super().translate_path(path)
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()
print(f'Ganesha design: http://127.0.0.1:{args.port}/native.html; curriculum: {content}', flush=True)
ThreadingHTTPServer(('127.0.0.1', args.port), Handler).serve_forever()
