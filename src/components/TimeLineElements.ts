import {
	IconDefinition,
	faBriefcase,
	faGraduationCap,
	faLaptopCode,
} from '@fortawesome/free-solid-svg-icons';

interface TimeLineElementProps {
	title: string;
	position: string;
	description: string[];
	date: string;
	skills: string[];
	icon?: IconDefinition;
}

const exp = {
	visagio: {
		title: 'Visagio',
		position: 'Software Engineering Consultant',
		description: [
			'Developed features in a web tool using Angular and Typescript to streamline manual processes, resulting in a 15% increase in efficiency.',
			'Designed a structure to improve code quality and reduce code size by 10%.',
			'Led a project using Python and data visualization to streamline processes and achieve a 30% increase in efficiency.',
			'Implemented new APIs and fetched data with C#, SQL and .NET and managed the DevOps CI/CD cycle using tools such as Azure.',
		],
		date: 'May 2022 - March 2023',
		skills: [],
		icon: faBriefcase,
	},
	research: {
		title: 'UWA',
		position: 'Research Assistant',
		description: [
			'Created a deep learning model with Python and Keras to diagnose ear diseases from otoscopic images.',
			'Utilised LaTeX to present experimental results in a thesis and submitted a literature review in a journal.',
		],
		date: 'Nov 2022 - Present',
		skills: [],
		icon: faBriefcase,
	},
	soar: {
		title: 'Soar.Earth',
		position: 'Junior Software Engineer',
		description: [
			'Enhanced the UI of the Soar.Earth platform through React, Redux, Typescript, HTML, and CSS, contributing to a 10x increase in user registrations to 50,000.',
			'Performed automated testing using the React Testing Library and Cypress.',
			'Implemented new features, fixed bugs, and conducted QA testing under Agile practices.',
			'Upgraded legacy code and fixed bugs using Java and Android Studio.',
		],
		date: 'Aug 2020 - July 2022',
		skills: [],
		icon: faBriefcase,
	},
	facilitator: {
		title: 'UWA',
		position: 'Lab Facilitator',
		description: [
			'Tutored and assisted a class of 15 university students in CITS1001 Software Engineering with Java.',
			'Evaluated projects and assessments, offered constructive feedback, and monitored exams.',
		],
		date: 'March 2022 - June 2022',
		skills: [],
		icon: faBriefcase,
	},
	honours: {
		title: 'UWA',
		position: 'Honours in Software Engineering and Computer Science',
		description: [
			'First Class Honours',
			'Thesis title: Using deep learning to assist in \
			accurately diagnosing ear diseases from otoscopic images',
		],
		date: 'Feb 2022 - Nov 2022',
		skills: [],
		icon: faGraduationCap,
	},
	undergrad: {
		title: 'UWA',
		position: 'Engineering Science and Computer Science',
		description: ['WAM: 80.50%', 'GPA: 6.50 / 7'],
		date: 'Feb 2019 - Nov 2021',
		skills: [],
		icon: faGraduationCap,
	},
	masters: {
		title: 'UWA',
		position: 'Master of Professional Engineering (Software)',
		description: [
			'WAM: 85.67%',
			'GPA: 7.0 / 7',
			'Expected graduation end of 2024',
		],
		date: 'Feb 2023 - Present',
		skills: [],
		icon: faGraduationCap,
	},
	school: {
		title: 'Willetton Senior High School',
		position: 'High School',
		description: ['ATAR: 99.40 (Top 0.6% in the state)'],
		date: '2014 - 2018',
		skills: [],
		icon: faGraduationCap,
	},
	cfc_csf: {
		title: 'Coders for Causes',
		position: 'Volunteer Software Engineer',
		description: [
			'Fullstack web development using Django and Vue.js forthe not-for-profit Community Spirit Foundation.',
			'Designed and implemented crucial backend infrastructure, integrating it seamlessly with the frontend to enable login and perform CRUD operations for various applications.',
			'Collaborated with a team to develop various features, ensuring user experience and efficient functionality.',
		],
		date: 'June 2023 - July 2023',
		skills: [],
		icon: faLaptopCode,
	},
	canva: {
		title: 'Upcoming Summer Intern',
		position: 'Software Engineering Intern',
		description: [],
		date: 'December 2023 - February 2024',
		skills: [],
		icon: faBriefcase,
	},
};

const TimeLineElements: TimeLineElementProps[] = [
	// exp.canva,
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
