---
title: What are Human Standards?
description: Human Standards (also known as Human Factors or HF/E) are principles for designing technology that fits human capabilities and limitations.
---

Human Standards — also known as Human Factors and Ergonomics (HF/E) — is the discipline focused on designing systems that fit human capabilities and limitations: physical, cognitive, and organizational.

The term "Human Standards" emphasizes our goal: **clear, actionable, machine-readable principles for building technology that truly serves people** — and that AI agents can use to validate and improve interface designs.

---

## Why "Human Standards"?

### The Problem We're Solving

Technology is built by people who deeply understand their systems but often overlook the humans who use them. The result:

- **Interfaces that work for experts, confuse newcomers**
- **Features that assume perfect attention, memory, and motor control**
- **Designs that exclude people with disabilities**
- **Error-prone systems that blame users for predictable mistakes**

Human Factors research has generated decades of evidence about human capabilities and limitations. But this knowledge is scattered across academic papers, expensive consultancies, and tribal knowledge within organizations.

### Our Approach

Human Standards makes this knowledge:

| Property | Traditional HF/E | Human Standards |
|----------|-----------------|-----------------|
| **Accessible** | Academic papers, expensive training | Free, searchable documentation |
| **Actionable** | Principles and theories | Specific implementation guidance |
| **Machine-readable** | Prose descriptions | YAML validation rules, JSON tokens |
| **Current** | Published research (months/years lag) | Continuously updated |
| **Integrated** | Separate from development | MCP server for AI-assisted design |

---

## Definition

> **Human Factors and Ergonomics (HF/E)** is the scientific discipline concerned with understanding interactions among humans and other elements of a system, and the profession that applies theory, principles, data, and methods to design in order to optimize human well-being and overall system performance.
>
> — International Ergonomics Association

In simpler terms: designing things so people can use them effectively, safely, and comfortably.

---

## Core Goals

### 1. Reduce Errors and Harm

Design systems that:
- **Prevent** predictable errors before they occur
- **Tolerate** mistakes without catastrophic consequences
- **Enable** easy recovery when errors happen

### 2. Improve Performance and Efficiency

Enable people to:
- **Complete tasks** faster and more accurately
- **Learn systems** with minimal training
- **Maintain performance** over extended use

### 3. Increase Accessibility and Inclusion

Ensure systems work for people with:
- **Visual** differences (blindness, low vision, color blindness)
- **Motor** differences (limited mobility, tremors, missing limbs)
- **Cognitive** differences (attention, memory, processing speed)
- **Hearing** differences (deafness, hearing loss)
- **Temporary** impairments (injury, environment, situational)

### 4. Enhance Satisfaction and Trust

Create experiences that:
- **Feel natural** and intuitive
- **Build confidence** through appropriate feedback
- **Respect users** with honest, transparent design
- **Support wellbeing** rather than exploit vulnerabilities

---

## The Three Domains

### Physical Ergonomics

How human bodies interact with systems.

| Factor | Design Consideration |
|--------|---------------------|
| **Anthropometrics** | Body measurements for sizing and reach |
| **Biomechanics** | Movement patterns, force requirements |
| **Posture** | Sustainable body positions |
| **Environment** | Lighting, noise, temperature |
| **Touch** | Target sizes, spacing, haptic feedback |

### Cognitive Ergonomics

How human minds process information and make decisions.

| Factor | Design Consideration |
|--------|---------------------|
| **Perception** | How we see, hear, and feel interfaces |
| **Attention** | What we notice, what we miss |
| **Memory** | What we can hold in mind (7±2 chunks) |
| **Learning** | How we build mental models |
| **Decision-making** | How we choose under uncertainty |
| **Error** | Slips, mistakes, and their prevention |

### Organizational Ergonomics

How human systems and workflows operate.

| Factor | Design Consideration |
|--------|---------------------|
| **Communication** | Information flow between people |
| **Collaboration** | Multi-user coordination |
| **Teamwork** | Roles, responsibilities, handoffs |
| **Training** | Skill development and maintenance |
| **Culture** | Norms, expectations, safety climate |

---

## Current Project Scope

### What's Included

**This documentation currently focuses on digital interfaces:**

| Domain | Coverage |
|--------|----------|
| **Web applications** | Full guidance, code patterns, validation |
| **Mobile apps** | Touch targets, gestures, responsive design |
| **Desktop software** | Keyboard shortcuts, window management |
| **Digital accessibility** | WCAG 2.2 compliance, ARIA patterns |
| **Cognitive principles** | For screens and digital interaction |
| **Input ergonomics** | Keyboard, mouse, touch, stylus |

### What's Coming

**On the roadmap but not yet covered:**

