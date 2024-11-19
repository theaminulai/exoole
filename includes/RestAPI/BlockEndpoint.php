<?php
namespace Exoole\RestAPI;

defined('ABSPATH') || exit;

/**
 * Class BlockEndpoint
 *
 * Handles the registration of REST API endpoints for blocks.
 *
 * @package Exoole\RestAPI
 */
class BlockEndpoint {
	
	/**
	 * BlockEndpoint constructor.
	 * @since 1.0.0
	 * Adds the action to register REST API routes on initialization.
	 * @see https://developer.wordpress.org/reference/hooks/rest_api_init/
	 */
	public function __construct() {
		add_action('rest_api_init', [ $this, 'exoole_register_routes' ]);
	}
	
	/**
	 * Registers the custom REST API routes.
	 * @since 1.0.0
	 * @return void
	 * @uses register_rest_route()
	 * @see https://developer.wordpress.org/reference/functions/register_rest_route/
	 *
	 * Registers the route 'exoole/v1/blocks' with a GET method.
	 */
	public function exoole_register_routes() {
		register_rest_route(
			'exoole/v1', '/blocks',
			[
				[
					'methods'             => 'GET',
					'callback'            => [ $this, 'exoole_get_blocks' ],
					'permission_callback' => '__return_true',
				],
				[
					'methods'             => 'POST',
					'callback'            => [$this, 'exoole_post_block'],
					'permission_callback' =>'__return_true',
				],
		   	]
	    );

		register_rest_route('exoole/v1', '/blocks/(?P<_id>[a-zA-Z0-9-_]+)', [
            [
                'methods'  => 'PUT',
                'callback' => [$this, 'exoole_update_block'],
                'permission_callback' => '__return_true',
                'args'     => self::exoole_get_endpoint_args_for_item_schema(),
            ],
        ]);
	}

	/**
	 * Retrieves the list of saved blocks.
	 *
	 * @see https://developer.wordpress.org/reference/functions/get_option/
	 * @since 1.0.0
	 * @return WP_REST_Response
	 */
	public function exoole_get_blocks() {
		$saved_blocks = get_option('exoole_blocks', []);
		return rest_ensure_response([
			'message' => 'Blocks fetched successfully.',
			'author'  => 'Exoole',
			'version' => '1.0.0',
			'status'  => 200,
			'data'    => $saved_blocks,
		]);
	}

	/**
	 * Updates existing blocks dynamically without adding new blocks.
	 *
	 * Only updates existing blocks. Does not insert new blocks if the slug does not exist.
	 * @since 1.0.0
	 */
	public function exoole_post_block( $request ) {
		$existing_blocks = get_option('exoole_blocks', []);
		$new_blocks = $request->get_param('data');

		if (empty($new_blocks) || !is_array($new_blocks)) {
			return rest_ensure_response([
				'message' => 'Invalid or missing block data.',
				'status'  => 400,
			]);
		}

		$updated = false;
		foreach ($new_blocks as $new_block) {
			// Check if necessary fields are present
			if (!isset($new_block['_id'], 
					$new_block['slug'], 
					$new_block['title'], 
					$new_block['package'],
					$new_block['category'], 
					$new_block['status']
				)) {
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

			// Check if the block exists based on the slug
			$block_found = false;
			foreach ($existing_blocks as &$existing_block) {
				if ($existing_block['slug'] === $new_block['slug'] &&
					$existing_block['_id'] === $new_block['_id'] &&
					$existing_block['title'] === $new_block['title']
				) {

					$existing_block['package'] = $new_block['package'];
					$existing_block['category'] = $new_block['category'];
					$existing_block['status'] = $new_block['status'];
					$updated = true; 
					$block_found = true;
					break;
				}
			}

			// If the block does not exist, we do not add a new block
			if (!$block_found) {
				continue;
			}
		}

		// If no blocks were updated, return a message indicating no updates
		if (!$updated) {
			return rest_ensure_response([
				'message' => 'No blocks were updated. Ensure the block slug exists and the data has changed.',
				'status'  => 200,
			]);
		}

		update_option('exoole_blocks', $existing_blocks);

		// Return the response with the updated blocks
		return rest_ensure_response([
			'message' => 'Blocks updated successfully.',
			'author'  => 'Exoole',
			'version' => '1.0.0',
			'status'  => 200,
			'data'    => $existing_blocks, 
		]);
	}

	/**
	 * Callback for updating a block with the given ID.
	 * @since 1.0.0
	 * @see https://developer.wordpress.org/reference/functions/update_option/
	 * @param WP_REST_Request $request The REST API request.
	 * @return WP_REST_Response The response after updating the block.
	 */
	public function exoole_update_block($request) {
		$id = $request->get_param('_id');
		
		if (!$id) {
			return rest_ensure_response([
				'message' => 'Block ID is required.',
				'status'  => 400,
			]);
		}
	
		// Get existing blocks
		$blocks = get_option('exoole_blocks', []);
	
		$found = false;
		foreach ($blocks as &$block) {
			if ($block['_id'] === $id && 
				$request['slug'] === $block['slug'] && 
				$request['title'] === $block['title']
			) {
				// Update the block fields (except _id, slug, title)
				$block['package']  = sanitize_text_field($request['package']);
				$block['category'] = sanitize_text_field($request['category']);
				$block['status']   = (bool) $request['status']; // Ensure status remains boolean
	
				$found = true;
				break;
			}
		}
	
		if (!$found) {
			return rest_ensure_response([
				'message' => 'No blocks were updated. Ensure the block slug exists and the data has changed.',
				'status'  => 404,
			]);
		}
	
		// Save updated blocks
		update_option('exoole_blocks', $blocks);
	
		return rest_ensure_response([
			'message' => 'Block updated successfully.',
			'author'  => 'Exoole',
			'version' => '1.0.0',
			'status'  => 200,
			'data'    => $blocks, // Return the updated blocks list
		]);
	}
	

	/**
	 * Get the endpoint arguments for item schema.
	 *
	 * This method returns an array of arguments required for the item schema.
	 * Each argument is defined with its requirements and validation callbacks.
	 *
	 * @return array The array of endpoint arguments.
	 * @since 1.0.0
	 */
	public static function exoole_get_endpoint_args_for_item_schema() {
        return [
			'_id' => [
				'required' => true,
				'validate_callback' => function($param) {
					return !empty($param);
				},
			],
            'slug' => [
                'required' => true,
                'validate_callback' => function($param) {
                    return !empty($param);
                },
            ],
            'title' => [
                'required' => true,
                'validate_callback' => function($param) {
                    return !empty($param);
                },
            ],
            'package' => [
                'required' => true,
				'validate_callback' => function($param) {
					return is_string($param);
				},
            ],
			'category' => [
				'required' => true,
				'validate_callback' => function($param) {
					return is_string($param);
				},
			],
            'status' => [
                'required' => true,
                'validate_callback' => function($param) {
                    return is_bool($param);
                },
            ],
        ];
    }
}