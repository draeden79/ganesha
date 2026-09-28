import assert from "node:assert/strict";
import test from "node:test";
import { inlineCodeParts } from "../src/lib/inline-code";

test("Arabic instructions isolate commands without interpreting HTML or other markup", () => {
  assert.deepEqual(inlineCodeParts("شغّل `python3 --version` ثم `<script>alert(1)</script>`"), [
    { code: false, text: "شغّل " }, { code: true, text: "python3 --version" },
    { code: false, text: " ثم " }, { code: true, text: "<script>alert(1)</script>" },
  ]);
  assert.deepEqual(inlineCodeParts("Unmatched `command\n**literal**"), [{ code: false, text: "Unmatched `command\n**literal**" }]);
  assert.deepEqual(inlineCodeParts("`first\nsecond`"), [{ code: false, text: "`first\nsecond`" }]);
  assert.deepEqual(inlineCodeParts("```literal```"), [{ code: false, text: "```literal```" }]);
});
