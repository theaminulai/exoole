<?php
/**
 * Class Loaded
 *
 * This class is used to log a message indicating that the test class is loaded.
 *
 * @package Exoole\Tests
 */
namespace Exoole\Tests;

class Loaded {
	public function __construct() {
		error_log( print_r( 'Test class is loaded', true ) );
	}
}
