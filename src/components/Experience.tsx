import React from 'react';
import TimeLine from './TimeLine';

const Experience = () => {
	return (
		<section id='experience' className='my-6'>
			<div className='w-fit m-auto my-3 sm:my-6 px-3'>
				<h1 className='mb-1 px-4 font-semibold text-center text-tertiary text-[24px] sm:text-[48px]'>
					Experience
				</h1>
				<div className='sm:w-[300px] w-full border-t-[1px] border-t-tertiary opacity-75'></div>
			</div>
			<TimeLine />
		</section>
	);
};

export default Experience;
