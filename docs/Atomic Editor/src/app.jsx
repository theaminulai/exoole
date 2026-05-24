import React from 'react';
import { BlocksPanel } from './blocks-panel.jsx';
import { Canvas } from './canvas.jsx';
import { CommandPalette } from './command-palette.jsx';
import { Inspector } from './inspector.jsx';
import { TopNav } from './topnav.jsx';

export default function App() {
	const [device, setDevice] = React.useState('desktop');
	const [query, setQuery] = React.useState('');
	const [paletteOpen, setPaletteOpen] = React.useState(false);
	const [structureOpen, setStructureOpen] = React.useState(true);

	React.useEffect(() => {
		const onKey = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault();
				setPaletteOpen((o) => !o);
			} else if (e.key === 'Escape') {
				setPaletteOpen(false);
			}
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, []);

	return (
		<div className="h-full w-full flex flex-col bg-bg">
			<TopNav device={device} setDevice={setDevice} openPalette={() => setPaletteOpen(true)} />
			<div className="flex-1 min-h-0 flex">
				<BlocksPanel query={query} setQuery={setQuery} />
				<Canvas device={device} structureOpen={structureOpen} setStructureOpen={setStructureOpen} />
				<Inspector />
			</div>
			<CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
		</div>
	);
}
