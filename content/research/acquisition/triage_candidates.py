#!/usr/bin/env python3
"""Fetch public title/description/date for an explicit, small curation shortlist."""
import json
import sys
import time
from datetime import datetime, timedelta, timezone

import yt_dlp
from collect_tracks import HERE, ARTIFACTS, STATE, append, artifact, classify_error, now, write_json


def main():
    ids = [value for value in sys.argv[1:] if value != "--"]
    if not ids:
        raise SystemExit("Provide the explicit shortlist; no inventory-wide mode exists.")
    state = json.loads(STATE.read_text()) if STATE.exists() else {}
    if state.get("cooldown_until") and datetime.fromisoformat(state["cooldown_until"]) > datetime.now(timezone.utc):
        raise SystemExit("Global anonymous acquisition cooldown is active.")
    for index, video_id in enumerate(ids):
        attempt = {"video_id": video_id, "method": "yt-dlp_public_metadata_only", "started_at": now(),
                   "purpose": "Curation for nontechnical people building sites, simple apps, and practical automations."}
        try:
            with yt_dlp.YoutubeDL({"quiet": True, "skip_download": True, "cachedir": False,
                                  "socket_timeout": 20, "retries": 0, "extractor_retries": 0,
                                  "ignore_no_formats_error": True,
                                  "extractor_args": {"youtube": {"skip": ["hls", "dash", "translated_subs"]}}}) as ydl:
                info = ydl.extract_info("https://www.youtube.com/watch?v=" + video_id, download=False)
            fields = {key: info.get(key) for key in ("id", "title", "description", "upload_date", "duration", "channel", "chapters", "webpage_url", "language")}
            data = json.dumps(fields, ensure_ascii=False, sort_keys=True, indent=2).encode() + b"\n"
            saved = artifact(ARTIFACTS / f"aq.{video_id}.triage.json", data, format="youtube_watch_metadata", acquisition="yt-dlp public metadata only")
            attempt.update(result="metadata_collected", artifact=saved)
            append(HERE / "triage-metadata.jsonl", attempt)
            print(json.dumps({**{key: fields[key] for key in ("id", "title", "upload_date", "duration", "chapters")},
                              "description": (fields["description"] or "")[:6000]}, ensure_ascii=False), flush=True)
        except Exception as exc:
            reason, http, delay = classify_error(exc)
            attempt.update(result=reason, error=str(exc), http_status=http)
            if reason in ("rate_limited", "access_challenge", "network_dns_failure"):
                write_json(STATE, {"stopped_at": now(), "reason": reason, "video_id": video_id,
                                  "cooldown_until": (datetime.now(timezone.utc) + timedelta(seconds=delay)).isoformat()})
                break
        finally:
            attempt["finished_at"] = now()
            append(HERE / "attempts.jsonl", attempt)
        if index + 1 < len(ids):
            time.sleep(20)


if __name__ == "__main__":
    main()
