# Atomic Editor — Styling Architecture

## Decision

**Tailwind CSS is the only styling system in Atomic Editor — everywhere, without exception.**

No `.css` files. No `.scss` files. No CSS custom properties written by hand. No inline `style=""` attributes with hardcoded values. No CSS-in-JS. No separate stylesheet per block, per component, or per admin page.

One Tailwind config. One compiled CSS output file. Zero custom CSS.

This applies to every surface in the project:

| Surface | Tailwind? |
|---|---|
| Block `edit.tsx` — editor canvas | ✅ |
| Block `save.tsx` — frontend output | ✅ |
| `packages/components/` — React UI | ✅ |
| `src/admin/` — editor shell + inspector | ✅ |
| WordPress admin pages (PHP templates) | ✅ |
| Settings and onboarding screens | ✅ |

---

## Why Tailwind everywhere

### Performance — 255KB → under 20KB

Traditional page builders ship 1MB+ of CSS by maintaining separate stylesheets for every component. Exoole's original architecture targeted 255KB. With Tailwind JIT, Atomic Editor targets **under 20KB** — because JIT only emits the exact classes used in source files. A page with a Section and a Heading block ships only the CSS those two blocks need.

### No CSS-JS disconnect

Block attributes control visual output. With Tailwind, attribute values map directly to class names — no intermediate CSS variable layer, no separate stylesheet to keep in sync, no risk of a class existing in the CSS but the component forgetting to use it:

```tsx
// ✅ Tailwind — attribute drives class, one place, zero disconnect
const blockClasses = cn(
  attributes.alignment === 'center' && 'text-center',
  attributes.spacing   === 'large'  && 'py-16 px-12',
  attributes.hidden?.mobile         && 'md:block hidden',
);
```

### One system across all developers

Whether building a block, an inspector panel, or a PHP settings page — every developer writes the same way. No context switching between utility classes and BEM. No wondering which file owns the styles for a component.

### Responsive by default

Tailwind breakpoint prefixes work everywhere — in `save.tsx` output, in `edit.tsx` preview, in admin UI:

```tsx
<div className="text-sm md:text-base lg:text-lg xl:text-xl">
  Responsive text in both the editor and the frontend
</div>
```

---

## Configuration

A single `tailwind.config.ts` at the repo root covers all surfaces:

```ts
import type { Config } from 'tailwindcss';

export default {
  content: [
    './packages/*/src/**/*.{ts,tsx}',
    './src/blocks/**/*.{ts,tsx}',
    './src/admin/**/*.{ts,tsx}',
    './routes/**/*.{ts,tsx}',
    './includes/**/*.php',
    './templates/**/*.php',
    './atomic-editor.php',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        sans:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"DM Mono"', 'monospace'],
      },
      colors: {
        'ae-blue':   '#3858e9',
        'ae-bluem':  '#2d47d4',
        'ae-bluel':  '#eef0fd',
        'ae-green':  '#33f078',
        'ae-greenm': '#1db857',
        'ae-greenl': '#e8fdf0',
        'ae-dark':   '#0d0d10',
        'ae-dark2':  '#13131a',
        'ae-dark3':  '#1a1a24',
        'ae-dark4':  '#22222f',
        'ae-dark5':  '#2a2a3a',
        'ae-dim':    '#9ca3af',
        'ae-subtle': '#c4c8d8',
      },
      borderRadius: {
        'ae':    '10px',
        'ae-lg': '14px',
        'ae-xl': '18px',
      },
    },
  },
  plugins: [],
} satisfies Config;
```

---

## How blocks use Tailwind

### Attribute-driven class maps

Because Tailwind JIT scans source files statically, never build class names via string interpolation. Use lookup maps — every possible class string appears complete in source so JIT can see it:

```ts
// packages/utils/src/class-maps.ts

export const paddingMap: Record<string, string> = {
  none: 'py-0 px-0',
  xs:   'py-4 px-4',
  sm:   'py-8 px-6',
  md:   'py-16 px-12',
  lg:   'py-24 px-16',
  xl:   'py-32 px-20',
};

export const backgroundMap: Record<string, string> = {
  white:    'bg-white text-ae-dark',
  light:    'bg-gray-50 text-ae-dark',
  dark:     'bg-ae-dark text-white',
  blue:     'bg-ae-blue text-white',
  green:    'bg-ae-greenl text-ae-dark',
  gradient: 'bg-gradient-to-br from-ae-bluel to-ae-greenl text-ae-dark',
};

export const alignMap: Record<string, string> = {
  left:   'text-left',
  center: 'text-center',
  right:  'text-right',
};
```

