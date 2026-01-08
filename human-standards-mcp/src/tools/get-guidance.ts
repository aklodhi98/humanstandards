/**
 * Get Human Standards guidance for components
 */

import { StandardsGuidance, ComponentContext, StandardsIndex } from '../types/index.js';

export function getComponentGuidance(
  component: string,
  context: ComponentContext,
  index: StandardsIndex
): StandardsGuidance {
  // Find matching pattern
  const pattern = index.patterns.find(p => {
    if (p.component !== component) return false;

    // Match context if specified
    if (p.context) {
      if (p.context.importance && p.context.importance !== context.importance) return false;
      if (p.context.platform && p.context.platform !== context.platform) return false;
      if (p.context.complexity && p.context.complexity !== context.complexity) return false;
    }

    return true;
  });

  if (pattern) {
    return pattern.guidance;
  }

  // Fallback: generate basic guidance
  return generateDefaultGuidance(component, context, index);
}

function generateDefaultGuidance(
  component: string,
  context: ComponentContext,
  index: StandardsIndex
): StandardsGuidance {
  const guidance: StandardsGuidance = {};

  // Add accessibility baseline
  guidance.accessibility = {
    requirements: [
      'Keyboard accessible',
      'Screen reader friendly',
      'Sufficient color contrast (4.5:1)',
      'Visible focus indicators'
    ],
    wcag_level: 'AA',
    reference: '/accessibility/wcag-guidelines.md'
  };

  // Add ergonomics for interactive components
  if (['button', 'input', 'link'].includes(component)) {
    guidance.ergonomics = {
      min_touch_target: '44x44pt (iOS) or 48x48dp (Android)',
      spacing: '8-12px between adjacent targets',
      reference: '/ergonomics/targets-spacing.md'
    };
  }

  // Add form-specific guidance
  if (component === 'form') {
    guidance.forms = {
      validation_timing: 'on blur (not on keystroke)',
      error_messages: 'specific and actionable',
      autocomplete: true,
      reference: '/interaction-patterns/forms.md'
    };

    // Check cognitive load based on field count
    if (context.fields && context.fields >= 6) {
      guidance.cognitive_load = {
        assessment: `High cognitive load for ${context.fields} fields`,
        recommendation: 'Use progressive disclosure - break into steps',
        reference: '/cognition/cognitive-load.md#chunk-information',
        implementation: ['Multi-step wizard', '3-4 fields per step', 'Progress indicator']
      };
    } else {
      guidance.cognitive_load = {
        assessment: 'Moderate cognitive load',
        recommendation: 'Keep form short and focused',
        reference: '/cognition/cognitive-load.md',
        implementation: ['Group related fields', 'Provide inline help', 'Use autocomplete']
      };
    }
  }

  // Add defensive design for destructive actions
  if (context.importance === 'destructive') {
    guidance.defensive_design = {
      required: [
        'Confirmation dialog',
        'Show consequences clearly',
        'Provide undo option if possible'
      ],
      optional: ['Soft delete', 'Delayed execution'],
      reference: '/decision-making-errors/defensive-design.md'
    };
  }

  return guidance;
}

export function searchDocumentation(
  query: string,
  index: StandardsIndex
): Array<{ title: string; path: string; description: string; relevance: number }> {
  const results: Array<{ title: string; path: string; description: string; relevance: number }> = [];
  const queryLower = query.toLowerCase();

  // Search through all categories and documents
  for (const [categoryName, category] of Object.entries(index.categories)) {
    for (const doc of category.documents) {
      let relevance = 0;

      // Check title match
      if (doc.title.toLowerCase().includes(queryLower)) {
        relevance += 10;
      }

      // Check description match
      if (doc.description.toLowerCase().includes(queryLower)) {
        relevance += 5;
      }

      // Check key points match
      for (const point of doc.key_points) {
        if (point.toLowerCase().includes(queryLower)) {
          relevance += 2;
        }
      }

      // Check category match
      if (categoryName.toLowerCase().includes(queryLower)) {
        relevance += 3;
      }

      if (relevance > 0) {
        results.push({
          title: doc.title,
          path: doc.path,
          description: doc.description,
          relevance
        });
      }
    }
  }

  // Sort by relevance
  results.sort((a, b) => b.relevance - a.relevance);

  return results.slice(0, 10); // Top 10 results
}
