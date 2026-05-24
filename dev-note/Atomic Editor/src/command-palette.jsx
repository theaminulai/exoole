import React from 'react';
import { I } from './icons.jsx';

export function CommandPalette({ open, onClose }) {
	const [q, setQ] = React.useState('');
	React.useEffect(() => {
		if (open) {
			setQ('');
			const t = setTimeout(() => document.getElementById('cmd-input')?.focus(), 10);
			return () => clearTimeout(t);
		}
	}, [open]);
	if (!open) return null;

	const items = [
		{
			group: 'Actions', rows: [
				{ icon: 'Plus', label: 'Insert block…', shortcut: '⌘/' },
				{ icon: 'Save', label: 'Save draft', shortcut: '⌘S' },
				{ icon: 'Eye', label: 'Preview as visitor', shortcut: '⌘P' },
				{ icon: 'Bolt', label: 'Publish to atomic.studio', shortcut: '⌘⇧P' },
			]
		},
		{
			group: 'Navigate', rows: [
				{ icon: 'Layers', label: 'Toggle structure panel', shortcut: '⌥L' },
				{ icon: 'Hash', label: 'Go to section · Features', shortcut: '' },
				{ icon: 'Devices', label: 'Switch device · Tablet', shortcut: '⌥T' },
			]
		},
		{
			group: 'Blocks', rows: [
				{ icon: 'Heading', label: 'Heading', shortcut: '' },
				{ icon: 'Image', label: 'Image', shortcut: '' },
				{ icon: 'Form', label: 'Form', shortcut: '' },
				{ icon: 'Code', label: 'HTML embed', shortcut: '' },
			]
		},
	];

	return (
		<div className="fixed inset-0 z-50 flex items-start justify-center pt-[18vh]" onClick={onClose}>
			<div className="absolute inset-0 bg-black/50 backdrop-blur-sm anim-fade" />
			<div onClick={(e) => e.stopPropagation()}
				className="relative w-[640px] palette-glass rounded-2xl overflow-hidden anim-pop">
				<div className="h-12 px-3 flex items-center gap-2.5 border-b border-white/[0.05]">
					<I.Command size={15} className="text-accent" />
					<input id="cmd-input" autoFocus value={q} onChange={(e) => setQ(e.target.value)}
						placeholder="Search blocks, pages, settings, or run a command…"
						className="flex-1 bg-transparent outline-none text-[13.5px] text-white placeholder:text-white/35" />
					<span className="kbd">esc</span>
				</div>
				<div className="max-h-[440px] overflow-y-auto py-1">
					{items.map((g) => (
						<div key={g.group} className="py-1">
							<div className="px-4 py-1 text-[9.5px] font-semibold tracking-[0.12em] uppercase text-white/35">{g.group}</div>
							{g.rows
								.filter((r) => !q || r.label.toLowerCase().includes(q.toLowerCase()))
								.map((r, i) => {
									const Comp = I[r.icon];
									const active = g.group === 'Actions' && i === 0;
									return (
										<div key={r.label}
											className={`mx-1.5 px-2.5 h-9 rounded-lg flex items-center gap-2.5 cursor-pointer text-[12.5px]
                        ${active ? 'bg-accent/15 text-white' : 'text-white/80 hover:bg-white/[0.04]'}`}>
											<Comp size={14} className={active ? 'text-accent' : 'text-white/55'} />
											<span className="flex-1">{r.label}</span>
											{r.shortcut && <span className="kbd">{r.shortcut}</span>}
										</div>
									);
								})}
						</div>
					))}
				</div>
				<div className="h-8 px-3 border-t border-white/[0.05] flex items-center gap-3 text-[10.5px] text-white/40 font-medium bg-black/20">
					<span className="flex items-center gap-1"><span className="kbd">↑↓</span> Navigate</span>
					<span className="flex items-center gap-1"><span className="kbd">↵</span> Run</span>
					<span className="flex items-center gap-1"><span className="kbd">⌘K</span> Toggle</span>
					<span className="ml-auto">v0.9 — built atomically</span>
				</div>
			</div>
		</div>
	);
}
