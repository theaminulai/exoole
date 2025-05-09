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
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

// Setup constants.
$plugin_data = get_file_data( __FILE__, array( 'Version' => 'Version' ) );
define( 'EXOOLE_VERSION', $plugin_data['Version'] );
define( 'EXOOLE_FILE', __FILE__ );
define( 'EXOOLE_DIR', plugin_dir_path( __FILE__ ) );
define( 'EXOOLE_URL', plugin_dir_url( __FILE__ ) );
define( 'EXOOLE_ENV', 'development' );
define( 'EXOOLE_TEST', false );
define( 'EXOOLE_MINIMUM_PHP_VERSION', '7.4' );
define( 'EXOOLE_MINIMUM_WP_VERSION', '6.0' );


/**
 * Display admin notice for incompatible WordPress version.
 */
function exoole_notice_fail_wp_version() {
	echo '<div class="error"><p>' . esc_html__(
		'Exoole requires WordPress version ' . EXOOLE_MINIMUM_WP_VERSION . ' or higher. Please update WordPress.',
		'exoole'
	) . '</p></div>';
}

/**
 * Display admin notice for incompatible PHP version.
 */
function exoole_notice_fail_php_version() {
	echo '<div class="error"><p>' . esc_html__(
		'Exoole requires PHP version ' . EXOOLE_MINIMUM_PHP_VERSION . ' or higher. Please update PHP.',
		'exoole'
	) . '</p></div>';
}

/**
 * Initialize the plugin.
 */
function exoole_init() {
	load_plugin_textdomain( 'exoole', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );

	// Version checks.
	if ( version_compare( get_bloginfo( 'version' ), EXOOLE_MINIMUM_WP_VERSION, '<' ) ) {
		add_action( 'admin_notices', 'exoole_notice_fail_wp_version' );
		return;
	}

	if ( version_compare( PHP_VERSION, EXOOLE_MINIMUM_PHP_VERSION, '<' ) ) {
		add_action( 'admin_notices', 'exoole_notice_fail_php_version' );
		return;
	}

	// Load core plugin functionality.
	require_once EXOOLE_DIR . 'includes/class-exoole-plugin.php';

	$plugin = new Exoole_Plugin();
	$plugin->run();
}

exoole_init();
