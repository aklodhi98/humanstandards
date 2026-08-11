import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import test from 'node:test';

import { fileURLToPath } from 'node:url';

import { assertValidSpatialRhythmContract, getSpatialRhythm } from './spatial-rhythm.js';
import { SpatialRhythmContract } from './types/index.js';

function loadContract(): SpatialRhythmContract {
  const contractPath = fileURLToPath(new URL('../data/spatial-rhythm.json', import.meta.url));
  const parsed: unknown = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
  assertValidSpatialRhythmContract(parsed);
  return parsed;
}

test('the spatial rhythm contract preserves relationship order without prescribing pixels', () => {
  const contract = loadContract();

  assert.deepEqual(
    contract.relationship_order.map(({ id, rank }) => ({ id, rank })),
    [
      { id: 'attached', rank: 1 },
      { id: 'associated', rank: 2 },
      { id: 'grouped', rank: 3 },
      { id: 'separated', rank: 4 },
      { id: 'sectional', rank: 5 },
    ],
  );
  assert.equal(contract.token_resolution.status, 'product-context-required');
  assert.match(contract.token_resolution.instruction, /product's existing .*spacing tokens/i);
  assert.doesNotMatch(JSON.stringify(contract.token_resolution), /universal (4|8)px/i);
});

test('spatial rhythm guidance can be scoped by pattern, density, and viewport', () => {
  const result = getSpatialRhythm(loadContract(), {
    pattern: 'form-stack',
    density: 'compact',
    viewport: 'small',
  });

  assert.equal(result.patterns.length, 1);
  assert.equal(result.patterns[0]?.id, 'form-stack');
  assert.equal(result.selected_context.density, 'compact');
  assert.equal(result.selected_context.viewport, 'small');
  assert.equal(result.token_resolution.status, 'product-context-required');
  assert.match(result.patterns[0]?.manual_review[0] ?? '', /correct field/i);
});

test('contract validation rejects a reordered relationship grammar', () => {
  const contract = structuredClone(loadContract());
  [contract.relationship_order[0], contract.relationship_order[1]] = [
    contract.relationship_order[1],
    contract.relationship_order[0],
  ];

  assert.throws(() => assertValidSpatialRhythmContract(contract), /ordered from attached to sectional/i);
});

test('spatial rhythm selection rejects unsupported context values', () => {
  const contract = loadContract();

  assert.throws(
    () => getSpatialRhythm(contract, { pattern: 'universal-stack' as never }),
    /unknown spatial rhythm pattern/i,
  );
  assert.throws(() => getSpatialRhythm(contract, { density: 'maximum' as never }), /unknown density mode/i);
  assert.throws(() => getSpatialRhythm(contract, { viewport: 'watch' as never }), /unknown viewport mode/i);
});
