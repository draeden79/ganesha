# Runtime support for curriculum0.3.0

This change supports a future isolated0.3.0 curriculum. It does not replace the canonical content, publish a version, migrate credits, or change the existing preview servers. The curriculum remains owned by the Educador and activation by the Diretor.

## Version policy

- 0.1.0: `/course` exposes `lesson.first-request`; no classroom scope.
- 0.2.0: `/classroom` keeps its four existing lessons and linear behavior; `/course` exposes `lesson.foundations`.
- 0.3.0: `/classroom` accepts the twelve explicitly listed lessons; `/course` exposes only `lesson.workspace`.

The public loader rejects unknown versions, missing/duplicate lessons or steps, incomplete practices/checks, invalid answer IDs, and stale translations. Expanded lessons require ten steps, at least four practices, and exactly two assessments in positions4 and9. Their prerequisite graph is checked against the four independent routes. These checks do not set `releasedLessonIds` or bypass protected access.

## Navigation and content

The expanded menu groups twelve lessons into foundations, sites, apps and automations. Prerequisites are visible recommendations and remain freely navigable. Next lesson stays inside the current route. The final lesson of a route opens path selection, with completion derived from the actual step records; completion of the whole course still requires every step. Mobile retains the lesson title and an accessible grouped lesson selector.

The Educador confirmed complete requests will be localized visible callouts; short `exercise.promptKey` values remain answer-field prompts. The app does not duplicate those requests. Ordered paragraphs/callouts/code remain intact. The expanded client payload omits legacy duplicate body/callout arrays already represented by ordered blocks. Literal code and inline commands retain LTR isolation inside RTL prose.

## Progress and failure handling

`ganesha:classroom:course.first-site:0.3.0` is independent from the0.2.0 key and `/course` demo storage. There is no automatic migration or inherited approval. The existing per-tool state, stable IDs, self-reported practice, deterministic checks and cross-tab merge remain in use.

The persistence adapter returns an explicit failed-save result on unavailable storage or quota errors. The interface then shows the existing localized save-error message, retains the current response in memory, and never deletes an older record to make room. A failed recovery backup prevents overwrite of its original source. Tests inject `QuotaExceededError` into that adapter; they do not claim to exhaust a real browser quota.

## Validation and measurement

Run `pnpm test`, `pnpm typecheck`, and `pnpm build`. Mechanics tests use a clearly marked synthetic fixture under `tests/fixtures`; it is never served as educational content. Regression testing also runs against the intact0.2.0 snapshot.

For an authorized isolated content snapshot, set `GANESHA_CONTENT_DIR` to a directory containing `curriculum/course.json` and `locales/<locale>.json`. Use a separate `GANESHA_BUILD_DIR`, such as `.next-classroom-v03`, and a new preview port. Existing3101/3102/3103 builds remain untouched.

`node --import tsx scripts/measure-classroom.ts --locales=pt-BR,en` prints actual localized course JSON and gzip sizes plus an in-memory stress measurement with both tools and fifty attempts per activity. Its synthetic progress is never persisted or counted as learner completion. The tool reports approximate UTF-16 string bytes for scale assessment, not a promised browser quota. Final eleven-language coverage remains a separate integration check.

## Measured isolated snapshot

Source: immutable Educador commit `b8e4a62`, verified SHA-256 before use; course hash `3ef6d85dd87b1b6564ef983d7da689c63735e21b6151386e5611d71a6e1e5667`. This snapshot has120 steps and only pt-BR/en catalogs ready for runtime QA. No claim of completed eleven-language content coverage is made here.

| Payload | pt-BR | en |
| --- | ---: | ---: |
| Localized client course JSON | 243,308 bytes | 237,251 bytes |
| Gzip of that JSON (not full page wire size) | 47,674 bytes | 45,478 bytes |
| Synthetic two-tool progress,50 attempts/activity | 10,933,622 bytes | 10,933,622 bytes |
| One stress restore on this local machine | 15.01 ms | 11.79 ms |

The stress case deliberately uses1,000-character answers and full retained history; its estimated UTF-16 string size is21,867,244 bytes. This demonstrates meaningful quota risk for very large histories. The app preserves records and reports save failure instead of silently deleting attempts or promising unlimited local persistence. Typical learner history was not inferred from this stress fixture. Browser quota exhaustion itself was not performed; failure behavior was tested by injecting `QuotaExceededError` into the same persistence adapter used by the UI.
