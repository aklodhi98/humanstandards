import assert from 'node:assert/strict';
import test from 'node:test';

import { extractHeadings, extractKeyPoints, toSitePath } from './index-docs.js';

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
