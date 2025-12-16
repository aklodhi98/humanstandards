---
title: Localization & Cultural Variations
description: Design for language, formats, and cultural metaphors; support RTL and expansion.
---

Your users don't all speak English, use the same date formats, or share the same cultural references. Localization isn't just translation — it's adapting your entire experience to work naturally in different contexts.

## Language and text

### Plan for text expansion

Translated text is often longer than English. German can be 30% longer; Finnish can be 50% longer. Design flexible layouts that accommodate expansion without breaking.

- Avoid fixed-width buttons with text
- Test with longer placeholder strings during development
- Use CSS that wraps gracefully

### Externalize all strings

Never hardcode text in your UI. Extract everything — including error messages, labels, and microcopy — into resource files that can be translated.

### Handle plurals correctly

Different languages have different plural rules. English has two forms (1 item, 2 items), but Russian has three, Arabic has six. Use ICU MessageFormat or similar systems that handle pluralization properly.

### Watch your concatenation

"Showing results 1-10 of 100" requires careful handling. Word order varies by language, and you can't just splice numbers into string templates. Use formatting functions designed for localization.

## Date, time, and numbers

Formats vary dramatically:

- **Dates**: MM/DD/YYYY (US) vs DD/MM/YYYY (UK, EU) vs YYYY-MM-DD (ISO)
- **Time**: 12-hour with AM/PM vs 24-hour
- **Numbers**: 1,234.56 (US) vs 1.234,56 (Germany) vs 1 234,56 (France)
- **Currency**: $100 vs 100$ vs 100,00 €

Use the user's locale settings and format accordingly. Never assume.

## Right-to-left (RTL) languages

Arabic, Hebrew, Persian, and Urdu are written right-to-left. This affects more than text direction:

- Navigation typically moves to the right side
- Progress indicators flow right-to-left
- Icons with directional meaning (arrows, forward/back) need mirroring
- But some icons don't flip (logos, playback controls)

Use CSS logical properties (`margin-inline-start` instead of `margin-left`) to make RTL support automatic.

## Cultural considerations

### Icons and imagery

- Hand gestures mean different things in different cultures (thumbs up isn't universally positive)
- Colors have cultural associations (white for weddings in the West; mourning in parts of Asia)
- Religious symbols and imagery may be inappropriate or offensive
- Depictions of people should represent diverse populations

### Metaphors and idioms

- "Home run" means nothing outside baseball cultures
- Mailbox icons may not look like local mailboxes
- "Folder" metaphors assume familiarity with office filing systems

Use universal concepts or adapt metaphors for local contexts.

### Legal and regulatory

- Privacy requirements (GDPR in EU, LGPD in Brazil)
- Accessibility mandates vary by country
- Required disclosures, cookie consent, data residency

## Testing localization

- Test with real speakers, not just machine translation
- Verify layouts with actual translated content
- Test RTL with native RTL users
- Check that date/number formatting matches user expectations

## References

- W3C Internationalization: https://www.w3.org/International/
- Unicode CLDR (Common Locale Data Repository): https://cldr.unicode.org/
- Material Design — Bidirectionality: https://m3.material.io/foundations/layout/understanding-layout/bidirectionality
