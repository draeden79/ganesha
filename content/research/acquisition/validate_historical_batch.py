#!/usr/bin/env python3
"""Validate real batch files, complete queue indexing, and preserved study flags."""
import argparse
import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path
from collect_tracks import archive_historical_checkpoint
from verify_artifacts import verify_reference, verify_record

ROOT = Path(__file__).resolve().parents[1]
HERE = ROOT / "acquisition"


def read_lines(path):
    return [json.loads(line) for line in path.read_text().splitlines() if line.strip()]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--batch-id", help="Validate an archived batch and its own immutable queue/baseline")
    args = parser.parse_args()
    checkpoint_path = HERE / "batches" / (args.batch_id + ".json") if args.batch_id else HERE / "historical-checkpoint.json"
    checkpoint = json.loads(checkpoint_path.read_text())
    archived_path = HERE / "batches" / (checkpoint["batch_id"] + ".json")
    archived = json.loads(archived_path.read_text()) if archived_path.exists() else {}
    queue_reference = checkpoint.get("queue_snapshot_artifact") or archived.get("queue_snapshot_artifact")
    baseline_reference = checkpoint.get("baseline_artifact")
    baseline_path = ROOT / baseline_reference["path"] if baseline_reference else HERE / "historical-baseline.json"
    baseline = json.loads(baseline_path.read_text())
    queue_path = ROOT / queue_reference["path"] if queue_reference else HERE / "historical-queue.json"
    queue = json.loads(queue_path.read_text())
    records = {row["video_id"]: row for row in read_lines(HERE / "manifest.jsonl")}
    canonical_path = ROOT / baseline["canonical_path"]
    canonical_bytes = canonical_path.read_bytes()
    canonical = {row["video_id"]: row for row in json.loads(canonical_bytes)["videos"]}
    errors, artifacts = [], []
    for reference in (queue_reference, baseline_reference):
        if reference:
            errors.extend(verify_reference(reference))
    if baseline_reference and baseline.get("batch_id") != checkpoint["batch_id"]:
        errors.append({"error": "baseline_belongs_to_another_batch"})
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
        record_errors, _, _ = verify_record(record)
        errors.extend(record_errors)
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
    if not args.batch_id:
        ranks = read_lines(HERE / "historical-priority.jsonl")
        if queue["video_ids"] != [row["video_id"] for row in ranks]:
            errors.append({"error": "priority_index_disagrees_with_queue"})
    if len(set(queue["video_ids"])) != len(queue["video_ids"]):
        errors.append({"error": "duplicate_id_in_queue"})
    current_inventory = {row["id"] for row in read_lines(ROOT / "video-inventory/videos.jsonl")}
    all_attempts = read_lines(HERE / "attempts.jsonl")
    attempts = [row for row in all_attempts if row.get("batch_id") == checkpoint["batch_id"]]
    pauses = []
    first_pause = None
    for index, after in enumerate(all_attempts):
        if after.get("batch_id") != checkpoint["batch_id"] or index == 0:
            continue
        before = all_attempts[index - 1]
        pause = (datetime.fromisoformat(after["started_at"]) - datetime.fromisoformat(before["finished_at"])).total_seconds()
        pauses.append(pause)
        if after is attempts[0]:
            first_pause = pause
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
              "first_attempt_pause_from_previous_process_seconds": first_pause,
              "batch_specific_baseline": bool(baseline_reference),
              "baseline_path": str(baseline_path.relative_to(ROOT)),
              "archived_queue_hash_verified": bool(queue_reference) and not verify_reference(queue_reference),
              "canonical_flags_regressed": any(e["error"] == "canonical_study_flag_regressed" for e in errors),
              "canonical_manifest_bytes_unchanged": hashlib.sha256(canonical_bytes).hexdigest() == baseline["canonical_sha256_before"],
              "queue_snapshot_ids": len(queue["video_ids"]),
              "new_inventory_ids_not_yet_in_snapshot": sorted(current_inventory - set(queue["video_ids"])),
              "next_queue_index": index, "next_video_id": checkpoint.get("next_video_id"),
              "remaining_unexported_in_snapshot": checkpoint["remaining_unexported_in_snapshot"],
              "errors": errors, "entire_corpus_complete": False,
              "validation_scope": "Files, hashes, full TXT/JSON3 derivation, archived snapshot hashes, cross-process pause, queue/checkpoint consistency and batch-specific canonical flags; no speech or audiovisual verification."}
    if not args.batch_id and checkpoint["status"] not in ("planned", "running"):
        result["archived_checkpoint_path"] = archive_historical_checkpoint(checkpoint)
    artifact_result = {"batch_id": checkpoint["batch_id"], "artifacts": artifacts}
    for suffix, document in (("validation", result), ("artifacts", artifact_result)):
        (HERE / "batches" / (checkpoint["batch_id"] + "." + suffix + ".json")).write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n")
    if not args.batch_id:
        (HERE / "historical-validation.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
        (HERE / "historical-batch-artifacts.json").write_text(json.dumps(artifact_result, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps(result, ensure_ascii=False))
    raise SystemExit(bool(errors))


if __name__ == "__main__":
    main()
