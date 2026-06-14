import { useEffect, useRef, useState } from 'react';

/**
 * rAF-throttled scroll. Calls `cb` at most once per frame with the latest
 * scrollY. Avoids the layout-thrashing of running work on every scroll event.
 */
export const useRafScroll = (cb: (scrollY: number) => void) => {
	const cbRef = useRef(cb);
	cbRef.current = cb;

	useEffect(() => {
		let ticking = false;
		const onScroll = () => {
			if (ticking) return;
			ticking = true;
			window.requestAnimationFrame(() => {
				cbRef.current(window.scrollY);
				ticking = false;
			});
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		// prime once
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	}, []);
};

/** Document scroll progress 0..1, rAF-throttled. */
export const useScrollProgress = () => {
	const [progress, setProgress] = useState(0);
	useRafScroll((y) => {
		const h =
			document.documentElement.scrollHeight - window.innerHeight;
		setProgress(h > 0 ? Math.min(1, Math.max(0, y / h)) : 0);
	});
	return progress;
};
