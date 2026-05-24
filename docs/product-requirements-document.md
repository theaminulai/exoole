# Product Requirements Document

**Product:** Atomic Editor  
**Type:** WordPress Plugin — Visual Page Builder  
**License:** GPL-3.0-or-later  
**Status:** In Development

---

## Problem Statement

Elementor, Divi, and Beaver Builder dominate the WordPress page builder market. They share the same fundamental architectural flaw: built before Gutenberg, they maintain a parallel DOM — proprietary HTML serialization, inline styles, thousands of lines of custom CSS, and hundreds of kilobytes of JavaScript on every page regardless of what the page contains.

Gutenberg solved the content model problem at the WordPress core level in 2018. No mainstream page builder has been built to take full advantage of it from day one. Atomic Editor is that builder.

---

## Vision

A next-generation WordPress page builder where:

- Every block is a native WordPress block — portable, FSE-compatible, and content that survives plugin deactivation
- The frontend is fast by default — Tailwind JIT under 20KB CSS, zero JS for static blocks
- No developer anywhere in the project ever writes a line of custom CSS
- Tailwind CSS is the single styling system across every surface — blocks, editor, admin, and PHP templates

---

## Target Users

**WordPress agencies** — Build client sites with pattern libraries and locked layouts. Hand off to clients who can edit content without breaking the design. Deliver sites that score 90+ on Lighthouse without post-build optimization.

**Content editors** — Edit pages on a modern canvas with inline editing, a draggable navigator, and no cluttered side panels.

**SaaS developers** — Embed the block editor in any web application via the standalone SDK with a pluggable data adapter.

---

## Competitive Positioning

| | Atomic Editor | Elementor | Divi | Beaver Builder |
|---|---|---|---|---|
| Content model | Native WP blocks | Proprietary DOM | Proprietary DOM | Mixed |
| Total CSS | < 20KB (JIT) | 1MB+ | 1.5MB+ | 800KB+ |
| Custom CSS in codebase | Zero | Extensive | Extensive | Mixed |
| Frontend JS (static) | 0KB | 300–600KB | 400KB+ | 250KB+ |
| FSE support | Full native | Partial | None | None |
| Content portability | Full | Locked in | Locked in | Partial |
| `theme.json` | Full | None | None | None |
| FCP target | < 1.5s | 3s+ | 4s+ | 3s+ |
| Dev stack | Modern | Legacy | Proprietary | Limited |

---

## Core Requirements

### CR-01 — Native block output

Every block is a valid WordPress block registered via `block.json`. `save()` returns standard block markup. Disabling the plugin never breaks the content.

### CR-02 — Zero frontend JavaScript for static blocks

Static blocks ship zero JS. Interactive blocks use `@wordpress/interactivity` exclusively. No jQuery, no React on the frontend, no third-party JS frameworks.

### CR-03 — Tailwind CSS everywhere — zero custom CSS

Tailwind is the single styling system across all surfaces. This is a hard project rule enforced by a lint step that rejects any `.css` or `.scss` file committed to the repository. One `tailwind.config.ts` at the repo root. One `build/atomic-editor.css` output. Zero custom CSS.

### CR-04 — `theme.json` integration

Brand color palette and spacing scale registered in `theme.json`. Values match `tailwind.config.ts` exactly.

### CR-05 — FSE compatibility

All blocks work in the Site Editor. Patterns, synced patterns, template parts, and Block Locking all work as expected.

### CR-06 — Performance targets

| Metric | Target |
|---|---|
| Total CSS (Tailwind JIT) | < 20KB |
| Frontend JS (static page) | 0KB |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Lighthouse Performance | ≥ 90 |

### CR-07 — Block Locking API

Agencies lock layout using the native Block Locking API. No custom locking system needed.

---

## Feature Requirements

### Phase 1 — Core Foundation (Weeks 1–8)

