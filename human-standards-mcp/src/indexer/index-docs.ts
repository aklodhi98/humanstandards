#!/usr/bin/env node
/**
 * Index Human Standards documentation into a deterministic, queryable knowledge base.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import { CategoryIndex, DocumentHeading, DocumentIndex, StandardsIndex } from '../types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_ROOT = path.join(__dirname, '../../../src/content/docs');
const OUTPUT_PATH = path.join(__dirname, '../../data/standards-index.json');

interface DocMetadata {
  title: string;
  description: string;
  content: string;
}

export function parseMarkdown(filePath: string): DocMetadata | null {
  try {
    const source = fs.readFileSync(filePath, 'utf-8');
    const frontmatterMatch = source.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/);

    if (!frontmatterMatch) return null;

    const frontmatter = frontmatterMatch[1];
    const titleMatch = frontmatter.match(/^title:\s*(.+)$/m);
    const descriptionMatch = frontmatter.match(/^description:\s*(.+)$/m);

    return {
      title: titleMatch?.[1].trim() ?? '',
      description: descriptionMatch?.[1].trim() ?? '',
      content: frontmatterMatch[2].trim(),
    };
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
    return null;
  }
}

export function extractHeadings(content: string): DocumentHeading[] {
  return Array.from(content.matchAll(/^(#{2,3})\s+(.+)$/gm), (match) => ({
    level: match[1].length,
    title: match[2].replace(/\s+#+$/, '').trim(),
  }));
}

export function extractKeyPoints(content: string): string[] {
  const headings = extractHeadings(content)
    .filter((heading) => heading.level === 2 && !/^references$/i.test(heading.title))
    .map((heading) => heading.title);

  return headings.slice(0, 12);
}

export function extractReferences(content: string): string[] {
  const matches = content.match(/https?:\/\/[^\s\)\]>]+/g) ?? [];
  return [...new Set(matches.map((url) => url.replace(/[.,;:]$/, '')))].slice(0, 12);
}

export function toSitePath(relativePath: string): string {
  let route = relativePath.replace(/\\/g, '/').replace(/\.mdx?$/, '');
  if (route === 'index') return '/';
  if (route.endsWith('/index')) route = route.slice(0, -'/index'.length);
  return `/${route.replace(/^\/+|\/+$/g, '')}/`;
}

function walkMarkdownFiles(directory: string): string[] {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return walkMarkdownFiles(entryPath);
      return entry.isFile() && /\.mdx?$/.test(entry.name) ? [entryPath] : [];
    })
    .sort((left, right) => left.localeCompare(right));
}

function indexFile(filePath: string): DocumentIndex | null {
  const metadata = parseMarkdown(filePath);
  if (!metadata || !metadata.title || !metadata.description) return null;

  const sourcePath = path.relative(DOCS_ROOT, filePath).replace(/\\/g, '/');
  return {
    title: metadata.title,
    path: toSitePath(sourcePath),
    source_path: sourcePath,
    description: metadata.description,
    content: metadata.content,
    headings: extractHeadings(metadata.content),
    key_points: extractKeyPoints(metadata.content),
    references: extractReferences(metadata.content),
  };
}

function createCategory(name: string, files: string[]): CategoryIndex {
  const documents = files.map(indexFile).filter((document): document is DocumentIndex => Boolean(document));
  return {
    name,
    description:
      name === 'root'
        ? 'Human Standards overview and entry points'
        : `Human factors guidance for ${name.replace(/-/g, ' ')}`,
    documents,
  };
}

export function indexDocumentation(docsRoot = DOCS_ROOT): StandardsIndex {
  if (!fs.existsSync(docsRoot)) {
    throw new Error(`Documentation root not found: ${docsRoot}`);
  }

  const rootEntries = fs.readdirSync(docsRoot, { withFileTypes: true });
  const categories: Record<string, CategoryIndex> = {};

  const rootFiles = rootEntries
    .filter((entry) => entry.isFile() && /\.mdx?$/.test(entry.name))
    .map((entry) => path.join(docsRoot, entry.name))
    .sort((left, right) => left.localeCompare(right));
  if (rootFiles.length > 0) categories.root = createCategory('root', rootFiles);

  for (const entry of rootEntries
    .filter((item) => item.isDirectory())
    .sort((left, right) => left.name.localeCompare(right.name))) {
    const files = walkMarkdownFiles(path.join(docsRoot, entry.name));
    categories[entry.name] = createCategory(entry.name, files);
  }

  const documentCount = Object.values(categories).reduce(
    (total, category) => total + category.documents.length,
    0,
  );
  if (documentCount === 0) throw new Error('Documentation index contains no documents.');

  return {
    schema_version: '2.0',
    document_count: documentCount,
    categories,
  };
}

export function saveIndex(index: StandardsIndex, outputPath = OUTPUT_PATH): void {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(index, null, 2)}\n`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Indexing Human Standards documentation...');
  const index = indexDocumentation();
  saveIndex(index);
  for (const [name, category] of Object.entries(index.categories)) {
    console.log(`✓ Indexed ${category.documents.length} documents in ${name}`);
  }
  console.log(`✓ Indexed ${index.document_count} documents total`);
  console.log(`✓ Index saved to ${OUTPUT_PATH}`);
}
