import assert from 'node:assert/strict';
import test from 'node:test';

import { loadTestIndex } from '../test-helpers.js';
import { searchDocumentation } from './get-guidance.js';

const index = loadTestIndex();

test('multi-term search finds guidance across titles and document content', () => {
  const results = searchDocumentation('forms error recovery', index, 5);
  assert.ok(results.length > 0);
  assert.ok(results.some((result) => result.title === 'Forms'));
  assert.ok(results.every((result) => result.snippet.length > 0));
  assert.ok(results.some((result) => result.matched_terms.length === 3));
});

test('search handles punctuation and Australian spelling', () => {
  assert.equal(searchDocumentation('notifications feedback', index, 1)[0]?.title, 'Notifications & Feedback');
  assert.equal(searchDocumentation('colour contrast', index, 1)[0]?.title, 'Colour & Accessibility');
});

test('search reaches nested documents and caps result counts', () => {
  const results = searchDocumentation('legibility contrast', index, 3);
  assert.equal(results.length, 3);
  assert.equal(results[0].path, '/perception/vision/legibility-contrast/');
});

test('blank and stop-word-only searches are rejected', () => {
  assert.throws(() => searchDocumentation('', index), /at least one word/i);
  assert.throws(() => searchDocumentation('and the', index), /meaningful word/i);
});
