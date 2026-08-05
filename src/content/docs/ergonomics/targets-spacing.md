---
title: Targets & Spacing
description: The science of touch target sizing, Fitts's Law, thumb zones, and designing interfaces that work for real human fingers.
---

Every tap, click, and touch depends on users successfully hitting the target you've designed. When targets are too small or too close together, users miss. They tap the wrong thing. They experience frustration, abandonment, and—at worst—trigger destructive actions by accident. Understanding the physics of target acquisition and the anatomy of human hands helps you design interfaces that work reliably for everyone.

In 1954, Paul Fitts formalized something we intuitively understand: **the time to reach a target depends on its distance and size**. Smaller targets require more precision, take longer to hit, and generate more errors. This principle, known as Fitts's Law, underlies every target size guideline in modern interface design.

## Fitts's Law fundamentals

### The mathematical relationship

Fitts's Law states that the time required to move to a target is a function of the distance to the target and the size of the target:

**MT = a + b × log₂(2D/W)**

Where:
- **MT** = Movement Time
- **D** = Distance to target center
- **W** = Width of target
- **a, b** = Constants based on input device

**Key insight**: Doubling the target width roughly halves the difficulty of acquisition. Making targets larger is often more effective than moving them closer.

### Index of Difficulty

The **Index of Difficulty (ID)** quantifies how hard a target is to hit:

**ID = log₂(2D/W)**

Higher ID = harder to hit = more errors = longer time

**Design implication**: Every time you shrink a target or increase the distance to it, you're making the interaction harder. Every time you enlarge a target or bring it closer, you're making it easier.

### What Fitts's Law means for design

**Larger targets are faster and more accurate**:
- Small targets require more precision
- Precision requires slower, more careful movement
- Users make more errors with small targets
- Frustration increases with repeated misses

**Closer targets are easier to hit**:
- Reducing distance reduces movement time
- Related actions should be grouped together
- Don't scatter commonly-used controls

**Edges and corners are special**:
- Screen edges act as "infinite targets"—users can't overshoot
- Corner targets are even easier (two infinite edges)
- Menu bars at screen edges are faster than floating menus

## Touch target size requirements

### Platform guidelines

Different platforms specify minimum touch target sizes:

| Platform | Minimum Size | Recommended Size |
|----------|--------------|------------------|
| **iOS (Apple HIG)** | 44×44 pt | 44×44 pt or larger |
| **Android (Material)** | 48×48 dp | 48×48 dp |
| **WCAG 2.2 Level AA** | 24×24 CSS px | — |
| **WCAG 2.2 Level AAA** | 44×44 CSS px | — |
| **Nielsen Norman Group** | 1cm (≈38px) | 10mm minimum |

### Understanding the measurements

**Why different units?**:
- **pt (points)**: iOS uses points that scale with screen density
- **dp (density-independent pixels)**: Android's scaling unit
- **CSS pixels**: Web standard that may differ from physical pixels
- **mm/cm**: Physical measurements that account for actual finger size

**Physical reality**: The average adult fingertip is **1.6–2cm (0.6–0.8 inches)** wide. The average thumb impact area is **2.5cm (1 inch)** wide. Any target smaller than the fingertip creates accuracy challenges.

### WCAG 2.2 target size criteria

**Success Criterion 2.5.8 — Target Size (Minimum) [Level AA]**:
The size of the target for pointer inputs must be at least **24×24 CSS pixels**.

**Purpose**: Ensure interactive targets can be easily activated by pointer users without accidentally hitting adjacent targets. Benefits users with:
- Hand tremors
- Limited mobility
- Reduced fine motor control
- Quadriplegia
- Age-related dexterity loss

**Exceptions to SC 2.5.8**:
- **Spacing exception**: Smaller targets are allowed if a 24px diameter circle centered on each target doesn't overlap with other targets or circles
- **Equivalent**: Another control on the same page provides the same function
- **Inline**: The target is in a sentence or constrained by line height (e.g., text links)
- **User agent control**: Size is determined by the browser/OS, not the author
- **Essential**: The size is essential for the information being conveyed

