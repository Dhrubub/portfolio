import React from 'react';
import styles from '../style';

import dhruv from '../assets/dhruv.png';
import resume from '../assets/Dhruv_Resume.pdf';

const Hero = () => {
	return (
		<section
			id='home'
			className={`flex sm:flex-row flex-col ${styles.paddingY} sm:h-[100vh]`}
		>
			<div
				className={`h-[50vh] xs:h-auto my-[25%] xs:m-auto sm:flex-[1.3] lg:flex-1 ${styles.flexStart} flex-col xl:px-0 sm:pl-16 px-6`}
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
					<button
						className='bg-tertiary text-primary dark:text-secondary px-2 py-1 ml-2 rounded-lg'
						onClick={() => window.open(resume, '_blank')}
					>
						Resume
					</button>
				</div>
			</div>

			<div
				className={`flex-1 ${styles.flexStart} flex-col sm:pr-16 sm:pt-0 pt-10 px-6 h-[50vh] xs:h-auto my-[25%] xs:m-auto`}
			>
				<div className='flex flex-col justify-between items-center w-full'>
					<img
						src={dhruv}
						alt='dhruv'
						className='
                        max-w-[180px] max-h-[180px]
                        rounded-full'
					/>
					<h1
						className='flex-1 font-normal text-tertiary 
						text-[24px]
                        mt-5'
					>
						About me
					</h1>
					<p
						className={`text-secondary md:text-[16px] text-[14px] max-w-[470px] text-justify`}
					>
						Currently pursuing my Master of Professional Engineering
						(Software) at The Univeristy of Western Australia, I am
						driven by a pursuit of growth and knowledge. I approach
						each day with a commitment to learning and strive to
						give my best in every opportunity that comes my way.
						Embrancing challenges and seeking new experiences, I aim
						to continuously expand my skills and knowledge and
						strive for excellence in every endeavour.
					</p>
				</div>
			</div>
		</section>
	);
};

export default Hero;
