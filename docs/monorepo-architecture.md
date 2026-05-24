# Atomic Editor — Monorepo Architecture

## Overview

Atomic Editor is a modern monorepo. Every block, package, tool, and configuration lives in a single repository. This mirrors how the Gutenberg project itself is built — npm workspaces manage packages, `@wordpress/build` handles transpilation and PHP registration, and each package has a single clear purpose.

There are no CSS files anywhere in this project. Tailwind CSS is the only styling system, compiled from a single config at the repo root, covering every surface — blocks, editor UI, admin pages, and PHP templates.

---

## Repository Structure

```
atomic-editor/
│
├── packages/                          # Monorepo packages (@atomic-editor/*)
│   │
│   ├── components/                    # Reusable React UI components
│   │   ├── src/
│   │   │   ├── index.ts              # Package entry point
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── color-picker.tsx
│   │   │   ├── spacing-control.tsx
│   │   │   └── ...
│   │   ├── package.json              # "wpScript": true
│   │   ├── tsconfig.json
│   │   └── README.md
│   │
│   ├── hooks/                         # Custom React hooks
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── useBlockEditor.ts
│   │   │   ├── useBlockAttributes.ts
│   │   │   ├── useMediaUpload.ts
│   │   │   └── useResponsive.ts
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── utils/                         # Shared utilities
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── cn.ts                 # clsx + tailwind-merge
│   │   │   ├── class-maps.ts         # Tailwind class lookup maps
│   │   │   ├── responsive.ts
│   │   │   └── formatters.ts
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── icons/                         # SVG icon set
│       ├── src/
│       │   ├── index.ts
│       │   └── ...
│       ├── package.json
│       └── README.md
│
├── src/
│   │
│   ├── blocks/                        # All Atomic Editor blocks
│   │   │
│   │   ├── layout/                    # Layout blocks
│   │   │   ├── section/
│   │   │   │   ├── block.json
│   │   │   │   ├── index.ts
│   │   │   │   ├── edit.tsx           # Tailwind classes
│   │   │   │   └── save.tsx           # Same Tailwind classes
│   │   │   ├── container/
│   │   │   ├── grid/
│   │   │   ├── flexbox/
│   │   │   ├── div/
│   │   │   └── column/
│   │   │
│   │   ├── content/                   # Content blocks
│   │   │   ├── heading/
│   │   │   ├── paragraph/
│   │   │   ├── rich-text/
│   │   │   ├── list/
│   │   │   ├── quote/
│   │   │   └── ...
│   │   │
│   │   ├── media/                     # Media blocks
│   │   │   ├── image/
│   │   │   ├── video/
│   │   │   ├── gallery/
│   │   │   ├── slider/
│   │   │   └── background-section/
│   │   │
│   │   └── interactive/               # Interactive blocks
│   │       ├── button/
│   │       ├── contact-form/
│   │       ├── search-bar/
│   │       ├── social-share/
│   │       └── newsletter/
│   │
│   └── admin/                         # Editor shell React app
│       ├── editor/
│       ├── sidebar/
│       └── settings/
│
├── routes/                            # File-based admin routing (@wordpress/build)
│   └── editor/
│       ├── package.json
│       ├── stage.tsx
│       ├── inspector.tsx
│       └── canvas.tsx
│
├── includes/                          # PHP — PSR-4 autoloaded classes
│   ├── class-atomic-editor.php
│   ├── class-blocks.php
│   └── class-assets.php
│
├── templates/                         # PHP admin templates (Tailwind classes)
│   ├── settings.php
│   └── onboarding.php
│
├── tools/
│   └── scripts/
│       └── create-block.js            # Block scaffolding CLI
│
├── tests/                             # PHP and JS tests
├── docs/                              # Architecture documentation
│
├── atomic-editor.php                  # Plugin entry point
├── tailwind.config.ts                 # Single config — covers all surfaces
├── package.json                       # Root — wpPlugin config + workspaces
├── tsconfig.base.json
├── tsconfig.json
├── composer.json
├── .wp-env.json
└── README.md
```

---

## Package Principles

These rules apply to every package under `packages/`. They follow the same guidelines Gutenberg uses internally.

**1. Single, clear purpose.** It must be immediately obvious why the package exists. No utility catch-alls, no "misc" packages.

**2. Every package has a README.** Defines scope, usage, and prerequisites.

**3. Default to bundled.** No globals unless required. Set `"wpScript": true` only when the package needs to be a WordPress script global (`window.atomicEditor.*`).

**4. Clean exports.** Each package exposes a single `src/index.ts` entry point. No deep imports into package internals.

**5. No circular dependencies.** Dependency direction flows one way only: `blocks` → `packages/hooks` → `packages/utils`. Never the reverse.

**6. No CSS files.** All styling is Tailwind utility classes in TSX. The root `tailwind.config.ts` scans all package source files automatically.

---

## Build System

### `@wordpress/build` — packages

Handles everything under `packages/` and `routes/`. Configured via `wpPlugin` in root `package.json`:

```json
{
  "wpPlugin": {
    "name": "atomicEditor",
    "scriptGlobal": "atomicEditor",
    "packageNamespace": "atomic-editor",
    "handlePrefix": "atomic-editor"
  }
}
```

