import { useEffect, useRef } from 'react';

/**
 * A quirky two-part cursor: a small dot that tracks instantly and a ring that
 * lags behind with easing and swells over interactive elements. Pointer-fine
 * devices only — touch keeps the native cursor (and we never hide it there).
 */
const CustomCursor = () => {
	const dotRef = useRef<HTMLDivElement>(null);
	const ringRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const finePointer = window.matchMedia(
			'(hover: hover) and (pointer: fine)'
		).matches;
		if (finePointer) document.documentElement.classList.add('cursor-ready');
		if (!finePointer) return;

		const dot = dotRef.current!;
		const ring = ringRef.current!;
		let mouseX = window.innerWidth / 2;
		let mouseY = window.innerHeight / 2;
		let ringX = mouseX;
		let ringY = mouseY;
		let raf = 0;

		const onMove = (e: MouseEvent) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
			dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
			const target = e.target as HTMLElement;
			const interactive = target.closest(
				'a, button, [data-cursor="hover"], input, [role="button"]'
			);
			ring.classList.toggle('is-hovering', !!interactive);
		};
		const onDown = () => ring.classList.add('is-down');
		const onUp = () => ring.classList.remove('is-down');
		const onLeave = () => {
			dot.style.opacity = '0';
			ring.style.opacity = '0';
		};
		const onEnter = () => {
			dot.style.opacity = '1';
			ring.style.opacity = '1';
		};

		const loop = () => {
			ringX += (mouseX - ringX) * 0.18;
			ringY += (mouseY - ringY) * 0.18;
			ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
			raf = requestAnimationFrame(loop);
		};
		loop();

		window.addEventListener('mousemove', onMove);
		window.addEventListener('mousedown', onDown);
		window.addEventListener('mouseup', onUp);
		document.addEventListener('mouseleave', onLeave);
		document.addEventListener('mouseenter', onEnter);

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('mousemove', onMove);
			window.removeEventListener('mousedown', onDown);
			window.removeEventListener('mouseup', onUp);
			document.removeEventListener('mouseleave', onLeave);
			document.removeEventListener('mouseenter', onEnter);
			document.documentElement.classList.remove('cursor-ready');
		};
	}, []);

	return (
		<>
			<div ref={ringRef} className='cursor-ring' aria-hidden />
			<div ref={dotRef} className='cursor-dot' aria-hidden />
		</>
	);
};

export default CustomCursor;
