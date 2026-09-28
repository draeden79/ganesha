#!/usr/bin/env python3
"""Validate, deduplicate and publish manually verified research. No network access."""
import argparse
import copy
import hashlib
import json
import re
from collections import Counter
from datetime import date, datetime, timezone
from pathlib import Path
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit


ROOT = Path(__file__).resolve().parent
STATES = {'catalog_indexed', 'excerpt_ingested', 'discovered_only'}
EPHEMERAL = {'first_seen_at', 'last_checked_at', 'dedupe_key', 'fingerprint'}


def load_jsonl(path):
    return [json.loads(line) for line in path.read_text().splitlines() if line.strip()] if path.exists() else []


def canonical(url):
    p = urlsplit(url)
    if p.scheme not in ('http', 'https') or not p.netloc:
        raise ValueError('URL pública inválida: ' + url)
    host = p.hostname.lower()
    pairs = [(k, v) for k, v in parse_qsl(p.query) if not k.startswith('utm_') and k not in ('si', 'feature')]
    if host in ('youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'):
        video = dict(pairs).get('v')
        if host == 'youtu.be':
            video = p.path.strip('/')
        elif p.path.startswith(('/shorts/', '/embed/')):
            video = p.path.split('/')[2]
        if video:
            return 'https://www.youtube.com/watch?v=' + video
    return urlunsplit(('https', p.netloc.lower(), p.path.rstrip('/') or '/', urlencode(sorted(pairs)), ''))


def digest(value):
    raw = json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(',', ':')).encode()
    return 'sha256:' + hashlib.sha256(raw).hexdigest()


def seal(row):
    result = copy.deepcopy(row)
    result['canonical_url'] = canonical(result['canonical_url'])
    result['dedupe_key'] = result['canonical_url']
    material = {k: v for k, v in result.items() if k not in EPHEMERAL}
    # A new observation date must not masquerade as changed source content.
    material['freshness'] = {k: v for k, v in material['freshness'].items() if k != 'checked_as_of'}
    result['fingerprint'] = {'algorithm': 'sha256', 'scope': 'normalized_research_record_v1', 'value': digest(material)}
    return result


def validate(rows, inventory):
    source_ids = {s['id'] for s in inventory['sources']}
    ids, urls = set(), set()
    for r in rows:
        required = ('id', 'source_id', 'title', 'canonical_url', 'published_at', 'updated_at',
                    'first_seen_at', 'last_checked_at', 'resource_type', 'language', 'summary_locale',
                    'themes', 'tools', 'tool_version', 'level', 'access', 'ingestion_status',
                    'original_summary', 'evidence', 'freshness', 'limitations')
        missing = set(required) - r.keys()
        if missing:
            raise ValueError('Campos ausentes: ' + repr(missing))
        if r['id'] in ids or canonical(r['canonical_url']) in urls:
            raise ValueError('ID ou URL duplicado: ' + r['id'])
        ids.add(r['id'])
        urls.add(canonical(r['canonical_url']))
        if not re.fullmatch(r'res-[a-z0-9-]+', r['id']) or r['source_id'] not in source_ids:
            raise ValueError('ID/fonte desconhecido: ' + r['id'])
        if r['ingestion_status'] not in STATES:
            raise ValueError('Estado de ingestão inválido: ' + r['id'])
        for key in ('published_at', 'updated_at', 'first_seen_at', 'last_checked_at'):
            if r[key] is not None:
                date.fromisoformat(r[key][:10])
        if r['published_at'] and not r.get('publication_date_evidence'):
            raise ValueError('Publicação sem evidência: ' + r['id'])
        if r['updated_at'] and not r.get('update_date_evidence'):
            raise ValueError('Atualização sem evidência: ' + r['id'])
        if r['last_checked_at'] < r['first_seen_at']:
            raise ValueError('Consulta anterior à descoberta: ' + r['id'])
        if sum(len(e['quote'].split()) for e in r['evidence']) > 25:
            raise ValueError('Citação excede 25 palavras: ' + r['id'])
        for evidence in r['evidence']:
            if not evidence.get('locator') or not evidence.get('quote'):
                raise ValueError('Evidência sem localizador: ' + r['id'])
            canonical(evidence['url'])
        if r['ingestion_status'] == 'excerpt_ingested' and not r['evidence']:
            raise ValueError('Ingestão sem evidência: ' + r['id'])
        if r['resource_type'] == 'video' and r['ingestion_status'] == 'excerpt_ingested':
            if not (r['access'].get('video_watched') or r['access'].get('transcript_read')):
                raise ValueError('Vídeo não assistido/transcrito não pode ser ingerido: ' + r['id'])
        if 'fingerprint' in r and seal(r)['fingerprint'] != r['fingerprint']:
            raise ValueError('Fingerprint desatualizado: ' + r['id'])


