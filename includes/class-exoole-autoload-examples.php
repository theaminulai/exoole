<?php
/**
 * Example usage of Exoole Production Autoloader
 *
 * This file demonstrates how to create classes that work with both
 * Composer autoloading (development) and the production autoloader.
 *
 * @package Exoole
 * @since 1.0.0
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

// Example 1: Traditional WordPress style class (current style)
// File: includes/class-exoole-example-traditional.php
/*
class Exoole_Example_Traditional {
	public function __construct() {
		// Traditional WordPress class
	}
}
*/

// Example 2: PSR-4 namespaced class
// File: includes/Core/Example.php
/*
namespace Exoole\Core;

class Example {
	public function __construct() {
		// PSR-4 namespaced class
	}
}
*/

// Example 3: PSR-4 namespaced class in subdirectory
// File: includes/Admin/Settings.php
/*
namespace Exoole\Admin;

class Settings {
	public function __construct() {
		// PSR-4 namespaced admin class
	}
}
*/

// Example 4: PSR-4 namespaced interface
// File: includes/Interfaces/BlockInterface.php
/*
namespace Exoole\Interfaces;

interface BlockInterface {
	public function render();
}
*/

// Example usage in your plugin code:
/*
// Traditional WordPress style
$traditional = new Exoole_Example_Traditional();

// PSR-4 style
$example = new \Exoole\Core\Example();
$settings = new \Exoole\Admin\Settings();
$block = new \Exoole\Blocks\CustomBlock();
*/
