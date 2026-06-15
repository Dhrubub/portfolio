import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeCtx {
	theme: ThemeMode;
	toggle: () => void;
	setTheme: (t: ThemeMode) => void;
}

const Ctx = createContext<ThemeCtx | null>(null);

const STORAGE_KEY = 'dj-theme';

const getInitial = (): ThemeMode => {
	if (typeof window === 'undefined') return 'light';
	const q = new URLSearchParams(window.location.search).get('theme');
	if (q === 'light' || q === 'dark') return q;
	const saved = window.localStorage.getItem(STORAGE_KEY);
	if (saved === 'light' || saved === 'dark') return saved;
	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light';
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setThemeState] = useState<ThemeMode>(getInitial);

	const apply = useCallback((t: ThemeMode) => {
		const el = document.documentElement;
		// brief class so the swap crossfades instead of snapping
		el.classList.add('theme-transition');
		if (t === 'dark') el.setAttribute('data-theme', 'dark');
		else el.removeAttribute('data-theme');
		window.setTimeout(() => el.classList.remove('theme-transition'), 520);
	}, []);

	useEffect(() => {
		apply(theme);
		window.localStorage.setItem(STORAGE_KEY, theme);
	}, [theme, apply]);

	// follow the system only while the user hasn't made an explicit choice
	useEffect(() => {
		const mq = window.matchMedia('(prefers-color-scheme: dark)');
		const onChange = (e: MediaQueryListEvent) => {
			if (!window.localStorage.getItem(STORAGE_KEY)) {
				setThemeState(e.matches ? 'dark' : 'light');
			}
		};
		mq.addEventListener('change', onChange);
		return () => mq.removeEventListener('change', onChange);
	}, []);

	const setTheme = useCallback((t: ThemeMode) => setThemeState(t), []);
	const toggle = useCallback(
		() => setThemeState((p) => (p === 'dark' ? 'light' : 'dark')),
		[]
	);

	return (
		<Ctx.Provider value={{ theme, toggle, setTheme }}>
			{children}
		</Ctx.Provider>
	);
};

export const useTheme = () => {
	const c = useContext(Ctx);
	if (!c) throw new Error('useTheme must be used within ThemeProvider');
	return c;
};
