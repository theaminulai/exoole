<?php
namespace Exoole\Blocks;

defined('ABSPATH') || exit;

/**
 * Class BlockLists
 *
 * Handles the registration of custom blocks.
 *
 * @package Exoole\Blocks
 */
class BlockLists {
    /**
     * BlockLists constructor.
     *
     * Hooks the 'exoole_register_blocks' method to the 'init' action.
     * @since 1.0.0
	 * @access public
	 * @see https://developer.wordpress.org/reference/hooks/init/
     */
    public function __construct() {
        add_action('init', [ $this, 'exoole_register_blocks' ]);
    }

    /**
     * Registers custom blocks, merges them with existing block data, and saves to the options table.
     *
     * @since 1.0.0
	 * @access public
	 * @return void
	 * @uses get_option(), apply_filters(), update_option()
     */
    public function exoole_register_blocks() {
		// Get the existing blocks from the options table
		$existing_blocks = get_option('exoole_blocks', []);
	
		// New blocks to register
		$new_blocks = [
			[
				'_id'      =>  substr(uniqid(), -6),
				'slug'     => 'button',
				'title'    => 'Button',
				'package'  => 'free',
				'category' => 'general',
				'status'   => true,
			],
			[
				'_id'      => substr(uniqid(), -6),
				'slug'     => 'header',
				'title'    => 'Header',
				'package'  => 'premium',
				'category' => 'layout',
				'status'   => false,
			],
			[
				'_id'      => substr(uniqid(), -6),
				'slug'     => 'footer',
				'title'    => 'Footer',
				'package'  => 'premium',
				'category' => 'layout',
				'status'   => true,
			]
		];
	
		// Apply filters for additional blocks to be added
		$new_blocks = apply_filters('exoole/blocks/add', $new_blocks);
	
		// Merge and ensure unique blocks based on 'slug'
		$unique_blocks = [];
		foreach ($new_blocks as $new_block) {
			$updated = false;
	
			// Check if the block already exists (based on 'slug')
			foreach ($existing_blocks as &$existing_block) {
				if ($existing_block['slug'] === $new_block['slug']) {
					$existing_block = array_merge($existing_block, $new_block);
					$updated = true;
					break;
				}
			}
	
			// If the block is new (doesn't exist in the existing blocks), add it
			if (!$updated) {
				$existing_blocks[] = $new_block;
			}
		}
	
		// Remove duplicates by slug and keep the latest entry
		$unique_blocks = [];
		foreach ($existing_blocks as $block) {
			if (!isset($unique_blocks[$block['slug']])) {
				$unique_blocks[$block['slug']] = $block;
			}
		}
	
		if ($existing_blocks !== $unique_blocks) {
			apply_filters('exoole/blocks/save', $unique_blocks);
			update_option('exoole_blocks', array_values($unique_blocks));
		}
	}
	
}
