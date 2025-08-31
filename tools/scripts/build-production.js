#!/usr/bin/env node

/**
 * Production Build Script for Exoole
 *
 * This script prepares the plugin for production deployment by:
 * - Removing development dependencies
 * - Creating a production-ready zip file
 * - Excluding unnecessary files
 *
 * Usage: node scripts/build-production.js
 */

const fs = require( 'fs' );
const path = require( 'path' );
const { execSync } = require( 'child_process' );

const PLUGIN_DIR = path.resolve( __dirname, '..' );
const DIST_DIR = path.resolve( PLUGIN_DIR, '..', 'dist' );
const PLUGIN_NAME = 'exoole';

// Files and directories to exclude from production build
const EXCLUDE_PATTERNS = [
	'node_modules',
	'vendor',
	'src',
	'tests',
	'.wordpress-org',
	'.git',
	'.github',
	'.vscode',
	'.husky',
	'dev-note',
	'docs',
	'scripts',
	'.distignore',
	'.editorconfig',
	'.eslintignore',
	'.eslintrc.json',
	'.gitignore',
	'.npmrc',
	'.wp-env.json',
	'babel.config.js',
	'composer.json',
	'composer.lock',
	'package.json',
	'package-lock.json',
	'phpcs.xml',
	'webpack.config.js',
	'update-version-and-changelog.js',
	'CONTRIBUTING.md',
	'SECURITY.md',
	'CHANGELOG.md',
	'README.md',
	'screenshot.png',
	'includes/class-exoole-autoload-examples.php',
];

console.log( '🚀 Starting production build...' );

try {
	// Step 1: Build assets
	console.log( '📦 Building production assets...' );
	execSync( 'npm run build', { cwd: PLUGIN_DIR, stdio: 'inherit' } );

	// Step 2: Create dist directory
	if ( ! fs.existsSync( DIST_DIR ) ) {
		fs.mkdirSync( DIST_DIR, { recursive: true } );
	}

	// Step 3: Copy files (excluding development files)
	console.log( '📋 Copying production files...' );
	const productionDir = path.join( DIST_DIR, PLUGIN_NAME );

	if ( fs.existsSync( productionDir ) ) {
		fs.rmSync( productionDir, { recursive: true, force: true } );
	}

	copyDirectory( PLUGIN_DIR, productionDir, EXCLUDE_PATTERNS );

	// Step 4: Update environment in main plugin file
	console.log( '🔧 Updating environment settings...' );
	updateProductionSettings(
		path.join( productionDir, `${ PLUGIN_NAME }.php` )
	);

	// Step 5: Create zip file
	console.log( '🗜️ Creating production zip...' );
	const zipPath = path.join( DIST_DIR, `${ PLUGIN_NAME }.zip` );
	createZip( productionDir, zipPath );

	console.log( '✅ Production build completed successfully!' );
	console.log( `📁 Production files: ${ productionDir }` );
	console.log( `📦 Zip file: ${ zipPath }` );
} catch ( error ) {
	console.error( '❌ Build failed:', error.message );
	process.exit( 1 );
}

/**
 * Copy directory recursively with exclusions
 */
function copyDirectory( src, dest, excludePatterns ) {
	if ( ! fs.existsSync( dest ) ) {
		fs.mkdirSync( dest, { recursive: true } );
	}

	const items = fs.readdirSync( src );

	for ( const item of items ) {
		const srcPath = path.join( src, item );
		const destPath = path.join( dest, item );

		// Check if item should be excluded
		if ( shouldExclude( item, excludePatterns ) ) {
			continue;
		}

		const stat = fs.statSync( srcPath );

		if ( stat.isDirectory() ) {
			copyDirectory( srcPath, destPath, excludePatterns );
		} else {
			fs.copyFileSync( srcPath, destPath );
		}
	}
}

/**
 * Check if file/directory should be excluded
 */
function shouldExclude( item, excludePatterns ) {
	return excludePatterns.some( ( pattern ) => {
		if ( pattern.includes( '*' ) ) {
			// Simple glob pattern matching
			const regex = new RegExp( pattern.replace( /\*/g, '.*' ) );
			return regex.test( item );
		}
		return item === pattern;
	} );
}

/**
 * Update plugin file for production
 */
function updateProductionSettings( pluginFile ) {
	let content = fs.readFileSync( pluginFile, 'utf8' );

	// Update version if needed
	// You can add more production-specific updates here

	fs.writeFileSync( pluginFile, content );
}

/**
 * Create zip file
 */
function createZip( sourceDir, zipPath ) {
	const archiver = require( 'archiver' );
	const output = fs.createWriteStream( zipPath );
	const archive = archiver( 'zip', { zlib: { level: 9 } } );

	return new Promise( ( resolve, reject ) => {
		output.on( 'close', resolve );
		archive.on( 'error', reject );

		archive.pipe( output );
		archive.directory( sourceDir, PLUGIN_NAME );
		archive.finalize();
	} );
}
