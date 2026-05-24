import { PAGE_TREE } from './data.jsx';
import { I } from './icons.jsx';

function StructureRow({ node }) {
	const pad = 8 + node.depth * 14;
	const typeIcon = {
		Section: 'Section', Container: 'Container', Columns: 'Cols', Grid: 'Grid',
		Heading: 'Heading', Paragraph: 'Text', Button: 'Button',
	}[node.type] || 'Box';
	const TypeC = I[typeIcon];
	return (
		<div className={`group h-7 flex items-center pr-2 text-[11.5px] cursor-pointer rounded-md
        ${node.selected ? 'bg-accent/15 text-white' : 'text-white/65 hover:bg-white/[0.04]'}`}>
			<div style={{ paddingLeft: pad }} className="flex items-center gap-1.5 flex-1 min-w-0">
				<I.ChevR size={10} className="text-white/30" />
				<TypeC size={12} className={node.selected ? 'text-accent' : 'text-white/45'} />
				<span className={`truncate font-medium ${node.selected ? 'text-white' : ''}`}>{node.label}</span>
			</div>
			<button className={`h-5 w-5 rounded flex items-center justify-center transition-opacity ${node.visible ? 'opacity-0 group-hover:opacity-100' : 'opacity-60'} text-white/45 hover:text-white/90`}>
				<I.Eye size={11} />
			</button>
		</div>
	);
}

function StructurePanel({ open, onClose }) {
	if (!open) return null;
	return (
		<div className="absolute left-3 top-3 bottom-3 w-[240px] bg-surface/95 backdrop-blur-xl rounded-2xl border border-white/[0.06] shadow-2xl flex flex-col anim-pop z-20">
			<div className="h-10 px-3 flex items-center gap-2 border-b border-white/[0.05]">
				<I.Layers size={13} className="text-white/55" />
				<div className="text-[12px] font-semibold tracking-tight">Structure</div>
				<span className="ml-1 text-[10px] font-mono text-white/35">13</span>
				<button onClick={onClose} className="ml-auto h-6 w-6 rounded-md flex items-center justify-center text-white/40 hover:text-white/85 hover:bg-white/[0.04]"><I.X size={12} /></button>
			</div>
			<div className="flex-1 overflow-y-auto p-1.5 space-y-px">
				{PAGE_TREE.map((n) => <StructureRow key={n.id} node={n} />)}
			</div>
			<div className="px-3 h-9 border-t border-white/[0.05] flex items-center gap-2 text-[10.5px] text-white/40">
				<I.Plus size={11} /> Add section
				<span className="ml-auto kbd">⌥1</span>
			</div>
		</div>
	);
}

function FloatingToolbar() {
	const Btn = ({ icon, danger, title, divider }) => {
		const Comp = I[icon];
		return (
			<>
				<button title={title}
					className={`h-7 w-7 rounded-md flex items-center justify-center transition-colors
            ${danger ? 'text-rose-300/80 hover:bg-rose-500/15 hover:text-rose-200' : 'text-white/65 hover:text-white hover:bg-white/[0.06]'}`}>
					<Comp size={14} />
				</button>
				{divider && <div className="w-px h-4 bg-white/[0.07]" />}
			</>
		);
	};
	return (
		<div className="floating-tb rounded-xl h-9 px-1 flex items-center gap-0.5 anim-pop">
			<div className="px-2 h-7 flex items-center gap-1.5 text-[11px] text-white/55 font-medium">
				<I.Heading size={12} className="text-accent" />
				<span className="text-white/85">Heading</span>
				<span className="font-mono text-white/35">H1</span>
			</div>
			<div className="w-px h-4 bg-white/[0.07]" />
			<Btn icon="Grip" title="Drag" />
			<Btn icon="Copy" title="Duplicate · ⌘D" />
			<Btn icon="Settings" title="Settings" divider />
			<Btn icon="Eye" title="Toggle visibility" />
			<Btn icon="Lock" title="Lock" />
			<Btn icon="Trash" title="Delete · ⌫" danger />
		</div>
	);
}

