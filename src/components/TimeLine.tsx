// import * as React from 'react';
// import Timeline from '@mui/lab/Timeline';
// import TimelineItem from '@mui/lab/TimelineItem';
// import TimelineSeparator from '@mui/lab/TimelineSeparator';
// import TimelineConnector from '@mui/lab/TimelineConnector';
// import TimelineContent from '@mui/lab/TimelineContent';
// import TimelineDot from '@mui/lab/TimelineDot';
// import TimelineOppositeContent, {
// 	timelineOppositeContentClasses,
// } from '@mui/lab/TimelineOppositeContent';

// import tm from './timelineElements';

// export default function OppositeContentTimeline() {
// 	const [isAboveHalf, setIsAboveHalf] = React.useState([false, false]);

// 	// React.useEffect(() => {
// 	// 	const handleScroll = () => {
// 	// 		const timelineItems = Array.from(
// 	// 			document.querySelectorAll('.MuiTimelineItem-root')
// 	// 		);
// 	// 		const halfOfViewport = window.innerHeight / 2;

// 	// 		const isAboveHalfArr = timelineItems.map((item) => {
// 	// 			const itemRect = item.getBoundingClientRect();
// 	// 			return itemRect.top < halfOfViewport;
// 	// 		});

// 	// 		setIsAboveHalf(isAboveHalfArr);
// 	// 	};

// 	// 	window.addEventListener('scroll', handleScroll);
// 	// 	return () => {
// 	// 		window.removeEventListener('scroll', handleScroll);
// 	// 	};
// 	// }, []);

// 	return (
// 		<Timeline
// 			sx={{
// 				[`& .${timelineOppositeContentClasses.root}`]: {
// 					flex: 0.3,
// 				},
// 			}}
// 		>
// 			{tm.map((event, index) => (
// 				<TimelineItem key={index}>
// 					<TimelineOppositeContent>
// 						{event.title}
// 					</TimelineOppositeContent>
// 					<TimelineSeparator>
// 						<TimelineDot
// 							sx={{
// 								bgcolor: isAboveHalf[0] ? 'red' : 'grey',
// 							}}
// 						/>
// 						<TimelineConnector
// 							sx={{
// 								bgcolor: isAboveHalf[0] ? 'red' : 'grey',
// 							}}
// 						/>
// 					</TimelineSeparator>
// 					<TimelineContent>{event.description}</TimelineContent>
// 				</TimelineItem>
// 			))}
// 		</Timeline>
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

import React from 'react';

const TimeLine = () => {
	return <div>TimeLine</div>;
};

export default TimeLine;