def merge(existing, incoming):
    rows = {r['id']: copy.deepcopy(r) for r in existing}
    aliases = {canonical(url): r['id'] for r in existing for url in [r['canonical_url']] + r.get('aliases', [])}
    changes = []
    for candidate in incoming:
        r = copy.deepcopy(candidate)
        key = canonical(r['canonical_url'])
        known = aliases.get(key)
        if not known:
            known = next((aliases[canonical(a)] for a in r.get('aliases', []) if canonical(a) in aliases), None)
        if known:
            r['id'] = known  # Never rename an evidence/source ID already used by lessons.
        old = rows.get(r['id'])
        if old and not known and canonical(old['canonical_url']) != key:
            raise ValueError('ID reutilizado para outra URL; declarar alias confirmado: ' + r['id'])
        if old and r['last_checked_at'] < old['last_checked_at']:
            raise ValueError('Lote obsoleto: ' + r['id'])
        if old:
            r['first_seen_at'] = old['first_seen_at']
            r['aliases'] = sorted(set(old.get('aliases', []) + r.get('aliases', []) + ([old['canonical_url']] if canonical(old['canonical_url']) != key else [])))
        r = seal(r)
        changed = not old or seal(old)['fingerprint'] != r['fingerprint']
        if changed:
            changes.append({'id': r['id'], 'kind': 'new' if not old else 'changed',
                            'old_fingerprint': seal(old)['fingerprint']['value'] if old else None,
                            'new_fingerprint': r['fingerprint']['value'], 'themes': r['themes'],
                            'evidence_id': r['id'].replace('res-', 'ev-', 1) if r['ingestion_status'] == 'excerpt_ingested' else None})
        rows[r['id']] = r
        for url in [r['canonical_url']] + r.get('aliases', []):
            alias = canonical(url)
            if alias in aliases and aliases[alias] != r['id']:
                raise ValueError('Alias conflita com outro recurso: ' + alias)
            aliases[alias] = r['id']
    return [seal(r) for r in rows.values()], changes


def registry(rows, inventory):
    publishers = {s['id']: s['name'].split(' — ')[0] for s in inventory['sources']}
    result = {'schemaVersion': '1.0.0', 'sources': [], 'evidence': []}
    for r in rows:
        result['sources'].append({'id': r['id'], 'url': r['canonical_url'], 'title': r['title'],
            'publisher': publishers[r['source_id']], 'kind': 'official-docs' if r['resource_type'] == 'official_docs' else 'tutorial' if r['source_id'] == 'claude-academy' else 'other',
            'language': r['language'], 'retrievedAt': r['last_checked_at'],
            'trust': r.get('trust', 'primary'), 'availability': 'unavailable' if r['ingestion_status'] == 'discovered_only' else 'verified',
            **({'updatedAt': r['updated_at']} if r['updated_at'] else {})})
        if r['ingestion_status'] != 'excerpt_ingested':
            continue
        applies = []
        if any(t.startswith('claude') for t in r['tools']):
            applies.append('claude')
        if any(t.startswith('codex') for t in r['tools']):
            applies.append('codex')
        result['evidence'].append({'id': r['id'].replace('res-', 'ev-', 1), 'sourceId': r['id'],
            'locator': r['evidence'][0]['locator'], 'text': r['original_summary'], 'textKind': 'paraphrase',
            'claim': r['original_summary'], 'retrievedAt': r['last_checked_at'], 'appliesTo': applies or ['claude', 'codex'],
            'caveat': ' '.join([r['access']['scope']] + r['limitations'])})
    return result


