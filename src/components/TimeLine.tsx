import * as React from 'react';
import Timeline from '@mui/lab/Timeline';

import TimelineOppositeContent, {
	timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGit, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

import TimeLineElements from './TimeLineElements';
import TimeLineEvent from './TimeLineEvent';

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
				<TimeLineEvent
					key={index}
					{...event}
					index={index}
					dotPercent={dotsPercent[index]}
					linePercent={linesPercent[index]}
				/>
			))}
		</Timeline>
	);
}
export default TimeLine;
