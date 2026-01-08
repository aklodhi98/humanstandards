# Comparison: Human Standards MCP vs. a11ymcp

## Overview

**a11ymcp**: Accessibility-specific MCP server focused on WCAG compliance testing
**Human Standards MCP**: Comprehensive human factors MCP server covering accessibility + cognitive load + ergonomics + defensive design + forms

## Side-by-Side Comparison

| Feature | a11ymcp | Human Standards MCP |
|---------|---------|---------------------|
| **Primary Focus** | WCAG compliance testing | Holistic human factors guidance |
| **Scope** | Accessibility only | Accessibility + cognition + ergonomics + UX patterns |
| **Approach** | Reactive testing (test existing code) | Proactive guidance + validation |
| **Core Engine** | Deque Axe-core (industry standard) | Custom validator + Human Standards docs |
| **Testing Method** | Puppeteer (runs actual browser) | Cheerio (static HTML parsing) |
| **Documentation** | WCAG rules reference | 49 indexed human factors documents |
| **Guidance** | ❌ No | ✅ Yes (context-aware component guidance) |
| **Cognitive Load** | ❌ No | ✅ Yes (progressive disclosure, chunking) |
| **Ergonomics** | ❌ No | ✅ Yes (touch targets, spacing) |
| **Forms Patterns** | ❌ No | ✅ Yes (validation timing, error messages) |
| **Defensive Design** | ❌ No | ✅ Yes (autosave, confirmations) |

## Detailed Comparison

### 1. Tool Coverage

#### a11ymcp Tools (5)
1. `test_accessibility` - Test URL for WCAG violations (uses Puppeteer)
2. `test_html_string` - Test HTML snippet for violations
3. `get_rules` - Get accessibility rules info
4. `check_color_contrast` - Validate color combinations
5. `check_orientation_lock` - Check screen orientation forcing

#### Human Standards MCP Tools (5)
1. `get_component_guidance` - Get proactive guidance BEFORE building
2. `validate_html` - Test HTML for all human factors issues
3. `check_color_contrast` - Validate color combinations (same as a11y)
4. `search_standards` - Search 49 docs for any topic
5. `get_validation_rules` - Get rules by category (not just accessibility)

**Key Difference**: a11ymcp is **reactive** (test what exists), Human Standards is **proactive** (guide what to build).

---

### 2. Accessibility Testing

#### a11ymcp
- ✅ **Strength**: Uses Axe-core (industry gold standard)
- ✅ **Strength**: Tests live URLs with Puppeteer (real browser environment)
- ✅ **Strength**: Comprehensive WCAG rule coverage (Axe has 90+ rules)
- ✅ **Strength**: Detects computed styles, dynamic content
- ❌ **Limitation**: Accessibility-only focus

#### Human Standards MCP
- ⚠️ **Limitation**: Custom validator (less comprehensive than Axe)
- ⚠️ **Limitation**: Static HTML parsing only (no browser rendering)
- ✅ **Strength**: Integrated with broader human factors context
- ✅ **Strength**: Provides actionable recommendations from docs
- ✅ **Strength**: Links to Human Standards documentation

**Winner for pure accessibility testing**: a11ymcp (Axe-core is unbeatable)

---

### 3. Proactive Guidance

#### a11ymcp
- ❌ No guidance before generation
- ❌ No component patterns
- ❌ No context-aware recommendations

#### Human Standards MCP
- ✅ `get_component_guidance` tells AI what to build
- ✅ Component patterns for forms, buttons, modals
- ✅ Context-aware (fields count, platform, importance)
- ✅ References to detailed documentation

**Example:**
```typescript
// a11ymcp: Can't do this
// ❌ No equivalent

// Human Standards MCP:
const guidance = await mcp.callTool('get_component_guidance', {
  component: 'form',
  context: { fields: 8 }
});

// Returns:
// "Use 3-step wizard, WCAG AA, autosave, 48px targets..."
```

