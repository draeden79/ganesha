import assert from "node:assert/strict";
import test from "node:test";
import { inlineCodeParts } from "../src/lib/inline-code";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { InlineCode } from "../src/components/course-app";

test("Arabic instructions isolate commands without interpreting HTML or other markup", () => {
  assert.deepEqual(inlineCodeParts("شغّل `python3 --version` ثم `<script>alert(1)</script>`"), [
    { code: false, text: "شغّل " }, { code: true, text: "python3 --version" },
    { code: false, text: " ثم " }, { code: true, text: "<script>alert(1)</script>" },
  ]);
  assert.deepEqual(inlineCodeParts("Unmatched `command\n**literal**"), [{ code: false, text: "Unmatched `command\n**literal**" }]);
  assert.deepEqual(inlineCodeParts("`first\nsecond`"), [{ code: false, text: "`first\nsecond`" }]);
  assert.deepEqual(inlineCodeParts("```literal```"), [{ code: false, text: "```literal```" }]);
});

test("rendered Arabic JSON and line-by-line CSV use isolated LTR code without losing newlines", () => {
  const text = 'افحص `{"version":1,"tasks":[]}`\n`id,item,amount`\n`1,Caderno,10.50`\n`2,Curso,20.00`';
  const html = renderToStaticMarkup(createElement(InlineCode, { text }));
  assert.equal((html.match(/<code class="inline-code" dir="ltr">/g) ?? []).length, 4);
  assert.equal(html.includes("`"), false);
  assert.ok(html.includes('</code>\n<code class="inline-code" dir="ltr">1,Caderno,10.50</code>'));
  assert.ok(html.includes('</code>\n<code class="inline-code" dir="ltr">2,Curso,20.00</code>'));
  const escaped = renderToStaticMarkup(createElement(InlineCode, { text: '`<script>literal</script>`' }));
  assert.ok(escaped.includes("&lt;script&gt;literal&lt;/script&gt;"));
  assert.equal(escaped.includes("<script>"), false);
});
