#!/usr/bin/env python3
"""Resumable anonymous caption acquisition of explicitly curated videos.

The inventory is retained for discovery; it is not the active acquisition queue.
This collector owns only acquisition/
and newly named aq.* files under transcripts/local/. Existing ledgers remain
untouched. An exported track is not verified speech coverage or source study.
"""
import argparse
import hashlib
import json
import re
import time
from collections import Counter, deque
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HERE = ROOT / "acquisition"
ARTIFACTS = ROOT / "transcripts" / "local"
MANIFEST = HERE / "manifest.jsonl"
ATTEMPTS = HERE / "attempts.jsonl"
STATE = HERE / "state.json"
TIMING_NOTE = ("Caption timing bounds do not prove every spoken word was captured. "
               "The whole returned caption track was exported; audiovisual and speech "
               "completeness verification remain pending.")


def now():
    return datetime.now(timezone.utc).isoformat()


def read_lines(path):
    return [json.loads(line) for line in path.read_text().splitlines() if line.strip()] if path.exists() else []


def append(path, obj):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a") as out:
        out.write(json.dumps(obj, ensure_ascii=False, sort_keys=True) + "\n")
        out.flush()


def write_json(path, obj):
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(json.dumps(obj, ensure_ascii=False, sort_keys=True, indent=2) + "\n")
    tmp.replace(path)


def artifact(path, data, **fields):
    # Names contain the video ID, language, and content hash to avoid replacing
    # any earlier export, even when YouTube later edits a caption track.
    digest = hashlib.sha256(data).hexdigest()
    final = path.with_name(path.stem + "." + digest[:12] + path.suffix)
    if final.exists() and final.read_bytes() != data:
        raise ValueError("Artifact name collision")
    final.write_bytes(data)
    return {"path": str(final.relative_to(ARTIFACTS)), "bytes": len(data),
            "sha256": digest, "collected_at": now(), **fields}


def timestamp(seconds):
    ms = round(seconds * 1000)
    return f"{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d}.{ms % 1000:03d}"


def validate_json3(data):
    doc = json.loads(data)
    cues = []
    for event in doc.get("events", []):
        text = "".join(seg.get("utf8", "") for seg in event.get("segs", []))
        if not text.strip():
            continue
        start = event["tStartMs"] / 1000
        end = (event["tStartMs"] + event["dDurationMs"]) / 1000 if "dDurationMs" in event else None
        cues.append((start, end, text))
    if not cues:
        raise ValueError("Returned JSON3 contains no text cues")
    return cues


def build_queue():
    rows = read_lines(ROOT / "video-inventory" / "videos.jsonl")
    sources = ["riley-brown-youtube", "designcourse-youtube", "openai-learn-codex",
               "claude-academy", "peter-yang-youtube", "tech-with-tim-youtube",
               "nate-herk-youtube", "builder-blog"]
    pools = {s: deque(sorted([r for r in rows if s in r["source_ids"]], key=lambda r: r["id"])) for s in sources}
    queue, seen = [], set()

    def add(row):
        if row["id"] not in seen:
            queue.append(row)
            seen.add(row["id"])

    # First give both currently uncovered channels one long-form acquisition.
    # This only orders the backlog; no date or duration filter removes an ID.
    for source in sources[:2]:
        match = next((r for r in pools[source] if (r.get("duration_seconds") or 0) >= 180), None)
        if match:
            add(match)
    for source in sources[2:4]:
        for row in pools[source]:
            add(row)
    while any(pools.values()):
        for source in sources:
            if pools[source]:
                add(pools[source].popleft())
    for row in sorted(rows, key=lambda r: r["id"]):
        add(row)
    write_json(HERE / "queue.json", {"generated_at": now(), "inventory_total": len(rows),
                "queue_total": len(queue), "ordering": "First long-form Riley and DesignCourse; official Codex/Academy; interleaved ID order across complete channel history.",
                "video_ids": [r["id"] for r in queue]})
    return queue


def existing_exported():
    own = {r["video_id"] for r in read_lines(MANIFEST) if r.get("status") == "exported_track"}
    canonical_path = ROOT / "transcripts" / "manifest.json"
    canonical = json.loads(canonical_path.read_text()) if canonical_path.exists() else {}
    own.update(r["video_id"] for r in canonical.get("videos", []) if r.get("status") in ("exported_track", "full_verified"))
    return own


def choose_track(info):
    # Authored English first; otherwise the original automatic track. The
    # suffix 'orig' is yt-dlp's original language flag, not a separate language.
    for field, origin in (("subtitles", "authored-or-unspecified"), ("automatic_captions", "automatic")):
        tracks = info.get(field) or {}
        languages = sorted(tracks, key=lambda lang: (0 if lang in ("en", "en-orig") else 1 if lang.startswith("en-") else 2 if lang.endswith("-orig") else 3, lang))
        for lang in languages:
            entries = tracks[lang]
            # translated_subs are skipped by yt-dlp; reject an explicit
            # translation parameter as a second check.
            entry = next((t for t in entries if t.get("ext") == "json3" and "tlang=" not in t.get("url", "")), None)
            if entry:
                return lang, origin, entry
    return None


