<?php
namespace Exoole\Admin;

defined('ABSPATH') || exit;

/**
 * Class AdminMenu
 *
 * Handles the creation of the admin menu and enqueuing of React app scripts.
 *
 * @package Exoole
 */
class AdminMenu {

    /**
     * AdminMenu constructor.
     * Sets up hooks for the admin menu and scripts.
	 * @since 1.0.0
	 * @access public
	 * @return void
	 * @see https://developer.wordpress.org/reference/hooks/admin_menu/
	 * @see https://developer.wordpress.org/reference/hooks/admin_enqueue_scripts/
     */
    public function __construct() {
        add_action('admin_menu', [ $this, 'exoole_admin_menu' ]);
        // add_action('admin_enqueue_scripts', [ $this, 'exoole_admin_scripts' ]);
    }

    /**
     * Adds the admin menu.
     * @since 1.0.0
	 * @return void
	 * @see https://developer.wordpress.org/reference/functions/add_menu_page/
     */
    public function exoole_admin_menu() {
        add_menu_page(
            'Exoole',
            'Exoole',
            'manage_options',
            'exoole-app',
            [ $this, 'exoole_render_app' ],
            'dashicons-admin-generic',
			20
        );
    }

    /**
     * Renders the React app.
     * @since 1.0.0
	 * @return void
     */
    public function exoole_render_app() {
        echo '<div class="wrap" id="exoole-app"></div>';
    }

    // /**
    //  * Enqueues the React app scripts and styles.
    //  * @since 1.0.0
    //  * @param string $hook The current admin page.
	//  * @see https://developer.wordpress.org/reference/hooks/admin_enqueue_scripts/
    //  */
    // public function exoole_admin_scripts($hook) {
    //     // Only enqueue scripts on the specific admin page
    //     if ($hook !== 'toplevel_page_exoole-app') {
    //         return;
    //     }

    //     // Enqueue the React app's JavaScript and CSS files
    //     wp_enqueue_script(
    //         'exoole-app-js',
    //         plugin_dir_url(__FILE__) . 'build/index.js', // Adjust the path to your React app's build file
    //         ['wp-element'], // Ensure the script depends on wp-element (React)
    //         filemtime(plugin_dir_path(__FILE__) . 'build/index.js'),
    //         true
    //     );

    //     wp_enqueue_style(
    //         'exoole-app-css',
    //         plugin_dir_url(__FILE__) . 'build/index.css', // Adjust the path to your React app's CSS file
    //         [],
    //         filemtime(plugin_dir_path(__FILE__) . 'build/index.css')
    //     );
    // }
}