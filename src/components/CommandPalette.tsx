import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMagnifyingGlass,
	faArrowRight,
	faFileLines,
	faEnvelope,
	faMoon,
	faSun,
	faCircleUp,
	faHandSpock,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { profile, socials } from '../data/content';
import { useTheme } from '../theme/ThemeContext';

interface Cmd {
	id: string;
	label: string;
	hint?: string;
	icon: IconDefinition;
	keywords?: string;
	run: () => void;
}

const jump = (id: string) =>
	document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const CommandPalette = () => {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState('');
	const [sel, setSel] = useState(0);
	const [toast, setToast] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();
	const { theme, toggle } = useTheme();

	const flash = useCallback((msg: string) => {
		setToast(msg);
		window.setTimeout(() => setToast(null), 1800);
	}, []);

	const close = useCallback(() => {
		setOpen(false);
		setQuery('');
		setSel(0);
	}, []);

	const commands = useMemo<Cmd[]>(() => {
		const social = (id: string) =>
			socials.find((s) => s.id === id)?.url ?? '#';
		return [
			{ id: 'about', label: 'Go to About', icon: faArrowRight, keywords: 'home top intro', run: () => jump('home') },
			{ id: 'experience', label: 'Go to Experience', icon: faArrowRight, keywords: 'work timeline jobs', run: () => jump('experience') },
			{ id: 'projects', label: 'Go to Projects', icon: faArrowRight, keywords: 'work made', run: () => jump('projects') },
			{ id: 'skills', label: 'Go to Skills', icon: faArrowRight, keywords: 'tools tech', run: () => jump('skills') },
			{ id: 'contact', label: 'Go to Contact', icon: faArrowRight, keywords: 'email reach footer', run: () => jump('contact') },
			{
				id: 'view',
				label: 'Toggle board / tidy view',
				hint: '🧷',
				icon: faArrowRight,
				keywords: 'corkboard layout switch scatter',
				run: () =>
					window.dispatchEvent(
						new CustomEvent('dj:set-view', { detail: 'toggle' })
					),
			},
			{ id: 'resume', label: 'Open résumé', hint: 'PDF', icon: faFileLines, keywords: 'cv pdf', run: () => navigate('/resume') },
			{
				id: 'email',
				label: 'Copy email address',
				hint: profile.email,
				icon: faEnvelope,
				keywords: 'contact mail copy',
				run: () => {
					navigator.clipboard
						?.writeText(profile.email)
						.then(() => flash('email copied to clipboard ✦'))
						.catch(() => flash(profile.email));
				},
			},
			{
				id: 'theme',
				label: theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
				icon: theme === 'dark' ? faSun : faMoon,
				keywords: 'dark light toggle theme',
				run: toggle,
			},
			{ id: 'github', label: 'Open GitHub', icon: faGithub, keywords: 'code repo', run: () => window.open(social('github'), '_blank') },
			{ id: 'linkedin', label: 'Open LinkedIn', icon: faLinkedin, keywords: 'work social', run: () => window.open(social('linkedin'), '_blank') },
			{ id: 'top', label: 'Scroll to top', icon: faCircleUp, keywords: 'up', run: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
			{
				id: 'barrelroll',
				label: 'Do a barrel roll',
				hint: 'why not',
				icon: faHandSpock,
				keywords: 'fun spin easter egg',
				run: () => {
					const el = document.getElementById('root');
					if (!el) return;
					el.style.transition = 'transform 1s ease';
					el.style.transform = 'rotate(360deg)';
					window.setTimeout(() => {
						el.style.transition = '';
						el.style.transform = '';
					}, 1000);
				},
			},
		];
	}, [theme, toggle, navigate, flash]);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return commands;
		return commands.filter((c) =>
			(c.label + ' ' + (c.keywords ?? '')).toLowerCase().includes(q)
		);
	}, [query, commands]);

	// global hotkey
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault();
				setOpen((p) => !p);
			} else if (e.key === 'Escape') {
				close();
			}
		};
		const onOpen = () => setOpen(true);
		window.addEventListener('keydown', onKey);
		window.addEventListener('cmdk:open', onOpen);
		return () => {
			window.removeEventListener('keydown', onKey);
			window.removeEventListener('cmdk:open', onOpen);
		};
	}, [close]);

	useEffect(() => {
		if (open) setTimeout(() => inputRef.current?.focus(), 30);
	}, [open]);

	useEffect(() => setSel(0), [query]);

	const onListKey = (e: React.KeyboardEvent) => {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			setSel((s) => Math.min(s + 1, filtered.length - 1));
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setSel((s) => Math.max(s - 1, 0));
		} else if (e.key === 'Enter') {
			e.preventDefault();
			const cmd = filtered[sel];
			if (cmd) {
				cmd.run();
				close();
			}
		}
	};

	const overlay: ReactNode = (
		<AnimatePresence>
			{open && (
				<motion.div
					className='fixed inset-0 z-[9990] flex items-start justify-center px-4 pt-[14vh]'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={close}
				>
					<div className='absolute inset-0 bg-ink/40 backdrop-blur-sm' />
					<motion.div
						initial={{ opacity: 0, y: -12, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -12, scale: 0.98 }}
						transition={{ duration: 0.18 }}
						onClick={(e) => e.stopPropagation()}
						className='relative w-full max-w-lg overflow-hidden rounded-2xl border border-lineStrong bg-surface shadow-card'
					>
						<div className='flex items-center gap-3 border-b border-line px-4'>
							<FontAwesomeIcon
								icon={faMagnifyingGlass}
								className='text-inkFaint'
							/>
							<input
								ref={inputRef}
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								onKeyDown={onListKey}
								placeholder='Type a command or search…'
								className='w-full bg-transparent py-3.5 text-ink outline-none placeholder:text-inkFaint'
							/>
							<kbd className='hidden rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-inkFaint sm:block'>
								esc
							</kbd>
						</div>
						<ul className='max-h-[50vh] overflow-y-auto p-2'>
							{filtered.length === 0 && (
								<li className='px-3 py-6 text-center font-mono text-sm text-inkFaint'>
									no matches · try “resume” or “email”
								</li>
							)}
							{filtered.map((c, i) => (
								<li key={c.id}>
									<button
										onMouseEnter={() => setSel(i)}
										onClick={() => {
											c.run();
											close();
										}}
										className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
											i === sel
												? 'bg-rose/15 text-ink'
												: 'text-inkSoft'
										}`}
									>
										<span
											className={`grid h-8 w-8 place-items-center rounded-lg border ${
												i === sel
													? 'border-rose text-rose'
													: 'border-line text-inkFaint'
											}`}
										>
											<FontAwesomeIcon icon={c.icon} className='text-sm' />
										</span>
										<span className='flex-1 text-sm font-medium'>
											{c.label}
										</span>
										{c.hint && (
											<span className='font-mono text-xs text-inkFaint'>
												{c.hint}
											</span>
										)}
									</button>
								</li>
							))}
						</ul>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);

	return (
		<>
			{createPortal(overlay, document.body)}
			{toast &&
				createPortal(
					<div className='fixed bottom-6 left-1/2 z-[9995] -translate-x-1/2 rounded-full border border-lineStrong bg-surface px-4 py-2 font-mono text-sm text-ink shadow-card'>
						{toast}
					</div>,
					document.body
				)}
		</>
	);
};

export default CommandPalette;
