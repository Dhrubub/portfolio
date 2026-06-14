import { useScrollProgress } from '../hooks/useScroll';

const ScrollProgress = () => {
	const progress = useScrollProgress();
	return (
		<div className='fixed left-0 top-0 z-50 h-[3px] w-full bg-transparent'>
			<div
				className='h-full origin-left bg-rose'
				style={{ transform: `scaleX(${progress})` }}
			/>
		</div>
	);
};

export default ScrollProgress;