### `edit.tsx` — editor canvas

```tsx
import { cn, paddingMap, backgroundMap } from '@atomic-editor/utils';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export function Edit( { attributes, setAttributes } ) {
  const { padding, background, align, tagName: Tag = 'section' } = attributes;

  return (
    <Tag { ...useBlockProps({
      className: cn(
        'ae-section w-full',
        paddingMap[ padding ],
        backgroundMap[ background ],
        align === 'center' && 'text-center',
      )
    })}>
      <InnerBlocks />
    </Tag>
  );
}
```

### `save.tsx` — frontend output

Identical Tailwind logic. What visitors see matches the editor preview by default:

```tsx
import { cn, paddingMap, backgroundMap } from '@atomic-editor/utils';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export function Save( { attributes } ) {
  const { padding, background, align, tagName: Tag = 'section' } = attributes;

  return (
    <Tag { ...useBlockProps.save({
      className: cn(
        'ae-section w-full',
        paddingMap[ padding ],
        backgroundMap[ background ],
        align === 'center' && 'text-center',
      )
    })}>
      <InnerBlocks.Content />
    </Tag>
  );
}
```

### PHP admin templates

Tailwind classes go directly into PHP strings. The same compiled CSS covers them:

```php
// ✅ Tailwind in PHP — same system, same output file
echo '<div class="min-h-screen bg-ae-dark2 font-sans text-white">';
echo '  <nav class="flex items-center h-11 px-4 border-b border-ae-dark5 bg-ae-dark">';
echo '    <span class="font-display font-bold text-sm text-white">Atomic Editor</span>';
echo '  </nav>';
echo '</div>';
```

---

## `cn()` utility

All class composition uses `cn()` from `@atomic-editor/utils`, which wraps `clsx` + `tailwind-merge`:

```ts
// packages/utils/src/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn( ...inputs: ClassValue[] ) {
  return twMerge( clsx( inputs ) );
}
```

`tailwind-merge` resolves conflicting utilities correctly — e.g. `py-4 py-8` → `py-8`. This is essential when composing classes from block attributes, component defaults, and conditional logic.

---

## Frontend delivery

Tailwind compiles to a single `build/atomic-editor.css` file at build time. WordPress enqueues it once per page via `class-assets.php`. Because JIT only includes used classes, this file stays small regardless of how many blocks the plugin ships.

There is no per-block stylesheet. No runtime CSS injection. No `<style>` tag written to the DOM by JavaScript. Everything is compiled ahead of time.

---

## `theme.json` — tokens for WordPress integration

`theme.json` registers Atomic Editor's color palette and spacing scale with WordPress global styles. The values match `tailwind.config.ts` exactly, making them available in the FSE global styles panel and the core color picker:

```json
{
  "settings": {
    "color": {
      "palette": [
        { "slug": "ae-blue",  "color": "#3858e9", "name": "AE Blue"  },
        { "slug": "ae-green", "color": "#33f078", "name": "AE Green" },
        { "slug": "ae-dark",  "color": "#0d0d10", "name": "AE Dark"  }
      ]
    }
  }
}
```

`theme.json` registers tokens. Tailwind renders them. They are never in conflict.

---

## Performance comparison

| Approach | Bundle Size | File Management | Loading Speed | Gutenberg Integration |
|---|---|---|---|---|
| **Atomic Editor (Tailwind JIT)** | **< 20KB** | Single compiled file | ⚡ Fastest | ✅ Seamless |
| Previous Exoole target (Tailwind) | 255KB | Single file | ⚡ Fast | ✅ Seamless |
| Traditional CSS | 500KB+ | Multiple files | 🐌 Slower | ⚠️ Complex |
| Elementor / Divi | 1MB+ | Thousands of lines | 🐌 Very slow | ❌ Parallel DOM |

---

## Rules — non-negotiable

1. **No custom CSS anywhere.** No `.css`, no `.scss`, no `<style>` in PHP, no `style=""` with hardcoded values in JSX.
2. **No CSS custom properties written by hand.** `theme.json` tokens are the only exception — WordPress generates those automatically.
3. **No dynamic class name construction.** Never `\`py-${value}\``. Use lookup maps so JIT sees every class at build time.
4. **`cn()` for all class composition.** Never manually concatenate class strings.
5. **Same classes in `edit.tsx` and `save.tsx`.** The editor and frontend output are identical by default.
6. **Lint enforces the rule.** A lint step rejects any `.css` or `.scss` file committed to the repository.