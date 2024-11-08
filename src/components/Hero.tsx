import React, { useState } from 'react';
import styles from '../style';

import dhruv from '../assets/dhruv.png';
import casualDhruv from '../assets/casual_dhruv.jpg';

import resume from '../assets/Dhruv_Resume.pdf';
import { Link } from 'react-router-dom';

const Hero = () => {
	const [isCasual, setCasualImage] = useState(false);
	const [isFlipped, setFlipped] = useState(false);

	const handleClick = () => {
		setCasualImage((prev) => !prev);
		setFlipped((prev) => !prev);
	};

	return (
		<section
			id='home'
			className={`flex sm:flex-row flex-col m-auto sm:pb-16 sm:mt-[-32px] py-6 sm:h-[100vh]`}
		>
			<div
				className={`h-[50vh] xs:h-auto my-[25%] ss:m-auto sm:flex-[1.3] lg:flex-1 ${styles.flexStart} flex-col xl:px-0 sm:pl-16 px-6`}
			>
				<div className='flex flex-col justify-between sm:items-start sm:text-left items-center text-center w-full'>
					<h1
						className='flex-1 font-semibold text-secondary 
                        md:text-[32px]
						text-[24px]'
					>
						Hi there! <br />
					</h1>
					<h1
						className='flex-1 font-semibold text-secondary 
                        lg:text-[50px]
                        md:text-[46px]
                        text-[36px]'
					>
						I'm Dhruv,
					</h1>
					<h1
						className='flex-1 font-semibold text-secondary 
                        lg:text-[50px]
                        md:text-[46px]
                        text-[36px]'
					>
						A Software Engineer
					</h1>
				</div>
				<div
					className={`${styles.flexCenter} sm:justify-start w-full mt-5`}
				>
					<a
						href='#contact'
						className='bg-tertiary text-primary dark:text-secondary px-2 py-1 mr-2 rounded-lg'
					>
						Contact
					</a>
					<Link to='/resume'>
						<button className='bg-tertiary text-primary dark:text-secondary px-2 py-1 ml-2 rounded-lg'>
							Resume
						</button>
					</Link>
				</div>
			</div>

			<div
				id='about'
				className={`${styles.flexStart} flex-col sm:pr-16 sm:pt-0 pt-10 px-6`}
			>
				<div className='flex-1 xs:flex-[0] flex flex-col justify-between items-center w-full h-[50vh] xs:h-auto my-[25%] ss:my-[10%] sm:m-auto'>
					<img
						src={isCasual ? casualDhruv : dhruv}
						alt='dhruv'
						className={`transition-transform duration-300 ease-linear cursor-pointer max-w-[180px] max-h-[180px] rounded-full ${
							isFlipped ? 'flip' : ''
						}`}
						onClick={handleClick}
						// onClick={() => setCasualImage((prev) => !prev)}
					/>
					<h1
						className='flex-1 font-semibold text-tertiary 
						text-[24px]
                        mt-5'
					>
						About me
					</h1>
					<p
						className={`text-secondary md:text-[16px] text-[14px] md:max-w-[450px] max-w-[380px] text-justify`}
					>
						Currently pursuing my Master of Professional Engineering
						(Software) at The Univeristy of Western Australia (UWA),
						I am driven by a pursuit of growth and knowledge. I
						approach each day with a commitment to learning and
						strive to give my best in every opportunity that comes
						my way. Embrancing challenges and seeking new
						experiences, I aim to continuously expand my skills and
						knowledge and strive for excellence in every endeavour.
					</p>
				</div>
			</div>
		</section>
	);
};

export default Hero;
