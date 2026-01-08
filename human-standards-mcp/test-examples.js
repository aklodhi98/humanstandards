/**
 * Manual test examples for Human Standards MCP Server
 * Run with: node test-examples.js
 */

console.log('Human Standards MCP Server Test Examples\n');

// Simulate what AI tools would call
const examples = [
  {
    name: 'Get Form Guidance (8 fields)',
    tool: 'get_component_guidance',
    args: {
      component: 'form',
      context: { fields: 8 }
    }
  },
  {
    name: 'Validate HTML with Issues',
    tool: 'validate_html',
    args: {
      html: `
        <form>
          <input type="text" placeholder="Name" required>
          <input type="email" placeholder="Email" required>
          <button style="padding: 5px;">Submit</button>
        </form>
      `,
      component_type: 'form'
    }
  },
  {
    name: 'Check Color Contrast (Failing)',
    tool: 'check_color_contrast',
    args: {
      foreground: '#666666',
      background: '#FFFFFF',
      font_size: 16,
      is_bold: false
    }
  },
  {
    name: 'Check Color Contrast (Passing)',
    tool: 'check_color_contrast',
    args: {
      foreground: '#333333',
      background: '#FFFFFF',
      font_size: 16
    }
  },
  {
    name: 'Search for "error messages"',
    tool: 'search_standards',
    args: {
      query: 'error messages'
    }
  },
  {
    name: 'Get Accessibility Rules',
    tool: 'get_validation_rules',
    args: {
      category: 'accessibility'
    }
  }
];

console.log('These are example MCP tool calls that AI tools would make:\n');

examples.forEach((example, i) => {
  console.log(`${i + 1}. ${example.name}`);
  console.log(`   Tool: ${example.tool}`);
  console.log(`   Args: ${JSON.stringify(example.args, null, 6)}`);
  console.log('');
});

console.log('\nTo test the MCP server:');
console.log('1. Run: npm start');
console.log('2. Use MCP Inspector: npx @modelcontextprotocol/inspector node dist/index.js');
console.log('3. Or configure in Claude Desktop/Code (see README.md)');
console.log('\nThe server will respond with structured guidance, validation results, and standards references.');