**Plugin shell**
- Rename Exoole scaffold to Atomic Editor (constants, text domain, file names)
- PHP autoloader, version checks, WP 6.7+ / PHP 7.4+ requirements
- Four block categories: AE — Layout, Content, Media, Interactive
- Auto-register all blocks from `src/blocks/**/block.json`
- Single Tailwind config, `build/atomic-editor.css` enqueued once per page

**Monorepo packages**
- `@atomic-editor/utils` — `cn()` (clsx + tailwind-merge), Tailwind class maps, responsive utilities
- `@atomic-editor/icons` — SVG icon set
- `@atomic-editor/hooks` — `useBlockAttributes`, `useBlockEditor`, `useMediaUpload`
- `@atomic-editor/components` — Button, Card, Modal, ColorPicker, SpacingControl (all Tailwind)

**Core blocks (12)**
- Layout: Section, Container, Grid, Flexbox, Div, Column
- Content: Heading, Paragraph, RichText, List, Quote
- Action: Button

Each block: Tailwind-based inspector controls, attribute-driven class maps, no CSS files.

**Design tokens**
- Brand colors in `tailwind.config.ts` and `theme.json`: `#3858e9`, `#33f078`, `#0d0d10`
- Typography: Plus Jakarta Sans · DM Sans · DM Mono

---

### Phase 2 — Builder UX (Weeks 9–20)

**Visual canvas**
- Drag-and-drop (native Gutenberg DnD + visual overlay)
- Inline content editing — no side panel for text
- Draggable floating Navigator panel (auto-height, drag anywhere on screen)
- Block toolbar: Section label, Move Up, Move Down, Copy, Delete

**Pattern library**
- 30+ registered WP patterns: Hero, Features, Pricing, Testimonial, CTA, Footer
- Searchable pattern picker panel
- Agency pattern packs as installable plugin add-ons

**Responsive preview**
- Desktop / tablet / mobile canvas resize
- Per-block responsive overrides via Tailwind class maps

**Agency mode**
- One-click Block Locking toggle for all structural blocks
- Role-based content slots

**Marketing blocks (12)**
- Hero, Card Grid, Pricing Table, Testimonial, Logo Grid, CTA Banner
- Stats Counter, Feature List, FAQ Accordion, Timeline, Team Grid, Gallery

**Global styles panel**
- Visual controls backed by `theme.json`
- Live preview on canvas

---

### Phase 3 — Platform + Pro (Weeks 21–36)

**Interactive blocks** (all via `@wordpress/interactivity`)
- Tabs, Accordion, Slider, Popup Trigger, Mega Menu

**Dynamic blocks**
- Query Loop+, Post Grid, Post Carousel
- ACF / meta field binding

**WooCommerce blocks**
- Product, Cart, Checkout, Archive
- Tailwind-styled, consistent with site design automatically

**AI layout assistant**
- Describe a page in natural language → full block layout inserted into canvas
- Server-side only — no end-user API key required

**SDK**
- `@atomic-editor/sdk` on npm
- `AtomicEditor.init({ container, adapter })` for standalone non-WP use
- WordPress REST adapter + generic JSON adapter

**Third-party block marketplace**
- `@atomic-editor/block-sdk` published to npm
- In-editor marketplace panel for community blocks

---

## Non-Requirements (v1.0)

- Mobile app
- Real-time collaboration
- Built-in hosting
- White-label (Phase 3 only)

---

## Success Metrics

| Metric | Target |
|---|---|
| Lighthouse Performance score | ≥ 90 on default install |
| Active installs at 6 months | 1,000+ |
| WordPress.org rating | ≥ 4.5 stars |
| Block count at v1.0 | 24 (Phase 1 + 2) |
| Custom CSS files in repo | 0 — enforced by lint |
| Total compiled CSS | < 20KB |

---

## Constraints

- GPL-3.0 — all PHP code is GPL-compatible
- WordPress.org plugin guidelines for the free tier
- No external HTTP requests on the frontend by default
- PHP 7.4 minimum
- Must work with: Twenty Twenty-Five, Astra, GeneratePress, Kadence
- **No custom CSS, ever** — project rule, lint-enforced, not negotiable