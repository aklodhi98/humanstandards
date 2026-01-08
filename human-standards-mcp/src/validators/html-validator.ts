/**
 * HTML Validation against Human Standards
 */

import { load } from 'cheerio';
import { ValidationResult, ValidationIssue } from '../types/index.js';

export class HtmlValidator {
  /**
   * Validate HTML against Human Standards
   */
  validate(html: string, componentType?: string): ValidationResult {
    const $ = load(html);
    const issues: ValidationIssue[] = [];

    // Run all validation checks
    this.checkAccessibility($, issues);
    this.checkCognitiveLoad($, issues, componentType);
    this.checkErgonomics($, issues);
    this.checkForms($, issues);
    this.checkDefensiveDesign($, issues);

    // Calculate summary
    const summary = {
      errors: issues.filter(i => i.severity === 'error').length,
      warnings: issues.filter(i => i.severity === 'warning').length,
      info: issues.filter(i => i.severity === 'info').length
    };

    // Calculate compliance
    const wcagAA = summary.errors === 0 &&
                   !issues.some(i => i.category === 'accessibility' && i.severity === 'error');

    const fieldCount = $('input, select, textarea').length;
    const cognitiveLoad = fieldCount > 8 ? 'high' : fieldCount > 4 ? 'medium' : 'low';

    const hasLargeTouchTargets = this.checkTouchTargetSizes($);

    // Calculate score (0-100)
    const maxPoints = 100;
    const errorPenalty = summary.errors * 15;
    const warningPenalty = summary.warnings * 5;
    const infoPenalty = summary.info * 1;
    const score = Math.max(0, maxPoints - errorPenalty - warningPenalty - infoPenalty);

    return {
      passed: summary.errors === 0,
      score,
      issues,
      summary,
      compliance: {
        wcag_aa: wcagAA,
        cognitive_load: cognitiveLoad,
        mobile_friendly: hasLargeTouchTargets
      }
    };
  }

  /**
   * Check accessibility issues
   */
  private checkAccessibility($: any, issues: ValidationIssue[]): void {
    // Check for missing alt text
    $('img').each((i: number, el: any) => {
      const $el = $(el);
      if (!$el.attr('alt') && !$el.attr('aria-label')) {
        issues.push({
          severity: 'error',
          rule: 'wcag-alt-text',
          category: 'accessibility',
          message: 'Image missing alt text',
          element: this.getSelector($el),
          recommendation: 'Add descriptive alt text or aria-label to images',
          reference: '/accessibility/wcag-guidelines.md#perceivable'
        });
      }
    });

    // Check for form labels
    $('input, select, textarea').each((i: number, el: any) => {
      const $el = $(el);
      const id = $el.attr('id');
      const ariaLabel = $el.attr('aria-label');
      const hasLabel = id && $(`label[for="${id}"]`).length > 0;

      if (!hasLabel && !ariaLabel && $el.attr('type') !== 'hidden') {
        issues.push({
          severity: 'error',
          rule: 'wcag-aria-labels',
          category: 'accessibility',
          message: 'Form input missing label',
          element: this.getSelector($el),
          recommendation: 'Add a visible <label> element linked via for/id or use aria-label',
          reference: '/accessibility/wcag-guidelines.md#understandable'
        });
      }
    });

    // Check for missing ARIA attributes on required fields
    $('input[required], select[required], textarea[required]').each((i: number, el: any) => {
      const $el = $(el);
      if (!$el.attr('aria-required')) {
        issues.push({
          severity: 'warning',
          rule: 'aria-required',
          category: 'accessibility',
          message: 'Required field missing aria-required attribute',
          element: this.getSelector($el),
          recommendation: 'Add aria-required="true" to required fields',
          reference: '/interaction-patterns/forms.md#accessibility-essentials'
        });
      }
    });

    // Check for missing lang attribute
    if (!$('html').attr('lang')) {
      issues.push({
        severity: 'error',
        rule: 'wcag-document-language',
        category: 'accessibility',
        message: 'Missing document language attribute',
        element: '<html>',
        recommendation: 'Add lang attribute to <html> element (e.g., lang="en")',
        reference: '/accessibility/wcag-guidelines.md#understandable'
      });
    }

    // Check for heading hierarchy
    const headings = $('h1, h2, h3, h4, h5, h6').toArray();
    if (headings.length > 0) {
      let prevLevel = 0;
      headings.forEach((el: any) => {
        const level = parseInt(el.tagName[1]);
        if (prevLevel > 0 && level > prevLevel + 1) {
          issues.push({
            severity: 'warning',
            rule: 'heading-hierarchy',
            category: 'accessibility',
            message: `Heading level skipped (${prevLevel} to ${level})`,
            element: el.tagName.toLowerCase(),
            recommendation: 'Maintain sequential heading hierarchy for screen readers',
            reference: '/accessibility/wcag-guidelines.md#understandable'
          });
        }
        prevLevel = level;
      });
    }
  }

