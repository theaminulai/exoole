<?php
/**
 * The main plugin file.
 *
 * If we evolve from a canonical plugin into WordPress core, this file would be left behind.
 *
 * @package Exoole
 */

namespace Exoole;

defined( 'ABSPATH' ) || exit;
/**
 * Class - Plugin
 */
final class Plugin {
	/**
	 * Singleton instance.
	 *
	 * @var self|null
	 */
	private static ?self $instance = null;

	/**
	 * Return the singleton instance of the plugin.
	 *
	 * @return self
	 */
	public static function instance(): self {
		if ( self::$instance === null ) {
			self::$instance = new self();
			self::$instance->setup();

			/**
			 * Fires after the main plugin class has been initialized.
			 */
			do_action( 'exoole_init' );
		}

		return self::$instance;
	}

	/**
	 * Private constructor to enforce singleton.
	 */
	private function __construct() {}

	/**
	 * Setup the plugin.
	 */
	private function setup(): void {
		error_log( 'Exoole Plugin setup started.' );
		// Initialize plugin components for a Gutenberg-based design plugin.
		// No external Abilities API or MCP adapter required.
		// Register blocks, assets or other hooks here as needed.
		new Admin\Admin();
	}



	/**
	 * Prevent the class from being cloned.
	 */
	public function __clone() {
		_doing_it_wrong(
			__FUNCTION__,
			sprintf( esc_html__( 'The %s class should not be cloned.', 'exoole' ), esc_html( self::class ) ),
			'1.0.0'
		);
	}

	/**
	 * Prevent the class from being unserialized.
	 */
	public function __wakeup() {
		_doing_it_wrong(
			__FUNCTION__,
			sprintf( esc_html__( 'De-serializing instances of %s is not allowed.', 'exoole' ), esc_html( self::class ) ),
			'1.0.0'
		);
	}
}

Plugin::instance();
