<?php
/**
 * Production autoloader for Exoole plugin.
 *
 * This autoloader is used in production environments where Composer is not available.
 * It handles both PSR-4 namespaced classes and traditional WordPress class naming conventions.
 *
 * @package Exoole
 * @since 1.0.0
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * Exoole Production Autoloader Class.
 *
 * This class handles the autoloading of plugin classes.
 *
 * @since 1.0.0
 */
class Exoole_Autoloader {

	/**
	 * PSR-4 namespace mappings.
	 *
	 * @since 1.0.0
	 * @var array
	 */
	private static $namespace_map = array();

	/**
	 * Traditional WordPress class mappings.
	 *
	 * @since 1.0.0
	 * @var array
	 */
	private static $class_map = array();

	/**
	 * Register the autoloader
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public static function register() {
		// Initialize namespace map with current plugin directory
		if ( empty( self::$namespace_map ) ) {
			self::$namespace_map = array(
				'Exoole\\' => plugin_dir_path( __FILE__ ),
			);
		}

		// Build class map on first registration
		if ( empty( self::$class_map ) ) {
			self::build_class_map();
		}

		// Prepend autoloader and throw exceptions if errors occur
		spl_autoload_register( array( __CLASS__, 'autoload' ), true, true );
	}

	/**
	 * Autoload classes.
	 *
	 * @since 1.0.0
	 * @param string $class_name The class name to load.
	 */
	public static function autoload( $class_name ) {
		// Try PSR-4 autoloading first
		if ( self::autoload_psr4( $class_name ) ) {
			return;
		}

		// Try WordPress style class loading
		if ( self::autoload_wordpress_style( $class_name ) ) {
			return;
		}
	}

	/**
	 * PSR-4 autoloading.
	 *
	 * @since 1.0.0
	 * @param string $class_name The class name to load.
	 * @return bool True if class was loaded, false otherwise.
	 */
	private static function autoload_psr4( $class_name ) {
		foreach ( self::$namespace_map as $namespace => $base_dir ) {
			if ( strpos( $class_name, $namespace ) === 0 ) {
				// Remove the namespace from the class name
				$relative_class = substr( $class_name, strlen( $namespace ) );

				// Convert to WordPress file naming convention
				$file_name = 'class-' . str_replace( '_', '-', strtolower( $relative_class ) ) . '.php';

				// Build the file path
				$file_path = $base_dir . $file_name;

				// Include the file if it exists
				if ( file_exists( $file_path ) ) {
					require_once $file_path;
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * WordPress style class autoloading.
	 *
	 * @since 1.0.0
	 * @param string $class_name The class name to load.
	 * @return bool True if class was loaded, false otherwise.
	 */
	private static function autoload_wordpress_style( $class_name ) {
		// Only handle Exoole_ prefixed classes .
		if ( strpos( $class_name, 'Exoole_' ) !== 0 ) {
			return false;
		}

		// Check the class map first.
		if ( isset( self::$class_map[ $class_name ] ) ) {
			$file_path = self::$class_map[ $class_name ];
			if ( file_exists( $file_path ) ) {
				require_once $file_path;
				return true;
			}
		}

		// Convert class name to file name/
		$file_name = 'class-' . str_replace( '_', '-', strtolower( $class_name ) ) . '.php';

		// Try to find in includes directory and subdirectories/
		$base_dir       = plugin_dir_path( __DIR__ );
		$possible_paths = array(
			$base_dir . 'includes/' . $file_name,
			$base_dir . 'includes/admin/' . $file_name,
			$base_dir . 'includes/public/' . $file_name,
			$base_dir . 'includes/blocks/' . $file_name,
			$base_dir . 'includes/core/' . $file_name,
			$base_dir . 'includes/api/' . $file_name,
			$base_dir . 'includes/abstracts/' . $file_name,
			$base_dir . 'includes/interfaces/' . $file_name,
		);

		foreach ( $possible_paths as $file_path ) {
			if ( file_exists( $file_path ) ) {
				require_once $file_path;
				return true;
			}
		}

		return false;
	}

	/**
	 * Build class map by scanning the includes directory.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	private static function build_class_map() {
		$includes_dir = plugin_dir_path( __FILE__ );

		if ( ! is_dir( $includes_dir ) ) {
			return;
		}

		// Scan for PHP files recursively
		$iterator = new RecursiveIteratorIterator(
			new RecursiveDirectoryIterator( $includes_dir, RecursiveDirectoryIterator::SKIP_DOTS ),
			RecursiveIteratorIterator::SELF_FIRST
		);

		foreach ( $iterator as $file ) {
			if ( $file->isFile() && $file->getExtension() === 'php' ) {
				$file_path  = $file->getPathname();
				$class_name = self::extract_class_name_from_file( $file_path );

				if ( $class_name ) {
					self::$class_map[ $class_name ] = $file_path;
				}
			}
		}
	}

	/**
	 * Extract class name from file path.
	 *
	 * @since 1.0.0
	 * @param string $file_path Path to the PHP file.
	 * @return string|null Class name or null if not found.
	 */
	private static function extract_class_name_from_file( $file_path ) {
		$file_name = basename( $file_path, '.php' );

		// Handle WordPress style class files (class-exoole-something.php)
		if ( strpos( $file_name, 'class-' ) === 0 ) {
			$class_name = substr( $file_name, 6 ); // Remove 'class-' prefix
			$class_name = str_replace( '-', '_', $class_name );
			return ucwords( $class_name, '_' );
		}

		// Handle interface files (interface-exoole-something.php)
		if ( strpos( $file_name, 'interface-' ) === 0 ) {
			$class_name = substr( $file_name, 10 ); // Remove 'interface-' prefix
			$class_name = str_replace( '-', '_', $class_name );
			return ucwords( $class_name, '_' );
		}

		// Handle abstract files (abstract-exoole-something.php)
		if ( strpos( $file_name, 'abstract-' ) === 0 ) {
			$class_name = substr( $file_name, 9 ); // Remove 'abstract-' prefix
			$class_name = str_replace( '-', '_', $class_name );
			return ucwords( $class_name, '_' );
		}

		return null;
	}

	/**
	 * Get the class map.
	 *
	 * @since 1.0.0
	 * @return array Class map array.
	 */
	public static function get_class_map() {
		return self::$class_map;
	}

	/**
	 * Add a namespace mapping.
	 *
	 * @since 1.0.0
	 * @param string $namespace The namespace prefix.
	 * @param string $base_dir  The base directory for the namespace.
	 */
	public static function add_namespace( $namespace, $base_dir ) {
		self::$namespace_map[ $namespace ] = trailingslashit( $base_dir );
	}

	/**
	 * Add a class mapping manually.
	 *
	 * @since 1.0.0
	 * @param string $class_name The class name.
	 * @param string $file_path  The file path.
	 */
	public static function add_class( $class_name, $file_path ) {
		self::$class_map[ $class_name ] = $file_path;
	}
}
