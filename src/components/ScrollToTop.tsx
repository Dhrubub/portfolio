import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const ScrollToTop = () => {
	const [shouldShowScrollToTop, setShouldShowScrollToTop] = useState(false);

	const handleScroll = () => {
		const scrollTop =
			window.pageYOffset || document.documentElement.scrollTop;
		const scrollThreshold = 200; // Adjust this value as needed

		setShouldShowScrollToTop(scrollTop > scrollThreshold);
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	return (
		<div
			className={`z-[10] fixed bottom-[20px] right-[20px] w-[40px] h-[40px] bg-gray-900
     text-white flex justify-center items-center cursor-pointer rounded-full
      opacity-0 transition-opacity duration-300 ${
			shouldShowScrollToTop ? 'opacity-100' : ''
		}`}
			onClick={scrollToTop}
		>
			<FontAwesomeIcon icon={faArrowUp} />
		</div>
	);
};

export default ScrollToTop;
