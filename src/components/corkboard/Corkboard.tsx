import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlus,
	faMinus,
	faCropSimple,
	faList,
	faSun,
	faMoon,
	faHand,
	faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
	experience,
	projects,
	skills,
	profile,
	socials,
} from '../../data/content';
import { useTheme } from '../../theme/ThemeContext';
import { useHighlight } from '../../context/HighlightContext';
import { buildItems, BOARD_W, BOARD_H, BoardItem } from './layout';
import dhruv from '../../assets/dhruv.png';
import casualDhruv from '../../assets/casual_dhruv.jpg';

type Pos = { x: number; y: number; rot: number };
type Gesture =
	| { kind: 'pan'; px: number; py: number; ox: number; oy: number }
	| {
			kind: 'item';
			id: string;
			px: number;
			py: number;
			ox: number;
			oy: number;
			moved: number;
			vx: number;
			vy: number;
			lt: number;
			/** members dragged together with this one (sheet + label) */
			group?: { id: string; ox: number; oy: number }[];
			/** clamp box (board coords) for items confined to a region */
			bounds?: { minX: number; minY: number; maxX: number; maxY: number };
	  }
	| null;

// the skills sheet + its stickers move as one unit (the "skills" label stays put)
const inSheetGroup = (id: string) =>
	id === 'skillboard' || id.startsWith('skill-');

const ZOOM_MIN = 0.45;
const ZOOM_MAX = 1.5;
const expById = Object.fromEntries(experience.map((e) => [e.id, e]));
const projById = Object.fromEntries(projects.map((p) => [p.id, p]));
const skillById = Object.fromEntries(skills.map((s) => [s.id, s]));

interface Props {
	onTidy: () => void;
}

