import * as React from 'react';
import Timeline from '@mui/lab/Timeline';

import TimelineOppositeContent, {
	timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGit, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBriefcase, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import TimeLineElements from './TimeLineElements';
import TimeLineCard from './TimeLineCard';

function TimeLine() {
	const [dotsPercent, setDotsPercent] = React.useState([]);
	const [linesPercent, setLinesPercent] = React.useState([]);
	const [eventCount, setEventCount] = React.useState(6);

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
	}, [eventCount]);

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
			{TimeLineElements.slice(0, eventCount).map((item, index) => (
				<TimeLineCard
					key={index}
					{...item}
					index={index}
					dotPercent={dotsPercent[index]}
					linePercent={linesPercent[index]}
				/>
			))}
			{eventCount < TimeLineElements.length && (
				<FontAwesomeIcon
					icon={faCirclePlus}
					className='text-[28px] mt-6 text-secondary cursor-pointer'
					onClick={() => setEventCount((prev) => prev + 1)}
				/>
			)}
		</Timeline>
	);
}
export default TimeLine;
