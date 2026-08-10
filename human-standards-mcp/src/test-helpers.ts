import * as fs from 'fs';

import { assertValidStandardsIndex } from './standards.js';
import { StandardsIndex } from './types/index.js';

export function loadTestIndex(): StandardsIndex {
  const indexPath = new URL('../data/standards-index.json', import.meta.url);
  const parsed: unknown = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  assertValidStandardsIndex(parsed);
  return parsed;
}