const Corkboard = ({ onTidy }: Props) => {
	const { theme, toggle } = useTheme();
	const { activeSkill, setActiveSkill } = useHighlight();
	const items = useMemo(() => buildItems(), []);

	const [pos, setPos] = useState<Record<string, Pos>>(() => {
		const m: Record<string, Pos> = {};
		items.forEach((it) => (m[it.id] = { x: it.x, y: it.y, rot: it.rot }));
		return m;
	});
	const [pan, setPan] = useState({ x: 54, y: 52 });
	const [zoom, setZoom] = useState(0.92);
	const [order, setOrder] = useState<string[]>(items.map((i) => i.id));
	const [focus, setFocus] = useState<string | null>(null);
	const [casual, setCasual] = useState(false);

	const viewportRef = useRef<HTMLDivElement>(null);
	const gesture = useRef<Gesture>(null);
	const inertia = useRef<number>(0);
	const zoomRef = useRef(zoom);
	const panRef = useRef(pan);
	const fitZoomRef = useRef(0); // smallest allowed zoom = whole board fits
	useEffect(() => {
		zoomRef.current = zoom;
	}, [zoom]);
	useEffect(() => {
		panRef.current = pan;
	}, [pan]);

	// keep the board covering the viewport — you can pan within it, never past its edges
	const clampPan = useCallback((px: number, py: number, z: number) => {
		const r = viewportRef.current?.getBoundingClientRect();
		if (!r) return { x: px, y: py };
		const sw = BOARD_W * z;
		const sh = BOARD_H * z;
		const x =
			sw <= r.width
				? (r.width - sw) / 2
				: Math.min(0, Math.max(r.width - sw, px));
		const y =
			sh <= r.height
				? (r.height - sh) / 2
				: Math.min(0, Math.max(r.height - sh, py));
		return { x, y };
	}, []);

	// preload the alt portrait so the flip never lags (fixes the bug you caught)
	useEffect(() => {
		const img = new Image();
		img.src = casualDhruv;
	}, []);

	const bringToFront = useCallback((id: string) => {
		setOrder((o) => [...o.filter((x) => x !== id), id]);
	}, []);

	// ---- zoom helpers (zoom toward a screen point) ----
	const zoomAt = useCallback((factor: number, sx: number, sy: number) => {
		const z = zoomRef.current;
		const lo = fitZoomRef.current || ZOOM_MIN;
		const nz = Math.min(ZOOM_MAX, Math.max(lo, z * factor));
		const change = nz / z;
		const p = panRef.current;
		setZoom(nz);
		setPan(
			clampPan(sx - change * (sx - p.x), sy - change * (sy - p.y), nz)
		);
	}, [clampPan]);

	const zoomButton = (factor: number) => {
		const r = viewportRef.current?.getBoundingClientRect();
		zoomAt(factor, r ? r.width / 2 : 0, r ? r.height / 2 : 0);
	};

	const fit = useCallback(() => {
		const r = viewportRef.current?.getBoundingClientRect();
		if (!r) return;
		const PAD = 44; // keep the board inside the wooden frame
		const z = Math.min(
			(r.width - PAD * 2) / BOARD_W,
			(r.height - PAD * 2) / BOARD_H
		);
		fitZoomRef.current = z;
		setZoom(z);
		setPan({ x: (r.width - BOARD_W * z) / 2, y: (r.height - BOARD_H * z) / 2 });
	}, []);

	// default to "fit to board" on load
	useLayoutEffect(() => {
		fit();
	}, [fit]);

	// ---- wheel zoom (non-passive) ----
	useEffect(() => {
		const el = viewportRef.current;
		if (!el) return;
		const onWheel = (e: WheelEvent) => {
			e.preventDefault();
			const r = el.getBoundingClientRect();
			zoomAt(
				e.deltaY < 0 ? 1.08 : 0.926,
				e.clientX - r.left,
				e.clientY - r.top
			);
		};
		el.addEventListener('wheel', onWheel, { passive: false });
		return () => el.removeEventListener('wheel', onWheel);
	}, [zoomAt]);

	// ---- pointer gesture handling ----
	useEffect(() => {
		const onMove = (e: PointerEvent) => {
			const g = gesture.current;
			if (!g) return;
			if (g.kind === 'pan') {
				setPan(
					clampPan(
						g.ox + (e.clientX - g.px),
						g.oy + (e.clientY - g.py),
						zoomRef.current
					)
				);
			} else {
				const z = zoomRef.current;
				const dx = (e.clientX - g.px) / z;
				const dy = (e.clientY - g.py) / z;
				const now = e.timeStamp;
				const dt = Math.max(1, now - g.lt);
				// velocity in board units per frame (~16ms)
				g.vx = (((e.movementX || 0) / z) / dt) * 16;
				g.vy = (((e.movementY || 0) / z) / dt) * 16;
				g.lt = now;
				g.moved += Math.abs(e.movementX) + Math.abs(e.movementY);
				if (g.group) {
					const members = g.group;
					setPos((p) => {
						const np = { ...p };
						for (const m of members)
							np[m.id] = { ...p[m.id], x: m.ox + dx, y: m.oy + dy };
						return np;
					});
				} else {
					let nx = g.ox + dx;
					let ny = g.oy + dy;
					if (g.bounds) {
						nx = Math.min(g.bounds.maxX, Math.max(g.bounds.minX, nx));
						ny = Math.min(g.bounds.maxY, Math.max(g.bounds.minY, ny));
					}
					setPos((p) => ({
						...p,
						[g.id]: { ...p[g.id], x: nx, y: ny },
					}));
				}
			}
		};
		const onUp = () => {
			const g = gesture.current;
			gesture.current = null;
			document.body.style.cursor = '';
			if (g && g.kind === 'item') {
				if (g.moved < 6) {
					handleItemClick(g.id);
				} else if (
					!g.bounds &&
					Math.abs(g.vx) + Math.abs(g.vy) > 0.4
				) {
					// toss with inertia
					let vx = Math.max(-40, Math.min(40, g.vx));
					let vy = Math.max(-40, Math.min(40, g.vy));
					const ids = g.group ? g.group.map((m) => m.id) : [g.id];
					cancelAnimationFrame(inertia.current);
					const step = () => {
						vx *= 0.9;
						vy *= 0.9;
						setPos((p) => {
							const np = { ...p };
							for (const id of ids)
								np[id] = { ...p[id], x: p[id].x + vx, y: p[id].y + vy };
							return np;
						});
						if (Math.abs(vx) + Math.abs(vy) > 0.15)
							inertia.current = requestAnimationFrame(step);
					};
					inertia.current = requestAnimationFrame(step);
				}
			}
		};
		window.addEventListener('pointermove', onMove);
		window.addEventListener('pointerup', onUp);
		return () => {
			window.removeEventListener('pointermove', onMove);
			window.removeEventListener('pointerup', onUp);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const startPan = (e: React.PointerEvent) => {
		if (e.button !== 0) return;
		cancelAnimationFrame(inertia.current);
		gesture.current = {
			kind: 'pan',
			px: e.clientX,
			py: e.clientY,
			ox: pan.x,
			oy: pan.y,
		};
		document.body.style.cursor = 'grabbing';
	};

	const startItem = (e: React.PointerEvent, id: string) => {
		e.stopPropagation();
		cancelAnimationFrame(inertia.current);
		bringToFront(id);
		// dragging the skills sheet moves the sheet + its label together
		const group =
			id === 'skillboard'
				? items
						.filter((it) => inSheetGroup(it.id))
						.map((it) => ({
							id: it.id,
							ox: pos[it.id].x,
							oy: pos[it.id].y,
						}))
				: undefined;
		// skill stickers are confined to the graph-paper sheet
		let clampBounds:
			| { minX: number; minY: number; maxX: number; maxY: number }
			| undefined;
		if (id.startsWith('skill-')) {
			const sb = pos['skillboard'];
			const sbItem = items.find((it) => it.id === 'skillboard');
			const sw = sbItem && 'w' in sbItem ? sbItem.w : 480;
			const sh = sbItem && 'h' in sbItem ? sbItem.h : 380;
			const pad = 14;
			const stW = 112;
			const stH = 44;
			clampBounds = {
				minX: sb.x + pad,
				minY: sb.y + pad + 8,
				maxX: sb.x + sw - stW - pad,
				maxY: sb.y + sh - stH - pad,
			};
		}
		gesture.current = {
			kind: 'item',
			id,
			px: e.clientX,
			py: e.clientY,
			ox: pos[id].x,
			oy: pos[id].y,
			moved: 0,
			vx: 0,
			vy: 0,
			lt: e.timeStamp,
			group,
			bounds: clampBounds,
		};
	};

	const handleItemClick = (id: string) => {
		if (id === 'me') return setCasual((c) => !c);
		if (id === 'contact')
			return navigator.clipboard?.writeText(profile.email);
		if (id.startsWith('proj-')) {
			const p = projById[id.replace('proj-', '')];
			if (p) window.open(p.link || p.github, '_blank');
			return;
		}
		if (id.startsWith('exp-')) setFocus(id.replace('exp-', ''));
	};

	const focusExp = focus ? expById[focus] : null;

	// twine threading the experience cards in time order (subtle timeline)
	const EXP_W = 270;
	const stringD = (() => {
		const pts = experience
			.map((e) => {
				const pp = pos[`exp-${e.id}`];
				if (!pp) return null;
				return {
					x: pp.x + pinFrac(`exp-${e.id}`) * EXP_W,
					y: pp.y - 2,
				};
			})
			.filter(Boolean) as { x: number; y: number }[];
		if (pts.length < 2) return '';
		let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
		for (let i = 1; i < pts.length; i++) {
			const a = pts[i - 1];
			const b = pts[i];
			const mx = (a.x + b.x) / 2;
			const my = Math.max(a.y, b.y) + Math.abs(b.x - a.x) * 0.11 + 34;
			d += ` Q ${mx.toFixed(1)} ${my.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
		}
		return d;
	})();

	return (
		<div className='fixed inset-0 overflow-hidden bg-bgTint'>
			{/* board viewport (the wall) */}
			<div
				ref={viewportRef}
				onPointerDown={startPan}
				className='absolute inset-0 touch-none select-none'
				style={{ cursor: 'grab' }}
			>
				{/* the physical board: cork + frame + everything, panned & zoomed as one */}
				<div
					className='cork-board absolute left-0 top-0 origin-top-left rounded-[6px]'
					style={{
						width: BOARD_W,
						height: BOARD_H,
						transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
					}}
				>
					{/* twine through the experience cards */}
					<svg
						className='pointer-events-none absolute left-0 top-0'
						width={BOARD_W}
						height={BOARD_H}
						style={{ overflow: 'visible', zIndex: 0 }}
					>
						{/* cast shadow of the cord on the cork */}
						<g transform='translate(1.5,3)'>
							<path
								d={stringD}
								fill='none'
								stroke='rgba(0,0,0,0.28)'
								strokeWidth={5}
								strokeLinecap='round'
							/>
						</g>
						{/* jute cord: dark base + lighter twist highlight */}
						<path
							d={stringD}
							fill='none'
							stroke='#7a5e34'
							strokeWidth={4}
							strokeLinecap='round'
						/>
						<path
							d={stringD}
							fill='none'
							stroke='#c9a566'
							strokeWidth={1.6}
							strokeLinecap='round'
							strokeDasharray='1 5'
							opacity={0.8}
						/>
					</svg>
					{items.map((it) => {
						const p = pos[it.id];
						const z =
							it.type === 'label'
								? 900
								: it.type === 'skillboard'
								? 0
								: order.indexOf(it.id) + 1;
						return (
							<BoardNode
								key={it.id}
								item={it}
								pos={p}
								z={z}
								theme={theme}
								casual={casual}
								activeSkill={activeSkill}
								onPointerDown={(e) => startItem(e, it.id)}
								onSkillHover={setActiveSkill}
							/>
						);
					})}

					{/* light-wood frame — four mitred rails, grain running the long way on each */}
					<div
						className='pointer-events-none absolute inset-0'
						style={{ zIndex: 800 }}
					>
						<div
							className='frame-grain-h absolute left-0 right-0 top-0'
							style={{
								height: 44,
								clipPath:
									'polygon(0 0, 100% 0, calc(100% - 44px) 100%, 44px 100%)',
							}}
						/>
						<div
							className='frame-grain-h absolute left-0 right-0 bottom-0'
							style={{
								height: 44,
								clipPath:
									'polygon(44px 0, calc(100% - 44px) 0, 100% 100%, 0 100%)',
							}}
						/>
						<div
							className='frame-grain-v absolute left-0 top-0 bottom-0'
							style={{
								width: 44,
								clipPath:
									'polygon(0 0, 100% 44px, 100% calc(100% - 44px), 0 100%)',
							}}
						/>
						<div
							className='frame-grain-v absolute right-0 top-0 bottom-0'
							style={{
								width: 44,
								clipPath:
									'polygon(0 44px, 100% 0, 100% 100%, 0 calc(100% - 44px))',
							}}
						/>
						{/* inner lip + soft shadow onto the cork */}
						<div
							className='absolute'
							style={{
								inset: 44,
								boxShadow:
									'0 0 0 1px rgba(120,85,40,0.2), inset 0 0 34px rgba(70,45,15,0.26)',
							}}
						/>
					</div>
				</div>
			</div>

			{/* top chrome — little paper tabs pinned to the board */}
			<div className='pointer-events-none absolute inset-x-0 top-0 z-[35] flex items-start justify-between px-9 pt-9'>
				<div className='pointer-events-auto flex -rotate-1 items-center gap-2 rounded-[4px] border border-black/5 bg-[#f4eedf] px-4 py-2 text-[#463b29] shadow-[0_5px_12px_rgba(0,0,0,0.35)]'>
					<span className='font-display text-sm font-bold'>
						{profile.first}
						<span className='text-roseDeep'>.</span>
					</span>
					<span className='hidden font-mono text-[11px] text-[#8a7656] sm:inline'>
						{'// the board'}
					</span>
				</div>
				<div className='pointer-events-auto flex items-start gap-2'>
					<button
						onClick={onTidy}
						data-cursor='hover'
						className='flex rotate-1 items-center gap-2 rounded-[4px] border border-black/5 bg-[#f4eedf] px-3.5 py-2 text-sm text-[#463b29] shadow-[0_5px_12px_rgba(0,0,0,0.35)] transition-colors hover:text-roseDeep'
					>
						<FontAwesomeIcon icon={faList} className='text-xs' />
						<span className='hidden sm:inline'>tidy view</span>
					</button>
					<button
						onClick={toggle}
						data-cursor='hover'
						aria-label='Toggle theme'
						className='grid h-9 w-9 -rotate-2 place-items-center rounded-[4px] border border-black/5 bg-[#f4eedf] text-[#463b29] shadow-[0_5px_12px_rgba(0,0,0,0.35)] transition-colors hover:text-roseDeep'
					>
						<FontAwesomeIcon icon={theme === 'dark' ? faMoon : faSun} />
					</button>
				</div>
			</div>

			{/* last-updated tab */}
			<div className='pointer-events-none absolute bottom-9 left-9 z-[35]'>
				<div className='-rotate-1 rounded-[4px] border border-black/5 bg-[#f4eedf] px-3 py-1.5 font-mono text-[11px] text-[#8a7656] shadow-[0_4px_10px_rgba(0,0,0,0.3)]'>
					updated {profile.lastUpdated}
				</div>
			</div>

			{/* hint — a small paper note */}
			<div className='pointer-events-none absolute bottom-9 left-1/2 z-[35] -translate-x-1/2'>
				<div className='flex -rotate-1 items-center gap-2 rounded-[4px] border border-black/5 bg-[#f4eedf] px-4 py-2 font-mono text-[11px] text-[#5b4a30] shadow-[0_5px_12px_rgba(0,0,0,0.3)]'>
					<FontAwesomeIcon icon={faHand} className='text-roseDeep' />
					drag to pan · grab a card · scroll to zoom · press ⌘K
				</div>
			</div>

			{/* zoom controls */}
			<div className='pointer-events-none absolute bottom-9 right-9 z-[35] flex flex-col gap-1.5'>
				{[
					{ icon: faPlus, fn: () => zoomButton(1.18), label: 'Zoom in' },
					{ icon: faMinus, fn: () => zoomButton(0.85), label: 'Zoom out' },
					{ icon: faCropSimple, fn: fit, label: 'Fit board' },
				].map((b) => (
					<button
						key={b.label}
						onClick={b.fn}
						data-cursor='hover'
						aria-label={b.label}
						className='pointer-events-auto grid h-9 w-9 place-items-center rounded-[4px] border border-black/5 bg-[#f4eedf] text-[#463b29] shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-colors hover:text-roseDeep'
					>
						<FontAwesomeIcon icon={b.icon} className='text-xs' />
					</button>
				))}
			</div>

			{/* focused experience modal */}
			<AnimatePresence>
				{focusExp && (
					<motion.div
						className='absolute inset-0 z-[60] flex items-center justify-center p-4'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onPointerDown={() => setFocus(null)}
					>
						<div className='absolute inset-0 bg-ink/40 backdrop-blur-sm' />
						<motion.div
							initial={{ scale: 0.9, y: 16 }}
							animate={{ scale: 1, y: 0 }}
							exit={{ scale: 0.9, y: 16 }}
							onPointerDown={(e) => e.stopPropagation()}
							className='relative w-full max-w-lg rounded-2xl border border-lineStrong bg-surface p-6 shadow-card'
						>
							<div className='flex flex-wrap items-center gap-2'>
								<span className='font-mono text-xs text-rose'>
									{focusExp.date}
								</span>
								{focusExp.current && (
									<span className='rounded border border-jade/40 bg-jadeSoft px-1.5 py-0.5 font-mono text-[10px] uppercase text-jade'>
										now
									</span>
								)}
							</div>
							<h3 className='mt-1.5 font-display text-xl font-bold text-ink'>
								{focusExp.org}
							</h3>
							<p className='text-inkSoft'>{focusExp.role}</p>
							{focusExp.description.length > 0 && (
								<ul className='mt-3 space-y-1.5'>
									{focusExp.description.map((d, i) => (
										<li
											key={i}
											className='flex gap-2 text-sm leading-relaxed text-inkSoft'
										>
											<span className='mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-rose' />
											{d}
										</li>
									))}
								</ul>
							)}
							{focusExp.tech.length > 0 && (
								<div className='mt-4 flex flex-wrap gap-1.5'>
									{focusExp.tech.map((t) => (
										<span
											key={t}
											className='rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-inkSoft'
										>
											{skillById[t]?.label ?? t}
										</span>
									))}
								</div>
							)}
							<button
								onClick={() => setFocus(null)}
								className='mt-5 rounded-lg border border-lineStrong px-4 py-2 text-sm text-ink transition-colors hover:border-rose hover:text-rose'
							>
								close
							</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

/* ------------------------------- nodes ------------------------------- */

const hashCode = (s: string) => {
	let h = 0;
	for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
	return Math.abs(h);
};
const pick = <T,>(arr: T[], s: string): T => arr[hashCode(s) % arr.length];

const PINS = [
	{ c: '#e05a50', d: '#a8332c' },
	{ c: '#f0c24b', d: '#c2942f' },
	{ c: '#55b27e', d: '#2f7d52' },
	{ c: '#5b8fd6', d: '#34589b' },
	{ c: '#cf7d92', d: '#a05468' },
];
const FRACS = [0.16, 0.3, 0.5, 0.7, 0.84];
const TILTS = [-24, -14, -7, 0, 9, 17, 25];
const SIZES = [0.82, 0.92, 1, 1.12];

// horizontal anchor (0..1) of a card's pin — used by both the pin and the string
export const pinFrac = (id: string) => pick(FRACS, id + 'f');

const Pin = ({ id, at }: { id: string; at?: number }) => {
	const p = pick(PINS, id);
	const tilt = pick(TILTS, id + 't');
	const size = pick(SIZES, id + 's');
	const frac = at ?? pinFrac(id);
	return (
		<span
			aria-hidden
			style={{
				position: 'absolute',
				left: `${frac * 100}%`,
				top: -22,
				transform: `translateX(-50%) rotate(${tilt}deg) scale(${size})`,
				zIndex: 8,
				pointerEvents: 'none',
				filter: 'drop-shadow(0 3px 2px rgba(0,0,0,0.3))',
			}}
		>
			{/* classic plastic push-pin: wide grip cap, narrow shaft, flared skirt — matte */}
			<svg width='36' height='42' viewBox='0 0 36 42'>
				{/* contact shadow on the card */}
				<ellipse cx='18' cy='37' rx='12' ry='3.2' fill='rgba(0,0,0,0.16)' />
				{/* flared skirt resting on the card */}
				<ellipse
					cx='18'
					cy='33'
					rx='13'
					ry='5'
					fill={p.c}
					stroke='rgba(0,0,0,0.12)'
					strokeWidth='0.5'
				/>
				<ellipse cx='18' cy='34.5' rx='11' ry='2.8' fill={p.d} opacity='0.4' />
				{/* grip: flat-ish domed cap that flares out of the shaft (matte) */}
				<path
					d='M14 33 L14 19 C14 15.5 9.75 16.5 9.75 13.5 C9.75 11 11.4 10.5 18 10.5 C24.6 10.5 26.25 11 26.25 13.5 C26.25 16.5 22 15.5 22 19 L22 33 Z'
					fill={p.c}
				/>
				<rect x='14' y='19' width='2.4' height='14' fill={p.d} opacity='0.28' />
				<rect x='19.6' y='19' width='2.4' height='14' fill={p.d} opacity='0.24' />
				{/* soft shadow under the flared cap */}
				<ellipse cx='18' cy='16.6' rx='7.5' ry='1.5' fill={p.d} opacity='0.16' />
			</svg>
		</span>
	);
};

const Tape = () => <span className='tape' />;

const polaroidCls =
	'polaroid cursor-grab rounded-[3px] shadow-[0_2px_3px_rgba(0,0,0,0.3),0_13px_26px_-9px_rgba(0,0,0,0.62)]';

// contact shadow + a faint "gum line" darkening under the pinned top edge
const noteShadow =
	'shadow-[inset_0_6px_9px_-7px_rgba(0,0,0,0.16),0_2px_3px_rgba(0,0,0,0.26),0_16px_28px_-14px_rgba(0,0,0,0.5)]';

const BoardNode = ({
	item,
	pos,
	z,
	theme,
	casual,
	activeSkill,
	onPointerDown,
	onSkillHover,
}: {
	item: BoardItem;
	pos: Pos;
	z: number;
	theme: string;
	casual: boolean;
	activeSkill: string | null;
	onPointerDown: (e: React.PointerEvent) => void;
	onSkillHover: (id: string | null) => void;
}) => {
	const base =
		'absolute touch-none active:cursor-grabbing transition-shadow';
	// when a skill is hovered, dim the whole board except where that skill was used
	const matched = !activeSkill
		? true
		: item.type === 'exp'
		? !!expById[item.refId]?.tech.includes(activeSkill)
		: item.type === 'project'
		? !!projById[item.refId]?.tech.includes(activeSkill)
		: item.type === 'skill'
		? item.refId === activeSkill
		: false;
	const style: React.CSSProperties = {
		left: pos.x,
		top: pos.y,
		transform: `rotate(${pos.rot}deg)`,
		zIndex: z,
		opacity: activeSkill && !matched ? 0.28 : 1,
		transition: 'opacity 0.25s ease',
	};

	if (item.type === 'polaroid') {
		return (
			<div
				onPointerDown={onPointerDown}
				data-cursor='hover'
				className={`${base} ${polaroidCls} w-[224px] p-3 pb-2`}
				style={style}
				title='click me'
			>
				<Pin id={item.id} />
				<img
					src={casual ? casualDhruv : dhruv}
					alt={profile.name}
					draggable={false}
					className='h-[210px] w-full object-cover'
				/>
				<p className='hand mt-1.5 text-center text-2xl leading-none text-[#2b343d]'>
					{casual ? 'the real me 😄' : "hi, I'm Dhruv"}
				</p>
			</div>
		);
	}

	if (item.type === 'photo') {
		return (
			<div
				onPointerDown={onPointerDown}
				data-cursor='hover'
				className={`${base} ${polaroidCls} w-[196px] p-3 pb-2`}
				style={style}
			>
				<Pin id={item.id} />
				<div className='h-[176px] w-full bg-black/5'>
					<img
						src={item.src}
						alt={item.caption}
						draggable={false}
						loading='lazy'
						className='h-full w-full object-cover'
					/>
				</div>
				<p className='hand mt-1.5 text-center text-xl leading-none text-[#2b343d]'>
					{item.caption}
				</p>
			</div>
		);
	}

	if (item.type === 'bio') {
		return (
			<div
				onPointerDown={onPointerDown}
				data-cursor='hover'
				className={`${base} w-[300px] cursor-grab rounded-md border border-line bg-surface p-5 ${noteShadow}`}
				style={style}
			>
				<Tape />
				<p className='font-mono text-xs text-rose'>{'// about'}</p>
				<h2 className='mt-1 font-display text-2xl font-bold leading-tight text-ink'>
					I'm {profile.first}, {profile.roles[0]}.
				</h2>
				<p className='mt-2 text-sm leading-relaxed text-inkSoft'>
					{profile.bio}
				</p>
				<div className='mt-3 flex flex-wrap gap-1.5 font-mono text-[11px]'>
					<span className='inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-1 text-inkSoft'>
						<span className='h-1.5 w-1.5 rounded-full bg-jade' />
						{profile.status}
					</span>
					<span className='rounded-full border border-line px-2 py-1 text-inkSoft'>
						📍 {profile.location}
					</span>
				</div>
			</div>
		);
	}

	if (item.type === 'label') {
		return (
			<div
				onPointerDown={onPointerDown}
				data-cursor='hover'
				className={`${base} cursor-grab`}
				style={style}
			>
				<span className='tape-label hand text-3xl font-bold leading-none tracking-wide'>
					{item.text}
				</span>
			</div>
		);
	}

	if (item.type === 'skillboard') {
		return (
			<div
				onPointerDown={onPointerDown}
				className={`${base} board-paper cursor-grab rounded-[3px] border border-black/10 shadow-[0_2px_3px_rgba(0,0,0,0.22),0_16px_30px_-12px_rgba(0,0,0,0.5)]`}
				style={{ ...style, width: item.w, height: item.h }}
			>
				<Pin id='sb-left' at={0.06} />
				<Pin id='sb-right' at={0.94} />
			</div>
		);
	}

	if (item.type === 'contact') {
		return (
			<div
				onPointerDown={onPointerDown}
				data-cursor='hover'
				className={`${base} w-[230px] cursor-grab rounded-md border border-line bg-jadeSoft p-4 ${noteShadow}`}
				style={style}
				title='click to copy email'
			>
				<Tape />
				<p className='font-mono text-xs text-jade'>{'// say hi'}</p>
				<p className='mt-1 whitespace-nowrap font-mono text-[10.5px] text-ink'>
					{profile.email}
				</p>
				<div className='mt-3 flex gap-2'>
					{socials.map((s) => (
						<a
							key={s.id}
							href={s.url}
							target='_blank'
							rel='noreferrer'
							onPointerDown={(e) => e.stopPropagation()}
							className='grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface text-inkSoft transition-colors hover:text-rose'
						>
							<FontAwesomeIcon
								icon={
									s.id === 'github'
										? faGithub
										: s.id === 'linkedin'
										? faLinkedin
										: faEnvelope
								}
								className='text-xs'
							/>
						</a>
					))}
				</div>
			</div>
		);
	}

	if (item.type === 'exp') {
		const e = expById[item.refId];
		if (!e) return null;
		const dim = activeSkill && !e.tech.includes(activeSkill);
		const lit = activeSkill && e.tech.includes(activeSkill);
		return (
			<div
				onPointerDown={onPointerDown}
				data-cursor='hover'
				className={`${base} w-[270px] cursor-grab rounded-md border bg-surface p-4 ${noteShadow} ${
					lit ? 'border-rose ring-2 ring-rose/30' : 'border-line'
				} ${dim ? 'opacity-40' : ''}`}
				style={style}
				title='click for details'
			>
				<Pin id={item.id} />
				<div className='flex items-center gap-2'>
					<FontAwesomeIcon
						icon={e.icon}
						className='text-xs text-rose'
					/>
					<span className='font-mono text-[11px] text-rose'>
						{e.date}
					</span>
				</div>
				<h3 className='mt-1 font-display text-base font-semibold text-ink'>
					{e.org}
				</h3>
				<p className='text-sm text-inkSoft'>{e.role}</p>
			</div>
		);
	}

	if (item.type === 'project') {
		const p = projById[item.refId];
		if (!p) return null;
		const dim = activeSkill && !p.tech.includes(activeSkill);
		const lit = activeSkill && p.tech.includes(activeSkill);
		return (
			<div
				onPointerDown={onPointerDown}
				data-cursor='hover'
				className={`${base} ${polaroidCls} w-[240px] border p-3 pb-2.5 ${
					lit ? 'border-jade ring-2 ring-jade/40' : 'border-black/10'
				} ${dim ? 'opacity-40' : ''}`}
				style={style}
				title='open project ↗'
			>
				<Pin id={item.id} />
				<img
					src={p.image}
					alt={p.title}
					draggable={false}
					className='h-[150px] w-full object-cover'
				/>
				<h3 className='mt-2 flex items-center gap-2 font-display text-base font-semibold text-[#2b343d]'>
					{p.title}
					<FontAwesomeIcon
						icon={faGithub}
						className='text-xs text-black/40'
					/>
				</h3>
				<div className='mt-1 flex flex-wrap gap-1'>
					{p.stack.map((s) => (
						<span
							key={s}
							className='rounded border border-black/15 px-1.5 py-0.5 font-mono text-[10px] text-[#5d6b78]'
						>
							{s}
						</span>
					))}
				</div>
			</div>
		);
	}

	// skill sticker
	const s = skillById[item.refId];
	if (!s) return null;
	const icon = theme === 'dark' && s.iconDark ? s.iconDark : s.icon;
	const active = activeSkill === s.id;
	const dim = activeSkill && !active;
	return (
		<div
			onPointerDown={onPointerDown}
			onMouseEnter={() => onSkillHover(s.id)}
			onMouseLeave={() => onSkillHover(null)}
			data-cursor='hover'
			className={`${base} flex w-[110px] cursor-grab items-center gap-2 rounded-full border bg-surface px-3 py-2 shadow-[0_2px_3px_rgba(0,0,0,0.25),0_8px_14px_-8px_rgba(0,0,0,0.45)] ${
				active ? 'border-rose ring-2 ring-rose/30' : 'border-line'
			} ${dim ? 'opacity-40' : ''}`}
			style={style}
		>
			<img
				src={icon}
				alt={s.label}
				draggable={false}
				className='h-5 w-5 object-contain'
			/>
			<span className='truncate text-xs font-medium text-ink'>
				{s.label}
			</span>
		</div>
	);
};

export default Corkboard;
