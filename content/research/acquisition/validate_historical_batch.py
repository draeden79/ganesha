#!/usr/bin/env python3
"""Validate real batch files, complete queue indexing, and preserved study flags."""
import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path
from collect_tracks import archive_historical_checkpoint

ROOT = Path(__file__).resolve().parents[1]
HERE = ROOT / "acquisition"


def read_lines(path):
    return [json.loads(line) for line in path.read_text().splitlines() if line.strip()]


def main():
    checkpoint = json.loads((HERE / "historical-checkpoint.json").read_text())
    baseline = json.loads((HERE / "historical-baseline.json").read_text())
    queue = json.loads((HERE / "historical-queue.json").read_text())
    ranks = read_lines(HERE / "historical-priority.jsonl")
    records = {row["video_id"]: row for row in read_lines(HERE / "manifest.jsonl")}
    canonical_path = ROOT / baseline["canonical_path"]
    canonical_bytes = canonical_path.read_bytes()
    canonical = {row["video_id"]: row for row in json.loads(canonical_bytes)["videos"]}
    errors, artifacts = [], []
    if set(checkpoint["new_exported_video_ids"]) & set(checkpoint["baseline_exported_video_ids"]):
        errors.append({"error": "batch_reacquired_a_baseline_video"})
    if len(set(checkpoint["new_exported_video_ids"])) != len(checkpoint["new_exported_video_ids"]):
        errors.append({"error": "duplicate_new_video_in_batch"})
    for video_id in checkpoint["new_exported_video_ids"]:
        record = records.get(video_id)
        if not record:
            errors.append({"video_id": video_id, "error": "missing_manifest_record"})
            continue
        if record.get("acquisition_batch_id") != checkpoint["batch_id"]:
            errors.append({"video_id": video_id, "error": "wrong_batch_id"})
        for item in record["artifacts"]:
            path = Path(record["artifact_root"]) / item["path"]
            if not path.is_file():
                errors.append({"path": str(path), "error": "missing_artifact"})
                continue
            data = path.read_bytes()
            if len(data) != item["bytes"] or hashlib.sha256(data).hexdigest() != item["sha256"]:
                errors.append({"path": str(path), "error": "size_or_hash_mismatch"})
            artifacts.append({"video_id": video_id, "path": str(path.relative_to(ROOT)),
                              "bytes": len(data), "sha256": item["sha256"]})
    for video_id, flags in baseline["study_flags_before"].items():
        if video_id not in canonical:
            errors.append({"video_id": video_id, "error": "previously_acquired_video_missing"})
            continue
        for flag, value in flags.items():
            if value and not canonical[video_id].get(flag):
                errors.append({"video_id": video_id, "error": "canonical_study_flag_regressed", "flag": flag})
    if queue["video_ids"] != [row["video_id"] for row in ranks]:
        errors.append({"error": "priority_index_disagrees_with_queue"})
    if len(set(queue["video_ids"])) != len(queue["video_ids"]):
        errors.append({"error": "duplicate_id_in_queue"})
    current_inventory = {row["id"] for row in read_lines(ROOT / "video-inventory/videos.jsonl")}
    attempts = [row for row in read_lines(HERE / "attempts.jsonl") if row.get("batch_id") == checkpoint["batch_id"]]
    pauses = [(datetime.fromisoformat(after["started_at"]) - datetime.fromisoformat(before["finished_at"])).total_seconds()
              for before, after in zip(attempts, attempts[1:])]
    minimum_pause = min(pauses) if pauses else None
    if minimum_pause is not None and minimum_pause < 20:
        errors.append({"error": "inter_id_pause_below_20_seconds", "seconds": minimum_pause})
    index = checkpoint.get("next_queue_index")
    if index is not None and queue["video_ids"][index] != checkpoint.get("next_video_id"):
        errors.append({"error": "checkpoint_position_disagrees_with_queue"})
    result = {"validated_at": datetime.now(timezone.utc).isoformat(), "scope": checkpoint["scope"],
              "batch_id": checkpoint["batch_id"], "batch_status": checkpoint["status"],
              "new_videos": len(checkpoint["new_exported_video_ids"]), "artifacts_checked": len(artifacts),
              "artifact_bytes": sum(a["bytes"] for a in artifacts), "preserved_baseline_videos": baseline["video_count"],
              "minimum_inter_id_pause_seconds": minimum_pause,
              "canonical_flags_regressed": any(e["error"] == "canonical_study_flag_regressed" for e in errors),
              "canonical_manifest_bytes_unchanged": hashlib.sha256(canonical_bytes).hexdigest() == baseline["canonical_sha256_before"],
              "queue_snapshot_ids": len(queue["video_ids"]),
              "new_inventory_ids_not_yet_in_snapshot": sorted(current_inventory - set(queue["video_ids"])),
              "next_queue_index": index, "next_video_id": checkpoint.get("next_video_id"),
              "remaining_unexported_in_snapshot": checkpoint["remaining_unexported_in_snapshot"],
              "errors": errors, "entire_corpus_complete": False,
              "validation_scope": "Files, hashes, queue/checkpoint consistency and non-regression of previously true canonical study flags; no speech or audiovisual verification."}
    if checkpoint["status"] not in ("planned", "running"):
        result["archived_checkpoint_path"] = archive_historical_checkpoint(checkpoint)
    (HERE / "historical-validation.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
    (HERE / "historical-batch-artifacts.json").write_text(json.dumps({"batch_id": checkpoint["batch_id"], "artifacts": artifacts}, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps(result, ensure_ascii=False))
    raise SystemExit(bool(errors))


if __name__ == "__main__":
    main()
