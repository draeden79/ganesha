import unittest
from integrate_studies import verify_full_read


class ReadingCoverageTests(unittest.TestCase):
    def test_final_line_without_newline_counts(self):
        verify_full_read(b'first\nsecond\nlast', [[1, 2], [3, 3]], 3)

    def test_gap_cannot_be_certified_complete(self):
        with self.assertRaises(AssertionError):
            verify_full_read(b'first\nmiddle\nlast', [[1, 1], [3, 3]], 3)

    def test_unread_final_line_cannot_be_certified_complete(self):
        with self.assertRaises(AssertionError):
            verify_full_read(b'first\nlast', [[1, 1]], 2)


if __name__ == '__main__':
    unittest.main()
