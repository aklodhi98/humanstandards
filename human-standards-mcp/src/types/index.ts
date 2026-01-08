/**
 * Human Standards MCP Server Types
 */

export interface ComponentContext {
  type: 'form' | 'button' | 'modal' | 'notification' | 'navigation' | 'card' | 'table' | 'input';
  importance?: 'primary' | 'secondary' | 'destructive';
  platform?: 'web' | 'mobile' | 'desktop';
  fields?: number;
  steps?: number;
  complexity?: 'simple' | 'moderate' | 'complex';
}

export interface StandardsGuidance {
  cognitive_load?: {
    assessment: string;
    recommendation: string;
    reference: string;
    implementation?: string[];
  };
  accessibility?: {
    requirements: string[];
    wcag_level: 'A' | 'AA' | 'AAA';
    reference: string;
    aria_requirements?: string[];
  };
  forms?: {
    validation_timing: string;
    error_messages: string;
    autocomplete: boolean;
    reference: string;
  };
  defensive_design?: {
    required: string[];
    optional: string[];
    reference: string;
  };
  ergonomics?: {
    min_touch_target: string;
    spacing: string;
    reference: string;
  };
  perception?: {
    contrast_ratio: string;
    font_size: string;
    reference: string;
  };
}

export interface ValidationIssue {
  severity: 'error' | 'warning' | 'info';
  rule: string;
  category: 'accessibility' | 'cognitive-load' | 'ergonomics' | 'defensive-design' | 'forms';
  message: string;
  element?: string;
  line?: number;
  recommendation: string;
  reference: string;
}

export interface ValidationResult {
  passed: boolean;
  score: number; // 0-100
  issues: ValidationIssue[];
  summary: {
    errors: number;
    warnings: number;
    info: number;
  };
  compliance: {
    wcag_aa: boolean;
    cognitive_load: 'low' | 'medium' | 'high';
    mobile_friendly: boolean;
  };
}

export interface ContrastCheck {
  ratio: number;
  passes_aa: boolean;
  passes_aaa: boolean;
  level: 'normal' | 'large';
  recommendation?: string;
}

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
  check: string; // Description of what to check
  reference: string;
}

export interface ComponentPattern {
  component: string;
  context?: Partial<ComponentContext>;
  guidance: StandardsGuidance;
}