What this gives you:

- `@atomic-editor/components` → `window.atomicEditor.components` with handle `atomic-editor-components`
- `@atomic-editor/hooks` → `window.atomicEditor.hooks` with handle `atomic-editor-hooks`
- Auto-generated `build/build.php` — one `require_once` registers all scripts and styles
- TypeScript + JSX via esbuild (fast)
- CJS (`build/`) and ESM (`build-module/`) output from the same source
- All `@wordpress/*` packages externalized to `window.wp.*` — never bundled

### `@wordpress/scripts` — blocks

Handles `src/blocks/`. Per-block `block.json` drives registration. `.asset.php` generated per entry point with correct WP dependency handles and version hash.

### Tailwind CSS compilation

Tailwind runs as a PostCSS plugin in both pipelines. A single `build/atomic-editor.css` covers every surface. WordPress enqueues it once per page.

```json
{
  "scripts": {
    "start":        "wp-scripts start",
    "build":        "wp-scripts build",
    "build:css":    "tailwindcss -i ./src/global.css -o ./build/atomic-editor.css --minify",
    "dev:css":      "tailwindcss -i ./src/global.css -o ./build/atomic-editor.css --watch",
    "lint:js":      "wp-scripts lint-js",
    "lint:css":     "wp-scripts lint-style",
    "lint:php":     "composer run lint",
    "test:unit":    "wp-scripts test-unit-js",
    "test:php":     "composer run test",
    "type-check":   "tsc --build",
    "wp-env":       "wp-env",
    "create-block": "node tools/scripts/create-block.js"
  }
}
```

---

## Package System — Code Reusability

```tsx
// Import packages anywhere — blocks, admin, editor shell
import { Button, Card, Modal }     from '@atomic-editor/components';
import { useBlockEditor }           from '@atomic-editor/hooks';
import { useBlockAttributes }       from '@atomic-editor/hooks';
import { cn, paddingMap }           from '@atomic-editor/utils';
import { SectionIcon }              from '@atomic-editor/icons';

// Use in any block
function HeroBlock() {
  const { blockProps, attributes } = useBlockEditor();

  return (
    <Card className={cn('w-full', paddingMap[attributes.padding])}>
      <Button variant="primary">Get started</Button>
    </Card>
  );
}
```

---

## Import Conventions

```ts
// ✅ Always use package aliases
import { Button }             from '@atomic-editor/components';
import { useBlockAttributes } from '@atomic-editor/hooks';
import { cn, paddingMap }     from '@atomic-editor/utils';

// ✅ WordPress packages — always externalized, never bundled
import { useBlockProps }      from '@wordpress/block-editor';
import { __ }                 from '@wordpress/i18n';

// ✅ Tailwind class maps — complete strings so JIT can scan
const cls = paddingMap[attributes.padding]; // 'py-16 px-12'

// ❌ Never relative cross-package imports
import { Button } from '../../../packages/components/src/button';

// ❌ Never dynamic class string construction — JIT cannot scan
const cls = `py-${value}`; // wrong
```

---

## Adding a New Package

```bash
# 1. Create the structure
mkdir -p packages/my-package/src
touch packages/my-package/src/index.ts
touch packages/my-package/package.json
touch packages/my-package/README.md

# 2. Minimum package.json
{
  "name": "@atomic-editor/my-package",
  "version": "0.1.0",
  "main": "build/index.js",
  "module": "build-module/index.js"
}

# 3. Install from root
npm install
```

`@wordpress/build` auto-discovers the new package. The root `tailwind.config.ts` glob `packages/*/src/**/*.{ts,tsx}` already covers it. No webpack changes needed.

---

## Adding a New Block

```bash
npm run create-block -- --name hero --category content
```

Scaffolds `src/blocks/content/hero/` with:

```
hero/
├── block.json   # Metadata and attributes
├── index.ts     # Entry point — registers the block
├── edit.tsx     # Editor component — Tailwind classes
└── save.tsx     # Save component — same Tailwind classes
```

No CSS files are created. The block uses Tailwind utility classes directly in TSX.

---

## Dependency Graph

```
atomic-editor.php
    └── includes/class-atomic-editor.php
            ├── includes/class-blocks.php     → registers all src/blocks/**/block.json
            └── includes/class-assets.php    → require_once build/build.php
                                             → wp_enqueue_style('build/atomic-editor.css')

packages/components  → @atomic-editor/utils, @atomic-editor/icons
packages/hooks       → @atomic-editor/utils, @wordpress/data
packages/utils       → clsx, tailwind-merge  (no internal deps)
packages/icons       → (no deps)

src/blocks/**        → @atomic-editor/components, @atomic-editor/hooks
```

No package depends on a block. Blocks are leaf consumers — they depend on packages, never the reverse.

---

## Performance Benefits

| Feature | Benefit |
|---|---|
| Shared dependencies | No duplicate React, TypeScript, or Tailwind across packages |
| Tailwind JIT | Only used classes compiled — total CSS under 20KB |
| Tree shaking | Unused exports never bundled |
| Single build pipeline | One `npm run build` compiles everything |
| `@wordpress/build` auto-discovery | New packages included automatically |
| Incremental builds | Only changed packages rebuild in watch mode |