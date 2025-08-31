/**
 * Exoole Webpack Package Utilities
 *
 * This module provides utilities for auto-discovering and configuring
 * packages in the Exoole monorepo for webpack builds.
 *
 * @package Exoole
 */

const path = require('path');
const fs = require('fs');

/**
 * Get combined package entries (JS/TS + SCSS)
 * getPackageEntries() now returns manual-style entries like:
 * {
 *   'build/components': path.resolve(process.cwd(), 'packages/components/src', 'index.ts'),
 *   'build/hooks': path.resolve(process.cwd(), 'packages/hooks/src', 'index.ts'),
 *   'build/utils': path.resolve(process.cwd(), 'packages/utils/src', 'index.ts'),
 * }
 *
 * @param {string} rootDir - The root directory of the project
 * @return {Object} Object with package entries for webpack
 */
function getPackageEntries(rootDir = process.cwd()) {
	const packagesDir = path.resolve(rootDir, "packages");
	const entries = {};

	if (!fs.existsSync(packagesDir)) {
		console.warn("⚠️  No packages directory found at:", packagesDir);
		return entries;
	}

	// Read all package directories
	const packageDirs = fs
		.readdirSync(packagesDir, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	packageDirs.forEach((packageName) => {
		const packageSrc = path.resolve(packagesDir, packageName, "src");

		// ✅ JS/TS entry (index.ts)
		const packageIndexPath = path.resolve(packageSrc, "index.ts");
		if (fs.existsSync(packageIndexPath)) {
			entries[`${packageName}/index`] = packageIndexPath;
		}

		// ✅ CSS entry (style.scss)
		// const styleFile = path.resolve(packageSrc, "style.scss");
		// if (fs.existsSync(styleFile)) {
		// 	entries[`${packageName}/css`] = styleFile;
		// }
	});

	return entries;
}
/**
 * Generate webpack aliases for all packages
 *
 * @param {string} rootDir - The root directory of the project
 * @return {Object} Webpack resolve aliases
 */
function getPackageAliases(rootDir = process.cwd()) {
	const packagesDir = path.resolve(rootDir, 'packages');
	const aliases = {};

	if (!fs.existsSync(packagesDir)) {
		return aliases;
	}

	const packageDirs = fs
		.readdirSync(packagesDir, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	packageDirs.forEach((packageName) => {
		const packageSrcDir = path.resolve(packagesDir, packageName, 'src');

		if (fs.existsSync(packageSrcDir)) {
			aliases[`@exoole/${packageName}`] = packageSrcDir;
		}
	});

	return aliases;
}


module.exports = {
	getPackageEntries,
	getPackageAliases
};
