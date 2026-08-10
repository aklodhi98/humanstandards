/**
 * Human Standards MCP Server Types
 */

export interface StandardsIndex {
  schema_version: '2.0';
  document_count: number;
  categories: Record<string, CategoryIndex>;
}

export interface CategoryIndex {
  name: string;
  description: string;
  documents: DocumentIndex[];
}

export interface DocumentHeading {
  level: number;
  title: string;
}

export interface DocumentIndex {
  title: string;
  path: string;
  source_path: string;
  description: string;
  content: string;
  headings: DocumentHeading[];
  key_points: string[];
  references: string[];
}

export interface StandardsSearchResult {
  title: string;
  path: string;
  description: string;
  matched_terms: string[];
  snippet: string;
  relevance: number;
}

export interface StandardDocumentResult {
  title: string;
  path: string;
  description: string;
  content: string;
  available_sections: string[];
  key_points: string[];
  references: string[];
  requested_section: string | null;
  truncated: boolean;
}
