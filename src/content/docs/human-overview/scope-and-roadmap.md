---
title: Scope & Roadmap
description: Current focus areas and planned expansion into multi-modal design domains
---

## Project Scope

Human Standards documents principles for designing technology that fits human capabilities and limitations. While the underlying science applies universally, **this project currently focuses on digital interface design** — web, mobile, and desktop applications.

### Why Start with Digital Interfaces?

Digital interfaces are:
- **Most widely needed** — billions of people use web and mobile apps daily
- **Rapidly evolving** — AI code generation tools need human factors guidance now
- **Well-researched** — decades of HCI research and industry best practices to draw from
- **Measurable** — clear metrics (completion rates, error rates, accessibility scores)

Starting here allows us to establish a strong foundation before expanding to more complex domains.

## Current Coverage

### Fully Documented

**Digital Interface Design**
- Web applications (responsive, progressive web apps)
- Mobile apps (iOS, Android)
- Desktop software (cross-platform)
- Accessibility (WCAG 2.2 AA compliance)
- Cognitive principles for screen-based interaction
- Physical ergonomics for standard input devices

**Implementation Support**
- React/TypeScript code examples
- CSS design tokens
- MCP server validation rules
- Integration with AI code generation tools

### Partially Covered

**Physical Ergonomics**
- Touch target sizing (48×48px WCAG 2.2)
- Keyboard and mouse interaction
- Screen ergonomics (viewing distance, angles)

**Note:** Physical ergonomics principles are documented but focused on computer workstation setup and digital input devices, not broader industrial or product ergonomics.

## Planned Expansion

The following domains are on our roadmap for future documentation. Each represents a significant undertaking requiring domain expertise, research synthesis, and validation tooling.

### Phase 1: Voice & Conversational UI

**Scope:**
- Voice assistants (Siri, Alexa, Google Assistant patterns)
- Conversational AI (chatbots, customer service)
- Speech recognition and synthesis
- Multi-turn dialogue design

**Challenges:**
- Context preservation across turns
- Error recovery when speech recognition fails
- Balancing brevity vs. clarity in audio-only interfaces
- Accessibility for speech and hearing differences

**Why Next:** AI-powered conversational interfaces are rapidly proliferating, and current guidance is fragmented.

### Phase 2: Virtual & Augmented Reality

**Scope:**
- VR headset interfaces (Meta Quest, Vision Pro)
- AR overlays and spatial computing
- 3D interaction paradigms
- Motion sickness and comfort
- Spatial audio and haptics

**Challenges:**
- Simulator sickness and discomfort
- Fatigue from extended use
- Accessibility for motion and depth perception differences
- Lack of established conventions

**Why Important:** Spatial computing is maturing, but human factors guidance lags behind hardware capabilities.

### Phase 3: Robotics & Physical AI

**Scope:**
- Service robots (delivery, cleaning, assistance)
- Collaborative robots (cobots in manufacturing)
- Social robots (elder care, education)
- Human-robot interaction patterns
- Safety and trust

**Challenges:**
- Physical safety in shared spaces
- Predictability and transparency of robot behavior
- Social cues and anthropomorphization
- Accessibility across physical abilities

**Why Critical:** As robots enter homes and workplaces, poor human factors design creates safety risks and adoption barriers.

### Phase 4: IoT & Ambient Computing

**Scope:**
- Smart home devices (thermostats, lights, locks)
- Ambient sensors and actuators
- Multi-device ecosystems
- Privacy and control
- Device discoverability

**Challenges:**
- Invisible interfaces (no screen to provide feedback)
- Fragmented ecosystems and standards
- Privacy and surveillance concerns
- Accessibility when devices lack visual/audio feedback

**Why Needed:** IoT devices proliferate without consistent interaction paradigms, leading to user frustration and abandonment.

### Phase 5: Wearables & Body-Worn Devices

**Scope:**
- Smartwatches and fitness trackers
- Health monitoring devices
- AR glasses
- Haptic feedback devices
- Notification and interruption management

**Challenges:**
- Tiny screens and limited interaction space
- Battery life vs. functionality trade-offs
- Glanceability and interruption
- Privacy (devices collecting biometric data)
- Accessibility for motor and sensory differences

**Why Important:** Wearables are intimate and continuous, requiring different design patterns than desktop/mobile.

### Phase 6: Physical Product Design

