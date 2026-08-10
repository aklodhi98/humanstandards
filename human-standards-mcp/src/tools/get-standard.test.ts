import assert from 'node:assert/strict';
import test from 'node:test';

import { loadTestIndex } from '../test-helpers.js';
import { getStandardDocument } from './get-standard.js';

const index = loadTestIndex();

test('get_standard returns actual indexed guidance and section metadata', () => {
  const result = getStandardDocument('/interaction-patterns/forms/', index, { maxChars: 4_000 });
  assert.equal(result.title, 'Forms');
  assert.match(result.content, /Forms are where intention becomes action/);
  assert.ok(result.available_sections.includes('Validation timing strategies'));
  assert.equal(result.truncated, true);
});

test('get_standard returns a focused named section', () => {
  const result = getStandardDocument('/interaction-patterns/forms/', index, {
    section: 'Validation timing',
    maxChars: 4_000,
  });
  assert.equal(result.requested_section, 'Validation timing strategies');
  assert.match(result.content, /On blur/);
  assert.equal(result.truncated, false);
});

test('get_standard reports invalid paths and sections clearly', () => {
  assert.throws(() => getStandardDocument('/missing/', index), /Unknown standard path/);
  assert.throws(
    () => getStandardDocument('/interaction-patterns/forms/', index, { section: 'Not a real section' }),
    /Unknown section/,
  );
});
