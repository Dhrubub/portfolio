import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

interface TimeLineElementProps {
	title: string;
	position: string;
	description: string[];
	date: string;
	skills: string[];
}

const TimeLineElements: TimeLineElementProps[] = [
	{
		title: 'Visagio',
		position: 'Software Engineering Consultant',
		description: [
			'Developed features in a web tool using Angular and Typescript to streamline manual processes, resulting in a 15% increase in efficiency.',
			'Designed a structure to improve code quality and reduce code size by 10%.',
			'Led a project using Python and data visualization to streamline processes and achieve a 30% increase in efficiency.',
			'Interacted with clients to provide solutions and promptly responded to feedback by making necessary changes.',
			'Implemented new APIs and fetched data using C#, SQL, and .NET.',
		],
		date: 'May 2022 - March 2023',
		skills: [],
	},
	{
		title: 'The University of Western Australia',
		position: 'Research Assistant',
		description: [
			'Created a deep learning model with Python and Keras to diagnose ear diseases from otoscopic images.',
			'Utilized LaTeX to present experimental results in a thesis and submitted a literature review in a journal.',
		],
		date: 'Nov 2022 - Present',
		skills: [],
	},
	{
		title: 'Soar.Earth',
		position: 'Junior Software Engineer',
		description: [
			'Enhanced the UI of the Soar.Earth platform through React, Redux, Typescript, HTML, and CSS, contributing to a 10x increase in user registrations to 50,000',
			'Performed automated testing using the React Testing Library and Cypress',
			'Implemented new features, fixed bugs, and conducted QA testing under Agile practices',
			'Upgraded legacy code and fixed bugs using Java and Android Studio',
		],
		date: 'Aug 2020 - July 2022',
		skills: [],
	},
	{
		title: 'The University of Western Australia',
		position: 'Lab Facilitator',
		description: [
			'Tutored and assisted a class of 15 university students in CITS1001 Software Engineering with Java.',
			'Evaluated projects and assessments, offered constructive feedback, and monitored exams.',
		],
		date: 'March 2022 - June 2022',
		skills: [],
	},
];

export default TimeLineElements;
