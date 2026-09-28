#!/usr/bin/env python3
"""Validate every acquired caption against its versioned evidence record."""
import hashlib
import json
from pathlib import Path

from collect_tracks import ROOT, HERE, ARTIFACTS, MANIFEST, read_lines, validate_json3, derive_cue_text, now, write_json


def verify_reference(item, root=ROOT):
    path = root / item["path"]
    if not path.is_file():
        return [{"path": item["path"], "error": "missing_referenced_artifact"}]
    data = path.read_bytes()
    if len(data) != item["bytes"] or hashlib.sha256(data).hexdigest() != item["sha256"]:
        return [{"path": item["path"], "error": "referenced_size_or_sha256_mismatch"}]
    return []


def verify_record(record):
    errors, checked, pairs = [], 0, 0
    root = Path(record.get("artifact_root", ARTIFACTS))
    originals, derived = {}, []
    for item in record["artifacts"]:
        path = root / item["path"]
        if not path.is_file():
            errors.append({"path": str(path), "error": "missing"})
            continue
        data = path.read_bytes()
        checked += 1
        digest = hashlib.sha256(data).hexdigest()
        if len(data) != item["bytes"] or digest != item["sha256"]:
            errors.append({"path": str(path), "error": "size_or_sha256_mismatch"})
        if item["format"] == "youtube_json3":
            try:
                cues = validate_json3(data)
                originals[digest] = derive_cue_text(cues)
                if len(cues) != item["cue_count"]:
                    errors.append({"path": str(path), "error": "cue_count_mismatch"})
            except Exception as exc:
                errors.append({"path": str(path), "error": str(exc)})
        elif item["format"] == "derived_cue_text":
            derived.append((item, path, data))
    for item, path, data in derived:
        original = originals.get(item.get("derived_from_sha256"))
        if original is None:
            errors.append({"path": str(path), "error": "missing_or_mismatched_derivation_source"})
        elif original != data:
            errors.append({"path": str(path), "error": "txt_differs_from_full_json3_cues"})
        else:
            pairs += 1
    if not originals or not derived:
        errors.append({"video_id": record["video_id"], "error": "missing_original_or_derived_caption"})
    for flag in ("full_transcript_read", "full_video_watched", "full_source_analyzed", "full_speech_coverage_verified"):
        if record.get(flag):
            errors.append({"video_id": record["video_id"], "error": "acquisition_only_record_incorrectly_promoted", "flag": flag})
    return errors, checked, pairs


def main():
    records = read_lines(MANIFEST)
    errors = []
    checked, pairs = 0, 0
    for record in records:
        record_errors, record_checked, record_pairs = verify_record(record)
        errors.extend(record_errors)
        checked += record_checked
        pairs += record_pairs
    snapshots = 0
    for path in sorted((HERE / "batches").glob("*.json")):
        checkpoint = json.loads(path.read_text())
        if "queue_snapshot_artifact" not in checkpoint:
            continue
        for key in ("queue_snapshot_artifact", "baseline_artifact"):
            if checkpoint.get(key):
                errors.extend(verify_reference(checkpoint[key]))
                snapshots += 1
    metadata_checked = 0
    for metadata in read_lines(HERE / "triage-metadata.jsonl"):
        item = metadata["artifact"]
        path = ARTIFACTS / item["path"]
        if not path.is_file():
            errors.append({"path": str(path), "error": "missing_metadata_artifact"})
            continue
        data = path.read_bytes()
        metadata_checked += 1
        if len(data) != item["bytes"] or hashlib.sha256(data).hexdigest() != item["sha256"]:
            errors.append({"path": str(path), "error": "metadata_size_or_sha256_mismatch"})
    result = {"validated_at": now(), "videos_checked": len(records),
              "caption_artifacts_checked": checked, "derived_pairs_checked": pairs,
              "snapshot_references_checked": snapshots,
              "metadata_artifacts_checked": metadata_checked, "errors": errors,
              "validation_scope": "Existence, byte count, SHA-256, JSON3 cue count, full TXT derivation and archived queue/baseline hashes; no speech or audiovisual verification."}
    write_json(HERE / "validation.json", result)
    print(json.dumps(result, ensure_ascii=False))
    raise SystemExit(bool(errors))


if __name__ == "__main__":
    main()
