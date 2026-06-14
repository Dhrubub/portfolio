import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
	Navbar,
	Hero,
	Experience,
	Projects,
	Skills,
	Footer,
	CommandPalette,
	CustomCursor,
	ScrollProgress,
	ScrollToTop,
	Confetti,
} from './components';
import Corkboard from './components/corkboard/Corkboard';
import { HighlightProvider } from './context/HighlightContext';
import { useTheme } from './theme/ThemeContext';
import darkLogo from './assets/dark-logo.png';
import lightLogo from './assets/light-logo.png';
import darkLogoSquare from './assets/dark-logo-square.png';
import lightLogoSquare from './assets/light-logo-square.png';

type View = 'board' | 'tidy';
const VIEW_KEY = 'dj-view';

const getInitialView = (): View => {
	if (typeof window === 'undefined') return 'tidy';
	const q = new URLSearchParams(window.location.search).get('view');
	if (q === 'board' || q === 'tidy') return q;
	const saved = window.localStorage.getItem(VIEW_KEY);
	if (saved === 'board' || saved === 'tidy') return saved;
	const desktopPointer =
		window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
		window.innerWidth >= 768;
	return desktopPointer ? 'board' : 'tidy';
};

const Home = () => {
	const { theme } = useTheme();
	const dark = theme === 'dark';
	const [view, setViewState] = useState<View>(getInitialView);

	const setView = useCallback((v: View) => {
		setViewState(v);
		window.localStorage.setItem(VIEW_KEY, v);
		window.scrollTo({ top: 0 });
	}, []);

	// view switching via custom events (navbar button + command palette)
	useEffect(() => {
		const onSet = (e: Event) => {
			const detail = (e as CustomEvent).detail as View | 'toggle';
			if (detail === 'toggle')
				setView(view === 'board' ? 'tidy' : 'board');
			else setView(detail);
		};
		window.addEventListener('dj:set-view', onSet as EventListener);
		return () =>
			window.removeEventListener('dj:set-view', onSet as EventListener);
	}, [view, setView]);

	useEffect(() => {
		console.log(
			'%c👋 hey, fellow tinkerer.',
			'font-size:14px;font-weight:bold;color:#c16d83'
		);
		console.log(
			'%cpsst — try the Konami code, hit ⌘K, or drag the board around.',
			'font-family:monospace;color:#3f8c7e'
		);
	}, []);

	return (
		<HighlightProvider>
			<Helmet>
				<title>Dhruv Jobanputra · Software Engineer</title>
				<link
					rel='icon'
					type='image/png'
					href={dark ? darkLogo : lightLogo}
				/>
				<link
					rel='apple-touch-icon'
					href={dark ? darkLogoSquare : lightLogoSquare}
				/>
				<meta property='og:image' content={dark ? darkLogo : lightLogo} />
			</Helmet>

			<CustomCursor />
			<CommandPalette />
			<Confetti />

			{view === 'board' ? (
				<Corkboard onTidy={() => setView('tidy')} />
			) : (
				<>
					<ScrollProgress />
					<ScrollToTop />
					<Navbar />
					<main>
						<Hero />
						<Experience />
						<Projects />
						<Skills />
					</main>
					<Footer />
				</>
			)}
		</HighlightProvider>
	);
};

export default Home;