def classify_error(error):
    message = str(error)
    lower = message.lower()
    if "429" in message or "too many requests" in lower:
        return "rate_limited", 429, 3600
    if any(x in lower for x in ("sign in", "sign-in", "not a bot", "login required")):
        return "access_challenge", None, 86400
    if "private video" in lower:
        return "private", None, 604800
    if "removed" in lower or "video unavailable" in lower:
        return "unavailable", None, 604800
    if "failed to resolve" in lower:
        return "network_dns_failure", None, 300
    return "temporary_failure", None, 3600


def acquire(row):
    import yt_dlp
    from yt_dlp.version import __version__
    logs = []

    class Logger:
        def debug(self, msg):
            pass
        def info(self, msg):
            pass
        def warning(self, msg):
            logs.append({"level": "warning", "message": msg})
        def error(self, msg):
            logs.append({"level": "error", "message": msg})

    attempt = {"video_id": row["id"], "url": row["url"], "source_ids": row["source_ids"],
               "started_at": now(), "method": "yt-dlp_json3", "tool_version": __version__,
               "authentication": "anonymous; no cookies, proxies, or identity switching"}
    try:
        opts = {"quiet": True, "skip_download": True, "cachedir": False,
                "socket_timeout": 20, "retries": 0, "extractor_retries": 0,
                "logger": Logger(), "ignore_no_formats_error": True,
                "extractor_args": {"youtube": {"skip": ["hls", "dash", "translated_subs"]}}}
        with yt_dlp.YoutubeDL(opts) as ydl:
            info = ydl.extract_info(row["url"], download=False)
            selected = choose_track(info)
            available = {field: sorted((info.get(field) or {}).keys()) for field in ("subtitles", "automatic_captions")}
            meta = {k: info.get(k) for k in ("id", "title", "duration", "upload_date", "release_timestamp", "channel_id", "channel", "availability", "live_status", "language")}
            attempt.update(metadata=meta, available_languages=available)
            if not selected:
                attempt.update(result="no_accessible_original_track", pending_reason="No original JSON3 caption track returned by this method; native Browser review remains pending.",
                               next_action="Check native YouTube transcript panel; do not infer that no transcript exists.",
                               next_retry_at=(datetime.now(timezone.utc) + timedelta(days=7)).isoformat())
                return attempt
            language, origin, track = selected
            with ydl.urlopen(track["url"]) as response:
                data = response.read()
            cues = validate_json3(data)
        language = language.removesuffix("-orig")
        safe_lang = re.sub(r"[^A-Za-z0-9_-]", "_", language)
        timing = {"cue_count": len(cues), "first_cue_start_seconds": min(c[0] for c in cues),
                  "last_cue_start_seconds": max(c[0] for c in cues),
                  "last_cue_end_seconds": max((c[1] for c in cues if c[1] is not None), default=None),
                  "timing_note": TIMING_NOTE}
        common = {"language": language, "caption_origin": origin, "track_export_complete": True,
                  "acquisition": "yt-dlp anonymous public captions; original JSON3 response", **timing}
        raw = artifact(ARTIFACTS / f"aq.{row['id']}.{safe_lang}.json3", data, format="youtube_json3", **common)
        # This derived TXT preserves every returned text event, including
        # possible automatic-caption overlaps; JSON3 is the source of truth.
        text = "\n".join(f"[{timestamp(start)} --> {timestamp(end) if end is not None else '?'}] {value}" for start, end, value in cues) + "\n"
        readable = artifact(ARTIFACTS / f"aq.{row['id']}.{safe_lang}.txt", text.encode(), format="derived_cue_text", derived_from_sha256=raw["sha256"], **common)
        upload = info.get("upload_date")
        published = f"{upload[:4]}-{upload[4:6]}-{upload[6:8]}" if upload and len(upload) == 8 else None
        duration = info.get("duration") or row.get("duration_seconds")
        record = {"schema_version": 1, "video_id": row["id"], "source_ids": row["source_ids"],
                  "url": row["url"], "title": info.get("title") or row["title"],
                  "published_at": published, "date_provenance": "yt-dlp public watch metadata" if published else "unknown",
                  "duration_seconds": duration, "duration_provenance": "yt-dlp public watch metadata" if info.get("duration") else "inventory",
                  "collected_at": now(), "status": "exported_track", "artifact_root": str(ARTIFACTS),
                  "artifacts": [raw, readable], "available_languages": available,
                  "pending_reason": "speech_completeness_and_caption_accuracy_not_yet_verified",
                  "next_action": "Read full track and verify material audiovisual demonstrations and speech coverage.",
                  "full_video_watched": False, "full_transcript_read": False,
                  "full_speech_coverage_verified": False, "full_source_analyzed": False,
                  "study_status": "not_started"}
        if duration and timing["last_cue_end_seconds"] is not None:
            record["caption_end_vs_video_seconds"] = round(timing["last_cue_end_seconds"] - duration, 3)
        append(MANIFEST, record)
        attempt.update(result="exported_track", language=language, caption_origin=origin,
                       artifact_paths=[r["path"] for r in record["artifacts"]], cue_count=len(cues))
    except Exception as exc:
        result, http, delay = classify_error(exc)
        attempt.update(result=result, error=str(exc), http_status=http,
                       next_retry_at=(datetime.now(timezone.utc) + timedelta(seconds=delay)).isoformat(),
                       next_action="Resume after recorded cooldown; retain same anonymous method. No cookies/proxies/identity workarounds.")
    finally:
        attempt.update(finished_at=now(), log=logs)
        append(ATTEMPTS, attempt)
    return attempt


