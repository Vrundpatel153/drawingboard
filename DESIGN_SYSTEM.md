# Design System Specifications — "The Drawing Board" Brain

This document defines the architectural guidelines, design tokens, component standards, typography rules, layout patterns, and responsive behavior for **The Drawing Board** web application.

---

## 1. Visual Identity & Design Philosophy

**The Drawing Board** design language merges precision architectural drawing with high-end editorial typography:
- **Paper Grid Texture**: Warm parchment/paper background (`#EFEBE2`) with fixed 48px blueprint grid lines (`#DAD3C2`).
- **Registration Marks**: Fixed + corner crosses (`.reg`) evoking drafting sheets and printing marks.
- **Deep Contrast Elements**: High contrast dark ink sections (`#1B1B17`) with crisp off-white typography for problem statements and focal sections.
- **Marker Accents**: Vibrant terracotta red (`#B8412E`) and rich pine green (`#24463B`) used sparingly for active states, eyebrows, step numbers, and conversion buttons.

---

## 2. Design Tokens & Color Palette

```css
:root {
  --paper:      #EFEBE2; /* Primary warm paper background */
  --paper-line: #DAD3C2; /* Blueprint grid line color */
  --ink:        #1B1B17; /* High contrast charcoal ink */
  --ink-soft:   #4A473F; /* Secondary text color */
  --pine:       #24463B; /* Deep pine green primary CTA & metrics */
  --pine-deep:  #173029; /* Hover state for pine green */
  --marker:     #B8412E; /* Red marker accent, active indicator & step tags */
  --card:       #F7F4EC; /* Soft light card background */
  --radius:     2px;     /* Subtle precision border radius */
}
```

---

## 3. Typography System

The design uses three Google Fonts to convey craft, clarity, and precision:

1. **Serif (Display & Headings)**: `'Fraunces', serif`
   - Weight: `600` (SemiBold), `450` (Book)
   - Letter-spacing: `-0.01em`
   - Used for `h1`, `h2`, `h3`, `h4`, logo text, and stat numbers.

2. **Sans-Serif (Body & Inputs)**: `'Inter', sans-serif`
   - Weight: `400` (Regular), `500` (Medium), `600` (SemiBold)
   - Used for narrative text, descriptions, buttons, forms, and general body copy.

3. **Monospace (Blueprint Tags & Technical Specs)**: `'IBM Plex Mono', monospace`
   - Weight: `400`, `500`
   - Letter-spacing: `0.03em`
   - Used for `.eyebrow`, `.tag`, step numbers (`.pstep .n`), metrics badges, breadcrumbs, and metadata.

---

## 4. Key Component Schemas

### Header & Sticky Navigation
- Sticky position at `top: 0` with frosted glass backdrop blur (`background: rgba(239,235,226,0.92)`).
- Active navigation item decorated with a 2px terracotta red underline (`.navlinks a.active::after`).

### Annotated Card (`.annot-card`)
- Card background (`var(--card)`) with 1px ink border.
- Folded terracotta slice corner indicator (`.corner`) at the top right.
- Dashed rows (`border-bottom: 1px dashed var(--paper-line)`) for specs and details.

### Deliverables Grid (`.deliv-grid`)
- High-precision 4-column layout with 1px ink grid lines.
- Card items (`.deliv-col`) displaying sub-tags, item lists, and inline links.

### Process Steps (`.process`)
- Horizontal scrolling step sequence with IBM Plex Mono step numbers (`.pstep .n`).

### Guarantee Banner (`.guarantee`)
- Full-width card with circular pine green badge (`.badge`), headline, and clear terms.

---

## 5. Mobile & Responsive Guidelines

- **Breakpoints**:
  - `920px`: Grid collapses from 3-4 columns down to 2 columns.
  - `860px`: Desktop menu switches to mobile drawer.
  - `700px`: Grid collapses to single column, sticky bottom CTA (`.sticky-cta`) slides in on mobile viewports.
  - `560px`: Padding adjusts for narrow smartphones.

---

## 6. Page Routing Architecture

All pages must maintain relative paths for navigation:
- Home / Studio: `index.html`
- Services: `services.html`
- Portfolio: `work.html`
- Contact: `contact.html`
- Case Study 1: `work-after8.html`
- Case Study 2: `work-lumen.html`
- Studio: `studio.html`
- Insights: `insights.html`
