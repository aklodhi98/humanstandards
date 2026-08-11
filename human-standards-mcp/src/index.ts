#!/usr/bin/env node
/**
 * Human Standards MCP Server
 * A reference guide for human-centered design principles.
 * Exposes Nielsen's 10 usability heuristics and documentation search.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool
} from '@modelcontextprotocol/sdk/types.js';

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import {
  SpatialDensity,
  SpatialRhythmContract,
  SpatialRhythmPatternId,
  SpatialViewport,
  StandardsIndex,
} from './types/index.js';
import { assertValidStandardsIndex, normalizeDocumentPath } from './standards.js';
import { assertValidSpatialRhythmContract, getSpatialRhythm } from './spatial-rhythm.js';
import { searchDocumentation } from './tools/get-guidance.js';
import { getStandardDocument } from './tools/get-standard.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SERVER_VERSION = '0.3.0';

// Load standards index. Starting with an empty reference service would be a
// successful connection with misleading results, so malformed/missing content
// is fatal.
const INDEX_PATH = path.join(__dirname, '../data/standards-index.json');
let standardsIndex: StandardsIndex;

try {
  const indexData = fs.readFileSync(INDEX_PATH, 'utf-8');
  const parsed: unknown = JSON.parse(indexData);
  assertValidStandardsIndex(parsed);
  standardsIndex = parsed;
  console.error(`✓ Loaded standards index (${standardsIndex.document_count} documents)`);
} catch (err) {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`Fatal: unable to load standards index: ${message}`);
  process.exit(1);
}

const SPATIAL_RHYTHM_PATH = path.join(__dirname, '../data/spatial-rhythm.json');
let spatialRhythmContract: SpatialRhythmContract;

try {
  const contractData = fs.readFileSync(SPATIAL_RHYTHM_PATH, 'utf-8');
  const parsed: unknown = JSON.parse(contractData);
  assertValidSpatialRhythmContract(parsed);
  spatialRhythmContract = parsed;
  console.error(`✓ Loaded spatial rhythm contract (${spatialRhythmContract.patterns.length} patterns)`);
} catch (err) {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`Fatal: unable to load spatial rhythm contract: ${message}`);
  process.exit(1);
}

// Nielsen's 10 Usability Heuristics
const HEURISTICS: Record<string, {
  id: string;
  name: string;
  principle: string;
  description: string;
  questions: string[];
  examples: string[];
  violations: string[];
  related_docs: string[];
}> = {
  H1: {
    id: 'H1',
    name: 'Visibility of system status',
    principle: 'The design should always keep users informed about what is going on, through appropriate feedback within a reasonable amount of time.',
    description: 'Users should never have to wonder what is happening. Every action should produce visible, immediate feedback. When operations take time, show progress. When state changes, make it obvious.',
    questions: [
      'Does the user know what state the system is in?',
      'Is feedback provided immediately after user actions?',
      'Are loading states and progress clearly communicated?',
      'Can users tell if their action succeeded or failed?',
      'Is the current location/context always clear?'
    ],
    examples: [
      'Loading spinners and progress bars',
      'Form submission confirmation messages',
      'Highlighted current navigation item',
      'Character counts in text fields',
      'Real-time sync status indicators'
    ],
    violations: [
      'Silent failures with no error message',
      'Actions that complete without confirmation',
      'No indication of loading or processing',
      'Unclear which page or section user is in'
    ],
    related_docs: ['/interaction-patterns/notifications-feedback', '/interaction-patterns/forms']
  },
  H2: {
    id: 'H2',
    name: 'Match between system and the real world',
    principle: 'The design should speak the users\' language. Use words, phrases, and concepts familiar to the user, rather than internal jargon.',
    description: 'Follow real-world conventions and make information appear in a natural and logical order. Use familiar metaphors, terminology your users actually use, and mental models they already have.',
    questions: [
      'Are you using the user\'s language, not technical jargon?',
      'Do icons and metaphors match real-world expectations?',
      'Is information organized in a logical, familiar way?',
      'Would a new user understand the terminology?',
      'Do workflows match how users think about the task?'
    ],
    examples: [
      'Shopping cart icon for e-commerce',
      'Folder/file metaphor for documents',
      'Calendar layouts matching physical calendars',
      'Using "Delete" not "Terminate instance"',
      'Chronological ordering for messages'
    ],
    violations: [
      'Technical error codes instead of plain language',
      'Unfamiliar icons without labels',
      'Internal product names in UI',
      'Alphabetical menus instead of logical grouping'
    ],
    related_docs: ['/cognition/cognitive-load', '/human-overview/key-principles-and-laws']
  },
  H3: {
    id: 'H3',
    name: 'User control and freedom',
    principle: 'Users often perform actions by mistake. They need a clearly marked "emergency exit" to leave the unwanted action without having to go through an extended process.',
    description: 'Support undo and redo. Make it easy to go back, cancel, or exit. Users should feel in control, never trapped. Every dead end should have an escape route.',
    questions: [
      'Can users easily undo or redo actions?',
      'Is there always a way to go back or cancel?',
      'Can users exit a flow without losing all progress?',
      'Are destructive actions reversible or recoverable?',
      'Do users feel in control of the interface?'
    ],
    examples: [
      'Undo/redo in text editors',
      'Cancel buttons on forms and dialogs',
      'Back navigation in wizards',
      'Gmail\'s "Undo send" feature',
      'Escape key to close modals'
    ],
    violations: [
      'No way to cancel a multi-step process',
      'Immediate permanent deletion',
      'Forced completion of unwanted flows',
      'No back button in wizards'
    ],
    related_docs: ['/decision-making-errors/defensive-design', '/interaction-patterns/forms']
  },
  H4: {
    id: 'H4',
    name: 'Consistency and standards',
    principle: 'Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform and industry conventions.',
    description: 'Be consistent internally (within your product) and externally (with platform conventions). Same action, same result. Same word, same meaning. Leverage existing mental models.',
    questions: [
      'Are similar actions handled consistently throughout?',
      'Do you follow platform conventions (iOS, Android, Web)?',
      'Is terminology consistent across the product?',
      'Do visual patterns mean the same thing everywhere?',
      'Would users\' experience with other apps help here?'
    ],
    examples: [
      'Consistent button placement in dialogs',
      'Standard icons (gear for settings, X for close)',
      'Same gestures working the same way',
      'Consistent color meanings (red for errors)',
      'Following OS-level patterns'
    ],
    violations: [
      'Different words for the same action',
      'Inconsistent icon meanings',
      'Novel UI patterns when standards exist',
      'Different button positions in similar dialogs'
    ],
    related_docs: ['/interaction-patterns/navigation', '/accessibility/wcag-guidelines']
  },
  H5: {
    id: 'H5',
    name: 'Error prevention',
    principle: 'Even better than good error messages is a careful design which prevents a problem from occurring in the first place.',
    description: 'Eliminate error-prone conditions. Present users with confirmation options before they commit to actions. Use constraints, defaults, and suggestions to guide users away from errors.',
    questions: [
      'Can you prevent this error from happening at all?',
      'Are there confirmation steps for important actions?',
      'Do you use smart defaults to reduce mistakes?',
      'Are constraints in place to prevent invalid input?',
      'Do you warn users before potentially problematic actions?'
    ],
    examples: [
      'Confirmation dialogs for destructive actions',
      'Disabling submit until form is valid',
      'Autocomplete to prevent typos',
      'Date pickers instead of free text',
      'Suggesting corrections for search queries'
    ],
    violations: [
      'Allowing invalid data entry',
      'No confirmation for irreversible actions',
      'Easy to accidentally trigger destructive actions',
      'Adjacent buttons for opposite actions'
    ],
    related_docs: ['/decision-making-errors/defensive-design', '/decision-making-errors/error-types', '/interaction-patterns/forms']
  },
  H6: {
    id: 'H6',
    name: 'Recognition rather than recall',
    principle: 'Minimize the user\'s memory load by making elements, actions, and options visible. The user should not have to remember information from one part of the interface to another.',
    description: 'Make information visible or easily retrievable. Show options rather than requiring users to remember them. Provide context and help in place. Reduce cognitive load.',
    questions: [
      'Are all options visible or easily accessible?',
      'Do users need to remember information from previous screens?',
      'Are labels always visible (not just placeholders)?',
      'Is context provided where users need it?',
      'Can users see their recent actions/history?'
    ],
    examples: [
      'Visible labels on form fields',
      'Recently used items lists',
      'Autocomplete with suggestions',
      'Tooltips and inline help',
      'Showing full navigation path (breadcrumbs)'
    ],
    violations: [
      'Placeholder-only labels that disappear',
      'Requiring users to remember codes or IDs',
      'Hidden navigation requiring memorization',
      'No search history or recent items'
    ],
    related_docs: ['/cognition/cognitive-load', '/cognition/working-memory', '/interaction-patterns/forms']
  },
  H7: {
    id: 'H7',
    name: 'Flexibility and efficiency of use',
    principle: 'Shortcuts — hidden from novice users — can speed up the interaction for the expert user. Allow users to tailor frequent actions.',
    description: 'Cater to both inexperienced and experienced users. Provide accelerators like keyboard shortcuts, gestures, and customization. Let experts be efficient without confusing beginners.',
    questions: [
      'Are there shortcuts for frequent actions?',
      'Can experienced users skip unnecessary steps?',
      'Is the interface customizable for different needs?',
      'Are there multiple ways to accomplish tasks?',
      'Do power users have efficient workflows?'
    ],
    examples: [
      'Keyboard shortcuts for common actions',
      'Touch gestures for frequent operations',
      'Customizable toolbars and dashboards',
      'Saved searches and filters',
      'Bulk/batch operations'
    ],
    violations: [
      'No keyboard navigation',
      'Forcing all users through the same long flow',
      'No way to save preferences',
      'No shortcuts for repetitive tasks'
    ],
    related_docs: ['/accessibility/wcag-guidelines', '/ergonomics/targets-spacing']
  },
  H8: {
    id: 'H8',
    name: 'Aesthetic and minimalist design',
    principle: 'Interfaces should not contain information which is irrelevant or rarely needed. Every extra unit of information competes with the relevant units of information.',
    description: 'Keep the interface focused. Remove unnecessary elements. Prioritize content and features by importance. Visual noise competes with the signal users need.',
    questions: [
      'Is every element on the screen necessary?',
      'Is the most important information prominently displayed?',
      'Have you removed features that aren\'t used?',
      'Is visual design supporting or distracting from content?',
      'Could this screen be simpler?'
    ],
    examples: [
      'Progressive disclosure of advanced options',
      'Clean, focused landing pages',
      'Hidden complexity until needed',
      'White space to create focus',
      'Prioritized content hierarchy'
    ],
    violations: [
      'Cluttered interfaces with too many options',
      'Decorative elements that don\'t add value',
      'Showing all features regardless of relevance',
      'Dense screens with no visual hierarchy'
    ],
    related_docs: ['/cognition/cognitive-load', '/cognition/attention-focus', '/perception/vision']
  },
  H9: {
    id: 'H9',
    name: 'Help users recognize, diagnose, and recover from errors',
    principle: 'Error messages should be expressed in plain language (no error codes), precisely indicate the problem, and constructively suggest a solution.',
    description: 'When errors happen, help users understand what went wrong and how to fix it. Be specific, be helpful, and provide a path forward. Never leave users stranded.',
    questions: [
      'Are error messages in plain, human language?',
      'Do errors explain what went wrong specifically?',
      'Do errors tell users how to fix the problem?',
      'Are errors shown close to where they occurred?',
      'Can users recover from errors easily?'
    ],
    examples: [
      '"Email must include @" instead of "Invalid format"',
      'Inline validation showing exactly which field has issues',
      'Suggested corrections for errors',
      'Direct links to fix the problem',
      'Preserving user input after errors'
    ],
    violations: [
      'Generic "An error occurred" messages',
      'Technical error codes (Error 500)',
      'Errors that don\'t explain how to fix',
      'Clearing form data after validation error'
    ],
    related_docs: ['/decision-making-errors/error-types', '/interaction-patterns/forms', '/interaction-patterns/notifications-feedback']
  },
  H10: {
    id: 'H10',
    name: 'Help and documentation',
    principle: 'It\'s best if the system doesn\'t need any additional explanation. However, it may be necessary to provide documentation to help users complete their tasks.',
    description: 'Even the best UI may need help content. Make it searchable, task-focused, and contextual. Help should be easy to find and focused on the user\'s actual task.',
    questions: [
      'Can users find help when they need it?',
      'Is help content focused on user tasks?',
      'Is documentation searchable?',
      'Is contextual help available where relevant?',
      'Can users complete tasks from the help content?'
    ],
    examples: [
      'Contextual tooltips and hints',
      'Searchable help documentation',
      'Onboarding tours for new users',
      'FAQ sections addressing common issues',
      'In-app guided tutorials'
    ],
    violations: [
      'No help or documentation at all',
      'Help that doesn\'t address actual user tasks',
      'Unsearchable PDF manuals',
      'Help hidden or hard to find'
    ],
    related_docs: ['/checklists-playbooks/onboarding-playbook', '/cognition/cognitive-load']
  }
};

// Initialize MCP server
const serverInstructions = 'Use Human Standards when designing, implementing, or reviewing interfaces. Start with search_standards, then read relevant paths with get_standard. For spatial layout, call get_spatial_rhythm before implementation and after rendering; preserve its relationship order and resolve it with the product\'s own tokens. Use the heuristic tools for heuristic reviews. Identify the guidance consulted. This server is read-only.';

const server = new Server(
  {
    name: 'human-standards',
    version: SERVER_VERSION
  },
  {
    capabilities: {
      tools: {}
    },
    instructions: serverInstructions
  }
);

const readOnlyAnnotations = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
};

function jsonResult(data: Record<string, unknown>) {
  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
    structuredContent: data,
  };
}

// Define available tools
const tools: Tool[] = [
  {
    name: 'get_heuristic',
    title: 'Get usability heuristic',
    description: 'Get detailed information about a specific Nielsen usability heuristic (H1-H10). Returns the principle, description, key questions to ask, good examples, common violations, and related documentation.',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Heuristic ID: H1 (Visibility of system status), H2 (Match between system and real world), H3 (User control and freedom), H4 (Consistency and standards), H5 (Error prevention), H6 (Recognition rather than recall), H7 (Flexibility and efficiency), H8 (Aesthetic and minimalist design), H9 (Help users recover from errors), H10 (Help and documentation)',
          enum: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10']
        }
      },
      required: ['id'],
      additionalProperties: false
    },
    outputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        principle: { type: 'string' },
        description: { type: 'string' },
        questions: { type: 'array', items: { type: 'string' } },
        examples: { type: 'array', items: { type: 'string' } },
        violations: { type: 'array', items: { type: 'string' } },
        related_docs: { type: 'array', items: { type: 'object' } },
        source: { type: 'string' }
      },
      required: ['id', 'name', 'principle', 'description', 'questions', 'examples', 'violations', 'related_docs', 'source']
    },
    annotations: readOnlyAnnotations
  },
  {
    name: 'get_all_heuristics',
    title: 'List usability heuristics',
    description: 'Get a summary of all 10 Nielsen usability heuristics. Useful for understanding the full framework or identifying which heuristics might apply to a situation.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false
    },
    outputSchema: {
      type: 'object',
      properties: {
        heuristics: { type: 'array', items: { type: 'object' } },
        source: { type: 'string' }
      },
      required: ['heuristics', 'source']
    },
    annotations: readOnlyAnnotations
  },
  {
    name: 'search_standards',
    title: 'Search Human Standards',
    description: 'Search the full Human Standards library. Returns ranked documents, matched terms, and excerpts from the actual guidance. Use get_standard with a returned path to read the document or a named section.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          minLength: 1,
          maxLength: 200,
          description: 'Topic or task query (e.g., "forms error recovery", "cognitive load", "touch targets")'
        },
        limit: {
          type: 'integer',
          minimum: 1,
          maximum: 10,
          default: 5,
          description: 'Maximum number of ranked results to return (1-10).'
        }
      },
      required: ['query'],
      additionalProperties: false
    },
    outputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        result_count: { type: 'integer' },
        results: { type: 'array', items: { type: 'object' } }
      },
      required: ['query', 'result_count', 'results']
    },
    annotations: readOnlyAnnotations
  },
  {
    name: 'get_standard',
    title: 'Read a Human Standard',
    description: 'Read the actual Human Standards guidance at a path returned by search_standards. For long documents, the response lists available sections; pass section to retrieve one focused section without truncation.',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          minLength: 1,
          description: 'Document path returned by search_standards, such as /interaction-patterns/forms/.'
        },
        section: {
          type: 'string',
          minLength: 1,
          description: 'Optional H2 or H3 section title from available_sections.'
        },
        max_chars: {
          type: 'integer',
          minimum: 2000,
          maximum: 30000,
          default: 12000,
          description: 'Maximum content characters to return.'
        }
      },
      required: ['path'],
      additionalProperties: false
    },
    outputSchema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        path: { type: 'string' },
        description: { type: 'string' },
        content: { type: 'string' },
        available_sections: { type: 'array', items: { type: 'string' } },
        key_points: { type: 'array', items: { type: 'string' } },
        references: { type: 'array', items: { type: 'string' } },
        requested_section: { type: ['string', 'null'] },
        truncated: { type: 'boolean' }
      },
      required: ['title', 'path', 'description', 'content', 'available_sections', 'key_points', 'references', 'requested_section', 'truncated']
    },
    annotations: readOnlyAnnotations
  },
  {
    name: 'get_spatial_rhythm',
    title: 'Get spatial rhythm guidance',
    description: 'Get relationship-first spacing guidance for a whole interface or a form, settings section, card collection, editorial flow, or dashboard. Returns ordered spatial relationships, rhythm rules, responsive and density guidance, manual review questions, evidence boundaries, and token-resolution instructions. It deliberately does not prescribe a universal pixel unit. Call before implementation and during rendered review.',
    inputSchema: {
      type: 'object',
      properties: {
        pattern: {
          type: 'string',
          enum: ['all', 'form-stack', 'settings-section', 'card-collection', 'editorial-flow', 'dashboard'],
          default: 'all',
          description: 'Optional composition pattern to return. Use all for the complete contract.'
        },
        density: {
          type: 'string',
          enum: ['compact', 'comfortable', 'spacious'],
          default: 'comfortable',
          description: 'Intended interface density. Density changes project-token resolution, not relationship order.'
        },
        viewport: {
          type: 'string',
          enum: ['small', 'medium', 'large', 'fluid'],
          default: 'fluid',
          description: 'Viewport context for responsive rhythm guidance.'
        }
      },
      additionalProperties: false
    },
    outputSchema: {
      type: 'object',
      properties: {
        standard_id: { type: 'string' },
        title: { type: 'string' },
        principle: { type: 'string' },
        relationship_order: { type: 'array', items: { type: 'object' } },
        principles: { type: 'array', items: { type: 'object' } },
        available_patterns: { type: 'array', items: { type: 'object' } },
        patterns: { type: 'array', items: { type: 'object' } },
        selected_context: { type: 'object' },
        token_resolution: { type: 'object' },
        evidence_boundary: { type: 'object' },
        references: { type: 'array', items: { type: 'object' } },
        source: { type: 'string' }
      },
      required: ['standard_id', 'title', 'principle', 'relationship_order', 'principles', 'available_patterns', 'patterns', 'selected_context', 'token_resolution', 'evidence_boundary', 'references', 'source']
    },
    annotations: readOnlyAnnotations
  }
];

// Handle ListTools request
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Handle CallTool request
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (!tools.some((tool) => tool.name === name)) throw new Error(`Unknown tool: ${name}`);

  try {
    switch (name) {
      case 'get_heuristic': {
        if (typeof args?.id !== 'string' || !args.id.trim()) {
          throw new Error('id must be one of H1-H10.');
        }
        const id = args.id.toUpperCase();
        const heuristic = HEURISTICS[id];

        if (!heuristic) {
          throw new Error(`Unknown heuristic: ${id}. Valid IDs are H1-H10.`);
        }

        return jsonResult({
          ...heuristic,
          related_docs: heuristic.related_docs.map((documentPath) => {
            const normalizedPath = normalizeDocumentPath(documentPath);
            return { path: normalizedPath, url: `https://humanstandards.org${normalizedPath}` };
          }),
          source: 'https://www.nngroup.com/articles/ten-usability-heuristics/'
        });
      }

      case 'get_all_heuristics': {
        const summary = Object.values(HEURISTICS).map(h => ({
          id: h.id,
          name: h.name,
          principle: h.principle
        }));

        return jsonResult({
          heuristics: summary,
          source: 'https://www.nngroup.com/articles/ten-usability-heuristics/'
        });
      }

      case 'search_standards': {
        if (typeof args?.query !== 'string' || !args.query.trim()) {
          throw new Error('query must contain at least one word.');
        }
        if (args.query.length > 200) throw new Error('query must be 200 characters or fewer.');
        if (args.limit !== undefined && (!Number.isInteger(args.limit) || Number(args.limit) < 1 || Number(args.limit) > 10)) {
          throw new Error('limit must be an integer from 1 to 10.');
        }
        const query = args.query.trim();
        const results = searchDocumentation(query, standardsIndex, Number(args.limit ?? 5));
        return jsonResult({
          query,
          result_count: results.length,
          results: results.map((result) => ({
            ...result,
            url: `https://humanstandards.org${result.path}`
          }))
        });
      }

      case 'get_standard': {
        if (typeof args?.path !== 'string' || !args.path.trim()) {
          throw new Error('path must be a document path returned by search_standards.');
        }
        if (args.section !== undefined && (typeof args.section !== 'string' || !args.section.trim())) {
          throw new Error('section must contain at least one word.');
        }
        if (
          args.max_chars !== undefined &&
          (!Number.isInteger(args.max_chars) || Number(args.max_chars) < 2000 || Number(args.max_chars) > 30000)
        ) {
          throw new Error('max_chars must be an integer from 2000 to 30000.');
        }
        return jsonResult(
          getStandardDocument(args.path, standardsIndex, {
            section: args.section as string | undefined,
            maxChars: args.max_chars as number | undefined,
          }) as unknown as Record<string, unknown>,
        );
      }

      case 'get_spatial_rhythm': {
        return jsonResult(
          getSpatialRhythm(spatialRhythmContract, {
            pattern: args?.pattern as 'all' | SpatialRhythmPatternId | undefined,
            density: args?.density as SpatialDensity | undefined,
            viewport: args?.viewport as SpatialViewport | undefined,
          }) as unknown as Record<string, unknown>,
        );
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ error: errorMessage }, null, 2)
        }
      ],
      isError: true
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Human Standards MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
