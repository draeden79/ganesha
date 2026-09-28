import unittest
from video_inventory import youtube_id


class VideoIdentityTests(unittest.TestCase):
    def test_watch_embed_short_and_shortlink_share_identity(self):
        expected = 'ntDIxaeo3Wg'
        for url in ('https://www.youtube.com/watch?v=ntDIxaeo3Wg&t=30',
                    'https://www.youtube-nocookie.com/embed/ntDIxaeo3Wg?rel=0',
                    'https://youtube.com/shorts/ntDIxaeo3Wg',
                    'https://youtu.be/ntDIxaeo3Wg?si=tracking'):
            with self.subTest(url=url):
                self.assertEqual(youtube_id(url), expected)

    def test_channel_playlist_and_unrelated_host_are_not_video_ids(self):
        for url in ('https://youtube.com/@TechWithTim',
                    'https://youtube.com/playlist?list=PLsomething',
                    'https://example.com/watch?v=ntDIxaeo3Wg',
                    'https://youtube.com.evil.example/watch?v=ntDIxaeo3Wg',
                    'https://youtube.com/watch?v=short'):
            with self.subTest(url=url):
                self.assertIsNone(youtube_id(url))


if __name__ == '__main__':
    unittest.main()
