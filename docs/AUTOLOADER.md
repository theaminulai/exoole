# Exoole Production Autoloader

This document explains how the Exoole plugin handles class autoloading in both development and production environments.

## Overview

The Exoole plugin supports two autoloading modes:
2. **Production Mode**: Uses a custom autoloader when Composer dependencies are not available

## How It Works

### Environment Detection

The plugin automatically detects the environment in `exoole.php`:

```php
 require_once EXOOLE_DIR . 'includes/autoload.php';
    define( 'EXOOLE_ENV', 'production' );
```

### Production Autoloader Features

The production autoloader (`includes/class-exoole-autoload.php`) supports:

- **PSR-4 Autoloading**: Classes using the `Exoole\\` namespace
- **WordPress Style Classes**: Traditional `Exoole_Class_Name` format
- **Automatic File Discovery**: Scans the includes directory for class files
- **Multiple Naming Conventions**: Supports class-, interface-, and abstract- prefixed files

## Class Organization

### PSR-4 Namespaced Classes

Place namespaced classes in subdirectories under `includes/`:

```
includes/
├── Core/
│   └── Example.php (namespace Exoole\Core)
├── Admin/
│   └── Settings.php (namespace Exoole\Admin)
├── Blocks/
│   └── CustomBlock.php (namespace Exoole\Blocks)
└── Interfaces/
    └── BlockInterface.php (namespace Exoole\Interfaces)
```

### Traditional WordPress Classes

Traditional classes use the existing format:

```
includes/
├── class-exoole-plugin.php (class Exoole_Plugin)
├── class-exoole-loader.php (class Exoole_Loader)
└── admin/
    └── class-exoole-admin-settings.php (class Exoole_Admin_Settings)
```

## Usage Examples

### PSR-4 Classes

```php
// File: includes/Core/BlockManager.php
namespace Exoole\Core;

class BlockManager {
    public function register_blocks() {
        // Implementation
    }
}

// Usage
$manager = new \Exoole\Core\BlockManager();
```

### Traditional Classes

```php
// File: includes/class-exoole-block-manager.php
class Exoole_Block_Manager {
    public function register_blocks() {
        // Implementation
    }
}

// Usage
$manager = new Exoole_Block_Manager();
```

## Building for Production

Use the production build script to create a deployment-ready version:

```bash
npm run build:production
```

This script:
- Builds production assets
- Removes development files
- Creates a clean distribution package
- Excludes Composer dependencies and dev files

## Files Excluded from Production

The following files/directories are excluded from production builds:

- `node_modules/`
- `vendor/`
- `src/` (source files, built files go to `build/`)
- `tests/`
- `.git/`, `.github/`
- Development configuration files
- Documentation files (except README.txt)

## Migration Guide

### Converting Traditional Classes to PSR-4

1. Create namespace directory structure
2. Add namespace declaration to class file
3. Update class name (remove Exoole_ prefix)
4. Update usage throughout codebase

Example:
```php
// Before (Traditional)
class Exoole_Admin_Settings {
    // ...
}

// After (PSR-4)
namespace Exoole\Admin;

class Settings {
    // ...
}
```

### Adding New Classes

For new classes, prefer PSR-4 structure:

1. Create appropriate directory under `includes/`
2. Use proper namespace
3. Follow WordPress coding standards
4. Test in both development and production modes

## Troubleshooting

### Class Not Found Errors

1. Check file naming conventions
2. Verify namespace/class name matches file structure
3. Ensure proper file permissions
4. Check for syntax errors in class files

### Development vs Production Issues

1. Test with both Composer and production autoloader
2. Verify all required files are included in production build
3. Check that PSR-4 mappings are correct

## Performance Considerations

The production autoloader:
- Builds a class map on first load for faster subsequent loads
- Uses PHP's built-in `spl_autoload_register()`
- Minimizes file system operations
- Falls back gracefully for unknown classes

## Security

The autoloader:
- Validates file paths to prevent directory traversal
- Only loads PHP files from designated directories
- Respects WordPress file permissions
- Does not execute arbitrary code
