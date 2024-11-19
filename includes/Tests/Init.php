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
/**
 * Adds or updates blocks dynamically.
 *
 * Validates the block data and checks for any changes to existing blocks.
 * @since 1.0.0
 */
public function exoole_post_block( $request ) {
    // Get existing blocks from the options table
    $existing_blocks = get_option('exoole_blocks', []);

    // Extract block data from the request body
    $new_blocks = $request->get_param('data'); // 'data' should be sent in the request body

    if (empty($new_blocks) || !is_array($new_blocks)) {
        return rest_ensure_response([
            'message' => 'Invalid or missing block data.',
            'status'  => 400,
        ]);
    }

    // Loop through each new block and validate the data
    foreach ($new_blocks as $new_block) {
        // Check if necessary fields are present
        if ( !isset($new_block['slug'], $new_block['title'], $new_block['package'], $new_block['category'], $new_block['status']) ) {
            return rest_ensure_response([
                'message' => 'Missing required fields in block data.',
                'status'  => 400,
            ]);
        }

        // Check if the status is a valid boolean
        if (!is_bool($new_block['status'])) {
            return rest_ensure_response([
                'message' => 'Invalid status value, must be boolean.',
                'status'  => 400,
            ]);
        }

        // Flag to check if block is updated
        $updated = false;

        // Loop through existing blocks and update if the slug matches
        foreach ($existing_blocks as &$existing_block) {
            if ($existing_block['slug'] === $new_block['slug']) {
                // If the data is different, update the block
                if (
                    $existing_block['title'] !== $new_block['title'] ||
                    $existing_block['package'] !== $new_block['package'] ||
                    $existing_block['category'] !== $new_block['category'] ||
                    $existing_block['status'] !== $new_block['status']
                ) {
                    // Update the existing block with new values
                    $existing_block['title'] = $new_block['title'];
                    $existing_block['package'] = $new_block['package'];
                    $existing_block['category'] = $new_block['category'];
                    $existing_block['status'] = $new_block['status'];
                    $updated = true; // Mark the block as updated
                }
                break; // Exit loop once the block is found
            }
        }

        // If the block doesn't exist and is not updated, add it to the array
        if (!$updated) {
            // Check if the slug already exists before adding the new block
            $slug_exists = false;
            foreach ($existing_blocks as $block) {
                if ($block['slug'] === $new_block['slug']) {
                    $slug_exists = true;
                    break;
                }
            }

            if (!$slug_exists) {
                $existing_blocks[] = $new_block;
            }
        }
    }

    // Save the updated blocks to the options table
    update_option('exoole_blocks', $existing_blocks);

    // Return the response
    return rest_ensure_response([
        'message' => 'Blocks added/updated successfully.',
        'author'  => 'Exoole',
        'version' => '1.0.0',
        'status'  => 200,
        'data'    => $existing_blocks, // Return the full list of blocks after processing
    ]);
}


}
