#!/usr/bin/env node

/**
 * Exoole Package Creation Script
 *
 * This script helps create new packages in the Exoole monorepo
 * following Gutenberg's package structure conventions.
 *
 * Usage: node scripts/create-package.js <package-name>
 * Example: node scripts/create-package.js data
 */

const fs = require('fs');
const path = require('path');

const packageName = process.argv[2];

if (!packageName) {
	console.error('❌ Please provide a package name');
	console.log('Usage: node scripts/create-package.js <package-name>');
	process.exit(1);
}

const packagesDir = path.join(__dirname, '..', 'packages');
const packageDir = path.join(packagesDir, packageName);

// Check if package already exists
if (fs.existsSync(packageDir)) {
	console.error(`❌ Package "${packageName}" already exists`);
	process.exit(1);
}

// Create package directory
fs.mkdirSync(packageDir, { recursive: true });
fs.mkdirSync(path.join(packageDir, 'src'), { recursive: true });

// Create package.json
const packageJson = {
	name: `@exoole/${packageName}`,
	version: '1.0.0',
	description: `Exoole ${packageName.charAt(0).toUpperCase() + packageName.slice(1)
		} Package`,
	author: 'Exoole Team',
	license: 'GPL-3.0-or-later',
	publishConfig: {
		access: 'public',
	},
	main: 'build/index.js',
	module: 'build-module/index.js',
	types: 'build-types/index.d.ts',
	sideEffects: false,
	wpScript: true,
	dependencies: {},
	keywords: ['exoole', 'wordpress', 'gutenberg', packageName],
};

fs.writeFileSync(
	path.join(packageDir, 'package.json'),
	JSON.stringify(packageJson, null, '\t')
);

// Create tsconfig.json
const tsConfig = {
	extends: '../../tsconfig.base.json',
	compilerOptions: {
		rootDir: 'src',
		declarationDir: 'build-types',
	},
	include: ['src/**/*'],
	exclude: [
		'**/*.test.ts',
		'**/*.test.tsx',
		'**/*.story.ts',
		'**/*.story.tsx',
	],
};

fs.writeFileSync(
	path.join(packageDir, 'tsconfig.json'),
	JSON.stringify(tsConfig, null, '\t')
);

// Create src/index.ts
const indexContent = `/**
 * Exoole ${packageName.charAt(0).toUpperCase() + packageName.slice(1)
	} Package
 * 
 * @package @exoole/${packageName}
 */

// Export your ${packageName} utilities here
export {};
`;

fs.writeFileSync(path.join(packageDir, 'src', 'index.ts'), indexContent);

// Create CHANGELOG.md
const changelogContent = `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial package setup for @exoole/${packageName}

## [1.0.0] - ${new Date().toISOString().split('T')[0]}

### Added
- Package structure and configuration
- TypeScript support
- Basic package exports

`;

fs.writeFileSync(path.join(packageDir, 'CHANGELOG.md'), changelogContent);

// Create README.md
const readmeContent = `# @exoole/${packageName}

${packageJson.description}

## Installation

\`\`\`bash
npm install @exoole/${packageName}
\`\`\`

## Usage

\`\`\`javascript
import { } from '@exoole/${packageName}';
\`\`\`

## API

_Documentation coming soon..._

## Contributing

Please read the main [CONTRIBUTING.md](../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the GPL-3.0-or-later License - see the [LICENSE](../../LICENSE) file for details.
`;

fs.writeFileSync(path.join(packageDir, 'README.md'), readmeContent);

console.log(`✅ Package "@exoole/${packageName}" created successfully!`);
console.log(`📁 Location: packages/${packageName}`);
console.log('📄 Files created:');
console.log(`   - package.json`);
console.log(`   - tsconfig.json`);
console.log(`   - src/index.ts`);
console.log(`   - CHANGELOG.md`);
console.log(`   - README.md`);
console.log('');
console.log('Next steps:');
console.log(`1. Add the package reference to tsconfig.json:`);
console.log(`   { "path": "./packages/${packageName}" }`);
console.log('2. Run "npm install" to update dependencies');
console.log('3. Start building your package!');
console.log('4. Update CHANGELOG.md as you make changes');
