import assert from 'node:assert/strict';
import test from 'node:test';

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

test('stdio server exposes and executes the complete read-only reference contract', async (context) => {
  const serverPath = new URL('./index.js', import.meta.url).pathname;
  const client = new Client({ name: 'human-standards-contract-test', version: '1.0.0' });
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [serverPath],
    stderr: 'pipe',
  });
  transport.stderr?.on('data', () => {});
  await client.connect(transport);
  context.after(async () => client.close());

  const instructions = client.getInstructions();
  assert.ok(instructions);
  assert.ok(instructions.length <= 512);
  assert.match(instructions, /designing, implementing, or reviewing interfaces/);
  assert.match(instructions, /Start with search_standards/);
  assert.match(instructions, /get_standard/);
  assert.match(instructions, /get_spatial_rhythm/);
  assert.match(instructions, /server is read-only/);

  const listed = await client.listTools();
  assert.deepEqual(
    listed.tools.map((tool) => tool.name).sort(),
    ['get_all_heuristics', 'get_heuristic', 'get_spatial_rhythm', 'get_standard', 'search_standards'],
  );
  assert.ok(listed.tools.every((tool) => tool.annotations?.readOnlyHint === true));
  assert.ok(listed.tools.every((tool) => tool.outputSchema));

  const search = await client.callTool({
    name: 'search_standards',
    arguments: { query: 'forms error recovery', limit: 3 },
  });
  assert.equal(search.isError, undefined);
  const searchStructured = search.structuredContent as Record<string, unknown>;
  assert.equal(searchStructured.result_count, 3);
  assert.ok(Array.isArray(searchStructured.results));

  const standard = await client.callTool({
    name: 'get_standard',
    arguments: { path: '/interaction-patterns/forms/', section: 'Validation timing' },
  });
  assert.equal(standard.isError, undefined);
  const standardStructured = standard.structuredContent as Record<string, unknown>;
  assert.match(String(standardStructured.content), /On blur/);

  const spatialRhythm = await client.callTool({
    name: 'get_spatial_rhythm',
    arguments: { pattern: 'form-stack', density: 'compact', viewport: 'small' },
  });
  assert.equal(spatialRhythm.isError, undefined);
  const rhythmStructured = spatialRhythm.structuredContent as Record<string, unknown>;
  assert.equal(rhythmStructured.standard_id, 'HS-SPATIAL-RHYTHM');
  assert.deepEqual(
    (rhythmStructured.relationship_order as Array<{ id: string }>).map(({ id }) => id),
    ['attached', 'associated', 'grouped', 'separated', 'sectional'],
  );
  assert.equal((rhythmStructured.patterns as Array<{ id: string }>)[0]?.id, 'form-stack');
  assert.equal(
    (rhythmStructured.token_resolution as { status: string }).status,
    'product-context-required',
  );

  const invalid = await client.callTool({
    name: 'search_standards',
    arguments: { query: '   ' },
  });
  assert.equal(invalid.isError, true);
  const invalidContent = invalid.content as Array<{ type: string; text?: string }>;
  assert.match(String(invalidContent[0]?.type === 'text' ? invalidContent[0].text : ''), /at least one word/);
});
