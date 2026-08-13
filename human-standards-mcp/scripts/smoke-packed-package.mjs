import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import {
  mkdirSync,
  mkdtempSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const temporaryRoot = mkdtempSync(join(tmpdir(), 'human-standards-package-'));
const installRoot = join(temporaryRoot, 'install');

try {
  execFileSync(
    'npm',
    ['pack', '--silent', '--pack-destination', temporaryRoot],
    { cwd: packageRoot, stdio: 'pipe' },
  );
  const tarballs = readdirSync(temporaryRoot).filter((file) => file.endsWith('.tgz'));
  assert.equal(tarballs.length, 1);

  const tarballPath = join(temporaryRoot, tarballs[0]);
  mkdirSync(installRoot);
  writeFileSync(
    join(installRoot, 'package.json'),
    `${JSON.stringify({ private: true }, null, 2)}\n`,
  );
  execFileSync(
    'npm',
    [
      'install',
      '--ignore-scripts',
      '--no-audit',
      '--no-fund',
      '--package-lock=false',
      tarballPath,
    ],
    { cwd: installRoot, stdio: 'pipe' },
  );

  const executable = join(
    installRoot,
    'node_modules',
    '.bin',
    process.platform === 'win32' ? 'human-standards-mcp.cmd' : 'human-standards-mcp',
  );
  const client = new Client({ name: 'packed-package-smoke', version: '1.0.0' });
  const transport = new StdioClientTransport({
    command: executable,
    stderr: 'pipe',
  });
  transport.stderr?.on('data', () => {});

  try {
    await client.connect(transport);
    const listed = await client.listTools();
    assert.deepEqual(
      listed.tools.map(({ name }) => name).sort(),
      [
        'get_all_heuristics',
        'get_heuristic',
        'get_spatial_rhythm',
        'get_standard',
        'search_standards',
      ],
    );
    assert.ok(listed.tools.every((tool) => tool.annotations?.readOnlyHint === true));

    const search = await client.callTool({
      name: 'search_standards',
      arguments: { query: 'forms error recovery', limit: 1 },
    });
    assert.equal(search.isError, undefined);
    assert.equal(search.structuredContent?.result_count, 1);
  } finally {
    await client.close();
  }

  console.log(
    `Packed-package smoke passed (${statSync(tarballPath).size} bytes).`,
  );
} finally {
  rmSync(temporaryRoot, { recursive: true, force: true });
}
