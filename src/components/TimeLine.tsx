import * as React from 'react';
import Timeline from '@mui/lab/Timeline';

import TimelineOppositeContent, {
	timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';

import TimeLineElements from './TimeLineElements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGit, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import TimelineEvent from './TimelineEvent';
function TimeLine() {
	const [dotsPercent, setDotsPercent] = React.useState([]);
	const [linesPercent, setLinesPercent] = React.useState([]);

	React.useEffect(() => {
		const handleScroll = () => {
			const timelineDotItems = Array.from(
				document.querySelectorAll('.MuiTimelineDot-root')
			);
			const timelineConnectorItems = Array.from(
				document.querySelectorAll('.MuiTimelineConnector-root')
			);

			const getPercentage = (item, thresh) => {
				const itemRect = item.getBoundingClientRect();
				const itemHeight = itemRect.height;
				const itemTop = itemRect.top;

				const percentageAboveThreshold =
					((thresh - itemTop) / itemHeight) * 100;

				if (percentageAboveThreshold < 0) return 0;
				return percentageAboveThreshold;
			};

			const viewportHeight = window.innerHeight;
			const topThreshold = 0.75 * viewportHeight;

			const dots = timelineDotItems.map((item) =>
				getPercentage(item, topThreshold)
			);

			const lines = timelineConnectorItems.map((item) =>
				getPercentage(item, topThreshold)
			);

			setDotsPercent(dots);
			setLinesPercent(lines);
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<Timeline
			sx={{
				[`& .${timelineOppositeContentClasses.root}`]: {
					flex: 0.2,
				},
				'@media (min-width: 768px)': {
					[`& .${timelineOppositeContentClasses.root}`]: {
						flex: 0.3,
					},
				},
				'@media (min-width: 1060px)': {
					[`& .${timelineOppositeContentClasses.root}`]: {
						flex: 0.4,
					},
				},
			}}
		>
			{TimeLineElements.map((event, index) => (
				<TimelineEvent
					key={index}
					{...event}
					index={index}
					dotPercent={dotsPercent[index]}
					linePercent={linesPercent[index]}
				/>
				// <TimelineItem key={index}>
				// 	<TimelineOppositeContent>
				// 		{event.title}
				// 	</TimelineOppositeContent>
				// 	<TimelineSeparator>
				// 		<TimelineDot
				// 			sx={{
				// 				border: 'none',
				// 				padding: '6px',
				// 				background: `linear-gradient(180deg, var(--tertiary) ${dotsPercent[index]}%, var(--secondary) 0%)`,
				// 			}}
				// 		/>

				// 		{/* <FontAwesomeIcon
				// 			icon={event.icon}
				// 			style={{
				// 				border: 'none',
				// 				padding: '6px',
				// 				color: `linear-gradient(180deg, var(--tertiary) ${dotsPercent[index]}%, var(--secondary) 0%)`,
				// 			}}
				// 		/> */}
				// 		{index < tm.length - 1 && (
				// 			<TimelineConnector
				// 				sx={{
				// 					background: `linear-gradient(180deg, var(--tertiary) ${linesPercent[index]}%, var(--secondary) 0%)`,
				// 				}}
				// 			/>
				// 		)}
				// 		{/* {index == tm.length - 1 && (
				// 			<TimelineDot
				// 				sx={{
				// 					border: 'none',
				// 					padding: '6px',
				// 					background: `linear-gradient(180deg, var(--tertiary) ${
				// 						dotsPercent[dotsPercent.length - 1]
				// 					}%, var(--secondary) 0%)`,
				// 				}}
				// 			/>
				// 		)} */}
				// 	</TimelineSeparator>
				// 	<TimelineContent>
				// 		<p className='text-secondary max-w-[470px]'>
				// 			{event.description}
				// 		</p>
				// 	</TimelineContent>
				// </TimelineItem>
			))}
		</Timeline>
	);
	// 		// <Timeline
	// 		// 	sx={{
	// 		// 		[`& .${timelineOppositeContentClasses.root}`]: {
	// 		// 			flex: 0.3,
	// 		// 		},
	// 		// 	}}
	// 		// >
	// 		// 	<TimelineItem>
	// 		// 		<TimelineOppositeContent>09:30 am</TimelineOppositeContent>
	// 		// 		<TimelineSeparator>
	// 		// 			<TimelineDot
	// 		// 				sx={{
	// 		// 					bgcolor: isAboveHalf[0] ? 'red' : 'grey',
	// 		// 				}}
	// 		// 			/>
	// 		// 			<TimelineConnector
	// 		// 				sx={{
	// 		// 					bgcolor: isAboveHalf[0] ? 'red' : 'grey',
	// 		// 				}}
	// 		// 			/>
	// 		// 		</TimelineSeparator>
	// 		// 		<TimelineContent>
	// 		// 			<h1>Lorem Ipsum</h1>
	// 		// 			<p>
	// 		// 				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
	// 		// 				Nullam tempus ipsum eget nulla ultrices commodo.
	// 		// 			</p>
	// 		// 			<ul>
	// 		// 				<li>Lorem ipsum dolor sit amet</li>
	// 		// 				<li>Consectetur adipiscing elit</li>
	// 		// 				<li>Nullam tempus ipsum eget nulla</li>
	// 		// 				<li>Ultrices commodo</li>
	// 		// 			</ul>{' '}
	// 		// 			<h1>Lorem Ipsum</h1>
	// 		// 			<p>
	// 		// 				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
	// 		// 				Nullam tempus ipsum eget nulla ultrices commodo.
	// 		// 			</p>
	// 		// 			<ul>
	// 		// 				<li>Lorem ipsum dolor sit amet</li>
	// 		// 				<li>Consectetur adipiscing elit</li>
	// 		// 				<li>Nullam tempus ipsum eget nulla</li>
	// 		// 				<li>Ultrices commodo</li>
	// 		// 			</ul>
	// 		// 			<h1>Lorem Ipsum</h1>
	// 		// 			<p>
	// 		// 				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
	// 		// 				Nullam tempus ipsum eget nulla ultrices commodo.
	// 		// 			</p>
	// 		// 			<ul>
	// 		// 				<li>Lorem ipsum dolor sit amet</li>
	// 		// 				<li>Consectetur adipiscing elit</li>
	// 		// 				<li>Nullam tempus ipsum eget nulla</li>
	// 		// 				<li>Ultrices commodo</li>
	// 		// 			</ul>
	// 		// 		</TimelineContent>
	// 		// 	</TimelineItem>
	// 		// 	<TimelineItem>
	// 		// 		<TimelineOppositeContent>10:00 am</TimelineOppositeContent>
	// 		// 		<TimelineSeparator>
	// 		// 			<TimelineDot
	// 		// 				sx={{
	// 		// 					bgcolor: isAboveHalf[1] ? 'red' : 'grey',
	// 		// 				}}
	// 		// 			/>
	// 		// 		</TimelineSeparator>
	// 		// 		<TimelineContent>Code</TimelineContent>
	// 		// 	</TimelineItem>
	// 		// </Timeline>
	// 	);
	// }
}
export default TimeLine;