**Scope:**
- Consumer products (appliances, tools)
- Medical devices
- Control panels and dashboards
- Packaging and assembly
- Industrial ergonomics

**Challenges:**
- Physical constraints (materials, manufacturing)
- Durability and environmental conditions
- Safety in hazardous contexts
- Global diversity in body dimensions and abilities

**Why Challenging:** Physical products have higher stakes (manufacturing costs, safety) and slower iteration cycles than software.

### Phase 7: Automotive HMI

**Scope:**
- In-vehicle infotainment systems
- Driver assistance and autonomy handoff
- Instrument clusters and heads-up displays
- Voice control while driving
- Passenger experiences

**Challenges:**
- Distraction and safety (eyes on road, hands on wheel)
- Automation trust and mode confusion
- Accessibility for drivers with disabilities
- Regulatory compliance (NHTSA, UNECE)

**Why Last:** Automotive has unique safety constraints, regulatory requirements, and long development cycles. Building on prior phases (voice, multi-modal) is essential.

## Contributing to the Roadmap

### Domain Expertise Needed

We're looking for contributors with expertise in:
- **Voice/Conversational Design** — dialogue design, NLU/NLG, speech accessibility
- **VR/AR** — spatial interaction, comfort/safety, 3D UX
- **Robotics** — HRI, safety standards, social robotics
- **IoT** — ambient interfaces, device ecosystems, privacy
- **Wearables** — micro-interactions, notification design, health monitoring
- **Physical Products** — industrial design, anthropometrics, consumer ergonomics
- **Automotive** — driver distraction, automation handoff, regulatory compliance

### What We Need

For each domain, we need:
1. **Principles documentation** — core human factors concepts specific to the domain
2. **Real-world examples** — case studies with metrics (following our [documentation framework](/examples/how-to-document-examples/))
3. **Code/design examples** — practical implementations
4. **MCP validation rules** — encoding domain principles for AI code generation
5. **Cross-references** — linking to existing Human Standards content where principles overlap

### How to Contribute

1. **Express interest** — Open a GitHub issue indicating which domain you'd like to contribute to
2. **Collaborate on scope** — Work with maintainers to define initial coverage
3. **Submit draft content** — Follow our [contributing guidelines](https://github.com/aklodhi98/humanstandards/blob/main/CONTRIBUTING.md)
4. **Iterate with community** — Incorporate feedback from domain experts and practitioners

## Principles vs. Implementation

**Important distinction:**

Many human factors principles apply across domains:
- **Cognitive load** matters in VR, voice, and physical products
- **Feedback and visibility** are critical in all interfaces
- **Accessibility** spans digital, physical, and multi-modal contexts

What changes across domains is the **implementation**:
- **Digital:** Visual feedback via UI updates, toast notifications
- **Voice:** Auditory confirmation, error recovery dialogue
- **VR:** Spatial audio, haptic feedback, visual anchors in 3D space
- **Physical:** Tactile buttons, LED indicators, physical constraints

This project aims to document both universal principles and domain-specific implementation patterns.

## Timeline Disclaimer

The timeline above is aspirational and depends on:
- **Contributor availability** — This is an open-source project
- **Domain complexity** — Some areas require more research synthesis than others
- **Community priority** — We'll accelerate domains with strong contributor interest
- **Validation rigor** — Each domain needs real-world examples and measured impact

**We will not compromise quality for speed.** Each domain will launch when documentation meets our standards for:
- Evidence-based principles
- Real-world examples with metrics
- Practical implementation guidance
- Accessible, inclusive design patterns

## Stay Updated

- **Ideas and domain expertise** — Propose additions: https://github.com/aklodhi98/humanstandards/issues/new
- **Issues & Roadmap** — Track progress on multi-modal expansion: https://github.com/aklodhi98/humanstandards/issues
- **Contributing Guide** — Learn how to contribute: https://github.com/aklodhi98/humanstandards/blob/main/CONTRIBUTING.md

---

## See Also

- [What Are Human Standards?](/human-overview/what-are-human-standards/) — Core definition and goals
- [Key Principles & Laws](/human-overview/key-principles-and-laws/) — Universal principles that apply across domains
- [Real-World Examples](/examples/) — Current examples focused on digital interfaces
- [Contributing Guide](https://github.com/aklodhi98/humanstandards/blob/main/CONTRIBUTING.md) — How to contribute to any domain
