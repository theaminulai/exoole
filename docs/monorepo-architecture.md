# 🏗️ Exoole Monorepo Architecture

## Overview

Exoole is built as a **modern monorepo** that organizes Exoole blocks, components, utilities, and tools in a scalable, maintainable structure. This architecture enables code sharing, consistent development practices, and efficient build processes across the entire project.

## 📁 Monorepo Structure

```
exoole/
├── 📦 packages/                    # Core monorepo packages
│   ├── components/                 # Reusable React components
│   │   ├── src/
│   │   │   ├── index.ts           # Package entry point
│   │   │   ├── button.tsx         # Button component
│   │   │   └── ...                # Other components
│   │   ├── package.json           # Package dependencies
│   │   └── tsconfig.json          # TypeScript config
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── src/
│   │   │   ├── index.ts           # Hooks entry point
│   │   │   ├── useBlockEditor.ts  # Exoole editor hooks
│   │   │   └── ...                # Other hooks
│   │   └── package.json
│   │
│   └── utils/                      # Shared utilities
│   |   ├── src/
│   |   │   ├── index.ts           # Utils entry point
│   |   │   ├── formatters.ts      # Data formatting utilities
│   |   │   └── ...                # Other utilities
│   |   └── package.json
│   └── ... 
│

```

## 🎯 Monorepo Benefits

### 1. **Code Reusability**
```typescript
// ✅ Import components across packages
import { Button, Card } from '@exoole/components';
import { useBlockEditor } from '@exoole/hooks';
import { formatDate } from '@exoole/utils';

// Use in any block or component
function HeroBlock() {
  const { blockProps } = useBlockEditor();
  
  return (
    <Card>
      <Button onClick={() => console.log(formatDate(new Date()))}>
        Click me
      </Button>
    </Card>
  );
}
```

### 2. **Consistent Dependencies**
- **Single Source of Truth**: All packages share the same version of React, TypeScript, etc.
- **Reduced Bundle Size**: No duplicate dependencies across packages
- **Version Synchronization**: Updates happen across all packages simultaneously

### 3. **Unified Development Experience**
- **Single Repository**: All code in one place for easy navigation
- **Shared Tooling**: Same build tools, linting rules, and testing setup
- **Cross-Package Development**: Easy to make changes that span multiple packages

## 🔧 Package System

### Auto-Discovery Architecture

Exoole uses intelligent auto-discovery to automatically configure packages:

```javascript
// tools/webpack-packages.js
function getPackageEntries(rootDir = process.cwd()) {
  const packagesDir = path.resolve(rootDir, "packages");
  const entries = {};

  // Automatically discover all packages
  const packageDirs = fs.readdirSync(packagesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  packageDirs.forEach((packageName) => {
    const packageIndexPath = path.resolve(packagesDir, packageName, "src", "index.ts");
    if (fs.existsSync(packageIndexPath)) {
      entries[`${packageName}/index`] = packageIndexPath;
    }
  });

  return entries;
}
```

### Webpack Aliases

Automatic alias generation for clean imports:

```javascript
function getPackageAliases(rootDir = process.cwd()) {
  const aliases = {};
  
  packageDirs.forEach((packageName) => {
    aliases[`@exoole/${packageName}`] = path.resolve(packagesDir, packageName, 'src');
  });

  return aliases;
  // Results in:
  // '@exoole/components' → 'packages/components/src'
  // '@exoole/hooks' → 'packages/hooks/src'
  // '@exoole/utils' → 'packages/utils/src'
}
```

## 📦 Package Architecture

### 1. **Components Package** (`@exoole/components`)

**Purpose**: Reusable React components for Exoole blocks

```typescript
// packages/components/src/index.ts
export { Button } from './button';
export { Card } from './card';
export { Modal } from './modal';
export type { ButtonProps, CardProps, ModalProps } from './types';
```

**Structure**:
```
components/
├── src/
│   ├── index.ts              # Main export file
│   ├── button.tsx           # Button component
│   ├── card.tsx             # Card component
│   ├── modal.tsx            # Modal component
│   └── types.ts             # TypeScript definitions
├── package.json
└── tsconfig.json
```

### 2. **Hooks Package** (`@exoole/hooks`)

**Purpose**: Custom React hooks for Exoole integration

