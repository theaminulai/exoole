<?php
namespace Exoole\RestAPI;
use Exoole\RestAPI;
defined('ABSPATH') || exit;

/**
 * Class BlockEndpoint
 *
 * Handles the registration of REST API endpoints for blocks.
 *
 * @package Exoole\RestAPI
 */

 class Endpoint {
	/**
	 * Constructor for the Endpoint class.
	 *
	 * This constructor hooks the 'exoole_register_all_routes' method to the 'admin_init' action,
	 * which is triggered when the WordPress admin is initialized.
	 * @see https://developer.wordpress.org/reference/hooks/admin_init/
	 * @return void
	 * @since 1.0.0
	 */
	public function __construct() {
		add_action('init', [ $this, 'exoole_register_all_routes' ]);
	}

	/**
	 * Registers all routes for the Exoole plugin.
	 *
	 * This method initializes the BlockEndpoint class, which handles the registration
	 * of all custom REST API routes for the Exoole plugin.
	 *
	 * @return void
	 * @since 1.0.0
	 * @uses BlockEndpoint
	 */
	public function exoole_register_all_routes() {
		new RestAPI\BlockEndpoint();
	}
 }