**Winner**: Human Standards MCP (a11ymcp doesn't do guidance)

---

### 4. Cognitive Load Optimization

#### a11ymcp
- ❌ Not covered
- ❌ No progressive disclosure guidance
- ❌ No chunking recommendations

#### Human Standards MCP
- ✅ Validates form field counts
- ✅ Recommends progressive disclosure for 6+ fields
- ✅ Checks error message clarity
- ✅ References `/cognition/cognitive-load.md`

**Example Issue:**
```json
{
  "severity": "warning",
  "rule": "cognitive-form-length",
  "message": "Form has 8 fields without progressive disclosure",
  "recommendation": "Break long forms into 2-3 steps"
}
```

**Winner**: Human Standards MCP (a11ymcp doesn't cover this)

---

### 5. Ergonomics & Touch Targets

#### a11ymcp
- ❌ Not covered
- ❌ No touch target validation
- ❌ No spacing checks

#### Human Standards MCP
- ✅ Checks button/input sizes
- ✅ Recommends 44-48px minimum
- ✅ References iOS/Android standards
- ✅ Links to `/ergonomics/targets-spacing.md`

**Winner**: Human Standards MCP (a11ymcp doesn't cover this)

---

### 6. Forms Best Practices

#### a11ymcp
- ✅ Checks form labels (accessibility)
- ❌ No validation timing guidance
- ❌ No autocomplete recommendations
- ❌ No error message patterns

#### Human Standards MCP
- ✅ Checks form labels (accessibility)
- ✅ Recommends validation on blur (not keystroke)
- ✅ Checks autocomplete attributes
- ✅ Validates error message specificity
- ✅ References `/interaction-patterns/forms.md`

**Example Issue:**
```json
{
  "severity": "error",
  "rule": "cognitive-error-clarity",
  "message": "Vague error message: 'invalid'",
  "recommendation": "Use specific messages like 'Email must include @'"
}
```

**Winner**: Human Standards MCP (broader forms coverage)

---

### 7. Defensive Design

#### a11ymcp
- ❌ Not covered

#### Human Standards MCP
- ✅ Checks for autosave patterns
- ✅ Validates destructive action confirmations
- ✅ Recommends data loss prevention
- ✅ References `/decision-making-errors/defensive-design.md`

**Winner**: Human Standards MCP (a11ymcp doesn't cover this)

---

### 8. Color Contrast Checking

#### Both Have This!

**a11ymcp:**
```typescript
check_color_contrast(foreground, background, fontSize, fontWeight)
```

**Human Standards MCP:**
```typescript
check_color_contrast(foreground, background, font_size, is_bold)
```

**Result**: Functionally equivalent (both implement WCAG formula)

**Winner**: Tie

---

### 9. Testing Approach

#### a11ymcp
- Uses **Puppeteer** (headless Chrome)
- Tests live URLs or HTML strings
- Computes actual styles from browser
- Detects dynamic content issues
- Slower but more accurate

#### Human Standards MCP
- Uses **Cheerio** (static HTML parsing)
- Tests HTML strings only
- Parses markup statically
- Faster but less comprehensive
- Can't detect computed styles

**Winner for accuracy**: a11ymcp (browser-based testing is more thorough)
**Winner for speed**: Human Standards MCP (static parsing is faster)

---

### 10. Use Case Optimization

#### a11ymcp - Best For:
- ✅ Final accessibility audits
- ✅ Testing live websites
- ✅ Comprehensive WCAG compliance reports
- ✅ Legal/regulatory compliance
- ✅ Testing third-party sites

#### Human Standards MCP - Best For:
- ✅ Guiding AI code generation BEFORE building
- ✅ Optimizing cognitive load and UX
- ✅ Mobile-friendly interfaces (touch targets)
- ✅ Form design best practices
- ✅ Data loss prevention patterns

---

## Which Should You Use?

### **Use a11ymcp When:**
1. You need **comprehensive WCAG compliance testing**
2. You're auditing **existing websites** (live URLs)
3. You need **legally defensible accessibility reports**
4. You want the **industry-standard Axe-core engine**
5. You only care about **accessibility** (not broader UX)

### **Use Human Standards MCP When:**
1. You want **proactive guidance** for AI code generation
2. You need **cognitive load optimization**
3. You're building **mobile-first interfaces**
4. You want **forms best practices** beyond accessibility
5. You need **defensive design patterns** (autosave, confirmations)
6. You want **holistic human factors** (not just accessibility)

### **Use BOTH When:**
1. You want the best of both worlds
2. Use Human Standards for **generation guidance**
3. Use a11ymcp for **final accessibility validation**

---

## Integration Workflow

### Ideal AI Code Generation Flow

```typescript
// 1. BEFORE generating code
const guidance = await humanStandards.callTool('get_component_guidance', {
  component: 'form',
  context: { fields: 8 }
});
// → "Use 3-step wizard, WCAG AA, autosave, 48px targets..."

// 2. Generate code using guidance
const generatedHTML = generateForm(guidance);

// 3. Quick validation with Human Standards
const humanCheck = await humanStandards.callTool('validate_html', {
  html: generatedHTML
});
// → Checks cognitive load, ergonomics, forms, defensive design

// 4. Final accessibility audit with a11ymcp
const a11yCheck = await a11ymcp.callTool('test_html_string', {
  html: generatedHTML,
  wcag_standard: '2.2'
});
// → Comprehensive WCAG check with Axe-core

// 5. Return code if both pass
if (humanCheck.passed && a11yCheck.violations.length === 0) {
  return generatedHTML;
}
```

**Result**: Proactive guidance + comprehensive validation = optimal code

---

## Strengths Summary

### a11ymcp Strengths
1. ⭐ **Industry-standard Axe-core engine**
2. ⭐ **Browser-based testing (Puppeteer)**
3. ⭐ **Comprehensive WCAG rule coverage**
4. ⭐ **Tests live URLs**
5. ⭐ **Legally defensible reports**

### Human Standards MCP Strengths
1. ⭐ **Proactive component guidance**
2. ⭐ **Cognitive load optimization**
3. ⭐ **Ergonomics & touch targets**
4. ⭐ **Forms best practices**
5. ⭐ **Defensive design patterns**
6. ⭐ **49 indexed human factors documents**
7. ⭐ **Holistic human factors coverage**

---

## Complementary, Not Competing

**Key Insight**: These tools solve **different problems**:

- **a11ymcp**: "Is this code accessible?" (reactive testing)
- **Human Standards MCP**: "What should I build?" (proactive guidance)

They're **complementary**, not competing.

### Analogy
- **a11ymcp** = Spell checker (finds errors in finished text)
- **Human Standards MCP** = Writing guide (teaches you to write well)

Both valuable. Different purposes.

---

## Potential Improvements to Human Standards MCP

Based on a11ymcp's strengths:

1. **Add Axe-core integration** for comprehensive accessibility testing
   - Keep existing validator for speed
   - Add optional `validate_html_with_axe()` for deep checks

2. **Support live URL testing** with Puppeteer
   - Current: HTML strings only
   - Future: Test live sites like a11ymcp

3. **Expand accessibility rules** using Axe's coverage
   - Current: 10 rules total (3 accessibility)
   - Future: 90+ accessibility rules from Axe

4. **Computed styles detection**
   - Current: Static HTML parsing
   - Future: Optional browser rendering for style checks

---

## Conclusion

### For Your Use Case (Human Standards):

**Keep Human Standards MCP as-is** because:
1. ✅ It's **unique** - no other MCP covers cognitive load, ergonomics, defensive design
2. ✅ It provides **proactive guidance** (a11ymcp can't do this)
3. ✅ It's **fast** (static parsing vs. browser launching)
4. ✅ It's **comprehensive** beyond accessibility
5. ✅ It's tied to your **49 human factors documents**

**Consider future enhancements:**
1. Optional Axe-core integration for deep accessibility checks
2. Puppeteer support for live URL testing
3. Keep the core lightweight for speed

### Bottom Line

**a11ymcp**: Best accessibility testing MCP available
**Human Standards MCP**: Best (and only) holistic human factors MCP available

**Together**: Comprehensive coverage from guidance → generation → validation

**Recommendation**:
- Ship Human Standards MCP as-is (it's unique and valuable)
- Mention a11ymcp in docs as complementary tool for deep accessibility audits
- Consider Axe-core integration as future enhancement (Phase 2)

---

Your MCP server fills a gap that a11ymcp doesn't address. It's not competing—it's pioneering a new category: **systematic human factors validation for AI code generation**.

🎯 **Ship it.**
