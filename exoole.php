<?php
/**
 * @wordpress-plugin
 * Plugin Name:       Exoole
 * Plugin URI:        https://wordpress.org/plugins/exoole
 * Description:       Exoole is a plugin that helps you to create any design.
 * Version:           1.0.0
 * Requires at least: 6.7.0
 * Requires PHP:      7.4
 * Author:            Exoole
 * Author URI:        https://exoole.com
 * License:           GNU General Public License v3 or later
 * License URI:       http://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       exoole
 * Domain Path:       /languages
 *
 * @package Exoole
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Define plugin constants.
if ( ! defined( 'EXOOLE_VERSION' ) ) {
	$plugin_data = get_file_data( __FILE__, array( 'Version' => 'Version' ) );
	define( 'EXOOLE_VERSION', $plugin_data['Version'] );
}
define( 'EXOOLE_ENV', 'development' );
define( 'EXOOLE_FILE', __FILE__ );
define( 'EXOOLE_DIR', __DIR__ );
define( 'EXOOLE_TEST', true );
define( 'EXOOLE_PATH', plugin_dir_path( EXOOLE_FILE ) );
define( 'EXOOLE_URL', plugins_url( '/', EXOOLE_FILE ) );
define( 'EXOOLE_MINIMUM_PHP_VERSION', '7.4' );
define( 'EXOOLE_MINIMUM_WP_VERSION', '6.0' );

/**
 * Main Exoole Class
 *
 * Handles initialization and compatibility checks for the Exoole plugin.
 *
 * @since 1.0.0
 */
final class Exoole {

	/**
	 * Exoole constructor.
	 *
	 * Initializes the plugin by loading the text domain and hooking into WordPress.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		// Load the text domain for localization.
		load_plugin_textdomain( 'exoole', false, dirname( plugin_basename( EXOOLE_FILE ) ) . '/languages' );

		// Initialize the plugin after WordPress loads.
		add_action( 'plugins_loaded', array( $this, 'exoole_init' ) );
	}

	/**
	 * Initialize the plugin
	 *
	 * Performs compatibility checks and loads the main plugin file.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function exoole_init() {
		// Check WordPress version.
		if ( ! version_compare( get_bloginfo( 'version' ), EXOOLE_MINIMUM_WP_VERSION, '>=' ) ) {
			add_action( 'admin_notices', array( $this, 'exoole_admin_notice_fail_wp_version' ) );
			return;
		}

		// Check PHP version.
		if ( ! version_compare( PHP_VERSION, EXOOLE_MINIMUM_PHP_VERSION, '>=' ) ) {
			add_action( 'admin_notices', array( $this, 'exoole_admin_notice_fail_php_version' ) );
			return;
		}

		// Load the main plugin logic.
		require_once EXOOLE_DIR . '\plugin.php';
	}

	/**
	 * Display admin notice for incompatible WordPress version.
	 *
	 * Alerts the user that their WordPress version is too low to run the plugin.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	private function exoole_admin_notice_fail_wp_version() {
		$message = sprintf(
			/* translators: %s: Minimum WordPress version required. */
			esc_html__( 'Exoole requires WordPress version %s or higher. Please update WordPress.', 'exoole' ),
			EXOOLE_MINIMUM_WP_VERSION
		);
		echo '<div class="error"><p>' . wp_kses_post( $message ) . '</p></div>';
	}

	/**
	 * Display admin notice for incompatible PHP version.
	 *
	 * Alerts the user that their PHP version is too low to run the plugin.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	private function exoole_admin_notice_fail_php_version() {
		$message = sprintf(
			/* translators: %s: Minimum PHP version required. */
			esc_html__( 'Exoole requires PHP version %s or higher. Please update your PHP version.', 'exoole' ),
			EXOOLE_MINIMUM_PHP_VERSION
		);
		echo '<div class="error"><p>' . wp_kses_post( $message ) . '</p></div>';
	}
}

// Instantiate the plugin.
new Exoole();
