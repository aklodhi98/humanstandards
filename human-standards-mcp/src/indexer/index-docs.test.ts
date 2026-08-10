import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

import { extractHeadings, extractKeyPoints, indexDocumentation, toSitePath } from './index-docs.js';

test('site paths handle root, index pages, nested markdown, and MDX', () => {
  assert.equal(toSitePath('index.mdx'), '/');
  assert.equal(toSitePath('examples/index.mdx'), '/examples/');
  assert.equal(
    toSitePath('perception/vision/legibility-contrast.md'),
    '/perception/vision/legibility-contrast/',
  );
});

test('heading metadata retains H2 and H3 section titles', () => {
  const content = '## Main\nBody\n\n### Detail\nMore\n\n## References\nLinks';
  assert.deepEqual(extractHeadings(content), [
    { level: 2, title: 'Main' },
    { level: 3, title: 'Detail' },
    { level: 2, title: 'References' },
  ]);
  assert.deepEqual(extractKeyPoints(content), ['Main']);
});

test('documents marked mcp false are omitted without leaving empty categories', () => {
  const docsRoot = mkdtempSync(join(tmpdir(), 'human-standards-index-'));

  try {
    writeFileSync(
      join(docsRoot, 'index.md'),
      '---\ntitle: Standards\ndescription: Included guidance\n---\n\n## Guidance\nUse clear labels.\n',
    );
    mkdirSync(join(docsRoot, 'studies'));
    writeFileSync(
      join(docsRoot, 'studies', 'reviewers.md'),
      '---\ntitle: Reviewer call\ndescription: Recruitment page\nmcp: false\n---\n\n## Apply\nPrivate intake.\n',
    );

    const index = indexDocumentation(docsRoot);
    assert.equal(index.document_count, 1);
    assert.equal(index.categories.root.documents[0]?.title, 'Standards');
    assert.equal(index.categories.studies, undefined);
  } finally {
    rmSync(docsRoot, { recursive: true, force: true });
  }
});
