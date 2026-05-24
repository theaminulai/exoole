const BLOCK_CATEGORIES = [
	{
		id: 'layout',
		name: 'Layout',
		items: [
			{ id: 'section', label: 'Section', icon: 'Section' },
			{ id: 'container', label: 'Container', icon: 'Container' },
			{ id: 'columns', label: 'Columns', icon: 'Cols' },
			{ id: 'grid', label: 'Grid', icon: 'Grid' },
			{ id: 'spacer', label: 'Spacer', icon: 'Spacer' },
			{ id: 'divider', label: 'Divider', icon: 'Divider' },
		],
	},
	{
		id: 'content',
		name: 'Content',
		items: [
			{ id: 'heading', label: 'Heading', icon: 'Heading' },
			{ id: 'text', label: 'Paragraph', icon: 'Text' },
			{ id: 'quote', label: 'Quote', icon: 'Quote' },
			{ id: 'list', label: 'List', icon: 'List' },
			{ id: 'button', label: 'Button', icon: 'Button' },
			{ id: 'icon', label: 'Icon', icon: 'Star' },
		],
	},
	{
		id: 'interactive',
		name: 'Interactive',
		items: [
			{ id: 'form', label: 'Form', icon: 'Form' },
			{ id: 'accordion', label: 'Accordion', icon: 'Accordion' },
			{ id: 'tabs', label: 'Tabs', icon: 'Tabs' },
			{ id: 'counter', label: 'Counter', icon: 'Counter' },
		],
	},
	{
		id: 'media',
		name: 'Media',
		items: [
			{ id: 'image', label: 'Image', icon: 'Image' },
			{ id: 'video', label: 'Video', icon: 'Video' },
			{ id: 'gallery', label: 'Gallery', icon: 'Gallery' },
			{ id: 'map', label: 'Map', icon: 'Map' },
		],
	},
	{
		id: 'advanced',
		name: 'Advanced',
		items: [
			{ id: 'code', label: 'HTML', icon: 'Code' },
			{ id: 'shortcode', label: 'Shortcode', icon: 'Hash' },
		],
	},
];

// Page tree shown in the structure panel and rendered on the canvas
const PAGE_TREE = [
	{ id: 'sec-hero', type: 'Section', label: 'Hero', depth: 0, selected: false, visible: true },
	{ id: 'cont-hero', type: 'Container', label: 'Container', depth: 1, selected: false, visible: true },
	{ id: 'h-hero', type: 'Heading', label: 'Headline · H1', depth: 2, selected: true, visible: true },
	{ id: 'p-hero', type: 'Paragraph', label: 'Subheadline', depth: 2, selected: false, visible: true },
	{ id: 'row-cta', type: 'Columns', label: 'CTA Row', depth: 2, selected: false, visible: true },
	{ id: 'btn-1', type: 'Button', label: 'Primary CTA', depth: 3, selected: false, visible: true },
	{ id: 'btn-2', type: 'Button', label: 'Secondary', depth: 3, selected: false, visible: true },
	{ id: 'sec-feat', type: 'Section', label: 'Features', depth: 0, selected: false, visible: true },
	{ id: 'grid-feat', type: 'Grid', label: '3-column grid', depth: 1, selected: false, visible: true },
	{ id: 'card-1', type: 'Container', label: 'Card · Speed', depth: 2, selected: false, visible: true },
	{ id: 'card-2', type: 'Container', label: 'Card · Atomic', depth: 2, selected: false, visible: true },
	{ id: 'card-3', type: 'Container', label: 'Card · Dev DX', depth: 2, selected: false, visible: true },
	{ id: 'sec-logo', type: 'Section', label: 'Logo Cloud', depth: 0, selected: false, visible: false },
];

export { BLOCK_CATEGORIES, PAGE_TREE };
