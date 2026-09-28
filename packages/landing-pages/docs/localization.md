# Automatic course-page translation

Every newly generated or revised page is prepared in these eleven languages:

| Code | Language shown in the selector |
| --- | --- |
| en | English (default) |
| pt-BR | Português brasileiro |
| es | Español |
| fr | Français |
| de | Deutsch |
| ja | 日本語 |
| hi | हिन्दी |
| id | Bahasa Indonesia |
| ar | العربية |
| ko | 한국어 |
| zh-CN | 简体中文 (Simplified Chinese) |

The owner requested Chinese without specifying a script; Simplified Chinese is
the implemented default. Slack clarification and publication replies remain
English. A brief can still be supplied in any language. No translation command
or list of languages is needed in the brief.

## Publication behavior

The original English course is validated, then ten independent translation jobs
translate its complete content while preserving curriculum structure and facts.
Their IDs derive from the source request, translation version and locale.
Completed translations are retained in the durable generation broker; a pending
translation releases the page job's lease without consuming a failure attempt.
The existing local worker handles these jobs using the owner's configured model.
There is no provider fallback and no change to worker tool permissions.

The broker validates each result against both its schema and retained English
source before accepting it. An invalid translation can use the worker's bounded
retry policy. All eleven rendered versions become live in one Redis publication
transaction, with one original-thread Slack notification. Failure leaves every
version of the previous page unchanged. Revisions translate the revised English
source again, keeping the course URL stable.

The existing English-only records remain readable. Revising an older course
upgrades it to the multilingual format; the code does not silently label legacy
English HTML as another language. This deployment does not rewrite every old
record in the background.

## Visitor experience

The canonical English URL stays `/courses/<slug>/`. A language selector links to
the same course with `?lang=pt-BR`, `?lang=ar`, and the other supported codes.
Visitors receive server-rendered translated content without requiring JavaScript.
The default is English; a direct locale link selects that language. Unknown or
unavailable locales return 404 rather than a mislabeled English page.

Every visible course field, navigation label, button, FAQ, prototype notice,
image description and accessibility label is localized. Titles, descriptions,
HTML language, Content-Language, canonical and hreflang metadata match the chosen
locale. Arabic uses `dir=rtl`, mirrored spacing and an Arabic-capable font.
Figtree remains the Latin font; script-appropriate fallbacks support other writing
systems while retaining the approved Ganesha colors, illustration and layout.

## Operations and verification

One accepted course brief/revision consumes one Slack request allowance, but a
complete ready course runs one English generation plus ten translation jobs.
Account/model usage limits still apply. Translation runs sequentially on the
single local worker, so publication takes longer than a single-language page.
Keep the PC awake; pending work survives offline periods.

Tests cover complete locale sets, clarification without translations, pending
work, source-aware worker validation, invalid/missing translations, escaped
content, legacy records, stable URLs and atomic Redis publication with recovery.
Live acceptance must verify a real Slack publication, all eleven HTTPS variants,
the language selector, Arabic direction and a narrow mobile viewport. Synthetic
layout previews are not evidence of live model translation quality.
