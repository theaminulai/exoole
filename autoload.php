<?php
/**
 * Dynamically loads classes within the Exoole namespace. Maps namespaces to their
 * corresponding directories and loads the appropriate file based on class name.
 *
 * @since 1.0.0
 *
 * @package Exoole
 * @param string $class_name The fully qualified class name.
 * @return void
 */
function exoole_autoloader( $class_name ) {
	$project_prefix = 'Exoole\\';
	$namespace_map  = array(
		'Exoole' => EXOOLE_DIR . '/includes/',
	);

	if ( strpos( $class_name, $project_prefix ) === 0 ) {
		foreach ( $namespace_map as $namespace => $base_dir ) {
			if ( strpos( $class_name, $namespace ) === 0 ) {
				// Derive the relative class path by stripping the namespace.
				$relative_class = substr( $class_name, strlen( $namespace ) );
				$file           = $base_dir . str_replace( '\\', '/', $relative_class ) . '.php';

				if ( file_exists( $file ) ) {
					require_once $file;
					return;
				} elseif ( defined( 'EXOOLE_ENV' ) && EXOOLE_ENV === 'development' && defined( 'WP_DEBUG' ) && WP_DEBUG ) {
						error_log( print_r( "Class file for {$class_name} not found: {$file}", true ) ); // phpcs:ignore 
				}
			}
		}
	}
}

spl_autoload_register( 'exoole_autoloader' );
