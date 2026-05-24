import React from 'react';
import { BLOCK_CATEGORIES } from './data.jsx';
import { I } from './icons.jsx';

export function BlocksPanel({ query, setQuery }) {
	const filter = (q) => (item) => !q || item.label.toLowerCase().includes(q.toLowerCase());
	const [openCats, setOpenCats] = React.useState({ layout: true, content: true, interactive: true, media: true, advanced: false });

	return (
		<aside className="w-[280px] shrink-0 bg-bg2 border-r border-white/[0.05] flex flex-col">
			{/* Header tabs */}
			<div className="px-3 pt-3 pb-2 flex items-center gap-1">
				<button className="h-7 px-2.5 rounded-md text-[12px] font-semibold text-white bg-white/[0.05]">Blocks</button>
				<button className="h-7 px-2.5 rounded-md text-[12px] font-medium text-white/45 hover:text-white/85">Patterns</button>
				<button className="h-7 px-2.5 rounded-md text-[12px] font-medium text-white/45 hover:text-white/85">Templates</button>
				<div className="ml-auto flex items-center gap-0.5">
					<button className="h-7 w-7 rounded-md flex items-center justify-center text-white/45 hover:text-white/85 hover:bg-white/[0.04]" title="Pin panel"><I.Lock size={13} /></button>
				</div>
			</div>

			{/* Search */}
			<div className="px-3 pb-3">
				<div className="relative">
					<I.Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/35" />
					<input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search 84 blocks…"
						className="w-full h-9 pl-8 pr-16 rounded-lg bg-bg hairline text-[12.5px] placeholder:text-white/30 text-white/90 outline-none focus:shadow-[0_0_0_1px_rgba(56,88,233,0.55),0_0_0_4px_rgba(56,88,233,0.12)]" />
					<div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
						<span className="kbd">/</span>
					</div>
				</div>
			</div>

			{/* Categories */}
			<div className="flex-1 overflow-y-auto px-2 pb-4">
				{BLOCK_CATEGORIES.map((cat) => {
					const items = cat.items.filter(filter(query));
					if (items.length === 0 && query) return null;
					const open = openCats[cat.id];
					return (
						<div key={cat.id} className="mb-1">
							<button
								onClick={() => setOpenCats((s) => ({ ...s, [cat.id]: !s[cat.id] }))}
								className="w-full h-8 px-1.5 flex items-center justify-between text-white/45 hover:text-white/75 group">
								<span className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.08em]">
									<I.Chev size={12} className={`transition-transform ${open ? '' : '-rotate-90'}`} />
									{cat.name}
								</span>
								<span className="text-[10px] font-mono text-white/30">{items.length}</span>
							</button>
							{open && (
								<div className="grid grid-cols-2 gap-1.5 px-1 pt-0.5 pb-2">
									{items.map((b) => {
										const Comp = I[b.icon];
										return (
											<div key={b.id}
												className="block-card group cursor-grab active:cursor-grabbing rounded-xl bg-surface border border-white/[0.04] p-2.5 transition-all duration-200 hairline">
												<div className="h-10 rounded-md bg-bg/60 border border-white/[0.04] flex items-center justify-center mb-1.5 group-hover:border-accent/30">
													<div className="block-icon text-white/55 transition-colors"><Comp size={18} /></div>
												</div>
												<div className="text-[11.5px] font-medium text-white/85 leading-tight">{b.label}</div>
											</div>
										);
									})}
								</div>
							)}
						</div>
					);
				})}
			</div>

			{/* Footer: tip */}
			<div className="px-3 py-2.5 border-t border-white/[0.05] bg-bg/40">
				<div className="text-[10.5px] text-white/40 leading-snug flex items-start gap-1.5">
					<I.Bolt size={11} className="mt-0.5 text-accent shrink-0" />
					<span>Drag onto the canvas, or press <span className="kbd">⌘ /</span> to insert at caret.</span>
				</div>
			</div>
		</aside>
	);
}
