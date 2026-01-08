#!/usr/bin/env node
/**
 * Index Human Standards documentation into queryable knowledge base
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { StandardsIndex, CategoryIndex, DocumentIndex, ValidationRule, ComponentPattern } from '../types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to Human Standards docs
const DOCS_ROOT = path.join(__dirname, '../../../src/content/docs');
const OUTPUT_PATH = path.join(__dirname, '../../data/standards-index.json');

interface DocMetadata {
  title: string;
  description: string;
  content: string;
}

/**
 * Parse frontmatter and content from markdown file
 */
function parseMarkdown(filePath: string): DocMetadata | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const frontmatterMatch = content.match(/^---\n([\s\S]+?)\n---\n([\s\S]+)$/);

    if (!frontmatterMatch) {
      return null;
    }

    const frontmatter = frontmatterMatch[1];
    const body = frontmatterMatch[2];

    const titleMatch = frontmatter.match(/title:\s*(.+)/);
    const descMatch = frontmatter.match(/description:\s*(.+)/);

    return {
      title: titleMatch ? titleMatch[1].trim() : '',
      description: descMatch ? descMatch[1].trim() : '',
      content: body.trim()
    };
  } catch (err) {
    console.error(`Error parsing ${filePath}:`, err);
    return null;
  }
}

/**
 * Extract key points from document content
 */
