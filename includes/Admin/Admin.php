<?php
/**
 * Admin functions and hooks.
 *
 * @package Exoole
 */
namespace Exoole\Admin;

defined( 'ABSPATH' ) || exit;

class Admin {
	// Admin related methods and properties would go here.
	public function __construct() {
		// Initialization code for admin functionalities.
		add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );
	}

	public function add_admin_menu() {
		add_menu_page(
			__( 'Exoole Settings', 'exoole' ),
			__( 'Exoole', 'exoole' ),
			'manage_options',
			'exoole-settings',
			array( $this, 'render_settings_page' ),
			'dashicons-admin-generic'
		);
	}

	public function render_settings_page() {
		echo '<div class="wrap"><h1>' . esc_html( __( 'Exoole Settings', 'exoole' ) ) . '</h1>';
	}
}
