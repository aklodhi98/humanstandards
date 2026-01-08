# Human Standards MCP Server - Usage Examples

## Example 1: Building a Registration Form

### Without MCP Server (Typical AI Output)

```typescript
// User: "Build me a registration form"
// AI generates this:

<form>
  <input type="text" placeholder="First Name" required>
  <input type="text" placeholder="Last Name" required>
  <input type="email" placeholder="Email" required>
  <input type="password" placeholder="Password" required>
  <input type="password" placeholder="Confirm Password" required>
  <input type="tel" placeholder="Phone" required>
  <select required>
    <option>Select Country</option>
  </select>
  <input type="date" placeholder="Date of Birth" required>
  <button>Submit</button>
</form>
```

**Problems:**
- 8 fields at once (cognitive overload)
- Placeholders instead of labels (accessibility fail)
- No ARIA attributes
- No autosave
- Vague validation

### With MCP Server (Standards-Informed)

```typescript
// User: "Build me a registration form"

// AI calls MCP server:
const guidance = await mcp.callTool('get_component_guidance', {
  component: 'form',
  context: { fields: 8 }
});

// MCP responds:
{
  "cognitive_load": {
    "recommendation": "Use progressive disclosure - break into 2-3 steps"
  },
  "accessibility": {
    "requirements": ["Every input has visible label", "Use aria-required"]
  },
  "defensive_design": {
    "required": ["autosave", "beforeunload warning"]
  }
}

// AI generates Version 2 (see demo-comparison/version2-standards-informed.html)
```

**Result:**
- 3-step wizard (4 → 2 → 2 fields)
- Visible labels
- ARIA attributes
- Autosave to localStorage
- Specific error messages
- 48px touch targets

## Example 2: Validating Generated Code

### Scenario: AI generates a button

```html
<button style="background: #ccc; color: #888; padding: 5px 10px;">
  Delete
</button>
```

### AI validates before returning:

```typescript
const validation = await mcp.callTool('validate_html', {
  html: generatedButton,
  component_type: 'button'
});

// MCP responds:
{
  "passed": false,
  "issues": [
    {
      "severity": "error",
      "rule": "wcag-contrast-text",
      "message": "Insufficient color contrast",
      "recommendation": "Use darker text or lighter background for 4.5:1 ratio"
    },
    {
      "severity": "warning",
      "rule": "ergonomics-touch-targets",
      "message": "Button may not meet minimum touch target size",
      "recommendation": "Ensure buttons are at least 48x48dp"
    },
    {
      "severity": "warning",
      "rule": "defensive-destructive-confirm",
      "message": "Destructive action may not require confirmation",
      "recommendation": "Add confirmation dialog for destructive actions"
    }
  ]
}
```

### AI fixes issues automatically:

```html
<button
  style="background: #d32f2f; color: #ffffff; padding: 16px 32px; min-height: 48px;"
  onclick="if(confirm('Are you sure you want to delete this?')) { /* delete */ }"
  aria-label="Delete item">
  Delete
</button>
```

