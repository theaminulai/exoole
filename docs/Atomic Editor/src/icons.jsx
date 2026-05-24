// Minimal inline icon set (Lucide-style) — stroke=1.5, 16px default
const Icon = ({ d, size = 16, stroke = 1.5, className = '', children, viewBox = '0 0 24 24', fill = 'none' }) => (
	<svg width={size} height={size} viewBox={viewBox} fill={fill} stroke="currentColor"
		strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}>
		{children || (d ? <path d={d} /> : null)}
	</svg>
);

const I = {
	Search: (p) => <Icon {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Icon>,
	Plus: (p) => <Icon {...p}><path d="M12 5v14M5 12h14" /></Icon>,
	X: (p) => <Icon {...p}><path d="M18 6 6 18M6 6l12 12" /></Icon>,
	Chev: (p) => <Icon {...p}><path d="m6 9 6 6 6-6" /></Icon>,
	ChevR: (p) => <Icon {...p}><path d="m9 6 6 6-6 6" /></Icon>,
	Undo: (p) => <Icon {...p}><path d="M3 7v6h6" /><path d="M21 17a9 9 0 0 0-15-6.7L3 13" /></Icon>,
	Redo: (p) => <Icon {...p}><path d="M21 7v6h-6" /><path d="M3 17a9 9 0 0 1 15-6.7L21 13" /></Icon>,
	Monitor: (p) => <Icon {...p}><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></Icon>,
	Tablet: (p) => <Icon {...p}><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M11 18h2" /></Icon>,
	Phone: (p) => <Icon {...p}><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></Icon>,
	Eye: (p) => <Icon {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></Icon>,
	Save: (p) => <Icon {...p}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" /><path d="M17 21v-8H7v8M7 3v5h8" /></Icon>,
	Layers: (p) => <Icon {...p}><path d="m12 2 10 5-10 5L2 7l10-5Z" /><path d="m2 17 10 5 10-5M2 12l10 5 10-5" /></Icon>,
	Settings: (p) => <Icon {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" /></Icon>,
	Atom: (p) => <Icon {...p}><circle cx="12" cy="12" r="1.5" /><ellipse cx="12" cy="12" rx="10" ry="4" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-60 12 12)" /></Icon>,
	Bell: (p) => <Icon {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></Icon>,
	Copy: (p) => <Icon {...p}><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></Icon>,
	Trash: (p) => <Icon {...p}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /></Icon>,
	Grip: (p) => <Icon {...p}><circle cx="9" cy="6" r="1" /><circle cx="9" cy="12" r="1" /><circle cx="9" cy="18" r="1" /><circle cx="15" cy="6" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="15" cy="18" r="1" /></Icon>,
	Lock: (p) => <Icon {...p}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 1 1 8 0v4" /></Icon>,
	More: (p) => <Icon {...p}><circle cx="5" cy="12" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="19" cy="12" r="1.4" /></Icon>,
	// Block category icons
	Cols: (p) => <Icon {...p}><rect x="3" y="4" width="7" height="16" rx="1.5" /><rect x="14" y="4" width="7" height="16" rx="1.5" /></Icon>,
	Section: (p) => <Icon {...p}><rect x="3" y="4" width="18" height="6" rx="1.5" /><rect x="3" y="14" width="18" height="6" rx="1.5" /></Icon>,
	Container: (p) => <Icon {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 8h18M8 3v18" /></Icon>,
	Grid: (p) => <Icon {...p}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></Icon>,
	Spacer: (p) => <Icon {...p}><path d="M5 4h14M5 20h14M12 8v8M9 11l3-3 3 3M9 13l3 3 3-3" /></Icon>,
	Divider: (p) => <Icon {...p}><path d="M3 12h18" /><circle cx="12" cy="12" r="1.5" /></Icon>,
	Heading: (p) => <Icon {...p}><path d="M6 4v16M18 4v16M6 12h12" /></Icon>,
	Text: (p) => <Icon {...p}><path d="M4 6h16M4 12h16M4 18h10" /></Icon>,
	Quote: (p) => <Icon {...p}><path d="M7 7c-2 1-3 3-3 5v5h5v-6H5M16 7c-2 1-3 3-3 5v5h5v-6h-4" /></Icon>,
	List: (p) => <Icon {...p}><circle cx="5" cy="6" r="1" /><circle cx="5" cy="12" r="1" /><circle cx="5" cy="18" r="1" /><path d="M10 6h11M10 12h11M10 18h11" /></Icon>,
	Button: (p) => <Icon {...p}><rect x="3" y="8" width="18" height="8" rx="3" /><path d="M9 12h6" /></Icon>,
	Form: (p) => <Icon {...p}><rect x="3" y="4" width="18" height="6" rx="1.5" /><rect x="3" y="13" width="11" height="6" rx="1.5" /><rect x="16" y="13" width="5" height="6" rx="1.5" /></Icon>,
	Accordion: (p) => <Icon {...p}><rect x="3" y="4" width="18" height="5" rx="1" /><rect x="3" y="11" width="18" height="9" rx="1" /><path d="m15 14 2 2 2-2" /></Icon>,
	Tabs: (p) => <Icon {...p}><path d="M3 9h6V4h12v16H3V9Z" /><path d="M3 9h18" /></Icon>,
	Image: (p) => <Icon {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="10" r="1.5" /><path d="m21 16-5-5L5 21" /></Icon>,
	Video: (p) => <Icon {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m10 9 5 3-5 3V9Z" /></Icon>,
	Gallery: (p) => <Icon {...p}><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" /></Icon>,
	Icon: (p) => <Icon {...p}><path d="m12 2 2.4 7.4H22l-6.2 4.5 2.4 7.1L12 16.7l-6.2 4.3 2.4-7.1L2 9.4h7.6L12 2Z" /></Icon>,
	Code: (p) => <Icon {...p}><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16" /></Icon>,
	Map: (p) => <Icon {...p}><path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2V6Z" /><path d="M9 4v16M15 6v16" /></Icon>,
	Counter: (p) => <Icon {...p}><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M8 10v4M12 9v6M16 10v4" /></Icon>,
	Star: (p) => <Icon {...p}><path d="m12 2 3 7 7 .5-5.5 4.5L18 21l-6-4-6 4 1.5-7L2 9.5 9 9l3-7Z" /></Icon>,
	// Inspector
	Align: (p) => <Icon {...p}><path d="M3 6h18M3 12h12M3 18h18" /></Icon>,
	Type: (p) => <Icon {...p}><path d="M4 7V5h16v2M9 5v14M15 19H9" /></Icon>,
	Palette: (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><circle cx="8" cy="10" r="1" /><circle cx="14" cy="8" r="1" /><circle cx="16" cy="13" r="1" /><path d="M12 21a3 3 0 0 1 0-6c2 0 2-2 0-2" /></Icon>,
	Sparkle: (p) => <Icon {...p}><path d="M12 4v4M12 16v4M4 12h4M16 12h4M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2" /></Icon>,
	Box: (p) => <Icon {...p}><rect x="3" y="3" width="18" height="18" rx="2" /></Icon>,
	Devices: (p) => <Icon {...p}><rect x="2" y="4" width="14" height="11" rx="1.5" /><rect x="14" y="9" width="8" height="11" rx="1.5" /><path d="M5 19h6" /></Icon>,
	Hash: (p) => <Icon {...p}><path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18" /></Icon>,
	Bolt: (p) => <Icon {...p}><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" /></Icon>,
	Command: (p) => <Icon {...p}><path d="M9 6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6Z" /></Icon>,
};

export { I };
