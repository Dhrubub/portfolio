import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useRafScroll } from '../hooks/useScroll';

const ScrollToTop = () => {
	const [show, setShow] = useState(false);
	useRafScroll((y) => setShow(y > 400));

	return (
		<AnimatePresence>
			{show && (
				<motion.button
					data-cursor='hover'
					initial={{ opacity: 0, scale: 0.6, y: 10 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.6, y: 10 }}
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					aria-label='Scroll to top'
					className='fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-lineStrong bg-surface text-ink shadow-card transition-colors hover:border-rose hover:text-rose'
				>
					<FontAwesomeIcon icon={faArrowUp} />
				</motion.button>
			)}
		</AnimatePresence>
	);
};

export default ScrollToTop;
