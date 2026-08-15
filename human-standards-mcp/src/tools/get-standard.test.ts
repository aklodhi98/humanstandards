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

test('get_standard returns the keyboard selection and focus completion contract', () => {
  const result = getStandardDocument('/code-design-tokens/aria-keyboard-patterns/', index, {
    section: 'Keyboard Selection and Focus Completion Contract',
    maxChars: 12_000,
  });

  assert.equal(result.requested_section, 'Keyboard Selection and Focus Completion Contract');
  assert.match(result.content, /Required pre-handoff exercise/);
  assert.match(result.content, /Do not\s+convert an unreachable state into a pass/);
  assert.equal(result.truncated, false);
});

test('get_standard reports invalid paths and sections clearly', () => {
  assert.throws(() => getStandardDocument('/missing/', index), /Unknown standard path/);
  assert.throws(
    () => getStandardDocument('/interaction-patterns/forms/', index, { section: 'Not a real section' }),
    /Unknown section/,
  );
});
