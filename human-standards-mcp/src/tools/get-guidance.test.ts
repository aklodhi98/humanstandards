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

test('search retrieves relationship-first spatial rhythm guidance', () => {
  const results = searchDocumentation('spatial rhythm grouping layout', index, 3);

  assert.equal(results[0]?.path, '/code-design-tokens/spatial-rhythm-layout/');
  assert.match(results[0]?.snippet ?? '', /spacing|rhythm|relationship/i);
});

test('selection and transition task language retrieves the keyboard and focus contract', () => {
  const results = searchDocumentation('keyboard selection focus transition', index, 5);

  assert.equal(results[0]?.path, '/code-design-tokens/aria-keyboard-patterns/');
  assert.match(results[0]?.snippet ?? '', /selection|focus|keyboard/i);
});

test('real interface intents keep task-relevant guidance prominent', () => {
  const cases: Array<{
    query: string;
    topPath?: string;
    requiredPaths: string[];
  }> = [
    {
      query: 'error recovery',
      topPath: '/decision-making-errors/error-types/',
      requiredPaths: [
        '/interaction-patterns/notifications-feedback/',
        '/decision-making-errors/defensive-design/',
      ],
    },
    {
      query: 'documentation navigation',
      topPath: '/interaction-patterns/navigation/',
      requiredPaths: ['/interaction-patterns/navigation/'],
    },
    {
      query: 'destructive actions',
      requiredPaths: ['/decision-making-errors/defensive-design/'],
    },
    {
      query: 'onboarding',
      topPath: '/checklists-playbooks/onboarding-playbook/',
      requiredPaths: ['/checklists-playbooks/onboarding-playbook/'],
    },
    {
      query: 'accessible forms',
      topPath: '/checklists-playbooks/form-design-playbook/',
      requiredPaths: ['/interaction-patterns/forms/'],
    },
    {
      query: 'touch targets',
      topPath: '/ergonomics/targets-spacing/',
      requiredPaths: ['/code-design-tokens/touch-targets-spacing/'],
    },
  ];

  for (const { query, topPath, requiredPaths } of cases) {
    const results = searchDocumentation(query, index, 5);
    const paths = results.map((result) => result.path);

    if (topPath) {
      assert.equal(paths[0], topPath, `Expected ${topPath} to lead the query "${query}".`);
    }
    for (const requiredPath of requiredPaths) {
      assert.ok(paths.includes(requiredPath), `Expected ${requiredPath} for the query "${query}".`);
    }
  }
});

test('blank and stop-word-only searches are rejected', () => {
  assert.throws(() => searchDocumentation('', index), /at least one word/i);
  assert.throws(() => searchDocumentation('and the', index), /meaningful word/i);
});
