<?php
namespace Exoole\Blocks;
defined('ABSPATH') || exit;

/**
 * Class Blocks
 *
 * Handles the registration of custom blocks.
 *
 * @package Exoole\Blocks
 */
class BlocksManager {

	/**
	 * The list of blocks to be registered.
	 * @var array
	 */
	protected $filtered_blocks;
    /**
     * Blocks constructor.
     *
     * Hooks the `exoole_register_blocks` method to the `init` action.
     * @since 1.0.0
	 * @access public
	 * @return void
	 * @see https://developer.wordpress.org/reference/hooks/init/
     */
    public function __construct() {
		$this->filtered_blocks = get_option('exoole_blocks', []);
		add_action('init', [ $this, 'exoole_register_blocks' ]);
    }

	/**
	* Registers the blocks.
	* Iterates through the list of blocks and registers each one.
	* @since 1.0.0
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function exoole_register_blocks() {
		foreach ($this->filtered_blocks as $block) {
			$block_path = $this->exoole_register_block($block);
			error_log(print_r($block_path, true));
			// if ($block_path) {
			// 	register_block_type($block_path);
			// }
		}
	}

   /**
     * Registers a single block.
     * @param array $block The block data.
     * @since 1.0.0
     * @return string|false The block path or false if invalid.
     */
    protected function exoole_register_block($block) {
        if (!isset($block['slug']) || !isset($block['title'])) {
            return false;
        }
        return EXOOLE_DIR . '/build/blocks/' . $block['slug'];
    }
}
