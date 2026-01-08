#!/usr/bin/env node
/**
 * Human Standards MCP Server
 * Provides systematic human factors validation for AI-generated interfaces
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

import { StandardsIndex, ComponentContext } from './types/index.js';
import { HtmlValidator } from './validators/html-validator.js';
import { getComponentGuidance, searchDocumentation } from './tools/get-guidance.js';
import { checkContrast } from './tools/check-contrast.js';

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
    name: 'get_component_guidance',
    description: 'Get Human Standards guidance for a UI component (form, button, modal, etc.). Returns systematic recommendations for cognitive load, accessibility, ergonomics, and defensive design.',
    inputSchema: {
      type: 'object',
      properties: {
        component: {
          type: 'string',
          description: 'Component type: form, button, modal, notification, navigation, card, table, input',
          enum: ['form', 'button', 'modal', 'notification', 'navigation', 'card', 'table', 'input']
        },
        context: {
          type: 'object',
          description: 'Context information about the component',
          properties: {
            importance: {
              type: 'string',
              enum: ['primary', 'secondary', 'destructive']
            },
            platform: {
              type: 'string',
              enum: ['web', 'mobile', 'desktop']
            },
            fields: {
              type: 'number',
              description: 'Number of form fields (for forms)'
            },
            complexity: {
              type: 'string',
              enum: ['simple', 'moderate', 'complex']
            }
          }
        }
      },
      required: ['component']
    }
  },
  {
    name: 'validate_html',
    description: 'Validate HTML against Human Standards. Checks accessibility (WCAG 2.2 AA), cognitive load, ergonomics, forms best practices, and defensive design patterns. Returns detailed issues and compliance scores.',
    inputSchema: {
      type: 'object',
      properties: {
        html: {
          type: 'string',
          description: 'HTML code to validate'
        },
        component_type: {
          type: 'string',
          description: 'Optional component type for context-specific validation'
        }
      },
      required: ['html']
    }
  },
  {
    name: 'check_color_contrast',
    description: 'Check if color combination meets WCAG contrast requirements. Returns contrast ratio and whether it passes AA/AAA standards for normal or large text.',
    inputSchema: {
      type: 'object',
      properties: {
        foreground: {
          type: 'string',
          description: 'Foreground color in hex format (e.g., #333333)'
        },
        background: {
          type: 'string',
          description: 'Background color in hex format (e.g., #FFFFFF)'
        },
        font_size: {
          type: 'number',
          description: 'Font size in pixels (default: 16)',
          default: 16
        },
        is_bold: {
          type: 'boolean',
          description: 'Whether text is bold (default: false)',
          default: false
        }
      },
      required: ['foreground', 'background']
    }
  },
  {
    name: 'search_standards',
    description: 'Search Human Standards documentation for specific topics. Returns relevant documents with titles, descriptions, and paths.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query (e.g., "forms", "color contrast", "cognitive load")'
        }
      },
      required: ['query']
    }
  },
  {
    name: 'get_validation_rules',
    description: 'Get all validation rules for a specific category (accessibility, cognitive-load, ergonomics, forms, defensive-design) or all rules.',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: 'Optional category filter',
          enum: ['accessibility', 'cognitive-load', 'ergonomics', 'forms', 'defensive-design']
        }
      }
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
      case 'get_component_guidance': {
        const component = args.component as string;
        const context = (args.context as ComponentContext) || {};

        const guidance = getComponentGuidance(component, context, standardsIndex);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(guidance, null, 2)
            }
          ]
        };
      }

      case 'validate_html': {
        const html = args.html as string;
        const componentType = args.component_type as string | undefined;

        const validator = new HtmlValidator();
        const result = validator.validate(html, componentType);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2)
            }
          ]
        };
      }

      case 'check_color_contrast': {
        const foreground = args.foreground as string;
        const background = args.background as string;
        const fontSize = (args.font_size as number) || 16;
        const isBold = (args.is_bold as boolean) || false;

        const result = checkContrast(foreground, background, fontSize, isBold);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2)
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
              text: JSON.stringify(results, null, 2)
            }
          ]
        };
      }

      case 'get_validation_rules': {
        const category = args.category as string | undefined;

        let rules = standardsIndex.rules;
        if (category) {
          rules = rules.filter(r => r.category === category);
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(rules, null, 2)
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
