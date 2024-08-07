import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faSun,
	faMoon,
	faBars,
	faTimes,
	faCog,
} from '@fortawesome/free-solid-svg-icons';
import Experiment from './Experiment';

export const navLinks = [
	{
		id: 'about',
		title: 'About',
	},
	{
		id: 'experience',
		title: 'Experience',
	},
	{
		id: 'projects',
		title: 'Projects',
	},
	{
		id: 'contact',
		title: 'Contact',
	},
];

type NavbarProps = {
	isDarkMode: boolean;
	toggleDarkMode: () => void;
};

const Navbar = ({ isDarkMode, toggleDarkMode }: NavbarProps) => {
	const [darkMode, setDarkMode] = useState(isDarkMode);
	const [hasSideBarOpened, setHasSideBarOpened] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isCustomThemeOpen, setIsCustomThemeOpen] = useState(false);

	const sidebarContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: { target: any }) => {
			if (
				sidebarContainerRef.current &&
				!sidebarContainerRef.current.contains(event.target)
			) {
				setIsSidebarOpen(false);
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		setDarkMode(isDarkMode);
	}, [isDarkMode]);

	const handleToggleDarkMode = () => {
		setDarkMode((prev) => !prev);
		toggleDarkMode();
	};

	return (
		<nav className='w-full flex py-4 min-h-[64px] justify-center items-center navbar'>
			<span className='text-secondary text-[16px]'>Dhruv Jobanputra</span>
			<ul className='list-none sm:flex hidden justify-end items-center flex-1'>
				{navLinks.map((nav) => (
					<li
						key={nav.id}
						className={`font-poppins font-normal cursor-pointer text-[16px] text-secondary mr-10`}
					>
						<a href={`#${nav.id}`}>{nav.title}</a>
					</li>
				))}
				<button onClick={handleToggleDarkMode}>
					<FontAwesomeIcon
						icon={darkMode ? faMoon : faSun}
						className={`w-[20px] h-[20px] text-secondary mt-1 cursor-pointer mr-5`}
					/>
				</button>
				{/* <button
					onClick={() => {
						setIsCustomThemeOpen((prev) => !prev);
					}}
				>
					<FontAwesomeIcon
						icon={faCog}
						className={`w-[20px] h-[20px] text-secondary mt-1 cursor-pointer`}
					/>
				</button> */}
			</ul>

			{isSidebarOpen && (
				<div className='fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 z-10'></div>
			)}

			{/* {isCustomThemeOpen && (
				<div className='z-10'>
					<Experiment
						close={() => setIsCustomThemeOpen((prev) => !prev)}
					/>
				</div>
			)} */}

			<div
				className='sm:hidden flex flex-1 justify-end items-center z-[11]'
				ref={sidebarContainerRef}
			>
				<FontAwesomeIcon
					icon={darkMode ? faMoon : faSun}
					className={`w-[20px] h-[20px] text-secondary mr-6 cursor-pointer`}
					onClick={handleToggleDarkMode}
				/>

				{/* <FontAwesomeIcon
					icon={faCog}
					className={`w-[20px] h-[20px] text-secondary mr-6 cursor-pointer`}
					onClick={() => {
						setIsCustomThemeOpen((prev) => !prev);
					}}
				/> */}

				<FontAwesomeIcon
					icon={isSidebarOpen ? faTimes : faBars}
					className={`w-[20px] h-[20px] text-secondary cursor-pointer`}
					onClick={() => {
						setHasSideBarOpened(true);
						setIsSidebarOpen((prev) => !prev);
					}}
				/>

				<div
					className={`
						${hasSideBarOpened ? 'duration-500' : ''}
						${
							isSidebarOpen
								? 'flex translate-x-0'
								: 'translate-x-full '
						} p-6 bg-primary fixed top-0 right-0 min-w-[180px] h-full ease-in-out shadow-inner`}
				>
					<ul className='list-none flex flex-col justify-start items-start flex-1'>
						{navLinks.map((nav) => (
							<li
								key={nav.id}
								className={`cursor-pointer text-[16px] text-secondary mb-4`}
							>
								<a
									href={`#${nav.id}`}
									onClick={() =>
										setIsSidebarOpen((prev) => !prev)
									}
								>
									{nav.title}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
