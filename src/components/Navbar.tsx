import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faSun,
	faMoon,
	faBars,
	faTimes,
} from '@fortawesome/free-solid-svg-icons';

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
	toggleDarkMode: () => void;
};

const Navbar = ({ toggleDarkMode }: NavbarProps) => {
	const [darkMode, setDarkMode] = useState(false);
	const [sidebar, setSidebar] = useState(false);

	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: { target: any }) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target)
			) {
				setSidebar(false);
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	const handleToggleDarkMode = () => {
		setDarkMode((prev) => !prev);
		toggleDarkMode();
	};

	return (
		<nav className='w-full flex py-4 min-h-[64px] justify-center items-center navbar'>
			<span className='text-secondary text-[16px]'>
				<a href=''>Dhruv Jobanputra</a>
			</span>
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
						className={`w-[20px] h-[20px] text-secondary mt-1 cursor-pointer`}
					/>
				</button>
			</ul>

			{sidebar && (
				<div className='fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 z-10'></div>
			)}

			<div
				className='sm:hidden flex flex-1 justify-end items-center z-[11]'
				ref={sidebarRef}
			>
				<FontAwesomeIcon
					icon={darkMode ? faMoon : faSun}
					className={`w-[20px] h-[20px] text-secondary mr-6 cursor-pointer`}
					onClick={handleToggleDarkMode}
				/>
				<FontAwesomeIcon
					icon={sidebar ? faTimes : faBars}
					className={`w-[20px] h-[20px] text-secondary cursor-pointer`}
					onClick={() => setSidebar((prev) => !prev)}
				/>

				<div
					className={`${
						sidebar ? 'flex' : 'slide-right-out'
					} p-6 bg-primary absolute top-0 right-0 min-w-[180px] h-full sidebar`}
				>
					<ul className='list-none flex flex-col justify-start items-start flex-1'>
						{navLinks.map((nav, index) => (
							<li
								key={nav.id}
								className={`font-poppins font-normal cursor-pointer text-[16px] text-secondary mb-4 ${
									index === navLinks.length - 1
										? 'mb-0'
										: 'mb-4'
								}`}
							>
								<a href={`#${nav.id}`}>{nav.title}</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
