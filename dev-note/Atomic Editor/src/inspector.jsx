import React from 'react';
import { I } from './icons.jsx';

// ───────── Inspector primitives ─────────
function Section({ icon, title, badge, open, onToggle, children }) {
	const IconC = I[icon];
	return (
		<div className="border-b border-white/[0.05]">
			<button onClick={onToggle}
				className="w-full h-10 px-4 flex items-center gap-2 hover:bg-white/[0.02] transition-colors">
				<IconC size={13} className="text-white/55" />
				<span className="text-[12px] font-semibold text-white/90 tracking-tight">{title}</span>
				{badge && <span className="ml-1 text-[9.5px] font-medium px-1.5 py-0.5 rounded-md bg-accent/15 text-accent">{badge}</span>}
				<I.Chev size={13} className={`ml-auto text-white/35 transition-transform ${open ? '' : '-rotate-90'}`} />
			</button>
			{open && <div className="px-4 pb-4 pt-1 space-y-3.5">{children}</div>}
		</div>
	);
}

function Label({ children, hint }) {
	return (
		<div className="flex items-center justify-between">
			<div className="text-[11px] font-medium text-white/55 tracking-wide">{children}</div>
			{hint && <div className="text-[10px] font-mono text-white/30">{hint}</div>}
		</div>
	);
}

function Seg({ options, value, onChange }) {
	return (
		<div className="flex items-center bg-bg rounded-lg p-0.5 hairline">
			{options.map((o) => (
				<button key={o.value} onClick={() => onChange(o.value)}
					title={o.title}
					className={`flex-1 h-7 rounded-md text-[11.5px] font-medium flex items-center justify-center gap-1 transition-colors
            ${value === o.value ? 'seg-active' : 'text-white/45 hover:text-white/80'}`}>
					{o.icon}
					{o.label}
				</button>
			))}
		</div>
	);
}

function UnitInput({ value, unit = 'px', w = 'w-[72px]' }) {
	return (
		<div className={`${w} h-7 rounded-md bg-bg hairline flex items-center text-[11.5px]`}>
			<input defaultValue={value} className="w-full h-full bg-transparent px-2 outline-none text-white/90" />
			<span className="px-1.5 text-white/35 text-[10.5px] border-l border-white/[0.05] h-full flex items-center font-mono">{unit}</span>
		</div>
	);
}

function Slider({ value, min = 0, max = 100, suffix = '' }) {
	const [v, setV] = React.useState(value);
	return (
		<div className="flex items-center gap-2.5">
			<input type="range" className="atomic flex-1" min={min} max={max} value={v} onChange={(e) => setV(+e.target.value)} />
			<div className="w-[58px] h-7 rounded-md bg-bg hairline flex items-center px-2 text-[11.5px] tabular-nums">
				<input value={v} onChange={(e) => setV(+e.target.value)} className="w-full bg-transparent outline-none text-white/90" />
				<span className="text-white/35 text-[10.5px] font-mono">{suffix}</span>
			</div>
		</div>
	);
}

function Toggle({ on, onChange, label, sub }) {
	return (
		<div className="flex items-center justify-between">
			<div>
				<div className="text-[12px] font-medium text-white/85">{label}</div>
				{sub && <div className="text-[10.5px] text-white/40">{sub}</div>}
			</div>
			<button onClick={() => onChange(!on)}
				className={`w-9 h-5 rounded-full p-0.5 transition-colors ${on ? 'toggle-on' : 'bg-white/10'}`}>
				<div className={`knob w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${on ? 'translate-x-[14px]' : ''}`} />
			</button>
		</div>
	);
}

function Swatch({ color, active }) {
	return (
		<button
			className={`w-6 h-6 rounded-md transition-all ${active ? 'ring-accent' : 'hairline hover:scale-105'}`}
			style={{ background: color }} />
	);
}

