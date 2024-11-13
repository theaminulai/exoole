<?php
/**
 * Class Init
 *
 * This class is responsible for initializing the test.
 *
 * @package Exoole\Tests
 * @since 1.0.0
 */
namespace Exoole\Tests;

use Exoole\Tests;

class Init {
	/**
	 * Initialize the test
	 *
	 * @since 1.0.0
	 * @return void
	 */
	private function exoole_test_init() {
		new Tests\Loaded();
	}

	public function __construct() {
		$this->exoole_test_init();
	}
}
