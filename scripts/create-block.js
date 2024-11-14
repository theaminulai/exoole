const fs = require( 'fs' );
const path = require( 'path' );

const blockName = process.argv[ 2 ];

if ( ! blockName ) {
	console.error( 'Usage: npm run create-block <block-name>' );
	process.exit( 1 );
}

const blockPath = path.join( __dirname, '..', 'src/blocks', blockName );

if ( fs.existsSync( blockPath ) ) {
	console.error( `Block "${ blockName }" already exists.` );
	process.exit( 1 );
}

// Predefined content for block files
const blockJson = `{
	"$schema": "https://schemas.wp.org/trunk/block.json",
	"apiVersion": 3,
	"name": "exoole/${ blockName }",
	"version": "0.1.0",
	"title": "${ blockName
		.replace( /-/g, ' ' )
		.replace( /\b\w/g, ( l ) => l.toUpperCase() ) }",
	"category": "exoole",
	"icon": "smiley",
	"description": "Example block scaffolded with Create Block tool.",
	"example": {},
	"supports": {
		"html": false
	},
	"textdomain": "exoole",
	"editorScript": "file:./index.js",
	"editorStyle": "file:./index.css",
	"style": "file:./style-index.css",
	"render": "file:./render.php",
	"viewScriptModule": "file:./view.js"
}`;

const indexJs =`/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing "style" keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
} );
`;

const editJs = `/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit() {
	return (
		<p { ...useBlockProps() }>
			{ __(
				'Example Dynamic – hello from the editor!',
				'exoole'
			) }
		</p>
	);
}`;

const styleCss = `/**
 * The following styles get applied both on the front of your site
 * and in the editor.
 *
 * Replace them with your own styles or remove the file completely.
 */

.wp-block-create-block-${ blockName } {
	background-color: #21759b;
	color: #fff;
	padding: 2px;
}
`;

const editorCss = `/**
 * The following styles get applied inside the editor only.
 *
 * Replace them with your own styles or remove the file completely.
 */

.wp-block-create-block-${ blockName } {
	border: 1px dotted #f00;
}
`;
const saveJs = `/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into 'post_content'.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save() {
	return (
		<p { ...useBlockProps.save() }>
			{ '${blockName} – hello from the saved content!' }
		</p>
	);
}
`;

const renderPhp = `<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<p <?php echo get_block_wrapper_attributes(); ?>>
	<?php esc_html_e( 'Example Dynamic – hello from a ${blockName} block!', 'exoole' ); ?>
</p>
`

const viewJs = `/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the 'viewScript' property from 'block.json'.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
console.log( 'Hello World! (from create-block-${blockName} block)' );
/* eslint-enable no-console */
`

// Create folder and files
fs.mkdirSync( blockPath, { recursive: true } );
fs.writeFileSync( path.join( blockPath, 'block.json' ), blockJson );
fs.writeFileSync( path.join( blockPath, 'index.jsx' ), indexJs );
fs.writeFileSync( path.join( blockPath, 'edit.jsx' ), editJs );
fs.writeFileSync(path.join(blockPath, 'style.scss'), styleCss);
fs.writeFileSync(path.join(blockPath, 'save.jsx'), saveJs);
fs.writeFileSync(path.join(blockPath, 'editor.scss'), editorCss);
fs.writeFileSync( path.join( blockPath, 'view.js' ), viewJs );
fs.writeFileSync( path.join( blockPath, 'render.php' ), renderPhp );

console.log( `Block "${ blockName }" created successfully.` );
