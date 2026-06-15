import { useEffect, useState } from 'react';

const EMOJIS = ['✦', '🎉', '🌸', '💖', '⭐', '🩷', '🎈', '🌟'];

/**
 * Konami-code easter egg: ↑↑↓↓←→←→ B A → a brief, tasteful emoji rain.
 * Quiet by default; respects reduced-motion.
 */
const Confetti = () => {
	const [burst, setBurst] = useState(0);

	useEffect(() => {
		const code = [
			'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
			'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
			'b', 'a',
		];
		let idx = 0;
		const onKey = (e: KeyboardEvent) => {
			const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
			idx = k === code[idx] ? idx + 1 : k === code[0] ? 1 : 0;
			if (idx === code.length) {
				idx = 0;
				if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
					setBurst((b) => b + 1);
			}
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, []);

	useEffect(() => {
		if (!burst) return;
		const t = setTimeout(() => setBurst((b) => (b > 0 ? 0 : b)), 4000);
		return () => clearTimeout(t);
	}, [burst]);

	if (!burst) return null;

	return (
		<div className='pointer-events-none fixed inset-0 z-[9996] overflow-hidden'>
			{Array.from({ length: 36 }).map((_, i) => {
				const left = (i * 2.718) % 100;
				const delay = (i % 12) * 0.12;
				const dur = 2.4 + (i % 5) * 0.4;
				const size = 16 + (i % 4) * 6;
				return (
					<span
						key={`${burst}-${i}`}
						style={{
							position: 'absolute',
							left: `${left}%`,
							top: '-40px',
							fontSize: size,
							animation: `cf-fall ${dur}s ${delay}s ease-in forwards`,
						}}
					>
						{EMOJIS[i % EMOJIS.length]}
					</span>
				);
			})}
			<style>{`
				@keyframes cf-fall {
					0% { transform: translateY(-40px) rotate(0deg); opacity: 0; }
					10% { opacity: 1; }
					100% { transform: translateY(105vh) rotate(420deg); opacity: 0.9; }
				}
			`}</style>
		</div>
	);
};

export default Confetti;
