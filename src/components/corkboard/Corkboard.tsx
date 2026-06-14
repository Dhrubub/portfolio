import {
	useCallback,
	useEffect,
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
	  }
	| null;

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
	const [pan, setPan] = useState({ x: 40, y: 30 });
	const [zoom, setZoom] = useState(0.82);
	const [order, setOrder] = useState<string[]>(items.map((i) => i.id));
	const [focus, setFocus] = useState<string | null>(null);
	const [casual, setCasual] = useState(false);

	const viewportRef = useRef<HTMLDivElement>(null);
	const gesture = useRef<Gesture>(null);
	const inertia = useRef<number>(0);
	const zoomRef = useRef(zoom);
	const panRef = useRef(pan);
	useEffect(() => {
		zoomRef.current = zoom;
	}, [zoom]);
	useEffect(() => {
		panRef.current = pan;
	}, [pan]);

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
		const nz = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z * factor));
		const change = nz / z;
		const p = panRef.current;
		setZoom(nz);
		setPan({ x: sx - change * (sx - p.x), y: sy - change * (sy - p.y) });
	}, []);

	const zoomButton = (factor: number) => {
		const r = viewportRef.current?.getBoundingClientRect();
		zoomAt(factor, r ? r.width / 2 : 0, r ? r.height / 2 : 0);
	};

	const fit = () => {
		const r = viewportRef.current?.getBoundingClientRect();
		if (!r) return;
		const z = Math.min(r.width / BOARD_W, r.height / BOARD_H) * 0.98;
		setZoom(z);
		setPan({ x: (r.width - BOARD_W * z) / 2, y: (r.height - BOARD_H * z) / 2 });
	};

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
				setPan({ x: g.ox + (e.clientX - g.px), y: g.oy + (e.clientY - g.py) });
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
				setPos((p) => ({
					...p,
					[g.id]: { ...p[g.id], x: g.ox + dx, y: g.oy + dy },
				}));
			}
		};
		const onUp = () => {
			const g = gesture.current;
			gesture.current = null;
			document.body.style.cursor = '';
			if (g && g.kind === 'item') {
				if (g.moved < 6) {
					handleItemClick(g.id);
				} else if (Math.abs(g.vx) + Math.abs(g.vy) > 0.4) {
					// toss with inertia
					let vx = Math.max(-40, Math.min(40, g.vx));
					let vy = Math.max(-40, Math.min(40, g.vy));
					const id = g.id;
					cancelAnimationFrame(inertia.current);
					const step = () => {
						vx *= 0.9;
						vy *= 0.9;
						setPos((p) => ({
							...p,
							[id]: {
								...p[id],
								x: p[id].x + vx,
								y: p[id].y + vy,
							},
						}));
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

	return (
		<div className='fixed inset-0 overflow-hidden bg-bgTint dot-grid'>
			{/* board viewport */}
			<div
				ref={viewportRef}
				onPointerDown={startPan}
				className='absolute inset-0 touch-none select-none'
				style={{ cursor: 'grab' }}
			>
				<div
					className='absolute left-0 top-0 origin-top-left'
					style={{
						width: BOARD_W,
						height: BOARD_H,
						transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
					}}
				>
					{items.map((it) => {
						const p = pos[it.id];
						const z = order.indexOf(it.id) + 1;
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
				</div>
			</div>

			{/* top chrome */}
			<div className='pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-5'>
				<div className='pointer-events-auto flex items-center gap-2 rounded-full border border-line bg-surface/80 px-4 py-2 backdrop-blur'>
					<span className='font-display text-sm font-bold text-ink'>
						{profile.first}
						<span className='text-rose'>.</span>
					</span>
					<span className='hidden font-mono text-[11px] text-inkFaint sm:inline'>
						{'// the board'}
					</span>
				</div>
				<div className='pointer-events-auto flex items-center gap-2'>
					<button
						onClick={onTidy}
						data-cursor='hover'
						className='flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3.5 py-2 text-sm text-ink backdrop-blur transition-colors hover:border-rose hover:text-rose'
					>
						<FontAwesomeIcon icon={faList} className='text-xs' />
						<span className='hidden sm:inline'>tidy view</span>
					</button>
					<button
						onClick={toggle}
						data-cursor='hover'
						aria-label='Toggle theme'
						className='grid h-9 w-9 place-items-center rounded-full border border-line bg-surface/80 text-ink backdrop-blur transition-colors hover:border-rose hover:text-rose'
					>
						<FontAwesomeIcon
							icon={theme === 'dark' ? faMoon : faSun}
						/>
					</button>
				</div>
			</div>

			{/* hint */}
			<div className='pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2'>
				<div className='flex items-center gap-2 rounded-full border border-line bg-surface/80 px-4 py-2 font-mono text-[11px] text-inkSoft backdrop-blur'>
					<FontAwesomeIcon icon={faHand} className='text-rose' />
					drag to pan · grab a card · scroll to zoom · press ⌘K
				</div>
			</div>

			{/* zoom controls */}
			<div className='absolute bottom-5 right-5 flex flex-col gap-1.5'>
				<button
					onClick={() => zoomButton(1.18)}
					data-cursor='hover'
					aria-label='Zoom in'
					className='grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface/80 text-ink backdrop-blur transition-colors hover:border-rose hover:text-rose'
				>
					<FontAwesomeIcon icon={faPlus} className='text-xs' />
				</button>
				<button
					onClick={() => zoomButton(0.85)}
					data-cursor='hover'
					aria-label='Zoom out'
					className='grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface/80 text-ink backdrop-blur transition-colors hover:border-rose hover:text-rose'
				>
					<FontAwesomeIcon icon={faMinus} className='text-xs' />
				</button>
				<button
					onClick={fit}
					data-cursor='hover'
					aria-label='Fit board'
					className='grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface/80 text-ink backdrop-blur transition-colors hover:border-rose hover:text-rose'
				>
					<FontAwesomeIcon icon={faCropSimple} className='text-xs' />
				</button>
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

const pinClass =
	"before:content-[''] before:absolute before:left-1/2 before:-top-2 before:h-3 before:w-3 before:-translate-x-1/2 before:rounded-full before:bg-rose before:shadow-card";

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
	const style: React.CSSProperties = {
		left: pos.x,
		top: pos.y,
		transform: `rotate(${pos.rot}deg)`,
		zIndex: z,
	};

	if (item.type === 'polaroid') {
		return (
			<div
				onPointerDown={onPointerDown}
				data-cursor='hover'
				className={`${base} ${pinClass} w-[230px] cursor-grab rounded-md border border-line bg-surface p-3 pb-12 shadow-card`}
				style={style}
				title='click me'
			>
				<img
					src={casual ? casualDhruv : dhruv}
					alt={profile.name}
					draggable={false}
					className='h-[210px] w-full rounded-sm object-cover'
				/>
				<p className='absolute bottom-3 left-0 w-full text-center font-mono text-sm text-ink'>
					{casual ? 'hi, the real me 😄' : profile.first}
				</p>
			</div>
		);
	}

	if (item.type === 'bio') {
		return (
			<div
				onPointerDown={onPointerDown}
				data-cursor='hover'
				className={`${base} ${pinClass} w-[300px] cursor-grab rounded-md border border-line bg-surface p-5 shadow-card`}
				style={style}
			>
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
				className={`${base} cursor-grab`}
				style={style}
			>
				<span
					className={`font-display text-3xl font-bold lowercase ${
						item.tone === 'jade' ? 'text-jade' : 'text-rose'
					}`}
				>
					{item.text}
				</span>
				<span className='ml-1 font-mono text-sm text-inkFaint'>↓</span>
			</div>
		);
	}

	if (item.type === 'contact') {
		return (
			<div
				onPointerDown={onPointerDown}
				data-cursor='hover'
				className={`${base} ${pinClass} w-[230px] cursor-grab rounded-md border border-line bg-jadeSoft p-4 shadow-card`}
				style={style}
				title='click to copy email'
			>
				<p className='font-mono text-xs text-jade'>{'// say hi'}</p>
				<p className='mt-1 break-all font-mono text-sm text-ink'>
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
				className={`${base} ${pinClass} w-[270px] cursor-grab rounded-md border bg-surface p-4 shadow-card ${
					lit ? 'border-rose ring-2 ring-rose/30' : 'border-line'
				} ${dim ? 'opacity-40' : ''}`}
				style={style}
				title='click for details'
			>
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
				className={`${base} ${pinClass} w-[250px] cursor-grab rounded-md border bg-surface p-3 pb-3 shadow-card ${
					lit ? 'border-jade ring-2 ring-jade/30' : 'border-line'
				} ${dim ? 'opacity-40' : ''}`}
				style={style}
				title='open project ↗'
			>
				<img
					src={p.image}
					alt={p.title}
					draggable={false}
					className='h-[140px] w-full rounded-sm object-cover'
				/>
				<h3 className='mt-2 flex items-center gap-2 font-display text-base font-semibold text-ink'>
					{p.title}
					<FontAwesomeIcon
						icon={faGithub}
						className='text-xs text-inkFaint'
					/>
				</h3>
				<div className='mt-1 flex flex-wrap gap-1'>
					{p.stack.map((s) => (
						<span
							key={s}
							className='rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-inkSoft'
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
			className={`${base} flex w-[110px] cursor-grab items-center gap-2 rounded-full border bg-surface px-3 py-2 shadow-card ${
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
