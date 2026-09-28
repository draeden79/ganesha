# Public classroom beta

Application routes: `/classroom` redirects to `/classroom/<locale>` using the `ganesha-locale` cookie, defaulting to `pt-BR`. The eleven existing locales are supported, with `ar` using RTL. `/course` and `/learn` retain their independent behavior. No authentication, payment, AI execution, or remote persistence is implied by the beta.

## Dedicated service behind the existing domain

Use a separate Next.js project for this repository. Node >=20.9; pnpm 11.19.0. Run `pnpm install --frozen-lockfile` and `pnpm build`. For a Node server run `pnpm exec next start --hostname 0.0.0.0 --port "$PORT"`. Managed Next hosting can use its normal build/runtime integration. No production environment variables or external services are required.

On the existing landing application, forward these two routes to the dedicated service, preserving the entire pathname and query string:

```js
{ source: '/classroom', destination: 'https://CLASSROOM_SERVICE/classroom' },
{ source: '/classroom/:path*', destination: 'https://CLASSROOM_SERVICE/classroom/:path*' }
```

The service sets `assetPrefix: '/classroom'`. JavaScript, CSS and fonts are under `/classroom/_next/static/*`. Public images use `/classroom/images/*`, rewritten internally to `/images/*`. The landing's root, `/_next`, API and protected routes are unaffected by these two external rewrites. Do not set `basePath`: routes already include `/classroom`. No server actions are used. Images and fonts are local assets.

`outputFileTracingIncludes` explicitly packages the canonical course and all locale JSON files for serverless hosting. Keep their paths under `content/curriculum` and `content/locales` in the deployed project.

## Curriculum and compatibility

The explicit beta allowlist is `lesson.foundations`, `lesson.site`, `lesson.app`, `lesson.automation`; all four must exist and each must contain practice plus two assessments. It intentionally permits draft content, independently of the release gate. `releasedLessonIds` is not modified. Missing/stale translations cause an explicit unavailable screen instead of a silent fallback. Human translation and pedagogical review remain pending.

Version 0.2.0 introduces new step IDs. Its browser storage key is `ganesha:classroom:course.first-site:0.2.0`. No approvals or completion from 0.1.0 migrate automatically. The narrower `/course` demonstration uses a separate `ganesha:demo:*` key so it cannot remove beta progress. Tool progress is separate; changing locale retains IDs and progress. Practice is self-reported; choice checks are graded against canonical `correctOptionIds`.

## Isolated local QA

Keep the existing 3101 preview and `.next` build untouched. Build with `GANESHA_BUILD_DIR=.next-classroom`, then start with the same variable on port 3102. `GANESHA_CONTENT_DIR=/absolute/path/to/content` optionally reads a separate curriculum snapshot for local QA; omit this variable in deployment. This avoids changing content read at runtime by the old preview.

Run `pnpm test`, `pnpm typecheck`, `pnpm check:content -- --classroom` (or `node --import tsx scripts/check-content.ts --classroom`), and `pnpm build`. Check `/classroom`, `/classroom/pt-BR`, `/classroom/ar`, an invalid locale, referenced scripts/styles/fonts/images, and the unchanged `/learn/pt-BR`/progress API. Artist browser QA uses `localhost:3102`; implementation QA uses `127.0.0.1:3102` to isolate localStorage.
