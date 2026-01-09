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

import { StandardsIndex } from './types/index.js';
import { searchDocumentation } from './tools/get-guidance.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load standards index
const INDEX_PATH = path.join(__dirname, '../data/standards-index.json');
let standardsIndex: StandardsIndex;

try {
  const indexData = fs.readFileSync(INDEX_PATH, 'utf-8');
  standardsIndex = JSON.parse(indexData);
  console.error('✓ Loaded standards index');
} catch (err) {
  console.error('⚠ Standards index not found. Run: npm run index-docs');
  standardsIndex = { categories: {}, rules: [], patterns: [] };
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
const server = new Server(
  {
    name: 'human-standards',
    version: '0.1.0'
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

// Define available tools
const tools: Tool[] = [
  {
    name: 'get_heuristic',
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
      required: ['id']
    }
  },
  {
    name: 'get_all_heuristics',
    description: 'Get a summary of all 10 Nielsen usability heuristics. Useful for understanding the full framework or identifying which heuristics might apply to a situation.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'search_standards',
    description: 'Search Human Standards documentation for specific topics. Returns relevant documents with titles, descriptions, and URLs.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query (e.g., "forms", "cognitive load", "error handling", "accessibility")'
        }
      },
      required: ['query']
    }
  }
];

// Handle ListTools request
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Handle CallTool request
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (!args) {
    throw new Error('Missing arguments');
  }

  try {
    switch (name) {
      case 'get_heuristic': {
        const id = (args.id as string).toUpperCase();
        const heuristic = HEURISTICS[id];

        if (!heuristic) {
          throw new Error(`Unknown heuristic: ${id}. Valid IDs are H1-H10.`);
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                ...heuristic,
                related_docs: heuristic.related_docs.map(path => ({
                  path,
                  url: `https://humanstandards.org${path}`
                })),
                reference: 'https://humanstandards.org/interaction-patterns/nielsen-heuristics'
              }, null, 2)
            }
          ]
        };
      }

      case 'get_all_heuristics': {
        const summary = Object.values(HEURISTICS).map(h => ({
          id: h.id,
          name: h.name,
          principle: h.principle
        }));

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                heuristics: summary,
                reference: 'https://humanstandards.org/interaction-patterns/nielsen-heuristics',
                source: 'Nielsen Norman Group - 10 Usability Heuristics for User Interface Design'
              }, null, 2)
            }
          ]
        };
      }

      case 'search_standards': {
        const query = args.query as string;
        const results = searchDocumentation(query, standardsIndex);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                query,
                results: results.map(r => ({
                  title: r.title,
                  description: r.description,
                  path: r.path,
                  url: `https://humanstandards.org${r.path}`
                })),
                reference: 'https://humanstandards.org'
              }, null, 2)
            }
          ]
        };
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
