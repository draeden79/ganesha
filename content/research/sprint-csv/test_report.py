import importlib.util
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('sprint_report', Path(__file__).with_name('report.py'))
report = importlib.util.module_from_spec(spec)
spec.loader.exec_module(report)

VALID = 'id,item,amount\nP01,Caderno,20.00\nP02,Caneta,10.50\n'


class ReportTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.source = Path(self.tmp.name) / 'input.csv'
        self.output = Path(self.tmp.name) / 'report.md'
        self.source.write_text(VALID)

    def test_total_repeat_and_original_preserved(self):
        report.run(self.source, self.output)
        first = self.output.read_bytes()
        self.assertIn(b'Registros: 2\nTotal: 30.50', first)
        report.run(self.source, self.output)
        self.assertEqual(first, self.output.read_bytes())
        self.assertEqual(VALID, self.source.read_text())

    def test_bad_inputs_preserve_last_valid_report_and_recovery(self):
        report.run(self.source, self.output)
        previous = self.output.read_bytes()
        invalid = [
            'id,item\nP01,Caderno\n',
            'id,item,amount\nP01,Caderno,abc\n',
            VALID + 'P01,Outro,1.00\n',
            'id,item,amount\nP01,Caderno,NaN\n',
            'id,item,amount\n',
        ]
        for text in invalid:
            with self.subTest(input=text):
                self.source.write_text(text)
                with self.assertRaises(ValueError):
                    report.run(self.source, self.output)
                self.assertEqual(previous, self.output.read_bytes())
        self.source.write_text(VALID.replace('10.50', '11.50'))
        report.run(self.source, self.output)
        self.assertIn('Total: 31.50', self.output.read_text())

    def test_output_cannot_overwrite_source(self):
        with self.assertRaises(ValueError):
            report.run(self.source, self.source)
        self.assertEqual(VALID, self.source.read_text())


if __name__ == '__main__':
    unittest.main()
