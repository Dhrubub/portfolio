import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faSun,
	faMoon,
	faBars,
	faXmark,
	faThumbtack,
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../theme/ThemeContext';
import { profile } from '../data/content';

const links = [
	{ id: 'experience', label: 'Experience' },
	{ id: 'projects', label: 'Projects' },
	{ id: 'skills', label: 'Skills' },
	{ id: 'contact', label: 'Contact' },
];

const Navbar = () => {
	const { theme, toggle } = useTheme();
	const [scrolled, setScrolled] = useState(false);
	const [menu, setMenu] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const openPalette = () => window.dispatchEvent(new Event('cmdk:open'));
	const openBoard = () =>
		window.dispatchEvent(
			new CustomEvent('dj:set-view', { detail: 'board' })
		);

	return (
		<header
			className={`sticky top-0 z-40 transition-colors duration-300 ${
				scrolled
					? 'border-b border-line bg-bg/80 backdrop-blur-md'
					: 'border-b border-transparent'
			}`}
		>
			<nav className='mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-10'>
				<a
					href='#home'
					data-cursor='hover'
					className='group font-display text-base font-bold text-ink'
				>
					{profile.first}
					<span className='text-rose transition-all group-hover:ml-1'>
						.
					</span>
				</a>

				<div className='flex items-center gap-1 sm:gap-2'>
					<ul className='mr-1 hidden items-center gap-1 sm:flex'>
						{links.map((l) => (
							<li key={l.id}>
								<a
									href={`#${l.id}`}
									data-cursor='hover'
									className='rounded-lg px-3 py-2 text-sm text-inkSoft transition-colors hover:text-rose'
								>
									{l.label}
								</a>
							</li>
						))}
					</ul>

					{/* board view */}
					<button
						onClick={openBoard}
						data-cursor='hover'
						className='hidden items-center gap-2 rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-inkSoft transition-colors hover:border-rose hover:text-rose sm:flex'
					>
						<FontAwesomeIcon icon={faThumbtack} className='rotate-45 text-xs' />
					<span>board</span>
					</button>

					{/* command palette trigger */}
					<button
						onClick={openPalette}
						data-cursor='hover'
						aria-label='Open command palette'
						className='hidden items-center gap-2 rounded-lg border border-line bg-surface px-3 py-1.5 text-inkSoft transition-colors hover:border-rose hover:text-rose sm:flex'
					>
						<span className='font-mono text-sm'>⌘K</span>
					</button>

					{/* theme toggle */}
					<button
						onClick={toggle}
						data-cursor='hover'
						aria-label='Toggle theme'
						className='wiggle-on-hover grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface text-ink transition-colors hover:border-rose hover:text-rose'
					>
						<FontAwesomeIcon icon={theme === 'dark' ? faMoon : faSun} />
					</button>

					{/* mobile menu */}
					<button
						onClick={() => setMenu((p) => !p)}
						data-cursor='hover'
						aria-label='Menu'
						className='grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface text-ink sm:hidden'
					>
						<FontAwesomeIcon icon={menu ? faXmark : faBars} />
					</button>
				</div>
			</nav>

			{/* mobile dropdown */}
			{menu && (
				<div className='border-t border-line bg-bg px-6 py-3 sm:hidden'>
					<ul className='flex flex-col gap-1'>
						{links.map((l) => (
							<li key={l.id}>
								<a
									href={`#${l.id}`}
									onClick={() => setMenu(false)}
									className='block rounded-lg px-2 py-2 text-inkSoft hover:text-rose'
								>
									{l.label}
								</a>
							</li>
						))}
						<li>
							<button
								onClick={() => {
									setMenu(false);
									openPalette();
								}}
								className='block w-full rounded-lg px-2 py-2 text-left font-mono text-sm text-inkFaint'
							>
								⌘K · command palette
							</button>
						</li>
					</ul>
				</div>
			)}
		</header>
	);
};

export default Navbar;
