/**
 * Human Standards MCP Server Types
 */

export interface StandardsIndex {
  categories: {
    [key: string]: CategoryIndex;
  };
  rules: ValidationRule[];
  patterns: ComponentPattern[];
}

export interface CategoryIndex {
  name: string;
  description: string;
  documents: DocumentIndex[];
}

export interface DocumentIndex {
  title: string;
  path: string;
  description: string;
  key_points: string[];
  references: string[];
}

export interface ValidationRule {
  id: string;
  category: string;
  severity: 'error' | 'warning' | 'info';
  description: string;
  check: string;
  reference: string;
}

export interface ComponentPattern {
  component: string;
  context?: Record<string, unknown>;
  guidance: Record<string, unknown>;
}