**Success Criterion 2.5.5 — Target Size (Enhanced) [Level AAA]**:
The size of the target must be at least **44×44 CSS pixels**.

**Recommendation**: Regardless of conformance level, aim for **44×44 pixels minimum**. This value is consistently recommended across experts, standards, and platforms.

### Impact of target size on accuracy

Research demonstrates clear relationships between target size and user success:

| Target Size | User Experience Impact |
|-------------|------------------------|
| Under 24px | High error rates, significant frustration |
| 24–44px | Acceptable for most users, some struggle |
| 44–48px | Good accuracy for most users |
| 48px+ | Excellent accuracy, reduced errors |

**Quantified impact**: In controlled tests, increasing tap targets from 44px to 48px improved **first-click success by 11%** on average.

**User behavior**: **74% of users** report abandoning tasks after two missed taps in a row, highlighting the business risk of small targets.

## Thumb zone design

### How people hold phones

Research by Steven Hoober found that most users operate mobile devices with one hand, relying primarily on their thumb for navigation:

- **67% of users** naturally use their right thumb for single-handed interactions
- **33% prefer left thumb**, mostly left-handed individuals
- Thumb reach varies significantly based on grip and hand size

### The thumb zone model

The screen divides into three zones based on thumb reachability:

**Easy Zone (Green)** — Natural thumb reach:
- Bottom center of screen
- Most comfortable area
- Place primary actions here
- Lowest error rates

**Stretch Zone (Yellow)** — Reachable with effort:
- Upper portions of bottom half
- Sides of the screen
- Secondary actions acceptable
- Moderate error rates

**Hard Zone (Red)** — Requires grip change or second hand:
- Top of screen
- Far corners
- Avoid placing frequent actions here
- Highest error rates and frustration

### Location-based sizing

Steven Hoober's research in "Touch Design For Mobile Interfaces" recommends different minimum sizes based on screen location:

| Screen Location | Minimum Target Size |
|-----------------|---------------------|
| **Top of screen** | 11mm (31pt / 42px) |
| **Center of screen** | 7mm (20pt / 27px) |
| **Bottom of screen** | 12mm (34pt / 46px) |

**Why larger at bottom?** Users' thumbs approach bottom targets at a flatter angle, requiring larger hit areas for accuracy.

### Designing for thumb-friendly navigation

**Best practices**:
- **Bottom navigation**: Place primary navigation at the bottom of the screen
- **Floating action buttons**: Position in thumb-friendly zones (bottom right for right-handers)
- **Key actions within reach**: Frequent interactions should be in the easy zone
- **Large touch targets**: Especially for actions users perform repeatedly

**Business impact**: A thumb-friendly redesign in a shopping app yielded a **14% lift in completed purchases** during the first week after launch.

## Spacing between targets

### Why spacing matters

Adjacent targets without sufficient spacing create several problems:

- **Accidental activation**: Tapping the wrong target
- **Hesitation**: Users slow down to aim carefully
- **Frustration**: Repeated misses lead to abandonment
- **Accessibility barriers**: Users with motor impairments struggle most

### Spacing guidelines

**Minimum spacing**: 8px between adjacent interactive targets

**Recommended spacing**: 8–12px minimum, more for destructive actions

**The spacing exception (WCAG 2.5.8)**: If targets are smaller than 24×24px, they must be spaced so that a 24px diameter circle centered on each target's bounding box doesn't overlap with other targets or circles.

### Calculating effective target area

The **effective target area** includes both the visible element and any padding/spacing that responds to touch:

```
Effective area = Visible element + Touch padding
```

A 32px button with 8px touch padding on each side has a 48px effective touch target. This approach allows for visually smaller elements while maintaining accessibility.

### Common spacing mistakes

**Too close together**:
- Closely packed buttons
- Dense icon grids
- Navigation items without gaps

**Solutions**:
- Add explicit spacing between targets
- Use touch padding that extends beyond visual boundaries
- Group related items with visible spacing

## Target placement strategies

### Edge and corner advantage

Screen edges and corners offer targeting advantages:

**Edges are "infinite" targets**:
- Users can't overshoot the edge
- Reduces precision requirement
- Faster acquisition times

