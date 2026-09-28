"""Focused offline tests: no yt-dlp import, network or real acquisitions."""
import hashlib
import json
import tempfile
import unittest
from datetime import datetime, timezone
from pathlib import Path
from unittest.mock import patch

import collect_tracks as collector
from verify_artifacts import verify_record, verify_reference


class IntegrityTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory(prefix="offline-test-", dir=collector.HERE)
        self.root = Path(self.tmp.name)
        self.addCleanup(self.tmp.cleanup)

    def make_artifact(self, name, data, **fields):
        (self.root / name).write_bytes(data)
        return {"path": name, "bytes": len(data), "sha256": hashlib.sha256(data).hexdigest(), **fields}

    def caption_record(self):
        raw = json.dumps({"events": [
            {"tStartMs": 0, "dDurationMs": 1000, "segs": [{"utf8": "first"}]},
            {"tStartMs": 500, "dDurationMs": 1000, "segs": [{"utf8": "overlap\nkept"}]},
            {"tStartMs": 2000, "segs": [{"utf8": "last"}]},
            {"tStartMs": 3000, "segs": [{"utf8": " "}]}]}).encode()
        original = self.make_artifact("original.json3", raw, format="youtube_json3", cue_count=3)
        # Expected text is specified independently, including overlap and unknown end.
        text = b"[00:00:00.000 --> 00:00:01.000] first\n[00:00:00.500 --> 00:00:01.500] overlap\nkept\n[00:00:02.000 --> ?] last\n"
        derived = self.make_artifact("derived.txt", text, format="derived_cue_text", derived_from_sha256=original["sha256"])
        return {"video_id": "fixture", "artifact_root": str(self.root), "artifacts": [original, derived]}

    def test_complete_caption_preserves_overlap_and_unknown_end(self):
        self.assertEqual(verify_record(self.caption_record()), ([], 2, 1))

    def test_missing_cue_detected_even_with_valid_txt_file_hash(self):
        record = self.caption_record()
        item = record["artifacts"][1]
        record["artifacts"][1] = self.make_artifact("derived.txt", b"[00:00:00.000 --> 00:00:01.000] first\n", format="derived_cue_text", derived_from_sha256=item["derived_from_sha256"])
        self.assertIn("txt_differs_from_full_json3_cues", [e["error"] for e in verify_record(record)[0]])

    def test_wrong_derivation_parent_detected(self):
        record = self.caption_record()
        record["artifacts"][1]["derived_from_sha256"] = "0" * 64
        self.assertIn("missing_or_mismatched_derivation_source", [e["error"] for e in verify_record(record)[0]])

    def test_snapshot_same_size_tampering_detected(self):
        reference = self.make_artifact("queue.json", b'{"video_ids":["a"]}')
        self.assertEqual(verify_reference(reference, self.root), [])
        (self.root / "queue.json").write_bytes(b'{"video_ids":["b"]}')
        self.assertEqual(verify_reference(reference, self.root)[0]["error"], "referenced_size_or_sha256_mismatch")

    def test_pause_uses_latest_real_finish_across_batches(self):
        attempts = [{"started_at": "2026-09-28T10:00:00+00:00", "finished_at": "2026-09-28T10:00:05+00:00", "batch_id": "old"},
                    {"started_at": "2026-09-28T09:00:00+00:00", "finished_at": "2026-09-28T09:00:05+00:00"}]
        current = datetime(2026, 9, 28, 10, 0, 10, tzinfo=timezone.utc)
        self.assertEqual(collector.remaining_pause(attempts, 1, current), 15)
        self.assertEqual(collector.remaining_pause(attempts, 30, current), 25)
        self.assertEqual(collector.remaining_pause([], 20, current), 0)
        self.assertEqual(collector.remaining_pause(attempts, 20, current.replace(second=25)), 0)

    def test_pause_enforced_before_next_process_first_request(self):
        with patch.object(collector, "read_lines", return_value=[]) as read, \
             patch.object(collector, "remaining_pause", side_effect=[15, 0]), \
             patch.object(collector.time, "sleep") as sleep:
            collector.enforce_attempt_pause(20)
        self.assertEqual(read.call_count, 2)
        sleep.assert_called_once_with(15)

    def test_each_batch_captures_current_flags_and_keeps_older_baseline(self):
        (self.root / "transcripts").mkdir()
        (self.root / "acquisition").mkdir()
        canonical = self.root / "transcripts/manifest.json"
        canonical.write_text(json.dumps({"videos": [{"video_id": "a", "full_transcript_read": False}]}))
        with patch.object(collector, "ROOT", self.root), patch.object(collector, "HERE", self.root / "acquisition"):
            first = collector.capture_batch_baseline("first", "historical", {"a"})
            before = (self.root / first["path"]).read_bytes()
            canonical.write_text(json.dumps({"videos": [{"video_id": "a", "full_transcript_read": True}, {"video_id": "b", "full_video_watched": True}]}))
            second = collector.capture_batch_baseline("second", "historical", {"a", "b"})
            with self.assertRaises(ValueError):
                collector.capture_batch_baseline("first", "historical", {"a"})
        self.assertEqual((self.root / first["path"]).read_bytes(), before)
        latest = json.loads((self.root / second["path"]).read_text())
        self.assertEqual(latest["video_count"], 2)
        self.assertTrue(latest["study_flags_before"]["a"]["full_transcript_read"])
        self.assertTrue(latest["study_flags_before"]["b"]["full_video_watched"])
        self.assertEqual(verify_reference(first, self.root), [])
        self.assertEqual(verify_reference(second, self.root), [])

    def test_archive_keeps_bound_queue_and_refuses_tampered_snapshot(self):
        here = self.root / "acquisition"
        here.mkdir()
        active = here / "historical-queue.json"
        active.write_text('{"video_ids":["a"]}')
        with patch.object(collector, "ROOT", self.root), patch.object(collector, "HERE", here):
            archived_path = collector.archive_historical_checkpoint({"batch_id": "first"})
            bound = json.loads((self.root / archived_path).read_text())
            active.write_text('{"video_ids":["b"]}')
            collector.archive_historical_checkpoint(bound)
            self.assertEqual(json.loads((self.root / archived_path).read_text())["queue_snapshot_artifact"], bound["queue_snapshot_artifact"])
            snapshot = self.root / bound["queue_snapshot_artifact"]["path"]
            snapshot.write_text('{"video_ids":["c"]}')
            with self.assertRaises(ValueError):
                collector.archive_historical_checkpoint(bound)


if __name__ == "__main__":
    unittest.main()
