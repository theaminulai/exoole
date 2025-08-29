<?php
/**
 * The core Exoole plugin class.
 *
 * @since      0.0.2
 * @package    Exoole
 * @subpackage Exoole/includes
 * @author     theaminul
 */
namespace Exoole;
use Exoole\Exoole_Plugin_Loader;

class Exoole_Plugin {

	/**
	 * The loader that's responsible for orchestrating the hooks of the plugin.
	 *
	 * @var Exoole_Plugin_Loader
	 */
	private $loader;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * @since    0.0.2
	 */
	public function __construct() {

		$this->load_dependencies();
		$this->define_admin_hooks();
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * @since    0.0.2
	 * @access   private
	 */
	private function load_dependencies() {

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		// require_once EXOOLE_DIRNAME_INC . 'class-exoole-plugin-loader.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		// require_once EXOOLE_DIRNAME_INC . 'class-create-block-theme-api.php';

		$this->loader = new Exoole_Plugin_Loader();
	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    0.0.2
	 * @access   private
	 */
	private function define_admin_hooks() {
		// var_dump($this->loader);
		// $plugin_api    = new Exoole_API();
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    0.0.2
	 */
	public function run() {
		$this->loader->run();
	}
}
