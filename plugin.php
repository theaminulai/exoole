<?php
namespace Exoole;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Main Plugin Class.
 *
 * This is the main class that initializes the Exoole plugin, managing
 * all functionalities such as REST API, Admin, and Blocks.
 *
 * @since 1.0.0
 */
class Plugin {

	/**
	 * The single instance of the class.
	 *
	 * @since 1.0.0
	 * @access private
	 * @static
	 * @var Exoole_Plugin
	 */
	private static $instance = null;

	/**
	 * Get the single instance of the class.
	 *
	 * Ensures only one instance of this class is loaded or can be loaded.
	 *
	 * @since 1.0.0
	 * @access public
	 * @static
	 * @return Exoole_Plugin
	 */
	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Autoloader Registration.
	 *
	 * Loads all necessary classes for the Exoole plugin.
	 *
	 * @since 1.0.0
	 * @access private
	 * @return void
	 */
	private function exoole_register_autoload() {
		require_once EXOOLE_DIR . '\autoload.php';
	}

	/**
	 * Initialize the TEST.
	 *
	 * Loads all the test related functionality for the Exoole plugin.
	 *
	 * @since 1.0.0
	 * @access private
	 * @return void
	 */
	private function exoole_init_test() {
		if ( defined( 'WP_DEBUG' ) && WP_DEBUG && EXOOLE_TEST ) {
			new Tests\Init();
		}
	}
	/**
	 * Initialize assets for the plugin.
	 * 
	 * Loads all assets for the Exoole plugin.
	 * 
	 * @since 1.0.0
	 * @access private
	 * @return void
	 */
	private function exoole_init_assets() {
		// Initialize Assets loader.
	}
	/**
	 * Initialize REST API.
	 *
	 * Loads all REST API related functionality for the Exoole plugin.
	 *
	 * @since 1.0.0
	 * @access private
	 * @return void
	 */
	private function exoole_init_rest_api() {
		// Initialize REST API loader.
	}

	/**
	 * Initialize Admin.
	 *
	 * Loads all admin-related functionality for the Exoole plugin.
	 *
	 * @since 1.0.0
	 * @access private
	 * @return void
	 */
	private function exoole_init_admin() {
		// Initialize Admin loader.
	}

	/**
	 * Initialize Block Editor
	 * 
	 * Loads all blocks editor related functionality for the Exoole plugin.
	 * 
	 * @since 1.0.0
	 * @access private
	 * @return void
	 */
	private function exoole_init_block_editor() {
		// Initialize Blocks loader.
	}
	/**
	 * Initialize Blocks.
	 *
	 * Loads all block-related functionality for the Exoole plugin.
	 *
	 * @since 1.0.0
	 * @access private
	 * @return void
	 */
	private function exoole_init_blocks() {
		// Initialize Blocks loader.
	}

	/**
	 * Initialize Plugin Components.
	 *
	 * This method initializes all the main components of the plugin.
	 *
	 * @since 1.0.0
	 * @access private
	 * @return void
	 */
	private function exoole_init() {
		$this->exoole_register_autoload();
		$this->exoole_init_test();
		$this->exoole_init_assets();
		$this->exoole_init_rest_api();
		$this->exoole_init_admin();
		$this->exoole_init_blocks();
		$this->exoole_init_block_editor();
	}

	/**
	 * Plugin Constructor.
	 *
	 * Registers plugin action hooks and initializes plugin components.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function __construct() {
		$this->exoole_init();
	}
}

// Instantiate the Exoole Plugin Class
Plugin::instance();
