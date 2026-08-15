import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const packageMetadata = JSON.parse(
  await readFile(new URL('../package.json', import.meta.url), 'utf8'),
);
const registryMetadata = JSON.parse(
  await readFile(new URL('../server.json', import.meta.url), 'utf8'),
);

assert.equal(
  registryMetadata.$schema,
  'https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json',
);
assert.equal(registryMetadata.name, packageMetadata.mcpName);
assert.equal(registryMetadata.version, packageMetadata.version);
assert.ok(registryMetadata.description.length <= 100);
assert.deepEqual(registryMetadata.repository, {
  url: 'https://github.com/aklodhi98/humanstandards',
  source: 'github',
});
assert.equal(registryMetadata.packages.length, 1);

const [npmPackage] = registryMetadata.packages;
assert.equal(npmPackage.registryType, 'npm');
assert.equal(npmPackage.identifier, packageMetadata.name);
assert.equal(npmPackage.version, packageMetadata.version);
assert.deepEqual(npmPackage.transport, { type: 'stdio' });
assert.equal('environmentVariables' in npmPackage, false);

console.log(
  `Release metadata matches ${packageMetadata.name}@${packageMetadata.version}.`,
);