  /**
   * Check cognitive load issues
   */
  private checkCognitiveLoad($: any, issues: ValidationIssue[], componentType?: string): void {
    // Count visible form fields
    const fields = $('input:not([type="hidden"]), select, textarea').length;

    if (fields >= 6 && componentType === 'form') {
      issues.push({
        severity: 'warning',
        rule: 'cognitive-form-length',
        category: 'cognitive-load',
        message: `Form has ${fields} fields without progressive disclosure`,
        recommendation: 'Break long forms into 2-3 steps with 3-4 fields each',
        reference: '/cognition/cognitive-load.md#chunk-information'
      });
    }

    // Check for vague error messages
    $('.error, [class*="error"]').each((i: number, el: any) => {
      const text = $(el).text().trim().toLowerCase();
      const vagueErrors = ['invalid', 'error', 'wrong', 'bad'];

      if (vagueErrors.some(v => text === v)) {
        issues.push({
          severity: 'error',
          rule: 'cognitive-error-clarity',
          category: 'cognitive-load',
          message: `Vague error message: "${text}"`,
          element: this.getSelector($(el)),
          recommendation: 'Use specific, actionable error messages (e.g., "Email must include @")',
          reference: '/cognition/cognitive-load.md#clear-error-recovery'
        });
      }
    });

    // Check for placeholder-only labels (no visible label)
    $('input[placeholder], textarea[placeholder]').each((i: number, el: any) => {
      const $el = $(el);
      const id = $el.attr('id');
      const hasVisibleLabel = id && $(`label[for="${id}"]`).length > 0;

      if (!hasVisibleLabel && !$el.attr('aria-label')) {
        issues.push({
          severity: 'warning',
          rule: 'visible-labels',
          category: 'cognitive-load',
          message: 'Using placeholder as label (disappears on focus)',
          element: this.getSelector($el),
          recommendation: 'Add a visible label - placeholder text is not a substitute',
          reference: '/interaction-patterns/forms.md#always-use-visible-labels'
        });
      }
    });
  }

  /**
   * Check ergonomics issues
   */
  private checkErgonomics($: any, issues: ValidationIssue[]): void {
    // Check button sizes (rough heuristic)
    $('button, input[type="submit"], input[type="button"]').each((i: number, el: any) => {
      const $el = $(el);
      const style = $el.attr('style') || '';
      const hasMinHeight = style.includes('height') || style.includes('padding');

      if (!hasMinHeight) {
        issues.push({
          severity: 'info',
          rule: 'ergonomics-touch-targets',
          category: 'ergonomics',
          message: 'Button may not meet minimum touch target size',
          element: this.getSelector($el),
          recommendation: 'Ensure buttons are at least 44x44pt (iOS) or 48x48dp (Android)',
          reference: '/ergonomics/targets-spacing.md'
        });
      }
    });
  }

  /**
   * Check forms best practices
   */
  private checkForms($: any, issues: ValidationIssue[]): void {
    // Check for autocomplete attributes
    $('input[type="email"], input[type="tel"], input[name*="name"], input[name*="address"]').each((i: number, el: any) => {
      const $el = $(el);
      if (!$el.attr('autocomplete')) {
        issues.push({
          severity: 'warning',
          rule: 'forms-autocomplete',
          category: 'forms',
          message: 'Input missing autocomplete attribute',
          element: this.getSelector($el),
          recommendation: 'Add autocomplete attribute (e.g., autocomplete="email") for better UX',
          reference: '/interaction-patterns/forms.md#enable-autocomplete'
        });
      }
    });

    // Check for validation feedback elements
    $('input[required], select[required]').each((i: number, el: any) => {
      const $el = $(el);
      const describedBy = $el.attr('aria-describedby');

      if (!describedBy) {
        issues.push({
          severity: 'info',
          rule: 'forms-error-association',
          category: 'forms',
          message: 'Required field missing aria-describedby for error messages',
          element: this.getSelector($el),
          recommendation: 'Add aria-describedby linking to error message element',
          reference: '/interaction-patterns/forms.md#show-errors-clearly'
        });
      }
    });
  }

  /**
   * Check defensive design patterns
   */
  private checkDefensiveDesign($: any, issues: ValidationIssue[]): void {
    // Look for forms without apparent autosave
    const forms = $('form');
    if (forms.length > 0) {
      const hasAutosave = $('script').text().includes('localStorage') ||
                          $('script').text().includes('autosave');

      if (!hasAutosave) {
        issues.push({
          severity: 'info',
          rule: 'defensive-autosave',
          category: 'defensive-design',
          message: 'Form may not implement autosave',
          recommendation: 'Consider adding autosave to prevent data loss on accidental close',
          reference: '/decision-making-errors/defensive-design.md#autosave-everything'
        });
      }
    }

    // Check for destructive actions without confirmation
    $('button, a').each((i: number, el: any) => {
      const $el = $(el);
      const text = $el.text().toLowerCase();
      const destructiveKeywords = ['delete', 'remove', 'destroy', 'erase'];

      if (destructiveKeywords.some(k => text.includes(k))) {
        const hasConfirm = $el.attr('onclick')?.includes('confirm') || false;

        if (!hasConfirm) {
          issues.push({
            severity: 'warning',
            rule: 'defensive-destructive-confirm',
            category: 'defensive-design',
            message: 'Destructive action may not require confirmation',
            element: this.getSelector($el),
            recommendation: 'Add confirmation dialog for destructive actions',
            reference: '/decision-making-errors/defensive-design.md#show-state-and-consequences'
          });
        }
      }
    });
  }

  /**
   * Check touch target sizes (simplified)
   */
  private checkTouchTargetSizes($: any): boolean {
    let hasIssues = false;

    $('button, input, select, a').each((i: number, el: any) => {
      const style = $(el).attr('style') || '';
      // Very basic check - in reality would need to compute styles
      if (!style.includes('padding') && !style.includes('height')) {
        hasIssues = true;
      }
    });

    return !hasIssues;
  }

  /**
   * Get a simple selector for an element
   */
  private getSelector($el: any): string {
    const tag = $el[0].tagName?.toLowerCase() || 'unknown';
    const id = $el.attr('id');
    const classes = $el.attr('class');

    if (id) return `${tag}#${id}`;
    if (classes) return `${tag}.${classes.split(' ')[0]}`;
    return tag;
  }
}
