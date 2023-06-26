import React from 'react';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	IconDefinition,
	faBriefcase,
	faGraduationCap,
	faLaptopCode,
} from '@fortawesome/free-solid-svg-icons';

interface TimeLineCardProps {
	title: string;
	position: string;
	description: string[];
	date: string;
	skills: string[];
	dotPercent: number;
	linePercent: number;
	index: number;
	icon?: IconDefinition;
}

const TimeLineCard = ({
	title,
	position,
	description,
	date,
	skills,
	dotPercent,
	linePercent,
	index,
	icon,
}: TimeLineCardProps) => {
	return (
		<TimelineItem>
			<TimelineOppositeContent className='!px-[0px]'>
				<span className='font-poppins flex-1 text-secondary text-[9px] xs:text-[10px] sm:text-[14px] items-end min-w-[300px]'>
					{date}
				</span>
			</TimelineOppositeContent>
			<TimelineSeparator className='px-[8px]'>
				{icon ? (
					<FontAwesomeIcon
						title={`${
							icon == faBriefcase
								? 'Work'
								: icon == faGraduationCap
								? 'Education'
								: 'Volunteering'
						}`}
						className={`timeline-dot py-[12px] w-[20px] ${
							dotPercent > 0 ? 'text-tertiary' : 'text-secondary'
						}`}
						icon={icon}
					/>
				) : (
					<TimelineDot
						className='timeline-dot'
						sx={{
							border: 'none',
							padding: '6px',
							background:
								dotPercent > 0
									? 'var(--tertiary)'
									: 'var(--secondary)',
							// background: `linear-gradient(180deg, var(--tertiary) ${dotPercent}%, var(--secondary) 0%)`,
							boxShadow: 'none',
						}}
					/>
				)}

				<TimelineConnector
					sx={{
						background: `linear-gradient(180deg, var(--tertiary) ${
							linePercent > 0 ? linePercent : 0
						}%, var(--secondary) 0%)`,
					}}
				/>
			</TimelineSeparator>
			<TimelineContent className='!font-poppins !pt-1 sm:!pt-0 !px-[0px]'>
				<div className='flex items-end'>
					<span className='text-tertiary font-semibold sm:text-[24px] text-[18px] max-w-[470px] sm:max-w-[640px]'>
						{title}
						<span className='mx-2 text-tertiary font-light sm:text-[22px] text-[16px]'>
							|
						</span>
						<span className='text-tertiary font-normal sm:text-[20px] text-[14px]'>
							{position}
						</span>
					</span>
				</div>

				<ul className='list-none text-justify'>
					{description.map((item, index) => (
						<li
							key={index}
							className='flex flex-row justify-start text-secondary max-w-[470px] sm:max-w-[640px] text-[12px] sm:text-[14px]'
						>
							<span className='mr-2'>&minus;</span>
							<span>{item}</span>
						</li>
					))}
				</ul>
			</TimelineContent>
		</TimelineItem>
	);
};

export default TimeLineCard;