function SelectionFrame({ children, label, sub, selected, floating }) {
	return (
		<div className="relative">
			{children}
			{selected && (
				<>
					{/* outer ring */}
					<div className="absolute -inset-[3px] rounded-[6px] pointer-events-none"
						style={{ boxShadow: '0 0 0 1.5px #3858e9, 0 0 0 6px rgba(56,88,233,0.12)' }} />
					{/* label tag */}
					<div className="absolute -top-[26px] left-0 h-[22px] px-2 rounded-md bg-accent text-white text-[10.5px] font-semibold flex items-center gap-1.5 shadow-lg">
						{label}
						{sub && <span className="font-mono text-white/70">{sub}</span>}
					</div>
					{/* floating toolbar */}
					{floating && (
						<div className="absolute -top-12 right-0">
							<FloatingToolbar />
						</div>
					)}
					{/* resize handles */}
					{['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((c, i) => {
						const pos = {
							'top-left': 'top-[-5px] left-[-5px]',
							'top-right': 'top-[-5px] right-[-5px]',
							'bottom-left': 'bottom-[-5px] left-[-5px]',
							'bottom-right': 'bottom-[-5px] right-[-5px]',
						}[c];
						return <div key={i} className={`absolute w-2 h-2 rounded-sm bg-accent ring-2 ring-white pointer-events-none ${pos}`} />;
					})}
				</>
			)}
		</div>
	);
}

function Ruler() {
	const ticks = Array.from({ length: 60 });
	return (
		<div className="h-6 bg-bg/40 border-b border-white/[0.05] flex items-end overflow-hidden relative">
			{ticks.map((_, i) => (
				<div key={i} className="shrink-0 flex flex-col items-center" style={{ width: 24 }}>
					<div className={`w-px ${i % 5 === 0 ? 'h-2.5' : 'h-1.5'} bg-white/15`} />
					{i % 5 === 0 && <span className="text-[8.5px] font-mono text-white/30 -mt-3 mb-0.5">{i * 24}</span>}
				</div>
			))}
		</div>
	);
}