**Fixes applied:**
- ✅ High contrast (#fff on #d32f2f = 9.7:1)
- ✅ 48px minimum height
- ✅ Confirmation dialog
- ✅ ARIA label

## Example 3: Checking Color Contrast

### During color selection:

```typescript
// AI is considering color scheme
const textColor = '#666666';
const bgColor = '#FFFFFF';

const contrast = await mcp.callTool('check_color_contrast', {
  foreground: textColor,
  background: bgColor,
  font_size: 16,
  is_bold: false
});

// MCP responds:
{
  "ratio": 3.95,
  "passes_aa": false,
  "passes_aaa": false,
  "level": "normal",
  "recommendation": "Contrast ratio 3.95:1 is too low. Needs at least 4.5:1 (AA)"
}

// AI adjusts to #333333 instead
const newContrast = await mcp.callTool('check_color_contrast', {
  foreground: '#333333',
  background: bgColor
});

// MCP responds:
{
  "ratio": 12.6,
  "passes_aa": true,
  "passes_aaa": true,
  "level": "normal"
}
```

**Result:** AI automatically uses WCAG-compliant colors.

## Example 4: Searching for Guidance

### AI needs specific guidance:

```typescript
// User asks to "improve error handling"
// AI searches for relevant guidance:

const results = await mcp.callTool('search_standards', {
  query: 'error handling'
});

// MCP responds:
[
  {
    "title": "Defensive Design (Error Prevention & Recovery)",
    "path": "/decision-making-errors/defensive-design.md",
    "description": "Build guardrails: validate early, allow undo, recover state",
    "relevance": 15
  },
  {
    "title": "Forms",
    "path": "/interaction-patterns/forms.md",
    "description": "Show errors clearly with specific messages",
    "relevance": 12
  },
  {
    "title": "Cognitive Load",
    "path": "/cognition/cognitive-load.md",
    "description": "Clear error recovery reduces cognitive load",
    "relevance": 8
  }
]

// AI reads defensive-design.md and applies:
// - Validate on blur
// - Specific error messages
// - Autosave
// - Confirmation for destructive actions
```

## Example 5: Component-Specific Guidance

### Building a modal dialog:

```typescript
const guidance = await mcp.callTool('get_component_guidance', {
  component: 'modal'
});

// MCP responds:
{
  "cognitive_load": {
    "assessment": "Modals interrupt flow and increase cognitive load",
    "recommendation": "Use sparingly, only for critical decisions",
    "implementation": ["Focus trap", "Clear close action", "ESC key support"]
  },
  "accessibility": {
    "requirements": [
      "Focus trap within modal",
      "Return focus on close",
      "role='dialog' and aria-modal='true'",
      "Keyboard dismissible (ESC)"
    ],
    "wcag_level": "AA"
  }
}
```

### AI generates compliant modal:

```html
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  onkeydown="if(event.key === 'Escape') closeModal()">

  <h2 id="modal-title">Confirm Deletion</h2>
  <p>Are you sure you want to delete this item?</p>

  <button onclick="confirmDelete()" autofocus>Delete</button>
  <button onclick="closeModal()">Cancel</button>
</div>

<script>
  // Focus trap implementation
  // Return focus to trigger element on close
  // ESC key handling
</script>
```

## Example 6: Multi-Step Form Guidance

### Building complex checkout flow:

```typescript
const guidance = await mcp.callTool('get_component_guidance', {
  component: 'form',
  context: {
    fields: 15,
    complexity: 'complex',
    platform: 'mobile'
  }
});

// MCP responds:
{
  "cognitive_load": {
    "assessment": "High cognitive load for 15 fields",
    "recommendation": "Use progressive disclosure - break into steps",
    "implementation": [
      "Multi-step wizard",
      "3-4 fields per step",
      "Progress indicator",
      "Save and continue later"
    ]
  },
  "ergonomics": {
    "min_touch_target": "48x48px",
    "spacing": "12px from adjacent targets"
  },
  "defensive_design": {
    "required": [
      "autosave",
      "progress preservation",
      "beforeunload warning"
    ]
  }
}
```

### AI implements:

- **Step 1**: Contact info (name, email, phone) - 3 fields
- **Step 2**: Shipping address (address, city, postal code, country) - 4 fields
- **Step 3**: Payment (card number, expiry, CVV) - 3 fields
- **Step 4**: Review and confirm - 0 fields, just review

Plus:
- Progress bar (1 of 4, 2 of 4, etc.)
- Autosave on each step
- "Save and continue later" button
- Restore from localStorage on return
- 48px buttons and inputs for mobile

## Example 7: Real-Time Validation Workflow

### Complete AI workflow with MCP:

```typescript
// 1. User request
const userRequest = "Build a user registration form";

// 2. Get guidance
const guidance = await mcp.callTool('get_component_guidance', {
  component: 'form',
  context: { fields: 6 }
});

// 3. Generate code based on guidance
const generatedHTML = generateFormHTML(guidance);

// 4. Validate before returning
const validation = await mcp.callTool('validate_html', {
  html: generatedHTML,
  component_type: 'form'
});

// 5. Fix any issues
if (!validation.passed) {
  for (const issue of validation.issues) {
    if (issue.severity === 'error') {
      // Apply fix
      generatedHTML = applyFix(generatedHTML, issue);
    }
  }

  // Re-validate
  validation = await mcp.callTool('validate_html', {
    html: generatedHTML
  });
}

// 6. Check specific requirements
const colors = extractColors(generatedHTML);
for (const colorPair of colors) {
  const contrast = await mcp.callTool('check_color_contrast', {
    foreground: colorPair.fg,
    background: colorPair.bg
  });

  if (!contrast.passes_aa) {
    // Adjust colors
  }
}

// 7. Return to user with standards report
return {
  code: generatedHTML,
  compliance: {
    wcag_aa: validation.compliance.wcag_aa,
    score: validation.score,
    applied_standards: [
      'Progressive disclosure (3-step wizard)',
      'WCAG 2.2 AA contrast ratios',
      'Autosave for data loss prevention',
      '48px touch targets for mobile'
    ]
  }
};
```

## Example 8: Getting All Rules for a Category

### Check what accessibility rules apply:

```typescript
const rules = await mcp.callTool('get_validation_rules', {
  category: 'accessibility'
});

// MCP responds with all accessibility rules:
[
  {
    "id": "wcag-contrast-text",
    "category": "accessibility",
    "severity": "error",
    "description": "Text must have sufficient contrast ratio",
    "check": "Color contrast ratio must be at least 4.5:1 for normal text, 3:1 for large text (WCAG AA)",
    "reference": "/accessibility/wcag-guidelines.md#perceivable"
  },
  {
    "id": "wcag-aria-labels",
    "category": "accessibility",
    "severity": "error",
    "description": "Form inputs must have associated labels",
    "check": "Every input must have a visible label linked via for/id or aria-label",
    "reference": "/accessibility/wcag-guidelines.md#understandable"
  },
  // ... more rules
]
```

## Key Takeaways

1. **Proactive Guidance**: AI tools consult standards *before* generating code
2. **Automatic Validation**: Code is checked *during* generation, not after
3. **Systematic Fixes**: Issues are fixed using specific recommendations
4. **Context-Aware**: Guidance adapts to component type, platform, complexity
5. **Measurable Compliance**: Every output gets a score and compliance report

**Result**: Every AI-generated interface meets human factors standards by default, not as an afterthought.