// ───────── Inspector ─────────
export function Inspector() {
	const [tab, setTab] = React.useState('style');
	const [open, setOpen] = React.useState({
		layout: true, spacing: true, typography: true, background: false, border: false, effects: false, responsive: false
	});
	const toggle = (k) => setOpen((s) => ({ ...s, [k]: !s[k] }));
	const [breakpoint, setBreakpoint] = React.useState('desktop');

	return (
		<aside className="w-[320px] shrink-0 bg-bg2 border-l border-white/[0.05] flex flex-col">
			{/* Selected block header */}
			<div className="p-3 border-b border-white/[0.05]">
				<div className="flex items-center gap-2">
					<div className="w-8 h-8 rounded-lg bg-accent/12 border border-accent/25 flex items-center justify-center text-accent">
						<I.Heading size={15} stroke={1.8} />
					</div>
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-1.5">
							<span className="text-[12.5px] font-semibold tracking-tight text-white">Heading</span>
							<span className="text-[10px] font-mono text-white/35">H1</span>
						</div>
						<div className="text-[10.5px] text-white/40 truncate">Section → Container → Heading</div>
					</div>
					<button className="h-7 w-7 rounded-md flex items-center justify-center text-white/40 hover:text-white/85 hover:bg-white/[0.04]"><I.More size={14} /></button>
				</div>

				{/* Inspector tabs */}
				<div className="mt-3 flex items-center bg-bg rounded-lg p-0.5 hairline">
					{[
						{ id: 'content', label: 'Content' },
						{ id: 'style', label: 'Style' },
						{ id: 'advanced', label: 'Advanced' },
					].map((t) => (
						<button key={t.id} onClick={() => setTab(t.id)}
							className={`flex-1 h-7 rounded-md text-[11.5px] font-medium transition-colors ${tab === t.id ? 'seg-active' : 'text-white/45 hover:text-white/80'}`}>
							{t.label}
						</button>
					))}
				</div>

				{/* Responsive breakpoint */}
				<div className="mt-2.5 flex items-center gap-1 text-[10.5px] text-white/40 font-medium">
					<span className="uppercase tracking-wider">Editing</span>
					<div className="flex items-center bg-bg rounded-md p-0.5 hairline ml-auto">
						{[
							{ id: 'desktop', icon: <I.Monitor size={11} /> },
							{ id: 'tablet', icon: <I.Tablet size={11} /> },
							{ id: 'phone', icon: <I.Phone size={11} /> },
						].map((bp) => (
							<button key={bp.id} onClick={() => setBreakpoint(bp.id)}
								className={`h-5 w-6 rounded flex items-center justify-center transition-colors ${breakpoint === bp.id ? 'seg-active' : 'text-white/40 hover:text-white/75'}`}>
								{bp.icon}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Sections */}
			<div className="flex-1 overflow-y-auto">
				<Section icon="Box" title="Layout" open={open.layout} onToggle={() => toggle('layout')}>
					<div>
						<Label>Display</Label>
						<div className="mt-1.5">
							<Seg value="block" onChange={() => { }}
								options={[
									{ value: 'block', label: 'Block' },
									{ value: 'flex', label: 'Flex' },
									{ value: 'grid', label: 'Grid' },
									{ value: 'none', label: 'Hide' },
								]} />
						</div>
					</div>
					<div>
						<Label>Width</Label>
						<div className="mt-1.5 flex items-center gap-1.5">
							<Seg value="auto" onChange={() => { }}
								options={[
									{ value: 'auto', label: 'Auto' },
									{ value: 'fill', label: 'Fill' },
									{ value: 'fix', label: 'Fixed' },
								]} />
							<UnitInput value="640" />
						</div>
					</div>
					<div>
						<Label>Align</Label>
						<div className="mt-1.5 flex items-center bg-bg rounded-lg p-0.5 hairline">
							{['left', 'center', 'right', 'justify'].map((a, i) => (
								<button key={a} className={`flex-1 h-7 rounded-md flex items-center justify-center transition-colors ${i === 0 ? 'seg-active' : 'text-white/40 hover:text-white/75'}`}>
									<I.Align size={12} />
								</button>
							))}
						</div>
					</div>
				</Section>

				<Section icon="Box" title="Spacing" open={open.spacing} onToggle={() => toggle('spacing')}>
					<div>
						<Label hint="px">Padding</Label>
						<div className="mt-1.5 flex items-center gap-1.5">
							<UnitInput value="32" w="flex-1" />
							<UnitInput value="32" w="flex-1" />
							<UnitInput value="32" w="flex-1" />
							<UnitInput value="32" w="flex-1" />
						</div>
						<div className="mt-1 flex items-center gap-1.5 text-[9.5px] uppercase tracking-wider text-white/30 font-medium">
							<span className="flex-1 text-center">T</span>
							<span className="flex-1 text-center">R</span>
							<span className="flex-1 text-center">B</span>
							<span className="flex-1 text-center">L</span>
						</div>
					</div>
					<div>
						<Label hint="px">Margin</Label>
						<div className="mt-1.5 flex items-center gap-1.5">
							<UnitInput value="0" w="flex-1" />
							<UnitInput value="0" w="flex-1" />
							<UnitInput value="24" w="flex-1" />
							<UnitInput value="0" w="flex-1" />
						</div>
					</div>
					<div>
						<Label hint="px">Gap</Label>
						<Slider value={16} max={64} suffix="px" />
					</div>
				</Section>

				<Section icon="Type" title="Typography" badge="Inter" open={open.typography} onToggle={() => toggle('typography')}>
					<div>
						<Label>Family</Label>
						<button className="mt-1.5 w-full h-8 px-2.5 rounded-md bg-bg hairline flex items-center justify-between text-[12px] hover:bg-white/[0.02]">
							<span>Inter</span>
							<I.Chev size={12} className="text-white/40" />
						</button>
					</div>
					<div className="flex items-center gap-1.5">
						<div className="flex-1">
							<Label hint="px">Size</Label>
							<UnitInput value="56" w="w-full" />
						</div>
						<div className="flex-1">
							<Label>Weight</Label>
							<button className="mt-1.5 w-full h-7 px-2 rounded-md bg-bg hairline flex items-center justify-between text-[11.5px]">
								<span>Semibold · 600</span>
								<I.Chev size={11} className="text-white/40" />
							</button>
						</div>
					</div>
					<div className="flex items-center gap-1.5">
						<div className="flex-1">
							<Label hint="em">Line</Label>
							<UnitInput value="1.05" unit="em" w="w-full" />
						</div>
						<div className="flex-1">
							<Label hint="em">Tracking</Label>
							<UnitInput value="-0.02" unit="em" w="w-full" />
						</div>
					</div>
					<div>
						<Label>Color</Label>
						<div className="mt-1.5 flex items-center gap-2 h-8 px-2 rounded-md bg-bg hairline">
							<div className="w-4 h-4 rounded-sm bg-white" />
							<span className="text-[11.5px] font-mono text-white/85 flex-1">#FFFFFF</span>
							<span className="text-[10.5px] font-mono text-white/35">100%</span>
						</div>
					</div>
					<div>
						<Label>Transform</Label>
						<div className="mt-1.5">
							<Seg value="none" onChange={() => { }} options={[
								{ value: 'none', label: 'aA' },
								{ value: 'upper', label: 'AA' },
								{ value: 'lower', label: 'aa' },
								{ value: 'cap', label: 'Aa' },
							]} />
						</div>
					</div>
				</Section>

				<Section icon="Palette" title="Background" open={open.background} onToggle={() => toggle('background')}>
					<div>
						<Label>Fill</Label>
						<div className="mt-1.5 grid grid-cols-7 gap-1.5">
							<Swatch color="transparent" />
							<Swatch color="#0d0d10" />
							<Swatch color="#1a1a24" />
							<Swatch color="#3858e9" active />
							<Swatch color="#ffffff" />
							<Swatch color="#e2e2ea" />
							<button className="w-6 h-6 rounded-md hairline flex items-center justify-center text-white/50 hover:text-white/85">
								<I.Plus size={11} />
							</button>
						</div>
					</div>
				</Section>

				<Section icon="Box" title="Border" open={open.border} onToggle={() => toggle('border')}>
					<div className="text-[11px] text-white/40">No border applied.</div>
				</Section>

				<Section icon="Sparkle" title="Effects" open={open.effects} onToggle={() => toggle('effects')}>
					<div className="text-[11px] text-white/40">Shadow, blur, transforms…</div>
				</Section>

				<Section icon="Devices" title="Responsive" open={open.responsive} onToggle={() => toggle('responsive')}>
					<div className="text-[11px] text-white/40">Override styles per breakpoint.</div>
				</Section>
			</div>

			{/* Footer */}
			<div className="px-4 h-10 border-t border-white/[0.05] flex items-center justify-between text-[10.5px] text-white/40 font-medium">
				<span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-accent" /> 24 edits unsaved</span>
				<button className="hover:text-white/85">Reset overrides</button>
			</div>
		</aside>
	);
}
