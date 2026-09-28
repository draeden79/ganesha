#!/usr/bin/env python3
"""Audit canonical content; does not certify linguistic quality or UI behavior."""
import argparse
import json
import re
from pathlib import Path

LOCALES = ['pt-BR', 'en', 'es', 'fr', 'de', 'ja', 'hi', 'id', 'ar', 'ko', 'zh-CN']


def audit(root, research_only=False):
    errors, warnings, coverage = [], [], {}

    def require(condition, message):
        if not condition:
            errors.append(message)

    def read(path):
        try:
            return json.loads((root / path).read_text())
        except (OSError, ValueError) as exc:
            errors.append(f'{path}: {exc}')
            return {}

    def index(items, label):
        result = {}
        for item in items:
            identity = item.get('id')
            require(isinstance(identity, str) and bool(re.fullmatch(r'[A-Za-z0-9._-]+', identity)), f'{label}: invalid ID {identity}')
            require(identity not in result, f'{label}: duplicate ID {identity}')
            result[identity] = item
        return result

    def references(values, target, label):
        for identity in values:
            require(identity in target, f'{label}: unknown reference {identity}')

    registry = read('content/research/registry.json')
    sources = index(registry.get('sources', []), 'source')
    evidence = index(registry.get('evidence', []), 'evidence')
    require(registry.get('schemaVersion') == '1.0.0', 'research: schemaVersion must be 1.0.0')
    for source in sources.values():
        for field in ['url', 'title', 'publisher', 'retrievedAt']:
            require(bool(source.get(field)), f'{source["id"]}: missing {field}')
        require(source.get('url', '').startswith('https://'), f'{source["id"]}: expected HTTPS source')
    for item in evidence.values():
        references([item.get('sourceId')], sources, item['id'])
        for field in ['locator', 'text', 'claim', 'retrievedAt']:
            require(bool(item.get(field)), f'{item["id"]}: missing {field}')
        require(item.get('textKind') in ['short-quote', 'paraphrase'], f'{item["id"]}: invalid textKind')
    if research_only:
        return {'passed': not errors, 'scope': 'research', 'sources': len(sources), 'evidence': len(evidence), 'errors': errors, 'warnings': warnings}

    course = read('content/curriculum/course.json')
    require(course.get('schemaVersion') == '1.0.0', 'course: schemaVersion must be 1.0.0')
    require(set(course.get('requiredLocales', [])) == set(LOCALES), 'course: all 11 required locales must be declared')
    require(bool(course.get('version')), 'course: version missing')
    lessons = index(course.get('lessons', []), 'lesson')
    competencies = index(course.get('competencies', []), 'competency')
    rubrics = index(course.get('rubrics', []), 'rubric')
    released = course.get('releasedLessonIds', [])
    require(bool(released), 'course: no released lesson IDs to audit')
    references(released, lessons, 'releasedLessonIds')

    def check_cycles(nodes, field, label):
        visiting, visited = set(), set()

        def visit(identity):
            if identity in visiting:
                errors.append(f'{label}: prerequisite cycle at {identity}')
                return
            if identity in visited or identity not in nodes:
                return
            visiting.add(identity)
            for dependency in nodes[identity].get(field, []):
                visit(dependency)
            visiting.remove(identity)
            visited.add(identity)

        for identity in nodes:
            visit(identity)

    check_cycles(lessons, 'prerequisiteLessonIds', 'lesson')
    check_cycles(competencies, 'prerequisiteIds', 'competency')
    for item in competencies.values():
        references(item.get('prerequisiteIds', []), competencies, item['id'])
        references(item.get('evidenceIds', []), evidence, item['id'])
    all_steps = []
    all_checks = []
    for lesson in lessons.values():
        references(lesson.get('prerequisiteLessonIds', []), lessons, lesson['id'])
        references(lesson.get('competencyIds', []), competencies, lesson['id'])
        steps = lesson.get('steps', [])
        all_steps.extend(steps)
        if lesson['id'] in released:
            require(lesson.get('status') == 'ready', f'{lesson["id"]}: released lesson is not ready')
            require(any(s.get('kind') == 'practice' and s.get('exercise') for s in steps), f'{lesson["id"]}: no practice exercise')
            checks = [s for s in steps if s.get('kind') == 'check' and s.get('isAssessment') and s.get('check', {}).get('required')]
            require(len(checks) >= 2, f'{lesson["id"]}: fewer than two required assessment screens')
        for step in steps:
            sid = step['id']
            references(step.get('competencyIds', []), competencies, sid)
            references(step.get('evidenceIds', []), evidence, sid)
            require(set(step.get('toolVariants', {})) == {'claude', 'codex'}, f'{sid}: missing tool variant')
            for variant in step.get('toolVariants', {}).values():
                references(variant.get('evidenceIds', []), evidence, sid)
            for field in ['objectiveKey', 'actionKey', 'expectedResultKey']:
                require(bool(step.get(field)), f'{sid}: missing {field}')
            if step.get('exercise'):
                references([step['exercise'].get('rubricId')], rubrics, sid)
                require(step['exercise'].get('mode') in ['simulated', 'local-user'], f'{sid}: invalid practice mode')
            check = step.get('check')
            if check:
                all_checks.append(check)
                references(check.get('competencyIds', []), competencies, sid)
                require(bool(check.get('competencyIds')), f'{sid}: assessment has no competency')
                if check.get('kind') == 'artifact-review':
                    references([check.get('rubricId')], rubrics, sid)
                else:
                    options = index(check.get('options', []), f'{sid} option')
                    answers = check.get('correctOptionIds', [])
                    references(answers, options, sid)
                    require(bool(answers), f'{sid}: missing correct answer')
                    if check.get('kind') == 'single-choice':
                        require(len(answers) == 1, f'{sid}: single-choice needs exactly one answer')
    index(all_steps, 'step')
    index(all_checks, 'check')

    keys = set()

    def collect(value):
        if isinstance(value, dict):
            for key, child in value.items():
                if key.endswith('Key') and isinstance(child, str):
                    keys.add(child)
                elif key.endswith('Keys') and isinstance(child, list):
                    keys.update(child)
                else:
                    collect(child)
        elif isinstance(value, list):
            for child in value:
                collect(child)

    # Full supplied JSON is auditable; planned-only roadmap should remain outside it.
    collect(course)
    for locale in LOCALES:
        catalog = read(f'content/locales/{locale}.json')
        require(catalog.get('locale') == locale, f'{locale}: mismatched locale')
        require(catalog.get('courseId') == course.get('id'), f'{locale}: mismatched course ID')
        require(catalog.get('courseVersion') == course.get('version'), f'{locale}: mismatched course version')
        messages = catalog.get('messages', {})
        missing, pending, stale = [], [], []
        for key in sorted(keys):
            entry = messages.get(key)
            if not isinstance(entry, dict) or not entry.get('value', '').strip():
                missing.append(key)
                continue
            if entry.get('status') not in ['translated', 'reviewed']:
                pending.append(key)
            if entry.get('sourceRevision') != course.get('version'):
                stale.append(key)
        require(not missing, f'{locale}: {len(missing)} missing/empty messages {missing[:5]}')
        require(not pending, f'{locale}: {len(pending)} pending messages {pending[:5]}')
        require(not stale, f'{locale}: {len(stale)} stale translations {stale[:5]}')
        human = catalog.get('humanReviewStatus', 'pending')
        if human != 'reviewed':
            warnings.append(f'{locale}: human language review pending')
        coverage[locale] = {'required': len(keys), 'present': len(keys) - len(missing), 'pending': len(pending), 'stale': len(stale), 'humanReview': human}
    if course.get('status') != 'published':
        warnings.append(f'course status is {course.get("status")}; this audit does not publish it')
    return {'passed': not errors, 'scope': 'canonical-content', 'courseId': course.get('id'), 'version': course.get('version'), 'lessons': len(lessons), 'steps': len(all_steps), 'checks': len(all_checks), 'coverage': coverage, 'errors': errors, 'warnings': warnings}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument('--research-only', action='store_true')
    args = parser.parse_args()
    report = audit(args.root, args.research_only)
    print(json.dumps(report, ensure_ascii=False, indent=2))
    raise SystemExit(0 if report['passed'] else 1)
