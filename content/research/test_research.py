"""Contract checks for deduplication, honest ingestion and incremental processing."""
import copy
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

import research


class ResearchTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.inventory = json.loads((research.ROOT / 'sources.json').read_text())
        cls.example = research.load_jsonl(research.ROOT / 'resources.jsonl')[4]

    def row(self):
        row = copy.deepcopy(self.example)
        row.pop('fingerprint', None)
        row.pop('dedupe_key', None)
        return row

    def test_youtube_tracking_does_not_duplicate_video(self):
        self.assertEqual(research.canonical('https://youtu.be/abc123?si=track&t=5'),
                         research.canonical('https://www.youtube.com/watch?v=abc123&utm_source=mail'))

    def test_fresh_check_alone_is_not_news(self):
        old = self.row()
        new = copy.deepcopy(old)
        new['last_checked_at'] = '2026-10-02T16:00:00Z'
        new['freshness']['checked_as_of'] = '2026-10-02'
        merged, changes = research.merge([old], [new])
        self.assertFalse(changes)
        self.assertEqual(merged[0]['last_checked_at'], new['last_checked_at'])

    def test_confirmed_redirect_keeps_existing_id(self):
        old = self.row()
        new = copy.deepcopy(old)
        new['id'] = 'res-new-name'
        new['aliases'] = [old['canonical_url']]
        new['canonical_url'] = 'https://academy.claude.com/courses/new-path'
        merged, changes = research.merge([old], [new])
        self.assertEqual(len(merged), 1)
        self.assertEqual(merged[0]['id'], old['id'])
        self.assertEqual(changes[0]['kind'], 'changed')

    def test_changed_evidence_is_news(self):
        old = self.row()
        new = copy.deepcopy(old)
        new['original_summary'] = 'Novo comportamento conferido na fonte.'
        _, changes = research.merge([old], [new])
        self.assertEqual(changes[0]['evidence_id'], old['id'].replace('res-', 'ev-', 1))

    def test_metadata_does_not_become_watched_video(self):
        row = self.row()
        row['resource_type'] = 'video'
        with self.assertRaisesRegex(ValueError, 'Vídeo não assistido'):
            research.validate([row], self.inventory)

    def test_stale_batch_cannot_overwrite_newer_observation(self):
        old = self.row()
        new = copy.deepcopy(old)
        old['last_checked_at'] = '2026-10-02T16:00:00Z'
        with self.assertRaisesRegex(ValueError, 'Lote obsoleto'):
            research.merge([old], [new])

    def test_duplicate_canonical_url_is_rejected(self):
        old = self.row()
        new = copy.deepcopy(old)
        new['id'] = 'res-duplicate'
        new['canonical_url'] += '?utm_source=mail'
        with self.assertRaisesRegex(ValueError, 'duplicado'):
            research.validate([old, new], self.inventory)

    def test_registry_cannot_cite_discovered_only_video(self):
        row = self.row()
        row['ingestion_status'] = 'discovered_only'
        output = research.registry([row], self.inventory)
        self.assertEqual(output['evidence'], [])
        self.assertEqual(output['sources'][0]['availability'], 'unavailable')

    def test_repeated_run_is_idempotent_and_repeated_failure_is_quiet(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            row = self.row()
            (root / 'sources.json').write_text(json.dumps(self.inventory))
            (root / 'resources.jsonl').write_text(json.dumps(row) + '\n')
            (root / 'batch.jsonl').write_text('')
            observation = [{'source_id': 'claude-academy', 'status': 'unavailable',
                            'checked_at': '2026-10-02T16:00:00Z', 'detail': 'Test fixture, network failure.'}]
            (root / 'observations.json').write_text(json.dumps(observation))
            command = [sys.executable, str(research.ROOT / 'research.py'), 'apply', '--root', str(root),
                       '--batch', str(root / 'batch.jsonl'), '--observations', str(root / 'observations.json'), '--run-id']
            first = json.loads(subprocess.check_output(command + ['test-first'], text=True))
            self.assertTrue(first['notify'])
            repeat = json.loads(subprocess.check_output(command + ['test-first'], text=True))
            self.assertTrue(repeat['already_applied'])
            next_run = json.loads(subprocess.check_output(command + ['test-next'], text=True))
            self.assertFalse(next_run['notify'])
            self.assertEqual(len(research.load_jsonl(root / 'ingestion-log.jsonl')), 2)
            # Access failure must not remove previously grounded claims.
            output = json.loads((root / 'registry.json').read_text())
            self.assertEqual(len(output['evidence']), 1)


if __name__ == '__main__':
    unittest.main()
