/**
 * Check color contrast ratios against WCAG standards
 */

import { ContrastCheck } from '../types/index.js';

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

/**
 * Calculate relative luminance
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio
 * https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) {
    throw new Error('Invalid color format. Use hex format (e.g., #FFFFFF)');
  }

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG standards
 */
export function checkContrast(
  foreground: string,
  background: string,
  fontSize: number = 16,
  isBold: boolean = false
): ContrastCheck {
  const ratio = getContrastRatio(foreground, background);

  // Large text is 18pt+ or 14pt+ bold
  const isLargeText = fontSize >= 18 || (fontSize >= 14 && isBold);

  // WCAG AA: 4.5:1 for normal text, 3:1 for large text
  const aaThreshold = isLargeText ? 3.0 : 4.5;
  const passes_aa = ratio >= aaThreshold;

  // WCAG AAA: 7:1 for normal text, 4.5:1 for large text
  const aaaThreshold = isLargeText ? 4.5 : 7.0;
  const passes_aaa = ratio >= aaaThreshold;

  let recommendation: string | undefined;
  if (!passes_aa) {
    if (isLargeText) {
      recommendation = `Contrast ratio ${ratio.toFixed(2)}:1 is too low for large text. Needs at least 3:1 (AA) or 4.5:1 (AAA).`;
    } else {
      recommendation = `Contrast ratio ${ratio.toFixed(2)}:1 is too low. Needs at least 4.5:1 (AA) or 7:1 (AAA).`;
    }
  } else if (!passes_aaa) {
    recommendation = `Meets WCAG AA but not AAA. Consider improving to ${aaaThreshold}:1 for better accessibility.`;
  }

  return {
    ratio: Math.round(ratio * 100) / 100,
    passes_aa,
    passes_aaa,
    level: isLargeText ? 'large' : 'normal',
    recommendation
  };
}

/**
 * Suggest better color combinations
 */
export function suggestBetterContrast(
  foreground: string,
  background: string,
  targetRatio: number = 4.5
): { foreground: string; background: string; ratio: number } {
  // Simple approach: darken foreground or lighten background
  // In a real implementation, this would be more sophisticated

  const fgRgb = hexToRgb(foreground);
  const bgRgb = hexToRgb(background);

  if (!fgRgb || !bgRgb) {
    throw new Error('Invalid color format');
  }

  // Try darkening foreground
  let factor = 0.8;
  let newFg = rgbToHex(
    Math.floor(fgRgb.r * factor),
    Math.floor(fgRgb.g * factor),
    Math.floor(fgRgb.b * factor)
  );

  let ratio = getContrastRatio(newFg, background);

  if (ratio < targetRatio) {
    // Try lightening background instead
    factor = 1.2;
    const newBg = rgbToHex(
      Math.min(255, Math.floor(bgRgb.r * factor)),
      Math.min(255, Math.floor(bgRgb.g * factor)),
      Math.min(255, Math.floor(bgRgb.b * factor))
    );

    ratio = getContrastRatio(foreground, newBg);

    return {
      foreground,
      background: newBg,
      ratio: Math.round(ratio * 100) / 100
    };
  }

  return {
    foreground: newFg,
    background,
    ratio: Math.round(ratio * 100) / 100
  };
}

/**
 * Convert RGB to hex
 */
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}