**Corners are even better**:
- Two infinite edges
- Easiest targets to hit
- Reserve for frequently-used functions

**Design applications**:
- Menu bars at screen edges
- Close buttons in corners
- Navigation at bottom edge
- Scroll bars at side edges

### Separating destructive actions

Destructive actions (delete, cancel, close) should be physically separated from primary actions:

**Why this matters**:
- Users form motor patterns for frequent actions
- Muscle memory can trigger wrong taps
- Accidental destructive actions create anxiety and frustration
- Undo isn't always possible

**Implementation**:
- Place "Delete" away from "Save"
- Use visual distinction (color, size) in addition to spacing
- Require confirmation for destructive actions
- Consider "soft delete" with recovery option

### Grouping related actions

Related actions should be grouped together to reduce targeting time:

**Proximity benefits**:
- Reduces total movement distance
- Creates logical groupings
- Supports scanning and discovery
- Enables muscle memory for workflows

**Implementation**:
- Group formatting controls together
- Keep navigation items adjacent
- Place related form actions together
- Cluster settings by category

## Accessibility considerations

### Users with motor impairments

Motor impairments that affect target acquisition:

- **Tremors**: Difficulty holding hand steady
- **Limited range of motion**: Can't reach all screen areas
- **Reduced fine motor control**: Difficulty with precise movements
- **Spasticity**: Involuntary muscle contractions
- **Fatigue**: Accuracy decreases over time

**Design responses**:
- Larger touch targets (48px+ minimum)
- Generous spacing (12px+ between targets)
- Important actions in easy-to-reach areas
- Support for alternative input methods
- No time-dependent precision requirements

### Age-related considerations

Older adults often experience:
- Reduced fine motor control
- Vision changes affecting target perception
- Slower movement speeds
- Higher touch error rates

**Research finding**: Older users benefit disproportionately from larger touch targets. What's comfortable for younger users may be difficult for older ones.

### Device diversity

Consider the range of devices and contexts:

- **Small phones**: Less screen real estate
- **Large phones/tablets**: Harder to reach all areas one-handed
- **Stylus use**: May allow smaller targets
- **Gloved use**: Requires much larger targets
- **Wet fingers**: Affects touch accuracy

## Implementation guidelines

### CSS implementation for touch targets

```css
/* Minimum touch target with padding */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  padding: 8px;
}

/* For smaller visual elements */
.small-icon-button {
  /* Visual size */
  width: 24px;
  height: 24px;

  /* Extended touch area */
  padding: 12px;
  margin: -12px; /* Negative margin if needed for layout */
}

/* Spacing between targets */
.button-group > * + * {
  margin-left: 12px;
}
```

### Testing touch targets

**Manual testing**:
- Use the 24×24 Pixel Cursor Bookmarklet (Adrian Roselli)
- Test on actual devices, not just simulators
- Test with users who have motor impairments
- Test in realistic conditions (movement, distraction)

**Automated testing**:
- Lighthouse accessibility audits
- axe DevTools
- WAVE evaluation tool

**Metrics to track**:
- Tap accuracy (correct vs. missed/wrong target)
- Rage taps (rapid repeated taps indicating frustration)
- Task completion rates by device type
- Error rates for different target sizes

## Recent Research

### WCAG 2.2 Implementation

