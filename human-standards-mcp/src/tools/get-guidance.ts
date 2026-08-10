/**
 * Search Human Standards documentation using token coverage, field weighting,
 * and matched excerpts from the actual document body.
 */

import { StandardsIndex, StandardsSearchResult } from '../types/index.js';

const STOP_WORDS = new Set(['a', 'an', 'and', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'with']);
const SPELLING_ALIASES: Record<string, string> = {
  behaviour: 'behavior',
  centre: 'center',
  colour: 'color',
  organisation: 'organization',
};

function stem(token: string): string {
  if (token.length > 4 && token.endsWith('ies')) return `${token.slice(0, -3)}y`;
  if (token.length > 4 && token.endsWith('es')) return token.slice(0, -2);
  if (token.length > 3 && token.endsWith('s')) return token.slice(0, -1);
  return token;
}

export function normalizeSearchText(value: string): string {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => stem(SPELLING_ALIASES[token] ?? token))
    .join(' ');
}

function queryTerms(query: string): string[] {
  const normalized = normalizeSearchText(query);
  if (!normalized) throw new Error('Search query must contain at least one word.');
  const terms = normalized.split(' ').filter((token) => !STOP_WORDS.has(token));
  if (terms.length === 0) throw new Error('Search query must contain a meaningful word.');
  return [...new Set(terms)];
}

function termMatches(normalizedText: string, term: string): boolean {
  return normalizedText.split(' ').includes(term);
}

function cleanSnippet(value: string): string {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_`>|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function bestSnippet(content: string, terms: string[], fallback: string): string {
  const candidates = content
    .split(/\n\s*\n/)
    .map(cleanSnippet)
    .filter((candidate) => candidate.length >= 30 && candidate.length <= 1200);

  let best = fallback;
  let bestScore = -1;
  for (const candidate of candidates) {
    const normalized = normalizeSearchText(candidate);
    const score = terms.reduce((total, term) => total + (termMatches(normalized, term) ? 1 : 0), 0);
    if (score > bestScore) {
      best = candidate;
      bestScore = score;
    }
  }

  return best.length <= 500 ? best : `${best.slice(0, 497).trimEnd()}…`;
}

export function searchDocumentation(
  query: string,
  index: StandardsIndex,
  limit = 5,
): StandardsSearchResult[] {
  const terms = queryTerms(query);
  const normalizedPhrase = normalizeSearchText(query);
  const safeLimit = Math.min(10, Math.max(1, Math.trunc(limit)));
  const results: StandardsSearchResult[] = [];

  for (const [categoryName, category] of Object.entries(index.categories)) {
    for (const document of category.documents) {
      const fields = {
        title: normalizeSearchText(document.title),
        description: normalizeSearchText(document.description),
        keyPoints: normalizeSearchText(document.key_points.join(' ')),
        category: normalizeSearchText(categoryName),
        content: normalizeSearchText(document.content),
      };
      const matchedTerms = terms.filter((term) => Object.values(fields).some((field) => termMatches(field, term)));
      if (matchedTerms.length === 0) continue;

      let relevance = Math.round((matchedTerms.length / terms.length) * 20);
      if (fields.title.includes(normalizedPhrase)) relevance += 24;
      if (fields.description.includes(normalizedPhrase)) relevance += 12;
      if (fields.keyPoints.includes(normalizedPhrase)) relevance += 10;
      if (fields.content.includes(normalizedPhrase)) relevance += 6;
      for (const term of matchedTerms) {
        if (termMatches(fields.title, term)) relevance += 10;
        if (termMatches(fields.description, term)) relevance += 6;
        if (termMatches(fields.keyPoints, term)) relevance += 5;
        if (termMatches(fields.category, term)) relevance += 3;
        if (termMatches(fields.content, term)) relevance += 2;
      }

      results.push({
        title: document.title,
        path: document.path,
        description: document.description,
        matched_terms: matchedTerms,
        snippet: bestSnippet(document.content, terms, document.description),
        relevance,
      });
    }
  }

  return results
    .sort((left, right) => right.relevance - left.relevance || left.title.localeCompare(right.title))
    .slice(0, safeLimit);
}