function extractKeyPoints(content: string): string[] {
  const points: string[] = [];

  // Extract h2 headers as key points
  const headers = content.match(/^##\s+(.+)$/gm);
  if (headers) {
    headers.forEach(h => {
      const clean = h.replace(/^##\s+/, '').trim();
      if (clean && !clean.startsWith('References')) {
        points.push(clean);
      }
    });
  }

  // Extract key list items (bullets that seem important)
  const bullets = content.match(/^-\s+(.+)$/gm);
  if (bullets && bullets.length <= 10) {
    bullets.forEach(b => {
      const clean = b.replace(/^-\s+/, '').trim();
      if (clean.length < 100) {
        points.push(clean);
      }
    });
  }

  return points.slice(0, 8); // Limit to top 8
}

/**
 * Extract reference URLs from document
 */
function extractReferences(content: string): string[] {
  const refs: string[] = [];
  const urlRegex = /https?:\/\/[^\s\)]+/g;
  const matches = content.match(urlRegex);

  if (matches) {
    refs.push(...matches.slice(0, 5)); // Top 5 references
  }

  return refs;
}

/**
 * Index a single category directory
 */
function indexCategory(categoryPath: string, categoryName: string): CategoryIndex {
  const documents: DocumentIndex[] = [];

  try {
    const files = fs.readdirSync(categoryPath);

    for (const file of files) {
      if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;

      const filePath = path.join(categoryPath, file);
      const metadata = parseMarkdown(filePath);

      if (!metadata) continue;

      const relativePath = path.relative(DOCS_ROOT, filePath);

      documents.push({
        title: metadata.title,
        path: '/' + relativePath.replace(/\\/g, '/'),
        description: metadata.description,
        key_points: extractKeyPoints(metadata.content),
        references: extractReferences(metadata.content)
      });
    }
  } catch (err) {
    console.error(`Error indexing category ${categoryName}:`, err);
  }

  return {
    name: categoryName,
    description: `Human factors guidance for ${categoryName.toLowerCase()}`,
    documents
  };
}

/**
 * Generate validation rules from indexed docs
 */
function generateValidationRules(index: StandardsIndex): ValidationRule[] {
  const rules: ValidationRule[] = [
    // Accessibility rules
    {
      id: 'wcag-contrast-text',
      category: 'accessibility',
      severity: 'error',
      description: 'Text must have sufficient contrast ratio',
      check: 'Color contrast ratio must be at least 4.5:1 for normal text, 3:1 for large text (WCAG AA)',
      reference: '/accessibility/wcag-guidelines.md#perceivable'
    },
    {
      id: 'wcag-aria-labels',
      category: 'accessibility',
      severity: 'error',
      description: 'Form inputs must have associated labels',
      check: 'Every input must have a visible label linked via for/id or aria-label',
      reference: '/accessibility/wcag-guidelines.md#understandable'
    },
    {
      id: 'wcag-focus-indicators',
      category: 'accessibility',
      severity: 'error',
      description: 'Interactive elements must have visible focus indicators',
      check: 'Keyboard focus must be clearly visible (recommend 3px outline)',
      reference: '/accessibility/wcag-guidelines.md#operable'
    },

    // Cognitive load rules
    {
      id: 'cognitive-form-length',
      category: 'cognitive-load',
      severity: 'warning',
      description: 'Long forms should use progressive disclosure',
      check: 'Forms with 6+ fields should be broken into steps',
      reference: '/cognition/cognitive-load.md#chunk-information'
    },
    {
      id: 'cognitive-error-clarity',
      category: 'cognitive-load',
      severity: 'error',
      description: 'Error messages must be specific and actionable',
      check: 'Avoid vague errors like "Invalid" - explain what went wrong and how to fix',
      reference: '/cognition/cognitive-load.md#clear-error-recovery'
    },

    // Ergonomics rules
    {
      id: 'ergonomics-touch-targets',
      category: 'ergonomics',
      severity: 'warning',
      description: 'Touch targets must meet minimum size',
      check: 'Interactive elements must be at least 44x44pt (iOS) or 48x48dp (Android)',
      reference: '/ergonomics/targets-spacing.md'
    },

    // Forms rules
    {
      id: 'forms-autocomplete',
      category: 'forms',
      severity: 'warning',
      description: 'Form inputs should enable autocomplete',
      check: 'Use autocomplete attributes for name, email, address, phone, etc.',
      reference: '/interaction-patterns/forms.md#enable-autocomplete'
    },
    {
      id: 'forms-visible-labels',
      category: 'forms',
      severity: 'error',
      description: 'Use visible labels, not placeholders',
      check: 'Placeholder text is not a substitute for labels - labels must remain visible',
      reference: '/interaction-patterns/forms.md#always-use-visible-labels'
    },

    // Defensive design rules
    {
      id: 'defensive-autosave',
      category: 'defensive-design',
      severity: 'warning',
      description: 'Long forms should implement autosave',
      check: 'Forms with multiple fields should save drafts to prevent data loss',
      reference: '/decision-making-errors/defensive-design.md#autosave-everything'
    },
    {
      id: 'defensive-destructive-confirm',
      category: 'defensive-design',
      severity: 'error',
      description: 'Destructive actions must require confirmation',
      check: 'Delete, remove, and other destructive actions need confirmation dialogs',
      reference: '/decision-making-errors/defensive-design.md#show-state-and-consequences'
    }
  ];

  return rules;
}

/**
 * Generate component patterns from knowledge
 */
function generateComponentPatterns(): ComponentPattern[] {
  return [
    {
      component: 'form',
      context: { fields: 6, complexity: 'moderate' },
      guidance: {
        cognitive_load: {
          assessment: 'High cognitive load for 6+ fields',
          recommendation: 'Use progressive disclosure - break into 2-3 steps',
          reference: '/cognition/cognitive-load.md#chunk-information',
          implementation: ['Multi-step wizard', 'Group related fields', 'Show progress indicator']
        },
        accessibility: {
          requirements: [
            'Every input has visible label',
            'Required fields marked with aria-required',
            'Errors use aria-invalid and aria-describedby',
            'Form works without JavaScript for critical paths'
          ],
          wcag_level: 'AA',
          reference: '/accessibility/wcag-guidelines.md',
          aria_requirements: ['aria-required', 'aria-invalid', 'aria-describedby']
        },
        forms: {
          validation_timing: 'on blur',
          error_messages: 'specific and actionable',
          autocomplete: true,
          reference: '/interaction-patterns/forms.md'
        },
        defensive_design: {
          required: ['autosave', 'clear error messages', 'beforeunload warning'],
          optional: ['draft restoration', 'progress preservation'],
          reference: '/decision-making-errors/defensive-design.md'
        }
      }
    },
    {
      component: 'button',
      context: { importance: 'destructive', platform: 'mobile' },
      guidance: {
        ergonomics: {
          min_touch_target: '48x48px',
          spacing: '12px from adjacent targets',
          reference: '/ergonomics/targets-spacing.md'
        },
        defensive_design: {
          required: ['confirmation dialog', 'clear consequences'],
          optional: ['undo window'],
          reference: '/decision-making-errors/defensive-design.md'
        },
        accessibility: {
          requirements: [
            'Sufficient color contrast (4.5:1 minimum)',
            'Visible focus indicator',
            'Clear label (not icon-only)'
          ],
          wcag_level: 'AA',
          reference: '/accessibility/wcag-guidelines.md'
        }
      }
    },
    {
      component: 'modal',
      guidance: {
        cognitive_load: {
          assessment: 'Modals interrupt flow and increase cognitive load',
          recommendation: 'Use sparingly, only for critical decisions or confirmations',
          reference: '/cognition/cognitive-load.md',
          implementation: ['Focus trap', 'Clear close action', 'ESC key support']
        },
        accessibility: {
          requirements: [
            'Focus trap within modal',
            'Return focus on close',
            'role="dialog" and aria-modal="true"',
            'Keyboard dismissible (ESC)'
          ],
          wcag_level: 'AA',
          reference: '/accessibility/wcag-guidelines.md'
        }
      }
    }
  ];
}

/**
 * Main indexing function
 */
function indexDocumentation(): StandardsIndex {
  const categories: { [key: string]: CategoryIndex } = {};

  const categoryDirs = [
    'accessibility',
    'cognition',
    'perception',
    'emotions-motivation',
    'decision-making-errors',
    'ergonomics',
    'interaction-patterns',
    'code-design-tokens',
    'checklists-playbooks',
    'case-studies',
    'research-methods-metrics',
    'social-cultural',
    'references',
    'human-overview',
    'home'
  ];

  for (const dir of categoryDirs) {
    const categoryPath = path.join(DOCS_ROOT, dir);

    if (!fs.existsSync(categoryPath)) {
      console.warn(`Category directory not found: ${dir}`);
      continue;
    }

    const categoryIndex = indexCategory(categoryPath, dir);
    categories[dir] = categoryIndex;

    console.log(`✓ Indexed ${categoryIndex.documents.length} documents in ${dir}`);
  }

  const index: StandardsIndex = {
    categories,
    rules: [],
    patterns: []
  };

  // Generate rules and patterns
  index.rules = generateValidationRules(index);
  index.patterns = generateComponentPatterns();

  console.log(`\n✓ Generated ${index.rules.length} validation rules`);
  console.log(`✓ Generated ${index.patterns.length} component patterns`);

  return index;
}

/**
 * Save index to file
 */
function saveIndex(index: StandardsIndex): void {
  const dataDir = path.dirname(OUTPUT_PATH);

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(index, null, 2));
  console.log(`\n✓ Index saved to ${OUTPUT_PATH}`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Indexing Human Standards documentation...\n');
  const index = indexDocumentation();
  saveIndex(index);
  console.log('\n✓ Indexing complete!');
}

export { indexDocumentation, saveIndex };