def write(path, content):
    temporary = path.with_suffix(path.suffix + '.tmp')
    temporary.write_text(content, encoding='utf-8')
    temporary.replace(path)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('command', choices=('validate', 'export', 'diff', 'apply'))
    parser.add_argument('--root', type=Path, default=ROOT)
    parser.add_argument('--batch', type=Path)
    parser.add_argument('--run-id')
    parser.add_argument('--observations', type=Path, help='JSON array of source_id/status/checked_at/detail')
    args = parser.parse_args()
    root = args.root
    inventory = json.loads((root / 'sources.json').read_text())
    rows = load_jsonl(root / 'resources.jsonl')
    validate(rows, inventory)
    if args.command == 'validate':
        print(json.dumps({'resources': len(rows), 'states': dict(Counter(r['ingestion_status'] for r in rows))}, ensure_ascii=False))
        return
    if args.command == 'export':
        write(root / 'registry.json', json.dumps(registry(rows, inventory), ensure_ascii=False, indent=2) + '\n')
        return
    if not args.batch:
        parser.error('--batch é obrigatório (pode ser um JSONL vazio para registrar só acessos).')
    if not args.batch.is_file():
        parser.error('Arquivo de lote não existe: ' + str(args.batch))
    incoming = load_jsonl(args.batch)
    validate(incoming, inventory)
    observations = json.loads(args.observations.read_text()) if args.observations else []
    logs = load_jsonl(root / 'ingestion-log.jsonl')
    input_digest = digest({'incoming': incoming, 'observations': observations})
    if args.command == 'apply':
        if not args.run_id or not re.fullmatch(r'[a-z0-9-]+', args.run_id):
            parser.error('--run-id deve conter letras minúsculas, números e hífens.')
        previous = next((log for log in logs if log['run_id'] == args.run_id), None)
        if previous:
            if previous.get('input_digest') != input_digest:
                raise ValueError('run-id já usado por um lote diferente')
            print(json.dumps({'run_id': args.run_id, 'already_applied': True, 'notify': False}))
            return
    merged, changes = merge(rows, incoming)
    validate(merged, inventory)
    prior_status = {s['id']: s['access_status'] for s in inventory['sources']}
    for log in logs:
        for obs in log.get('observations', []):
            prior_status[obs['source_id']] = obs['status']
    access_changes = []
    for obs in observations:
        if obs['source_id'] not in prior_status or not obs.get('detail') or not obs.get('checked_at'):
            raise ValueError('Observação de acesso incompleta ou fonte desconhecida')
        if obs['status'] not in ('accessible', 'partial', 'metadata_only', 'index_unavailable', 'unavailable'):
            raise ValueError('Estado de acesso inválido')
        if prior_status[obs['source_id']] != obs['status']:
            access_changes.append(obs)
    result = {'changes': changes, 'access_changes': access_changes,
              'notify': bool(any(c['evidence_id'] for c in changes) or access_changes)}
    if args.command == 'apply':
        event = {'run_id': args.run_id, 'recorded_at': datetime.now(timezone.utc).isoformat(),
                 'input_digest': input_digest, 'observations': observations, **result}
        # Keep failures in the log; never erase previously read evidence on a failed fetch.
        write(root / 'resources.jsonl', ''.join(json.dumps(r, ensure_ascii=False) + '\n' for r in merged))
        write(root / 'registry.json', json.dumps(registry(merged, inventory), ensure_ascii=False, indent=2) + '\n')
        write(root / 'ingestion-log.jsonl', ''.join(json.dumps(log, ensure_ascii=False) + '\n' for log in logs + [event]))
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