WCAG 2.2, with its new [Target Size (Minimum) criterion 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum), became the baseline accessibility standard. A [2024 DubBot analysis](https://dubbot.com/dubblog/2024/staying-on-target.html) found many sites still fail to meet even the 24px minimum, emphasizing that designers should aim for 44px regardless of conformance level.

### Touch Target Optimization Research

Research on [touch target optimization](https://garanord.md/touch-target-optimization-designing-finger-friendly-interfaces-for-mobile-devices/) found that increasing tap targets from 44px to 48px improved first-click success by 11% on average. The study also found that 74% of users abandon tasks after two missed taps.

### Thumb Zone Validation

A [comprehensive study on thumb navigation](https://medium.com/design-bootcamp/thumb-navigation-in-mobile-usability-ux-research-5d956c4ec3fb) confirmed that 67% of users naturally use their right thumb for single-handed interactions, validating the importance of thumb zone design. Bottom navigation placement showed the highest accuracy rates.

### Rage Tap Analysis

[Smashing Magazine's research](https://www.smashingmagazine.com/2023/04/accessible-tap-target-sizes-rage-taps-clicks/) on rage taps found that designers need to aim for location-specific minimums: 11mm at top of screen, 12mm at bottom. Center-screen targets can go as low as 7mm due to more perpendicular thumb approach.

### Mobile Commerce Impact

Research on thumb-friendly mobile interfaces found that **a thumb-friendly redesign yielded a 14% lift in completed purchases** during the first week after launch, demonstrating the direct business impact of proper target sizing.

### Assistive Technology Considerations

[Accessibility.digital.gov guidance](https://accessibility.digital.gov/ux/touch-targets/) emphasizes that touch targets must work for users of all abilities, including those using mouth sticks, head wands, or other assistive technology that requires larger targets.

## Implementation checklist

### Target size audit

- [ ] **Minimum size**: All interactive targets are at least 24×24px (AA) or 44×44px (AAA)
- [ ] **Recommended size**: Primary actions are 48×48px or larger
- [ ] **Touch padding**: Smaller visual elements have expanded touch areas
- [ ] **Spacing**: At least 8px between adjacent targets
- [ ] **Thumb zone**: Primary actions are in easy-reach areas
- [ ] **Destructive separation**: Delete/cancel actions are separated from primary actions
- [ ] **Edge utilization**: Important targets use edge/corner advantages where appropriate
- [ ] **Device testing**: Tested on multiple device sizes and types
- [ ] **Accessibility testing**: Tested with users who have motor impairments

## References

**Foundational Work:**
- Fitts, P.M. (1954) — The information capacity of the human motor system
- Accot & Zhai — Steering law for pointing performance
- Hoober, S. — Touch Design For Mobile Interfaces

**Platform Guidelines:**
- [Apple HIG — Touch Targets](https://developer.apple.com/design/human-interface-guidelines/accessibility#Touch-targets)
- [Material Design — Minimum touch target size](https://m3.material.io/foundations/accessible-design/accessibility-basics)
- [Touch Targets on Touchscreens](https://www.nngroup.com/articles/touch-target-size/) — NN/g

**Official Standards:**
- [WCAG 2.2 SC 2.5.8 — Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)
- [WCAG 2.2 SC 2.5.5 — Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html)

**Recent Research:**
- [Staying on Target: WCAG 2.5.8](https://dubbot.com/dubblog/2024/staying-on-target.html) — DubBot (2024)
- [Target Size and 2.5.5](https://adrianroselli.com/2019/06/target-size-and-2-5-5.html) — Adrian Roselli
- [Touch Target Size and Spacing](https://www.accessibilitychecker.org/wcag-guides/ensure-touch-targets-have-sufficient-size-and-space/)

**Practical Resources:**
- [Accessible Target Sizes Cheatsheet](https://www.smashingmagazine.com/2023/04/accessible-tap-target-sizes-rage-taps-clicks/) — Smashing Magazine
- [The Thumb Zone: Designing For Mobile Users](https://www.smashingmagazine.com/2016/09/the-thumb-zone-designing-for-mobile-users/) — Smashing Magazine
- [How to test 2.5.8 Target Size](https://www.tpgi.com/how-to-test-2-5-8-target-size-minimum/) — TPGi
- [Touch Targets | Accessibility for Teams](https://accessibility.digital.gov/ux/touch-targets/)

**Testing Tools:**
- [24×24 Pixel Cursor Bookmarklet](https://adrianroselli.com/2019/06/target-size-and-2-5-5.html) — Adrian Roselli

---

## See Also

- [Touch Targets & Spacing (Code)](/code-design-tokens/touch-targets-spacing/) — CSS and design token implementations
- [Fine Motor Sensitivity](/perception/touch/fine-motor-sensitivity/) — Understanding motor control limitations
- [Anthropometrics](/ergonomics/anthropometrics/) — Body measurements for design
- [WCAG Guidelines](/accessibility/wcag-guidelines/) — Full accessibility standards
- [Defensive Design](/decision-making-errors/defensive-design/) — Preventing accidental actions
