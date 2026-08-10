import { findDocument, normalizeDocumentPath } from '../standards.js';
import { StandardDocumentResult, StandardsIndex } from '../types/index.js';
import { normalizeSearchText } from './get-guidance.js';

interface SectionRange {
  level: number;
  title: string;
  start: number;
  end: number;
}

function sectionRanges(content: string): SectionRange[] {
  const matches = [...content.matchAll(/^(#{2,3})\s+(.+)$/gm)];
  return matches.map((match, index) => {
    const level = match[1].length;
    const next = matches.slice(index + 1).find((candidate) => candidate[1].length <= level);
    return {
      level,
      title: match[2].replace(/\s+#+$/, '').trim(),
      start: match.index ?? 0,
      end: next?.index ?? content.length,
    };
  });
}

function selectSection(content: string, requestedSection: string): { title: string; content: string } {
  const requested = normalizeSearchText(requestedSection);
  if (!requested) throw new Error('Section must contain at least one word.');
  const sections = sectionRanges(content);
  const exact = sections.find((section) => normalizeSearchText(section.title) === requested);
  const partial = sections.find((section) => normalizeSearchText(section.title).includes(requested));
  const match = exact ?? partial;
  if (!match) {
    throw new Error(`Unknown section: ${requestedSection}.`);
  }
  return { title: match.title, content: content.slice(match.start, match.end).trim() };
}

export function getStandardDocument(
  inputPath: string,
  index: StandardsIndex,
  options: { section?: string; maxChars?: number } = {},
): StandardDocumentResult {
  const normalizedPath = normalizeDocumentPath(inputPath);
  const document = findDocument(index, normalizedPath);
  if (!document) throw new Error(`Unknown standard path: ${normalizedPath}`);

  const safeMaxChars = Math.min(30_000, Math.max(2_000, Math.trunc(options.maxChars ?? 12_000)));
  const selected = options.section
    ? selectSection(document.content, options.section)
    : { title: null, content: document.content };
  const truncated = selected.content.length > safeMaxChars;
  const content = truncated
    ? `${selected.content.slice(0, safeMaxChars).trimEnd()}\n\n[Content truncated. Request a named section for a focused response.]`
    : selected.content;

  return {
    title: document.title,
    path: document.path,
    description: document.description,
    content,
    available_sections: document.headings.map((heading) => heading.title),
    key_points: document.key_points,
    references: document.references,
    requested_section: selected.title,
    truncated,
  };
}
