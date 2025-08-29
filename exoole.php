<?php
/**
 * Exoole - A modern page builder plugin for WordPress.
 *
 * @author      theaminul
 * @copyright   theaminul.com
 * @license     GNU General Public License v3 or later
 * @license URI https://www.gnu.org/licenses/gpl-3.0.html
 * @package     Exoole
 *
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

$exoole_plugin_data = get_file_data( __FILE__, array( 'Version' => 'Version' ) );
define( 'EXOOLE_VERSION', $exoole_plugin_data['Version'] );
define( 'EXOOLE_FILE', __FILE__ );
define( 'EXOOLE_DIR', plugin_dir_path( EXOOLE_FILE ) );
define( 'EXOOLE_URL', plugin_dir_url( EXOOLE_FILE ) );
define( 'EXOOLE_BASENAME', plugin_basename( EXOOLE_FILE ) );
define( 'EXOOLE_ASSETS_URL', EXOOLE_URL . 'assets/' );
define( 'EXOOLE_DIRNAME_INC', EXOOLE_DIR . 'includes/' );
define( 'EXOOLE_TEST', false );
define( 'EXOOLE_ENV', 'production' );
define( 'EXOOLE_MINIMUM_PHP_VERSION', '7.4' );
define( 'EXOOLE_MINIMUM_WP_VERSION', '6.0' );

// Determine environment and load appropriate autoloader.
if ( file_exists( EXOOLE_DIRNAME_INC . 'class-exoole-autoload.php' ) ) {
	// Development environment with Composer.
	require_once EXOOLE_DIRNAME_INC . 'class-exoole-autoload.php';
	Exoole_Autoloader::register();
}


/**
 * Display admin notice for incompatible WordPress version.
 *
 * @return void
 * @since 1.0.0
 */
function exoole_notice_fail_wp_version() {
	echo '<div class="error"><p>' . esc_html(
		sprintf(
			/* translators: %s: WordPress minimum version */
			__( 'Exoole requires WordPress version %s or higher. Please update WordPress.', 'exoole' ),
			EXOOLE_MINIMUM_WP_VERSION
		)
	) . '</p></div>';
}

/**
 * Display admin notice for incompatible PHP version.
 *
 * @return void
 * @since 1.0.0
 */
function exoole_notice_fail_php_version() {
	echo '<div class="error"><p>' . esc_html(
		sprintf(
			/* translators: %s: PHP minimum version */
			__( 'Exoole requires PHP version %s or higher. Please update PHP.', 'exoole' ),
			EXOOLE_MINIMUM_PHP_VERSION
		)
	) . '</p></div>';
}

/**
 * Initialize the plugin.
 *
 * @return void
 * @since 1.0.0
 */
function exoole_init() {
	load_plugin_textdomain( 'exoole', false, dirname( EXOOLE_BASENAME ) . '/languages' );
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

	$plugin = new \Exoole\Exoole_Plugin();
	$plugin->run();
}
/**
 * Initialize the plugin.
 *
 * @return void
 * @since 1.0.0
 */
exoole_init();