def report():
    records = read_lines(MANIFEST)
    attempts = read_lines(ATTEMPTS)
    queue = json.loads((HERE / "queue.json").read_text()) if (HERE / "queue.json").exists() else {}
    curation = json.loads((HERE / "curation.json").read_text()) if (HERE / "curation.json").exists() else {}
    selected = {c["video_id"] for c in curation.get("candidates", []) if c.get("selected")}
    selected_exported = selected & existing_exported()
    report = {"generated_at": now(), "exported_videos": len({r["video_id"] for r in records}),
              "source_counts": dict(Counter(s for r in records for s in r["source_ids"])),
              "artifact_count": sum(len(r["artifacts"]) for r in records),
              "artifact_bytes": sum(a["bytes"] for r in records for a in r["artifacts"]),
              "known_video_duration_seconds": sum(r.get("duration_seconds") or 0 for r in records),
              "queue_snapshot_total": queue.get("queue_total"),
              "queue_snapshot_generated_at": queue.get("generated_at"),
              "general_historical_queue_active": False,
              "curated_videos_selected_for_study": len(selected),
              "curated_videos_with_exported_track": len(selected_exported),
              "curated_videos_pending_acquisition": sorted(selected - selected_exported),
              "attempt_results": dict(Counter(a["result"] for a in attempts)),
              "full_source_analyzed": 0, "speech_coverage_verified": 0,
              "scope_note": "Acquisition evidence only. The active scope is explicit curation; the historical inventory is preserved for discovery, not an active download target."}
    write_json(HERE / "coverage.json", report)
    return report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--max-videos", type=int, default=40)
    parser.add_argument("--pause-seconds", type=float, default=20)
    parser.add_argument("--ids", nargs="*", help="Acquire only these explicitly selected IDs; never resume the full inventory")
    parser.add_argument("--report-only", action="store_true")
    args = parser.parse_args()
    HERE.mkdir(parents=True, exist_ok=True)
    ARTIFACTS.mkdir(parents=True, exist_ok=True)
    if args.report_only:
        print(json.dumps(report(), ensure_ascii=False), flush=True)
        return
    state = json.loads(STATE.read_text()) if STATE.exists() else {}
    if state.get("cooldown_until") and datetime.fromisoformat(state["cooldown_until"]) > datetime.now(timezone.utc):
        print(json.dumps({"status": "cooldown_active", **state}), flush=True)
        return
    queue = build_queue()
    if args.ids:
        order = {value: index for index, value in enumerate(args.ids)}
        queue = sorted([row for row in queue if row["id"] in order], key=lambda row: order[row["id"]])
    else:
        curation_path = HERE / "curation.json"
        if not curation_path.exists():
            raise SystemExit("General backlog is inactive. Create curation.json or provide explicit selected --ids.")
        curated = json.loads(curation_path.read_text())
        selected = [item["video_id"] for item in curated.get("candidates", [])
                    if item.get("selected") and item.get("acquisition_action") == "acquire_selected"]
        order = {value: index for index, value in enumerate(selected)}
        queue = sorted([row for row in queue if row["id"] in order], key=lambda row: order[row["id"]])
    write_json(HERE / "active-selection.json", {"generated_at": now(), "scope": "explicit_curated_selection_only",
                "selection_total": len(queue), "video_ids": [row["id"] for row in queue]})
    exported = existing_exported()
    latest = {r["video_id"]: r for r in read_lines(ATTEMPTS)}
    count = 0
    for row in queue:
        if row["id"] in exported:
            continue
        earlier = latest.get(row["id"], {})
        if earlier.get("next_retry_at") and datetime.fromisoformat(earlier["next_retry_at"]) > datetime.now(timezone.utc):
            continue
        if count >= args.max_videos:
            break
        result = acquire(row)
        count += 1
        print(json.dumps({k: result.get(k) for k in ("video_id", "result", "language", "cue_count", "error")}, ensure_ascii=False), flush=True)
        report()
        if result["result"] in ("rate_limited", "access_challenge", "network_dns_failure"):
            write_json(STATE, {"stopped_at": now(), "reason": result["result"], "video_id": row["id"], "cooldown_until": result["next_retry_at"],
                              "policy": "Stop batch. Resume after cooldown; no cookies/proxies/identity switching."})
            break
        write_json(STATE, {"updated_at": now(), "last_video_id": row["id"], "last_result": result["result"]})
        if count < args.max_videos and row is not queue[-1]:
            time.sleep(max(args.pause_seconds, 10))
    print(json.dumps(report(), ensure_ascii=False), flush=True)


if __name__ == "__main__":
    main()