```typescript
// packages/hooks/src/index.ts
export { useBlockEditor } from './useBlockEditor';
export { useMediaUpload } from './useMediaUpload';
export { useBlockAttributes } from './useBlockAttributes';
```

**Examples**:
```typescript
// useBlockEditor.ts - Exoole editor integration
export function useBlockEditor() {
  const blockProps = useBlockProps();
  const { attributes, setAttributes } = useBlockEditContext();
  
  return {
    blockProps,
    attributes,
    setAttributes,
    // ... other editor utilities
  };
}
```

## 🚀 Build System Architecture

### Unified Build Process

```json
{
  "scripts": {`
    "build": "webpack --mode=production",
    "dev": "webpack --mode=development --watch",
    "build:packages": "npm run build --workspace=packages",
	"type-check": "tsc --build"
  }
}
```

### Package Entry Points

The build system automatically generates entries for each package:

```javascript
// Generated webpack entries:
{
  'components/index': './packages/components/src/index.ts',
  'hooks/index': './packages/hooks/src/index.ts',
  'utils/index': './packages/utils/src/index.ts'
}
```

### Output Structure

```
build/
├── components/
│   └── index.js              # Built components package
├── hooks/
│   └── index.js              # Built hooks package
└── utils/
    └── index.js              # Built utils package
```

### Import Patterns

```typescript
// ✅ Recommended: Use package aliases
import { Button } from '@exoole/components';
import { useBlockEditor } from '@exoole/hooks';
import { formatDate } from '@exoole/utils';

// ❌ Avoid: Direct relative imports across packages
import { Button } from '../../../packages/components/src/button';
```

## 🧪 Development Workflow

### 1. **Adding a New Package**

```bash
# Create package structure
npm run create-package new-package
# Install dependencies
npm i
```

### 2. **Package Development**

```typescript
// packages/new-package/src/index.ts
export function newUtility() {
  return 'Hello from new package!';
}

// Automatically available as:
import { newUtility } from '@exoole/new-package';
```

### 3. **Building and Testing**

```bash
# Build all packages
npm run build

# Watch mode for development
npm run dev

# Type checking
npm run type-check
```

## 📈 Scalability Features

### 1. **Automatic Package Discovery**
- New packages are automatically included in builds
- No manual webpack configuration needed
- Aliases are generated automatically

### 2. **Tree Shaking Support**
- ES modules for optimal bundle size
- Unused code is automatically removed
- Per-package optimization

### 3. **TypeScript Integration**
- Shared TypeScript configuration
- Cross-package type checking
- Automatic type generation

## 🎯 Performance Benefits

### Bundle Optimization

| Feature | Benefit |
|---------|---------|
| **Shared Dependencies** | Reduced overall bundle size |
| **Tree Shaking** | Only used code is included |
| **Code Splitting** | Packages loaded on demand |
| **Single Build Pipeline** | Faster build times |

### Development Performance

- **Hot Module Replacement**: Fast development feedback
- **Incremental Builds**: Only changed packages rebuild
- **Parallel Processing**: Multiple packages build simultaneously

## 🔮 Future Roadmap

### Planned Enhancements

1. **Package Versioning**: Independent package versions
2. **Automated Testing**: Cross-package integration tests
3. **Documentation Generation**: Auto-generated API docs
4. **Performance Monitoring**: Bundle size tracking
5. **Plugin Ecosystem**: Third-party package support

## 📋 Best Practices

### 1. **Package Design**
- Keep packages focused and cohesive
- Minimize inter-package dependencies
- Use clear, descriptive exports

### 2. **Import Management**
- Always use package aliases (`@exoole/package`)
- Avoid deep imports into package internals
- Keep imports at the top level

### 3. **Code Organization**
- Group related functionality in the same package
- Use index files for clean exports
- Maintain consistent file naming

## 🎉 Conclusion

Exoole's monorepo architecture provides a robust foundation for WordPress block development that:

- 🚀 **Scales Efficiently**: Easy to add new packages and functionality
- 🔄 **Promotes Reusability**: Shared components and utilities across blocks
- ⚡ **Optimizes Performance**: Intelligent bundling and tree shaking
- 🛠️ **Enhances Development**: Unified tooling and consistent practices
- 📦 **Simplifies Management**: Single repository for all code

This architecture ensures that Exoole can grow from a simple builder plugin to a comprehensive WordPress development framework while maintaining excellent performance and developer experience.

---

*Built with ❤️ using modern monorepo practices*
