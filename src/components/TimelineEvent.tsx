import React from 'react';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import TimeLineElements from './TimeLineElements';

const TimeLineEvent = ({
	title,
	position,
	description,
	date,
	skills,
	dotPercent,
	linePercent,
	index,
}) => {
	return (
		<TimelineItem>
			<TimelineOppositeContent>
				<span className='text-secondary text-[12px] sm:text-[14px]'>
					{date}
				</span>
			</TimelineOppositeContent>
			<TimelineSeparator>
				<TimelineDot
					sx={{
						border: 'none',
						padding: '6px',
						background: `linear-gradient(180deg, var(--tertiary) ${dotPercent}%, var(--secondary) 0%)`,
						boxShadow: 'none',
					}}
				/>

				<TimelineConnector
					sx={{
						background: `linear-gradient(180deg, var(--tertiary) ${linePercent}%, var(--secondary) 0%)`,
					}}
				/>
			</TimelineSeparator>
			<TimelineContent className='!pt-1 sm:!pt-0'>
				<div className='flex items-end'>
					<span className='text-tertiary font-semibold sm:text-[24px] text-[18px]'>
						{title}
						<span className='mx-2 text-tertiary font-light sm:text-[22px] text-[16px] align-top'>
							|
						</span>
						<span className='text-tertiary font-normal sm:text-[20px] text-[14px]'>
							{position}
						</span>
					</span>
				</div>

				<ul className='list-none'>
					{description.map((item, index) => (
						<li
							key={index}
							className='justify-start text-secondary max-w-[470px] sm:max-w-[640px] text-[12px] sm:text-[14px]'
						>
							&minus;&nbsp;{item}
						</li>
					))}
				</ul>
			</TimelineContent>
		</TimelineItem>
	);
};

export default TimeLineEvent;
