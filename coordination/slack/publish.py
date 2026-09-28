#!/usr/bin/env python3
"""Publish a reviewed product milestone as Diretor — Produto, without scheduling."""
import argparse
import hashlib
import json
import os
import re
from datetime import datetime, timezone
from pathlib import Path
import urllib.error
import urllib.parse
import urllib.request


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("event", help="Unique, descriptive milestone ID")
    parser.add_argument("message", type=Path, help="Reviewed Slack mrkdwn text file")
    parser.add_argument("--thread-ts", help="Verified parent message timestamp in #management")
    args = parser.parse_args()
    if args.thread_ts and not re.fullmatch(r"[0-9]+\.[0-9]{6}", args.thread_ts):
        parser.error("Thread timestamp must be a verified Slack message ID")
    root = Path(__file__).resolve().parents[2]
    text = args.message.read_text().strip()
    if not text or len(text) > 4000:
        parser.error("Message must contain 1–4000 characters")
    if any(mention in text for mention in ("@channel", "@here", "<!channel", "<!here", "<!everyone")):
        parser.error("Broadcast mentions are outside this publisher's scope")
    digest = hashlib.sha256(text.encode()).hexdigest()
    ledger = root / "coordination/slack/publications.jsonl"
    lock = root / ".env.slack-bot.lock"
    try:
        lock_fd = os.open(lock, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    except FileExistsError:
        parser.error("Publisher locked; inspect the channel and ledger before recovery")
    try:
        records = [json.loads(line) for line in ledger.read_text().splitlines()] if ledger.exists() else []
        if any((r["event"] == args.event or r["sha256"] == digest) and r["status"] != "verified_not_delivered" for r in records):
            parser.error("Event/text already recorded; verify Slack before any retry")
        env = dict(line.split("=", 1) for line in (root / ".env.slack-bot").read_text().splitlines() if "=" in line)
        url = env["GANESHA_SLACK_WEBHOOK_URL"]
        parsed = urllib.parse.urlsplit(url)
        if parsed.scheme != "https" or parsed.netloc != "hooks.slack.com" or not parsed.path.startswith("/services/T0C4LM9QGJK/") or parsed.query or parsed.fragment:
            parser.error("Unexpected webhook destination")
        record = {
            "event": args.event, "sha256": digest, "text": text,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "workspace_id": "T0C4LM9QGJK", "channel_id": "C0C56JD9G20",
            "app_id": "A0C555FGZCZ", "identity": "Diretor — Produto",
            "status": "attempt_started",
        }
        if args.thread_ts:
            record["thread_ts"] = args.thread_ts

        def save():
            ledger.write_text("".join(json.dumps(r, ensure_ascii=False) + "\n" for r in records))

        records.append(record)
        save()
        payload = {"text": text, "unfurl_links": False, "unfurl_media": False}
        if args.thread_ts:
            payload["thread_ts"] = args.thread_ts
        request = urllib.request.Request(url, data=json.dumps(payload).encode(), headers={"Content-Type": "application/json"}, method="POST")
        try:
            with urllib.request.build_opener(NoRedirect).open(request, timeout=25) as response:
                accepted = response.status == 200 and response.read(100).strip() == b"ok"
            record["status"] = "accepted_pending_channel_verification" if accepted else "uncertain"
        except Exception as error:
            record["status"] = "uncertain"
            record["error_type"] = type(error).__name__
            save()
            raise SystemExit("Delivery uncertain. Read #management before retrying; no automatic retry was made.") from None
        save()
        print(record["status"])
        if not accepted:
            raise SystemExit(1)
    finally:
        os.close(lock_fd)
        lock.unlink()


if __name__ == "__main__":
    main()
