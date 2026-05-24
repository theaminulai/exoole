import { I } from './icons.jsx';

export function TopNav({ device, setDevice, openPalette }) {
	const Devices = [
		{ id: 'desktop', icon: 'Monitor', label: 'Desktop · 1440' },
		{ id: 'tablet', icon: 'Tablet', label: 'Tablet · 834' },
		{ id: 'phone', icon: 'Phone', label: 'Mobile · 390' },
	];

	return (
		<header className="h-14 shrink-0 flex items-center px-3 bg-bg border-b border-white/[0.05] relative z-30">
			{/* Left cluster */}
			<div className="flex items-center gap-2 w-[280px]">
				<div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-[#1d3acc] flex items-center justify-center text-white">
					<I.Atom size={18} stroke={1.8} />
				</div>
				<div className="leading-tight">
					<div className="text-[13px] font-semibold tracking-tight">Atomic Editor</div>
					<div className="text-[10.5px] text-white/40 font-medium tracking-wide uppercase">v 0.9 · build 2418</div>
				</div>
				<div className="mx-3 h-6 w-px bg-white/[0.06]" />
				<div className="flex items-center gap-1.5 text-[12.5px] text-white/55 font-medium min-w-0">
					<span className="hover:text-white/90 cursor-pointer">Acme Studio</span>
					<I.ChevR size={12} className="text-white/30" />
					<span className="hover:text-white/90 cursor-pointer">Pages</span>
					<I.ChevR size={12} className="text-white/30" />
					<span className="text-white truncate">Landing — Atomic</span>
					<span className="ml-1.5 px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-amber-400/10 text-amber-300 border border-amber-400/15">Draft</span>
				</div>
			</div>

			{/* Center: device preview */}
			<div className="flex-1 flex items-center justify-center">
				<div className="flex items-center bg-bg2 rounded-xl p-1 hairline">
					{Devices.map(d => {
						const Comp = I[d.icon];
						const active = device === d.id;
						return (
							<button key={d.id} onClick={() => setDevice(d.id)}
								title={d.label}
								className={`px-3 h-8 rounded-lg flex items-center gap-1.5 text-[12px] font-medium transition-colors ${active ? 'seg-active' : 'text-white/55 hover:text-white/85'}`}>
								<Comp size={14} />
								{active && <span className="text-[11.5px]">{d.label.split(' · ')[1]}</span>}
							</button>
						);
					})}
				</div>
				<div className="mx-2 h-6 w-px bg-white/[0.06]" />
				<div className="flex items-center bg-bg2 rounded-xl p-1 hairline gap-0.5">
					<button className="h-8 w-8 rounded-lg flex items-center justify-center text-white/55 hover:text-white/90 hover:bg-white/[0.04]" title="Undo  ⌘Z"><I.Undo size={14} /></button>
					<button className="h-8 w-8 rounded-lg flex items-center justify-center text-white/30" title="Redo  ⌘⇧Z" disabled><I.Redo size={14} /></button>
				</div>
				<div className="mx-2 h-6 w-px bg-white/[0.06]" />
				<button onClick={openPalette}
					className="h-8 px-3 rounded-xl bg-bg2 hairline flex items-center gap-2 text-[12px] text-white/55 hover:text-white/90 transition-colors min-w-[180px]">
					<I.Search size={13} />
					<span className="flex-1 text-left">Search or run command…</span>
					<span className="kbd">⌘K</span>
				</button>
			</div>

			{/* Right cluster */}
			<div className="flex items-center gap-2 justify-end w-[320px]">
				<div className="flex items-center gap-1.5 text-[11.5px] text-white/45 font-medium">
					<span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
					Synced · just now
				</div>
				<div className="mx-1 h-6 w-px bg-white/[0.06]" />
				<button className="h-8 w-8 rounded-lg flex items-center justify-center text-white/55 hover:text-white/90 hover:bg-white/[0.04]" title="Preview"><I.Eye size={15} /></button>
				<button className="h-8 px-3 rounded-lg flex items-center gap-1.5 text-[12px] font-medium text-white/70 hover:text-white hover:bg-white/[0.04]">
					Publish
				</button>
				<button className="h-8 px-3.5 rounded-xl bg-accent text-white text-[12px] font-semibold flex items-center gap-2 hover:brightness-110 glow-accent transition-all">
					<I.Save size={13} />
					Save
					<span className="kbd !bg-white/15 !border-white/0 !text-white/80">⌘S</span>
				</button>
				<div className="mx-1 h-6 w-px bg-white/[0.06]" />
				<div className="flex items-center gap-1.5">
					<div className="w-7 h-7 rounded-full ring-2 ring-bg bg-gradient-to-br from-rose-400 to-amber-300 text-[10.5px] font-semibold flex items-center justify-center text-black">JM</div>
					<div className="w-7 h-7 rounded-full ring-2 ring-bg bg-gradient-to-br from-emerald-400 to-cyan-400 text-[10.5px] font-semibold flex items-center justify-center text-black -ml-3">AK</div>
				</div>
			</div>
		</header>
	);
}
