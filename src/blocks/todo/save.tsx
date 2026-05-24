/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';
import { store as blocksStore } from '@wordpress/blocks';
import { ReactElement } from 'react';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into 'post_content'.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {ReactElement} Element to render.
 */
export default function Save(): ReactElement {
	return (
		<p {...useBlockProps.save()}>
			{ 'todo – hello from the saved content!' }
		</p>
	);
}
