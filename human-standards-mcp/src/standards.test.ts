import assert from 'node:assert/strict';
import test from 'node:test';

import { allDocuments, assertValidStandardsIndex, findDocument, normalizeDocumentPath } from './standards.js';
import { loadTestIndex } from './test-helpers.js';

test('the committed index contains every source document and nested guidance', () => {
  const index = loadTestIndex();
  const documents = allDocuments(index);

  assert.equal(index.document_count, 67);
  assert.equal(documents.length, 67);
  assert.ok(findDocument(index, '/examples/defensive-design/error-prevention-grammarly/'));
  assert.ok(findDocument(index, '/perception/vision/legibility-contrast/'));
  assert.ok(findDocument(index, '/code-design-tokens/spatial-rhythm-layout/'));
  assert.ok(findDocument(index, '/'));
  assert.equal('rules' in index, false);
  assert.equal('patterns' in index, false);
});

test('index validation rejects empty and inconsistent indexes', () => {
  assert.throws(
    () => assertValidStandardsIndex({ schema_version: '2.0', document_count: 0, categories: {} }),
    /no documents/i,
  );

  const index = structuredClone(loadTestIndex());
  index.document_count += 1;
  assert.throws(() => assertValidStandardsIndex(index), /count mismatch/i);
});

test('document paths accept routes and Human Standards URLs', () => {
  assert.equal(normalizeDocumentPath('interaction-patterns/forms'), '/interaction-patterns/forms/');
  assert.equal(
    normalizeDocumentPath('https://humanstandards.org/interaction-patterns/forms/'),
    '/interaction-patterns/forms/',
  );
  assert.equal(normalizeDocumentPath('/'), '/');
});
