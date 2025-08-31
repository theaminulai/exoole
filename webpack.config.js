
/**
 * Exoole Webpack Configuration
 * 
 * Build Structure:
 * ├── build/
 * │   ├── components/
 * │   │   ├── index.min.js
 * │   │   ├── index.min.js.map
 * │   │   └── index.min.asset.php
 * │   ├── blocks/
 * │   └── utils/
 */

/**
 * WordPress dependencies
 */
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

/**
 * External dependencies
 */
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

/**
 * Exoole package utilities
 */
const {
	getPackageEntries,
	getPackageAliases,
} = require('./tools/webpack-packages');

/**
 * Custom webpack configuration for monorepo packages
 * 
 * getPackageEntries() now returns manual-style entries like:
 * {
 *   'build/hooks': path.resolve(process.cwd(), 'packages/hooks/src', 'index.ts'),
 *   'build/utils': path.resolve(process.cwd(), 'packages/utils/src', 'index.ts'),
 * }
 * 
 * All packages use TypeScript (.ts) and import style.scss in index.ts files
 */


module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry(),
		...getPackageEntries(), // Dynamic discovery with manual-style paths for JS
	},
	resolve: {
		...defaultConfig.resolve,
		alias: {
			...(defaultConfig.resolve?.alias || {}),
			// Add package aliases for internal imports
			...getPackageAliases(),
		},
	},
	plugins: [
		// Include WordPress default plugins
		...defaultConfig.plugins,

		// Remove empty scripts (for CSS-only entries)
		new RemoveEmptyScriptsPlugin({
			stage: RemoveEmptyScriptsPlugin.STAGE_AFTER_PROCESS_PLUGINS,
		}),
	],
};
