import test from 'node:test';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import path from 'node:path';
import { GET } from '../src/app/route.ts';

test('home serves the approved landing page with existing local assets and working section links', async () => {
  const response = await GET();
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type') || '', /^text\/html/);
  assert.equal(response.headers.get('content-language'), 'en');
  assert.equal(response.headers.get('location'), null);
  const html = await response.text();
  assert.match(html, /<html lang="en">/);
  assert.match(html, /Artificial<br>intelligence/);
  assert.match(html, /Noncommercial prototype/);
  assert.doesNotMatch(html, /"service":"Ganesha"/);
  for (const [, asset] of html.matchAll(/(?:src|href)="(\/homepage\/[^"?#]+)"/g)) {
    await access(path.join(process.cwd(), 'public', asset));
  }
  for (const [, fragment] of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(html.includes(`id="${fragment}"`), `Missing section ${fragment}`);
  }
});
