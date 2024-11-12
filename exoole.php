<?php

/**
 * @wordpress-plugin
 * Plugin Name: Exoole
 * Plugin URI: https://wordpress.org/plugins/exoole
 * Description: Exoole is a plugin that helps you to create an any design.
 * Version: 1.0.0
 * Author: theaminul,
 * Author URI: https://github.com/theaminuli
 * License: GNU General Public License v3 or later
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: exoole
 * 
 *  @package CreateBlock
 */

 if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_example_dynamic_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_example_dynamic_block_init' );
