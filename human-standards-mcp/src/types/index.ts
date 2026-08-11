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

export type SpatialRelationshipId =
  | 'attached'
  | 'associated'
  | 'grouped'
  | 'separated'
  | 'sectional';

export type SpatialRhythmPatternId =
  | 'form-stack'
  | 'settings-section'
  | 'card-collection'
  | 'editorial-flow'
  | 'dashboard';

export type SpatialDensity = 'compact' | 'comfortable' | 'spacious';
export type SpatialViewport = 'small' | 'medium' | 'large' | 'fluid';

export interface SpatialRelationship {
  id: SpatialRelationshipId;
  rank: number;
  intent: string;
  use_when: string;
  examples: string[];
  failure_signals: string[];
}

export interface SpatialRhythmPrinciple {
  id: string;
  name: string;
  guidance: string;
  validation: string;
}

export interface SpatialPatternRelationship {
  from: string;
  to: string;
  relationship: SpatialRelationshipId;
  rationale: string;
}

export interface SpatialRhythmPattern {
  id: SpatialRhythmPatternId;
  name: string;
  description: string;
  relationships: SpatialPatternRelationship[];
  rhythm: string[];
  responsive_behavior: string[];
  manual_review: string[];
}

export interface SpatialRhythmReference {
  title: string;
  url: string;
  role: string;
}

export interface SpatialRhythmContract {
  schema_version: '1.0';
  standard_id: 'HS-SPATIAL-RHYTHM';
  title: string;
  principle: string;
  relationship_order: SpatialRelationship[];
  principles: SpatialRhythmPrinciple[];
  patterns: SpatialRhythmPattern[];
  density_modes: Record<SpatialDensity, string>;
  viewport_modes: Record<SpatialViewport, string>;
  token_resolution: {
    status: 'product-context-required';
    instruction: string;
    fallback: string;
    exception_policy: string;
  };
  evidence_boundary: {
    normative: string[];
    supplemental_accessibility_guidance: string[];
    design_guidance: string[];
  };
  references: SpatialRhythmReference[];
}

export interface SpatialRhythmResult {
  standard_id: string;
  title: string;
  principle: string;
  relationship_order: SpatialRelationship[];
  principles: SpatialRhythmPrinciple[];
  available_patterns: Array<{ id: SpatialRhythmPatternId; name: string }>;
  patterns: SpatialRhythmPattern[];
  selected_context: {
    density: SpatialDensity;
    density_guidance: string;
    viewport: SpatialViewport;
    viewport_guidance: string;
  };
  token_resolution: SpatialRhythmContract['token_resolution'];
  evidence_boundary: SpatialRhythmContract['evidence_boundary'];
  references: SpatialRhythmReference[];
  source: string;
}
