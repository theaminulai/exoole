# Atomic Editor

A next-generation, performance-first WordPress page builder built natively on Gutenberg.

![WordPress](https://img.shields.io/badge/WordPress-6.7%2B-blue)
![PHP](https://img.shields.io/badge/PHP-7.4%2B-purple)
![License](https://img.shields.io/badge/License-GPL--3.0-green)
![Node](https://img.shields.io/badge/Node-20.10.0%2B-brightgreen)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38bdf8)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6)

---

## What is Atomic Editor?

Atomic Editor bridges the gap between design flexibility and performance. Every block is a standard WordPress block — clean native markup, portable forever. The frontend is fast by default. And the entire codebase runs on one styling system: Tailwind CSS.

**No lock-in. No bloat. No custom CSS — ever.**

---

## Why not Elementor?

Elementor was built before Gutenberg. It maintains its own DOM, generates inline styles, ships 1MB+ of CSS, and locks your content into a proprietary format.

Atomic Editor is built on native blocks from day one:

| | Atomic Editor | Elementor | Divi |
|---|---|---|---|
| Content model | Native WP blocks | Proprietary DOM | Proprietary DOM |
| Total CSS | **< 20KB** (Tailwind JIT) | 1MB+ | 1.5MB+ |
| Custom CSS in codebase | **Zero** | Extensive | Extensive |
| Frontend JS (static pages) | **0KB** | 300–600KB | 400KB+ |
| FSE support | **Full native** | Partial | None |
| Content portability | **Full** | Locked in | Locked in |
| `theme.json` | **Full** | None | None |
| Lighthouse Performance | **≥ 90** | ~45 | ~35 |

---

## Tailwind CSS — everywhere

Tailwind is the **only** styling system in this project. This is a hard rule, not a preference.

- Block `save.tsx` — what visitors see
- Block `edit.tsx` — the editor canvas
- `packages/components/` — all React UI
- `src/admin/` — editor shell, inspector, sidebar
- PHP templates — settings, admin pages

No `.css` files. No `.scss` files. No inline `style=""` with hardcoded values. One `tailwind.config.ts` at the repo root. One `build/atomic-editor.css` output. A lint step rejects any custom CSS committed to the repository.

---

## Features

- **Native blocks** — registered via `block.json`, works in any Gutenberg context
- **Zero frontend JS** — static blocks ship no JavaScript
- **Tailwind everywhere** — one styling system, zero CSS maintenance
- **Under 20KB CSS** — Tailwind JIT emits only what's used
- **Full FSE support** — Site Editor, patterns, synced patterns, template parts
- **`theme.json` integration** — brand tokens in WordPress global styles
- **Block Locking** — agency layouts, protected client content slots
- **Responsive preview** — desktop / tablet / mobile canvas toggle
- **Draggable navigator** — block tree panel, drag anywhere on screen
- **Pattern library** — 30+ starter sections
- **Modern stack** — React 18, TypeScript, Plus Jakarta Sans + DM Sans, esbuild

---

## Requirements

| | Version |
|---|---|
| WordPress | 6.7+ |
| PHP | 7.4+ |
| Node.js | 20.10.0+ |
| npm | 10.2.3+ |

---

## Getting started

```bash
git clone https://github.com/theaminulai/atomic-editor.git
cd atomic-editor

npm install
composer install

npm run wp-env start
npm start
```

Open `http://localhost:8888/wp-admin` — Atomic Editor is active and ready.

---

## Development

```bash
npm start              # Watch — rebuild JS + Tailwind on changes
npm run build          # Production build (JS + CSS)
npm run build:css      # Compile Tailwind only
npm run wp-env start   # Start local WordPress
npm run wp-env stop    # Stop local WordPress
npm run lint:js        # Lint JavaScript/TypeScript
npm run lint:php       # Lint PHP (PHPCS)
npm run type-check     # TypeScript type check
npm run test:unit      # JS unit tests
npm run test:php       # PHP unit tests
npm run create-block   # Scaffold a new block
```

### Creating a block

```bash
npm run create-block -- --name hero --category content
```

Scaffolds `src/blocks/content/hero/` with `block.json`, `edit.tsx`, `save.tsx`, and `index.ts`. No CSS files are created — the block uses Tailwind utility classes directly.

### Tailwind class maps

Never build class names dynamically — JIT can't scan interpolated strings. Always use lookup maps:

```ts
// packages/utils/src/class-maps.ts
export const paddingMap = {
  sm: 'py-8 px-6',
  md: 'py-16 px-12',   // ← complete strings, JIT can see these
  lg: 'py-24 px-16',
};
```

---

## Project structure

```
atomic-editor/
├── packages/            # @atomic-editor/* npm packages
│   ├── components/      # React UI components (all Tailwind)
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # cn(), class maps, utilities
│   └── icons/           # SVG icon set
├── src/
│   ├── blocks/          # All page builder blocks (no CSS files)
│   │   ├── layout/      # Section, Container, Grid, Flexbox, Div, Column
│   │   ├── content/     # Heading, Paragraph, RichText, List, Quote
│   │   ├── media/       # Image, Video, Gallery, Slider
│   │   └── interactive/ # Button, Form, Search, Newsletter
│   └── admin/           # Editor shell React app
├── routes/              # File-based admin routing (@wordpress/build)
├── includes/            # PHP classes (PSR-4)
├── templates/           # PHP admin templates (Tailwind classes)
├── tailwind.config.ts   # Single config — covers all surfaces
└── atomic-editor.php    # Plugin entry point
```

Full documentation in `docs/`:

- [`docs/monorepo-architecture.md`](docs/monorepo-architecture.md) — Package structure, build system, auto-discovery
- [`docs/project-architecture.md`](docs/project-architecture.md) — PHP, JS, block architecture, competitive comparison
- [`docs/styling-architecture.md`](docs/styling-architecture.md) — Tailwind everywhere, class maps, JIT rules
- [`docs/prd.md`](docs/prd.md) — Product requirements, feature roadmap, success metrics

---

## Block library

**Phase 1 — Core (free)**
Section · Container · Grid · Flexbox · Div · Column · Heading · Paragraph · RichText · List · Quote · Button

**Phase 2 — Marketing (free)**
Hero · Card Grid · Pricing Table · Testimonial · Logo Grid · CTA Banner · Stats Counter · Feature List · FAQ Accordion · Timeline · Team Grid · Gallery

**Phase 3 — Pro**
Tabs · Accordion · Slider · Popup Trigger · Mega Menu · Query Loop+ · Post Grid · WooCommerce blocks · AI Layout Assistant

---

## Brand

| Token | Value | Usage |
|---|---|---|
| `ae-blue` | `#3858e9` | Primary — actions, active states |
| `ae-green` | `#33f078` | Active nav, live indicators |
| `ae-dark` | `#0d0d10` | Editor shell background |

**Typography:** Plus Jakarta Sans (display) · DM Sans (body) · DM Mono (code)

---

## License

GPL-3.0-or-later © Atomic Editor