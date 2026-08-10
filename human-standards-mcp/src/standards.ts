import { DocumentIndex, StandardsIndex } from './types/index.js';

export function allDocuments(index: StandardsIndex): DocumentIndex[] {
  return Object.values(index.categories).flatMap((category) => category.documents);
}

export function assertValidStandardsIndex(value: unknown): asserts value is StandardsIndex {
  if (!value || typeof value !== 'object') throw new Error('Standards index is not an object.');
  const index = value as Partial<StandardsIndex>;
  if (index.schema_version !== '2.0') {
    throw new Error(`Unsupported standards index schema: ${String(index.schema_version)}`);
  }
  if (!index.categories || typeof index.categories !== 'object') {
    throw new Error('Standards index has no categories.');
  }
  const documents = allDocuments(index as StandardsIndex);
  if (documents.length === 0) throw new Error('Standards index contains no documents.');
  if (index.document_count !== documents.length) {
    throw new Error(
      `Standards index count mismatch: declared ${String(index.document_count)}, found ${documents.length}.`,
    );
  }
  for (const document of documents) {
    if (!document.path || !document.title || !document.description || !document.content) {
      throw new Error(`Standards index contains an incomplete document at ${document.path || 'unknown path'}.`);
    }
  }
}

export function normalizeDocumentPath(input: string): string {
  let value = input.trim();
  if (/^https?:\/\//i.test(value)) {
    const url = new URL(value);
    value = url.pathname;
  }
  value = `/${value.replace(/^\/+|\/+$/g, '')}/`;
  return value === '//' ? '/' : value;
}

export function findDocument(index: StandardsIndex, inputPath: string): DocumentIndex | undefined {
  const normalizedPath = normalizeDocumentPath(inputPath);
  return allDocuments(index).find((document) => document.path === normalizedPath);
}
