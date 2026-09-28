import assert from "node:assert/strict";
import test from "node:test";
import { authorizeCourse } from "../src/lib/access";
import { GET, POST } from "../src/app/api/progress/route";
import { GET as session } from "../src/app/api/session/route";
test("no configured identity provider means no protected access", async () => {
  assert.deepEqual(await authorizeCourse(),{status:"unconfigured"});
  for (const handler of [GET,POST]) {
    const response = await handler();
    assert.equal(response.status,503);
    assert.deepEqual(await response.json(),{error:"unconfigured"});
    assert.equal(response.headers.get("Cache-Control"),"no-store");
  }
});
test("session endpoint honestly reports public demo and browser persistence", async () => {
  assert.deepEqual(await (await session()).json(),{mode:"demo",access:"unconfigured",persistence:"browser-only"});
});
