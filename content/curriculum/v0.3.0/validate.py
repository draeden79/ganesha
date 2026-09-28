"""Audit the isolated curriculum, including coverage and literal preservation."""
import argparse
import collections
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
LOCALES = ['pt-BR', 'en', 'es', 'fr', 'de', 'ja', 'hi', 'id', 'ar', 'ko', 'zh-CN']

def read(path):
    return json.loads(path.read_text())

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def walk(value):
    if isinstance(value, dict):
        yield value
        for child in value.values():
            yield from walk(child)
    elif isinstance(value, list):
        for child in value:
            yield from walk(child)

def audit(locales):
    course = read(ROOT / 'bundle/content/curriculum/course.json')
    source = read(ROOT / 'source-messages/en.json')
    manifest = read(ROOT / 'AUTHORING_MANIFEST.json')
    assert manifest['sourceEnglishSha256'] == sha(ROOT / 'source-messages/en.json')
    assert course == read(ROOT / 'course.template.json')
    assert course['version'] == '0.3.0'
    assert course['status'] == 'preview' and course['releasedLessonIds'] == []
    assert course['requiredLocales'] == LOCALES
    lessons = course['lessons']
    assert len(lessons) == 12
    assert len({lesson['id'] for lesson in lessons}) == 12
    ids = [node['id'] for node in walk(course) if 'id' in node]
    duplicates = [key for key, count in collections.Counter(ids).items() if count > 1]
    assert not duplicates, duplicates
    keys = set()
    for node in walk(course):
        for key, value in node.items():
            if key.endswith('Key'):
                keys.add(value)
            elif key.endswith('Keys'):
                keys.update(value)
    assert keys == set(source), (keys - set(source), set(source) - keys)
    rubrics = {rubric['id']: rubric for rubric in course['rubrics']}
    competencies = {c['id'] for c in course['competencies']}
    seen = set()
    checks = external = exercises = 0
    for index, lesson in enumerate(lessons):
        assert lesson['order'] == index + 1
        assert set(lesson['prerequisiteLessonIds']) <= seen
        if index == 0:
            expected = []
        elif index in [3, 6, 9]:
            expected = ['lesson.verification']
        else:
            expected = [lessons[index - 1]['id']]
        assert lesson['prerequisiteLessonIds'] == expected
        seen.add(lesson['id'])
        assert len(lesson['steps']) == 10
        assert [i for i, step in enumerate(lesson['steps']) if 'check' in step] == [3, 8]
        assert sum(step['kind'] == 'practice' for step in lesson['steps']) >= 4
        for step in lesson['steps']:
            assert set(step['competencyIds']) <= competencies
            assert set(step['toolVariants']) == {'claude', 'codex'}
            assert all('promptKey' not in v for v in step['toolVariants'].values())
            assert step['hintKeys'] and step['criteriaKeys'] and step['blocks']
            assert step['isAssessment'] == (step['kind'] == 'check')
            if 'check' in step:
                checks += 1
                check = step['check']
                assert check['required'] and check['kind'] == 'single-choice'
                assert len(check['options']) == 3 and len(check['correctOptionIds']) == 1
                assert set(check['correctOptionIds']) <= {o['id'] for o in check['options']}
                assert len({o['feedbackKey'] for o in check['options']}) == 3
            if step['kind'] in ['practice', 'reflect']:
                exercises += 1
                exercise = step['exercise']
                assert exercise['promptKey'] == step['actionKey']
                assert exercise['deliverableKey'] == step['expectedResultKey']
                assert exercise['rubricId'] in rubrics
            if step['executionMode'] == 'external-real-task':
                external += 1
                assert step['exercise']['mode'] == 'local-user'
                assert any(b.get('textKey') == 'notice.external-record' for b in step['blocks'])
                assert [c['labelKey'] for c in rubrics[step['exercise']['rubricId']]['criteria']] == ['criterion.execution-record', 'criterion.compare-record']
    assert checks == 24
    # Exact literals are executable/artifact syntax, not natural-language wording.
    literal_pattern = re.compile(r'`[^`]+`|https?://[^\s<>]+|(?<![\w/])[\w.-]+\.(?:csv|md|py|html|json|txt)\b|\b(?:30\.50|31\.50|10\.50|20\.00|11\.50)\b')
    findings = []
    coverage = {}
    for locale in locales:
        catalog_path = ROOT / f'bundle/content/locales/{locale}.json'
        catalog = read(catalog_path)
        assert catalog['locale'] == locale and catalog['courseVersion'] == course['version']
        assert catalog['direction'] == ('rtl' if locale == 'ar' else 'ltr')
        assert catalog['humanReviewStatus'] == 'pending'
        messages = catalog['messages']
        assert set(messages) == keys, (locale, 'message coverage')
        assert all(m['value'].strip() and m['status'] == 'translated' and m['sourceRevision'] == course['version'] for m in messages.values())
        if locale != 'en':
            for key, text in source.items():
                tokens = set(literal_pattern.findall(text))
                missing = [token for token in tokens if token not in messages[key]['value']]
                if missing:
                    findings.append({'locale': locale, 'key': key, 'missingLiteralCandidates': missing})
        coverage[locale] = {'required': len(keys), 'present': len(messages), 'humanReview': 'pending', 'sha256': sha(catalog_path)}
    # Active 0.2.0 is never an output of this build.
    baseline = read(ROOT.parent / 'BETA_VALIDATION.json')['hashes']
    repo = ROOT.parents[2]
    unchanged = all((repo / path).exists() and sha(repo / path) == digest for path, digest in baseline.items())
    assert unchanged, 'Active0.2.0 differs from its recorded baseline'
    report = {'version': course['version'], 'structuralPassed': True, 'lessons': len(lessons), 'steps': sum(len(l['steps']) for l in lessons), 'checks': checks, 'exercises': exercises, 'externalSelfReportedPractices': external, 'uniqueMessageKeys': len(keys), 'estimatedMinutes': sum(l['estimatedMinutes'] for l in lessons), 'coverage': coverage, 'requiredLocales': LOCALES, 'localizationComplete': set(locales) == set(LOCALES), 'literalReviewFindings': findings, 'active0.2.0Unchanged': unchanged, 'courseSha256': sha(ROOT / 'bundle/content/curriculum/course.json'), 'canonicalReleaseEligible': False, 'humanLanguageReview': 'pending', 'externalDesktopExecutionValidated': False, 'learningEfficacyValidated': False}
    (ROOT / 'VALIDATION.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({key: report[key] for key in ['structuralPassed', 'lessons', 'steps', 'checks', 'exercises', 'externalSelfReportedPractices', 'uniqueMessageKeys', 'localizationComplete', 'literalReviewFindings']}, ensure_ascii=False))

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--locales', nargs='+', choices=LOCALES, default=LOCALES)
    args = parser.parse_args()
    audit(args.locales)