function CanvasPage({ device, onSelectHero }) {
	const widths = { desktop: 1280, tablet: 834, phone: 390 };
	const w = widths[device] || 1280;

	return (
		<div className="mx-auto my-6 transition-all duration-300" style={{ width: w }}>
			{/* Browser-style chrome */}
			<div className="bg-surface rounded-t-xl border border-white/[0.06] border-b-0 h-9 px-3 flex items-center gap-2">
				<div className="flex items-center gap-1.5">
					<div className="w-2.5 h-2.5 rounded-full bg-white/15" />
					<div className="w-2.5 h-2.5 rounded-full bg-white/15" />
					<div className="w-2.5 h-2.5 rounded-full bg-white/15" />
				</div>
				<div className="flex-1 h-5 max-w-[440px] mx-auto rounded-md bg-bg2 hairline flex items-center px-2.5 text-[10.5px] text-white/45 font-mono">
					atomic.studio / landing
				</div>
				<div className="text-[10.5px] text-white/35 font-mono">{w}×auto</div>
			</div>

			{/* Page body — light surface to feel like the actual page */}
			<div className="bg-white text-neutral-900 rounded-b-xl overflow-hidden border border-white/[0.06] border-t-0">

				{/* Mock page header */}
				<div className="h-14 px-8 flex items-center border-b border-neutral-200">
					<div className="flex items-center gap-2 text-[13px] font-semibold tracking-tight">
						<div className="w-6 h-6 rounded-md bg-neutral-900 text-white flex items-center justify-center">
							<I.Atom size={14} stroke={1.8} />
						</div>
						atomic
					</div>
					<div className="ml-8 flex items-center gap-6 text-[12.5px] text-neutral-500 font-medium">
						<span>Product</span><span>Solutions</span><span>Pricing</span><span>Docs</span>
					</div>
					<div className="ml-auto flex items-center gap-2">
						<button className="text-[12.5px] font-medium text-neutral-600">Sign in</button>
						<button className="h-8 px-3 rounded-lg bg-neutral-900 text-white text-[12px] font-medium">Get started</button>
					</div>
				</div>

				{/* HERO section */}
				<div className="px-8 pt-16 pb-20 relative" data-screen-label="canvas-hero">
					<div className="max-w-[760px] mx-auto text-center">
						<div className="inline-flex items-center gap-1.5 mb-5 h-6 px-2.5 rounded-full bg-neutral-100 border border-neutral-200 text-[11px] font-medium text-neutral-600">
							<span className="w-1.5 h-1.5 rounded-full bg-[#3858e9]" /> Atomic 0.9 · Block-first authoring
						</div>

						<SelectionFrame selected label="Heading" sub="H1" floating>
							<h1 className="font-semibold tracking-[-0.03em] text-[56px] leading-[1.02] text-neutral-900">
								A new atomic unit<br />for the modern web.
							</h1>
						</SelectionFrame>

						<p className="mt-6 text-[16px] leading-[1.55] text-neutral-500 max-w-[520px] mx-auto">
							Compose pages from primitives. Ship to WordPress with the speed and rigor your engineering team expects.
						</p>

						<div className="mt-8 flex items-center justify-center gap-2.5">
							<button className="h-10 px-4 rounded-xl bg-neutral-900 text-white text-[13px] font-medium flex items-center gap-2">
								Start a free project
								<I.ChevR size={13} />
							</button>
							<button className="h-10 px-4 rounded-xl bg-white text-neutral-900 border border-neutral-200 text-[13px] font-medium">
								Read the docs
							</button>
						</div>

						<div className="mt-12 grid grid-cols-3 gap-px bg-neutral-200 rounded-xl overflow-hidden border border-neutral-200 text-left">
							{[
								{ k: '12 kB', v: 'Runtime weight' },
								{ k: '< 40 ms', v: 'First paint, p75' },
								{ k: '100/100', v: 'Lighthouse, mobile' },
							].map((s, i) => (
								<div key={i} className="bg-white p-5">
									<div className="text-[24px] font-semibold tracking-tight text-neutral-900">{s.k}</div>
									<div className="text-[12px] text-neutral-500 mt-1">{s.v}</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Drop zone hint */}
				<div className="px-8 py-3">
					<div className="h-12 rounded-lg border-2 border-dashed border-[#3858e9]/30 bg-[#3858e9]/[0.04] flex items-center justify-center text-[12px] text-[#3858e9] font-medium">
						<I.Plus size={13} className="mr-1" /> Drop a block, or click to insert
					</div>
				</div>

				{/* Features section preview */}
				<div className="px-8 pt-12 pb-16 bg-neutral-50 border-t border-neutral-200">
					<div className="max-w-[1100px] mx-auto">
						<div className="text-[10.5px] font-semibold tracking-[0.16em] uppercase text-neutral-400 mb-3">Why atomic</div>
						<h2 className="text-[28px] font-semibold tracking-tight max-w-[600px] leading-[1.15]">
							Designed for teams who ship marketing pages on a Tuesday and refactor on Wednesday.
						</h2>
						<div className="grid grid-cols-3 gap-4 mt-10">
							{[
								{ t: 'Composable primitives', d: 'Every block is a serializable atom. Compose, lift, and reuse — no rewrites.' },
								{ t: 'Native to Gutenberg', d: 'Reads and writes block markup. Your editors keep what they know.' },
								{ t: 'Edited like code', d: 'Tokens, breakpoints, and overrides — auditable and diffable in Git.' },
							].map((c, i) => (
								<div key={i} className="bg-white rounded-xl border border-neutral-200 p-5">
									<div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center mb-3">
										<I.Atom size={15} stroke={1.8} />
									</div>
									<div className="text-[14px] font-semibold tracking-tight mb-1.5">{c.t}</div>
									<div className="text-[12.5px] leading-[1.55] text-neutral-500">{c.d}</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Page bottom add */}
			<div className="mt-3 flex items-center justify-center">
				<button className="h-8 px-3 rounded-lg bg-surface hairline text-[11.5px] text-white/60 hover:text-white flex items-center gap-1.5">
					<I.Plus size={12} /> Add section
				</button>
			</div>
		</div>
	);
}

function CanvasFooter({ device }) {
	return (
		<div className="h-7 shrink-0 border-t border-white/[0.05] bg-bg flex items-center px-3 text-[10.5px] text-white/40 font-medium gap-3">
			<span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-accent" /> 1 selected · Heading</span>
			<span>•</span>
			<span className="font-mono">x 320  y 184  · 760 × 124</span>
			<span className="ml-auto flex items-center gap-3">
				<span>Zoom 100%</span>
				<span>Grid 8px</span>
				<span>{device} · {{ desktop: '1280', tablet: '834', phone: '390' }[device]}px</span>
			</span>
		</div>
	);
}

function Canvas({ device, structureOpen, setStructureOpen }) {
	return (
		<main className="flex-1 min-w-0 flex flex-col bg-bg relative">
			<Ruler />
			<div className="flex-1 overflow-auto canvas-bg grid-floor relative">
				<StructurePanel open={structureOpen} onClose={() => setStructureOpen(false)} />
				<CanvasPage device={device} />
			</div>
			<CanvasFooter device={device} />
		</main>
	);
}

export { Canvas };
