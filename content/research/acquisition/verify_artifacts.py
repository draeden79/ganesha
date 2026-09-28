#!/usr/bin/env python3
"""Validate every acquired caption against its versioned evidence record."""
import hashlib
import json
from pathlib import Path

from collect_tracks import HERE, ARTIFACTS, MANIFEST, read_lines, validate_json3, now, write_json


def main():
    records = read_lines(MANIFEST)
    errors = []
    checked = 0
    for record in records:
        for item in record["artifacts"]:
            path = Path(record.get("artifact_root", ARTIFACTS)) / item["path"]
            if not path.is_file():
                errors.append({"path": str(path), "error": "missing"})
                continue
            data = path.read_bytes()
            checked += 1
            if len(data) != item["bytes"] or hashlib.sha256(data).hexdigest() != item["sha256"]:
                errors.append({"path": str(path), "error": "size_or_sha256_mismatch"})
            if item["format"] == "youtube_json3":
                try:
                    cues = validate_json3(data)
                    if len(cues) != item["cue_count"]:
                        errors.append({"path": str(path), "error": "cue_count_mismatch"})
                except Exception as exc:
                    errors.append({"path": str(path), "error": str(exc)})
            if record.get("full_source_analyzed") or record.get("full_speech_coverage_verified"):
                errors.append({"video_id": record["video_id"], "error": "acquisition_only_record_incorrectly_promoted"})
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
              "caption_artifacts_checked": checked, "metadata_artifacts_checked": metadata_checked, "errors": errors,
              "validation_scope": "Existence, byte count, SHA-256 and original JSON3 cue count; no speech or audiovisual verification."}
    write_json(HERE / "validation.json", result)
    print(json.dumps(result, ensure_ascii=False))
    raise SystemExit(bool(errors))


if __name__ == "__main__":
    main()
