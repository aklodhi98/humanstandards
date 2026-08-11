import {
  SpatialDensity,
  SpatialRelationshipId,
  SpatialRhythmContract,
  SpatialRhythmPatternId,
  SpatialRhythmResult,
  SpatialViewport,
} from './types/index.js';

const RELATIONSHIP_IDS: SpatialRelationshipId[] = [
  'attached',
  'associated',
  'grouped',
  'separated',
  'sectional',
];

const PATTERN_IDS: SpatialRhythmPatternId[] = [
  'form-stack',
  'settings-section',
  'card-collection',
  'editorial-flow',
  'dashboard',
];

const DENSITIES: SpatialDensity[] = ['compact', 'comfortable', 'spacious'];
const VIEWPORTS: SpatialViewport[] = ['small', 'medium', 'large', 'fluid'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function hasStrings(value: unknown): value is string[] {
  return Array.isArray(value) && value.length > 0 && value.every((item) => typeof item === 'string' && item.length > 0);
}

export function assertValidSpatialRhythmContract(value: unknown): asserts value is SpatialRhythmContract {
  if (!isRecord(value)) throw new Error('Spatial rhythm contract is not an object.');
  if (value.schema_version !== '1.0') {
    throw new Error(`Unsupported spatial rhythm schema: ${String(value.schema_version)}`);
  }
  if (value.standard_id !== 'HS-SPATIAL-RHYTHM') {
    throw new Error(`Unexpected spatial rhythm standard: ${String(value.standard_id)}`);
  }
  if (typeof value.title !== 'string' || typeof value.principle !== 'string') {
    throw new Error('Spatial rhythm contract is missing its title or principle.');
  }

  if (!Array.isArray(value.relationship_order) || value.relationship_order.length !== RELATIONSHIP_IDS.length) {
    throw new Error('Spatial rhythm contract must define all five ordered relationships.');
  }
  value.relationship_order.forEach((relationship, index) => {
    if (!isRecord(relationship)) throw new Error('Spatial rhythm relationship is malformed.');
    if (relationship.id !== RELATIONSHIP_IDS[index] || relationship.rank !== index + 1) {
      throw new Error('Spatial rhythm relationships must remain ordered from attached to sectional.');
    }
    if (
      typeof relationship.intent !== 'string' ||
      typeof relationship.use_when !== 'string' ||
      !hasStrings(relationship.examples) ||
      !hasStrings(relationship.failure_signals)
    ) {
      throw new Error(`Spatial rhythm relationship ${String(relationship.id)} is incomplete.`);
    }
  });

  if (!Array.isArray(value.principles) || value.principles.length === 0) {
    throw new Error('Spatial rhythm contract contains no principles.');
  }
  for (const principle of value.principles) {
    if (
      !isRecord(principle) ||
      typeof principle.id !== 'string' ||
      typeof principle.name !== 'string' ||
      typeof principle.guidance !== 'string' ||
      typeof principle.validation !== 'string'
    ) {
      throw new Error('Spatial rhythm principle is incomplete.');
    }
  }

  if (!Array.isArray(value.patterns) || value.patterns.length !== PATTERN_IDS.length) {
    throw new Error('Spatial rhythm contract must define all supported patterns.');
  }
  const relationshipIds = new Set(RELATIONSHIP_IDS);
  const seenPatternIds = new Set<string>();
  for (const pattern of value.patterns) {
    if (!isRecord(pattern) || !PATTERN_IDS.includes(pattern.id as SpatialRhythmPatternId)) {
      throw new Error(`Unknown spatial rhythm pattern: ${String(isRecord(pattern) ? pattern.id : pattern)}`);
    }
    if (seenPatternIds.has(pattern.id as string)) {
      throw new Error(`Duplicate spatial rhythm pattern: ${String(pattern.id)}`);
    }
    seenPatternIds.add(pattern.id as string);
    if (
      typeof pattern.name !== 'string' ||
      typeof pattern.description !== 'string' ||
      !Array.isArray(pattern.relationships) ||
      pattern.relationships.length === 0 ||
      !hasStrings(pattern.rhythm) ||
      !hasStrings(pattern.responsive_behavior) ||
      !hasStrings(pattern.manual_review)
    ) {
      throw new Error(`Spatial rhythm pattern ${String(pattern.id)} is incomplete.`);
    }
    for (const relationship of pattern.relationships) {
      if (
        !isRecord(relationship) ||
        typeof relationship.from !== 'string' ||
        typeof relationship.to !== 'string' ||
        !relationshipIds.has(relationship.relationship as SpatialRelationshipId) ||
        typeof relationship.rationale !== 'string'
      ) {
        throw new Error(`Spatial rhythm pattern ${String(pattern.id)} has an invalid relationship.`);
      }
    }
  }

  for (const [property, keys] of [
    ['density_modes', DENSITIES],
    ['viewport_modes', VIEWPORTS],
  ] as const) {
    const record = value[property];
    if (!isRecord(record) || keys.some((key) => typeof record[key] !== 'string')) {
      throw new Error(`Spatial rhythm contract has incomplete ${property.replace('_', ' ')}.`);
    }
  }

  if (!isRecord(value.token_resolution) || value.token_resolution.status !== 'product-context-required') {
    throw new Error('Spatial rhythm contract must require product-context token resolution.');
  }
  if (!isRecord(value.evidence_boundary) || !Array.isArray(value.references) || value.references.length === 0) {
    throw new Error('Spatial rhythm contract is missing evidence boundaries or references.');
  }
}

export function getSpatialRhythm(
  contract: SpatialRhythmContract,
  options: {
    pattern?: 'all' | SpatialRhythmPatternId;
    density?: SpatialDensity;
    viewport?: SpatialViewport;
  } = {},
): SpatialRhythmResult {
  const pattern = options.pattern ?? 'all';
  const density = options.density ?? 'comfortable';
  const viewport = options.viewport ?? 'fluid';

  if (pattern !== 'all' && !PATTERN_IDS.includes(pattern)) {
    throw new Error(`Unknown spatial rhythm pattern: ${pattern}.`);
  }
  if (!DENSITIES.includes(density)) throw new Error(`Unknown density mode: ${density}.`);
  if (!VIEWPORTS.includes(viewport)) throw new Error(`Unknown viewport mode: ${viewport}.`);

  return {
    standard_id: contract.standard_id,
    title: contract.title,
    principle: contract.principle,
    relationship_order: contract.relationship_order,
    principles: contract.principles,
    available_patterns: contract.patterns.map(({ id, name }) => ({ id, name })),
    patterns: pattern === 'all' ? contract.patterns : contract.patterns.filter((item) => item.id === pattern),
    selected_context: {
      density,
      density_guidance: contract.density_modes[density],
      viewport,
      viewport_guidance: contract.viewport_modes[viewport],
    },
    token_resolution: contract.token_resolution,
    evidence_boundary: contract.evidence_boundary,
    references: contract.references,
    source: 'https://humanstandards.org/code-design-tokens/spatial-rhythm-layout/',
  };
}
