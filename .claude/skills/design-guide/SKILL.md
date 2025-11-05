---
name: design-guide
description: Modern UI design system ensuring clean, professional interfaces. Use when building any UI component, webpage, React artifact, HTML interface, or visual design. Enforces minimal aesthetic, consistent spacing (8px grid), neutral color palette with single accent color, proper typography hierarchy, and clear interactive states. Prevents common mistakes like rainbow gradients, inconsistent spacing, and cluttered layouts.
---

# Design Guide

Design principles for creating modern, professional user interfaces.

## Core Philosophy

**Clean and minimal** - Prioritize whitespace and visual breathing room. Every element should have clear purpose. Remove anything that doesn't serve the user.

**Consistency over novelty** - Predictable patterns build trust. Users should never wonder what an element does.

**Mobile-first thinking** - Design for small screens first, then enhance for larger viewports.

## Spacing System

Use an **8px grid system** exclusively. All spacing must be multiples of 8:

- **8px** - Tight spacing within components (icon-to-text, button padding)
- **16px** - Standard spacing between related elements
- **24px** - Spacing between component groups
- **32px** - Section spacing within a container
- **48px** - Spacing between major sections
- **64px** - Large section breaks

**Never** use arbitrary values like 12px, 20px, or 36px. The grid system creates visual rhythm.

## Color Palette

### Base Colors

Use **neutral grays and off-whites** as foundation:

- **Background**: `#FFFFFF` (white) or `#FAFAFA` (off-white)
- **Surface**: `#F5F5F5` or `#F9F9F9` for elevated cards
- **Borders**: `#E0E0E0` or `#EEEEEE` for subtle separation
- **Text Primary**: `#1A1A1A` or `#212121`
- **Text Secondary**: `#666666` or `#757575`
- **Text Disabled**: `#BDBDBD`

### Accent Color

Choose **ONE accent color** and use it sparingly:

- Primary actions (main CTA button)
- Active states
- Key information highlights
- Links (when not in navigation)

**Good accent colors**: Deep blues (`#0066CC`), Forest greens (`#2E7D32`), Warm oranges (`#E65100`), Slate blues (`#455A64`)

**Avoid**: Generic purple/blue gradients, neon colors, anything that screams "2010s startup"

### Color Usage Rules

- **Maximum 3 colors** on any screen (background + text + accent)
- **No gradients** on buttons, cards, or backgrounds
- **Use transparency** for subtle effects (e.g., `rgba(0,0,0,0.05)` for hover states)
- **Test contrast** - Ensure 4.5:1 ratio minimum for text

## Typography

### Hierarchy

Establish clear visual hierarchy with size and weight:

- **Headings**: 24px, 32px, 40px (bold or semi-bold)
- **Body text**: 16px minimum (never smaller)
- **Supporting text**: 14px (secondary info, captions)
- **Labels**: 14px (form labels, small UI text)

### Font Selection

Use **maximum 2 fonts**:

1. **Sans-serif** for UI and body text (Inter, SF Pro, Roboto, System UI)
2. **Optional serif** for headings if appropriate (optional, most UIs don't need this)

### Best Practices

- **Line height**: 1.5 for body text, 1.2 for headings
- **Line length**: 60-80 characters maximum for readability
- **Font weight**: Use regular (400) and semi-bold (600). Avoid light weights for UI text.
- **Letter spacing**: Default is fine. Don't adjust unless you have good reason.

## Shadows

Use shadows subtly to suggest elevation:

- **None**: Flat elements on background (most text, icons)
- **Subtle**: `0 1px 3px rgba(0,0,0,0.12)` - Cards, inputs at rest
- **Lifted**: `0 4px 6px rgba(0,0,0,0.1)` - Hovering cards, dropdowns
- **Modal**: `0 10px 25px rgba(0,0,0,0.15)` - Overlays, modals

**Never** use heavy shadows, colored shadows, or multiple shadows on one element.

## Rounded Corners

Be strategic with border-radius:

- **Buttons**: `6px` or `8px` - Friendly but not pill-shaped
- **Cards**: `8px` or `12px` - Gentle rounding
- **Inputs**: `6px` or `8px` - Match button style
- **Modals**: `12px` - Slightly more pronounced
- **Pills/Badges**: `16px` or `9999px` - Fully rounded

**Not everything needs rounding** - Table cells, full-width mobile elements, and navigation bars often look better sharp (`border-radius: 0`).

## Interactive States

Every interactive element needs clear states:

### Buttons

```
Default: Solid background, proper padding (12px 24px minimum)
Hover: Slight background darkening (10-15%), subtle lift (2-4px shadow)
Active: Slightly darker than hover, shadow removed
Disabled: Reduced opacity (0.5), no hover effects, cursor: not-allowed
```

### Links

```
Default: Accent color, no underline
Hover: Underline appears, slightly darker
Visited: Slightly muted version of accent color (optional)
```

### Form Inputs

```
Default: Light border (#E0E0E0), white background
Focus: Accent color border, subtle glow (box-shadow with accent color at 0.2 opacity)
Error: Red border (#D32F2F), error message below in red text
Disabled: Gray background (#F5F5F5), grayed text
```

### Cards

```
Default: White background, subtle border OR subtle shadow (not both)
Hover (if clickable): Shadow increases slightly, cursor: pointer
```

## Component Patterns

### Buttons

**Good**:
- Solid color background (accent color for primary, gray for secondary)
- Padding: 12px 24px (or 8px/16px for compact)
- Clear hover state (background darkens 10-15%)
- Subtle shadow: `0 1px 2px rgba(0,0,0,0.1)`
- Icon + text has 8px gap

**Bad**:
- Gradient backgrounds
- Tiny padding (6px or less)
- Flat with no hover feedback
- Rainbow of button colors

### Cards

**Good**:
- White/off-white background
- Padding: 24px or 32px
- Subtle border (`1px solid #E0E0E0`) OR subtle shadow, not both
- 8px or 12px border-radius
- Internal spacing follows 8px grid

**Bad**:
- Heavy drop shadows
- Inconsistent padding
- Border AND shadow together
- Gradient backgrounds

### Forms

**Good**:
- Labels above inputs (16px margin-bottom)
- Input height: 40px minimum
- Input padding: 12px 16px
- 24px spacing between form fields
- Clear error states with red border + message below
- Submit button stands out (accent color)

**Bad**:
- Placeholder text as labels
- Inconsistent spacing between fields
- No error feedback
- Unclear what's required vs optional

### Navigation

**Good**:
- Clear active state (background change or border indicator)
- Consistent padding (16px minimum)
- Logical grouping with spacing
- Mobile: hamburger menu at ~768px breakpoint

**Bad**:
- Too many top-level items (>7)
- Unclear which page is active
- Inconsistent spacing
- Tiny touch targets on mobile

## Common Mistakes to Avoid

❌ **Rainbow gradients everywhere** - Use solid colors
❌ **Tiny text under 16px** for body content - Minimum 16px
❌ **Inconsistent spacing** (17px here, 22px there) - Use 8px grid
❌ **Different color for every element** - Stick to neutral + one accent
❌ **Heavy shadows on everything** - Use subtle elevation
❌ **No hover states** - Always show feedback
❌ **Border-radius: 50px on rectangles** - Use appropriate rounding
❌ **Cluttered layouts** - Add whitespace

## Checklist Before Shipping

- [ ] All spacing uses 8px grid system
- [ ] Body text is minimum 16px
- [ ] Only using base colors + one accent color
- [ ] All interactive elements have hover/active/disabled states
- [ ] Shadows are subtle (if used at all)
- [ ] Border radius is consistent within component types
- [ ] Design looks clean on mobile (320px width)
- [ ] Sufficient contrast ratios (4.5:1 for text)
- [ ] No gradients (unless explicitly requested)

## When to Break the Rules

These guidelines create professional, modern interfaces. Break them only when:

1. **Brand requirements** - Client has specific brand guidelines
2. **Explicit user request** - User specifically asks for gradients, specific colors, etc.
3. **Strong design rationale** - You can articulate why the exception improves UX

When breaking rules, do so intentionally and document why.

---

For specific component examples and code patterns, see [references/components.md](references/components.md).
