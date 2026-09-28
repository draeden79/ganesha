"""Build canonical curriculum from reviewed structure and locale source messages.

No translation or fallback occurs here. Run from any working directory.
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
VERSION = "0.1.0"
LOCALES = ["pt-BR", "en", "es", "fr", "de", "ja", "hi", "id", "ar", "ko", "zh-CN"]
COURSE_ID = "course.first-site"

def block(identifier, key, kind="paragraph"):
    return {"id": identifier, "kind": kind, "textKey": key}

def variant(tool, step):
    return {"blocks": [block(f"block.{step}.{tool}", f"tool.{tool}")], "evidenceIds": []}

def step(short, kind, competencies, mode="concept"):
    prefix = f"s{short}"
    identifier = f"step.first-request.{short}"
    return {
        "id": identifier, "kind": kind, "isAssessment": kind == "check",
        "titleKey": f"{prefix}.title", "objectiveKey": f"{prefix}.objective",
        "actionKey": f"{prefix}.action", "expectedResultKey": f"{prefix}.expected",
        "hintKeys": [f"{prefix}.hint1", f"{prefix}.hint2"],
        "criteriaKeys": [f"{prefix}.criterion"], "executionMode": mode,
        "blocks": [block(f"block.{short}.body", f"{prefix}.body")],
        "competencyIds": competencies, "evidenceIds": [],
        "toolVariants": {tool: variant(tool, short) for tool in ["claude", "codex"]},
        "visual": {"kind": "text-cards", "altKey": f"{prefix}.visual"},
    }

def exercise(s, mode, rubric):
    short = s["id"].split(".")[-1]
    s["exercise"] = {"id": f"exercise.{short}", "mode": mode,
        "promptKey": f"s{short}.action", "deliverableKey": f"s{short}.expected", "rubricId": rubric}

def check(s, prefix, correct):
    s["check"] = {"id": f"check.{prefix}", "kind": "single-choice",
        "questionKey": f"{prefix}.question", "competencyIds": s["competencyIds"],
        "successFeedbackKey": f"{prefix}.success", "retryFeedbackKey": f"{prefix}.retry", "required": True,
        "options": [{"id": f"option.{prefix}.{x}", "labelKey": f"{prefix}.{x}", "feedbackKey": f"{prefix}.{x}.feedback"} for x in ["a", "b", "c"]],
        "correctOptionIds": [f"option.{prefix}.{correct}"]}

competencies = [
    {"id": f"competency.{key}", "titleKey": f"competency.{key}", "outcomeKey": f"competency.{key}.outcome", "prerequisiteIds": prereqs, "evidenceIds": []}
    for key, prereqs in [("scope", []), ("context", ["competency.scope"]), ("evidence", ["competency.context"]), ("repair", ["competency.evidence"]), ("transfer", ["competency.context"])]
]
steps = [
    step("scope", "explain", ["competency.scope"]),
    step("brief", "practice", ["competency.scope", "competency.context"], "guided-simulation"),
    step("request-check", "check", ["competency.context"], "guided-simulation"),
    step("run", "practice", ["competency.context", "competency.evidence"], "external-real-task"),
    step("evidence-check", "check", ["competency.evidence"], "guided-simulation"),
    step("repair", "practice", ["competency.repair"], "guided-simulation"),
    step("transfer", "reflect", ["competency.transfer"], "guided-simulation"),
]
exercise(steps[1], "simulated", "rubric.request")
exercise(steps[3], "local-user", "rubric.execution")
exercise(steps[5], "simulated", "rubric.repair")
exercise(steps[6], "simulated", "rubric.transfer")
steps[1]["blocks"].append(block("block.brief.example", "example.request", "callout"))
steps[3]["blocks"].append(block("block.run.example", "example.request", "callout"))
steps[3]["blocks"].append(block("block.run.self-report", "notice.self-report", "callout"))
steps[5]["blocks"].append(block("block.repair.scenario", "example.failure", "callout"))
check(steps[2], "check.request", "b")
check(steps[4], "check.evidence", "c")

rubrics = []
for name, criteria in {"request": ["outcome", "context", "limit", "test"], "execution": ["location", "record"], "repair": ["observed", "expected", "reproduce", "retest"], "transfer": ["preserve", "adapt"]}.items():
    rubrics.append({"id": f"rubric.{name}", "criteria": [
        {"id": f"criterion.{name}.{c}", "labelKey": f"rubric.{name}.{c}", "feedbackKey": f"rubric.{name}.{c}", "required": True}
        for c in criteria]})

course = {"schemaVersion": "1.0.0", "id": COURSE_ID, "version": VERSION, "status": "preview", "defaultLocale": "pt-BR",
    "requiredLocales": LOCALES, "titleKey": "course.title", "summaryKey": "course.summary", "releasedLessonIds": ["lesson.first-request"],
    "competencies": competencies, "rubrics": rubrics,
    "lessons": [{"id": "lesson.first-request", "order": 1, "status": "ready", "titleKey": "lesson.title", "summaryKey": "lesson.summary",
        "objectiveKeys": ["competency.context.outcome", "competency.evidence.outcome"], "competencyIds": [c["id"] for c in competencies],
        "prerequisiteLessonIds": [], "estimatedMinutes": 25, "steps": steps}]}

# Product facts are bound only after the documented source batch has been read.
bindings_file = ROOT / "evidence-bindings.json"
if bindings_file.exists():
    bindings = json.loads(bindings_file.read_text())
    for s in steps:
        s["evidenceIds"] = bindings["steps"].get(s["id"], [])
        for tool in ["claude", "codex"]:
            s["toolVariants"][tool]["evidenceIds"] = bindings["tools"][tool]

# Validate the full set before writing a ready lesson. Missing source text is an
# error, never a reason to reuse another language or leave stale generated data.
required_keys = set()
def collect_keys(value):
    if isinstance(value, dict):
        for key, child in value.items():
            if key.endswith("Key") and isinstance(child, str):
                required_keys.add(child)
            elif key.endswith("Keys") and isinstance(child, list):
                required_keys.update(child)
            else:
                collect_keys(child)
    elif isinstance(value, list):
        for child in value:
            collect_keys(child)
collect_keys(course)
catalogs = {}
for locale in LOCALES:
    source = ROOT / "messages" / f"{locale}.json"
    if not source.exists():
        raise ValueError(f"Missing locale source: {locale}")
    messages = json.loads(source.read_text())
    if set(messages) != required_keys:
        raise ValueError(f"Locale {locale}: missing={required_keys - set(messages)}, extra={set(messages) - required_keys}")
    if not all(isinstance(value, str) and value.strip() for value in messages.values()):
        raise ValueError(f"Empty or invalid message in {locale}")
    catalog = {"schemaVersion": "1.0.0", "courseId": COURSE_ID, "courseVersion": VERSION, "locale": locale,
        "direction": "rtl" if locale == "ar" else "ltr", "humanReviewStatus": "pending",
        "translationMethod": "ai-authored",
        "messages": {key: {"value": value, "status": "translated", "sourceRevision": VERSION} for key, value in messages.items()}}
    catalogs[locale] = catalog
if not bindings_file.exists():
    raise ValueError("A ready lesson requires documented evidence bindings")
(ROOT / "course.json").write_text(json.dumps(course, ensure_ascii=False, indent=2) + "\n")
destination = ROOT.parent / "locales"
destination.mkdir(exist_ok=True)
for locale, catalog in catalogs.items():
    (destination / f"{locale}.json").write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n")
print("Built course and available locale catalogs; run coordination/validate_content.py in the integrated checkout to audit coverage.")
