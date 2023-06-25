import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

interface TimeLineElementProps {
	title: string;
	position: string;
	description: string[];
	date: string;
	skills: string[];
}

const exp = {
	visagio: {
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
	research: {
		title: 'The University of Western Australia',
		position: 'Research Assistant',
		description: [
			'Created a deep learning model with Python and Keras to diagnose ear diseases from otoscopic images.',
			'Utilized LaTeX to present experimental results in a thesis and submitted a literature review in a journal.',
		],
		date: 'Nov 2022 - Present',
		skills: [],
	},
	soar: {
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
	facilitator: {
		title: 'The University of Western Australia',
		position: 'Lab Facilitator',
		description: [
			'Tutored and assisted a class of 15 university students in CITS1001 Software Engineering with Java.',
			'Evaluated projects and assessments, offered constructive feedback, and monitored exams.',
		],
		date: 'March 2022 - June 2022',
		skills: [],
	},
	honours: {
		title: 'The University of Western Australia',
		position: 'Honours in Software Enginnering and Computer Science',
		description: [
			'First Class Honours',
			'Thesis title: Using deep learning to assist in \
			accurately diagnosing ear diseases from otoscopic images',
		],
		date: 'Feb 2022 - Nov 2022',
		skills: [],
	},
	undergrad: {
		title: 'The University of Western Australia',
		position: 'Engineering Science and Computer Science',
		description: ['WAM: 80.50%', 'GPA: 6.50 / 7'],
		date: 'Feb 2019 - Nov 2021',
		skills: [],
	},
	masters: {
		title: 'The University of Western Australia',
		position: 'Master of Professional Engineering (Software)',
		description: [],
		date: 'Feb 2023 - Present',
		skills: [],
	},
	school: {
		title: 'Willetton Senior High School',
		position: 'High School',
		description: ['ATAR: 99.40 (Top 0.6% in the state)'],
		date: '2014 - 2018',
		skills: [],
	},
	cfc_csf: {
		title: 'Coders for Causes',
		position: 'Volunteer Software Engineer',
		description: [
			'Working as a full stack developer for \
		a project for the not-for-profit organisation Community Spirit Foundation',
		],
		date: 'June 2023 - Present',
		skills: [],
	},
};

const TimeLineElements: TimeLineElementProps[] = [
	exp.masters,
	exp.cfc_csf,
	exp.research,
	exp.visagio,
	exp.honours,
	exp.soar,
	exp.facilitator,
	exp.undergrad,
	exp.school,
];

export default TimeLineElements;