| Domain | Planned Coverage |
|--------|------------------|
| **Voice interfaces** | Conversational design, speech recognition |
| **VR/AR** | Spatial computing, immersive UX |
| **AI systems** | Human-AI interaction, explainability |
| **IoT/Ambient** | Smart environments, multimodal |
| **Wearables** | Body-worn devices, health tech |
| **Automotive HMI** | In-vehicle interfaces, driving context |
| **Physical products** | Industrial design ergonomics |

See [Scope & Roadmap](/human-overview/scope-and-roadmap/) for expansion plans.

---

## How Human Standards Work

### 1. Principles

Foundational concepts from human factors research, expressed as clear guidelines:

> **Miller's Law:** People can hold approximately 7±2 chunks of information in working memory. Keep menus, options, and steps to 7 or fewer items where possible.

### 2. Specifications

Concrete, measurable requirements for implementation:

| Specification | Value | Source |
|---------------|-------|--------|
| **Minimum touch target** | 44×44px (iOS), 48×48dp (Android) | Platform guidelines |
| **Maximum response time** | 100ms for perceived instant | Nielsen research |
| **Minimum contrast ratio** | 4.5:1 (AA), 7:1 (AAA) | WCAG 2.2 |

### 3. Validation Rules

Machine-readable rules that AI agents and linters can apply:

```yaml
rules:
  - id: touch-target-minimum
    severity: error
    check: "Interactive elements are at least 44×44px"
    wcag: "2.5.5 AA"

  - id: contrast-ratio-text
    severity: error
    check: "Text contrast ratio is at least 4.5:1"
    wcag: "1.4.3 AA"
```

### 4. Code Patterns

Implementation examples showing how to apply principles:

```css
/* Touch target sizing */
.button {
  min-width: 44px;
  min-height: 44px;
  padding: 12px 24px;
}

/* Safe spacing between targets */
.button + .button {
  margin-left: 8px; /* Prevent accidental activation */
}
```

### 5. Decision Logic

Pseudo-code showing when and how to apply guidelines:

```pseudo
FUNCTION evaluateTouchTarget(element):
  IF element.width < 44 OR element.height < 44:
    RETURN error("Touch target too small")

  IF nearbyTargets.any(distance < 8):
    RETURN warning("Targets too close together")

  RETURN pass
```

---

## For Humans and AI Agents

### For Human Readers

This documentation provides:
- **Explanations** of why design decisions matter
- **Examples** showing good and bad practices
- **Research** citations for deeper learning
- **Checklists** for practical implementation

### For AI Agents

This documentation provides:
- **Structured data** (tables, YAML) for parsing
- **Validation rules** for automated checking
- **Decision logic** for design recommendations
- **Specifications** for code generation
- **MCP server integration** for real-time guidance

---

## Relationship to Other Disciplines

### User Experience (UX) Design

Human Standards provides the **evidence base** for UX design:
- UX designers create specific designs
- Human Standards ensures those designs fit human capabilities

### Accessibility (A11y)

Accessibility is a **subset** of Human Standards:
- All accessibility is human factors
- Not all human factors is accessibility

### Usability

Usability is **one measure** of success:
- Human Standards addresses effectiveness, efficiency, and satisfaction
- Plus safety, wellbeing, and inclusion

### Ergonomics

Ergonomics and Human Factors are **largely synonymous**:
- "Ergonomics" emphasizes physical factors (common in Europe)
- "Human Factors" emphasizes cognitive factors (common in US)
- Both terms describe the same discipline

---

## Key Outputs

| Output Type | Description | Example |
|-------------|-------------|---------|
| **Principles** | Foundational concepts | "Recognition over recall" |
| **Guidelines** | Specific recommendations | "Use 44×44px minimum targets" |
| **Patterns** | Reusable solutions | Modal dialog ARIA pattern |
| **Tokens** | Design values | Color, spacing, typography |
| **Validation** | Automated checks | Contrast ratio linter |
| **Evaluation** | Assessment methods | Usability testing protocols |

---

## References

**Foundational:**
- [ISO 9241-210 — Human-Centred Design](https://www.iso.org/standard/77520.html)
- [IEA Definition of Ergonomics](https://iea.cc/what-is-ergonomics/)
- [HFES — Human Factors & Ergonomics Society](https://www.hfes.org/)

**Accessibility:**
- [W3C WAI — Accessibility Fundamentals](https://www.w3.org/WAI/fundamentals/)
- [WCAG 2.2 Specification](https://www.w3.org/TR/WCAG22/)

**History:**
- [The History of Human Factors — HFES](https://www.hfes.org/about-hfes/history)

---

## See Also

- [Why Human Constraints Matter](/human-overview/why-human-constraints-matter/) — The case for human-centered design
- [Key Principles & Laws](/human-overview/key-principles-and-laws/) — Foundational design principles
- [Getting Started](/human-overview/getting-started/) — Where to begin
- [Scope & Roadmap](/human-overview/scope-and-roadmap/) — Future expansion plans
