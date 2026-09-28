import json
from pathlib import Path
import tempfile
import unittest
from content_inventory import build, page_kind


class ContentInventoryTests(unittest.TestCase):
    def test_article_and_index_are_distinct(self):
        self.assertEqual(page_kind('https://www.builder.io/blog/page/2'), 'index_or_utility')
        self.assertEqual(page_kind('https://www.builder.io/blog/guide'), 'article_candidate')
        self.assertEqual(page_kind('https://academy.claude.com/courses/intro'), 'course_index')

    def test_duplicate_url_merges_without_certifying_excerpt_as_full(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            discovery = root / 'video-inventory/page-discovery'
            discovery.mkdir(parents=True)
            url = 'https://www.builder.io/blog/example'
            (discovery / 'example.json').write_text(json.dumps({'source_id': 'builder-blog', 'pages': {url: {'title': 'Example'}}}))
            (root / 'resources.jsonl').write_text(json.dumps({'id': 'res-example', 'canonical_url': url + '/', 'source_id': 'builder-blog', 'title': 'Example', 'ingestion_status': 'excerpt_ingested'}) + '\n')
            result = build(root)
            self.assertEqual(result['known_items'], 1)
            self.assertEqual(result['items_with_complete_text_read'], 0)
            self.assertFalse(result['historical_denominator_verified'])


if __name__ == '__main__':
    unittest.main()
