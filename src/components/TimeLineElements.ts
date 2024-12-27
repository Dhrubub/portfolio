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
		position: 'Technology Consultant Intern',
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
			'Published a literature review in EUVIP 2023 titled: Classical approaches and new deep learning trends to assist in accurately and efficiently diagnosing ear disease from otoscopic images.',
			'Created a deep learning model with Python and Keras to diagnose ear diseases from otoscopic images.',
		],
		date: 'Nov 2022 - Sep 2023',
		skills: [],
		icon: faBriefcase,
	},
	soar: {
		title: 'Soar.Earth',
		position: 'Software Engineer Intern',
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
		date: 'Mar 2022 - Jun 2022',
		skills: [],
		icon: faBriefcase,
	},
	honours: {
		title: 'UWA',
		position:
			'Bachelor of Science with First Class Honours (Software Engineering and Computer Science)',
		description: [
			'WAM: 82.13%',
			'GPA: 6.40 / 7',
			'Thesis title: Using deep learning to assist in \
			accurately diagnosing ear diseases from otoscopic images.',
		],
		date: 'Feb 2022 - Nov 2022',
		skills: [],
		icon: faGraduationCap,
	},
	undergrad: {
		title: 'UWA',
		position: 'Bachelor of Science (Engineering Science, Computer Science)',
		description: ['WAM: 80.50%', 'GPA: 6.50 / 7'],
		date: 'Feb 2019 - Nov 2021',
		skills: [],
		icon: faGraduationCap,
	},
	masters: {
		title: 'UWA',
		position:
			'Master of Professional Engineering with Distinction (Software)',
		description: ['WAM: 82.36%', 'GPA: 6.73 / 7'],
		date: 'Feb 2023 - Dec 2024',
		skills: [],
		icon: faGraduationCap,
	},
	school: {
		title: 'Willetton Senior High School',
		position: 'High School',
		description: [
			'ATAR: 99.40 (Top 0.6% in the state)',
			'Subjects: Math Specialist, Math Methods, Chemistry, Physics, English, Hindi',
		],
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
	canva_intern: {
		title: 'Canva',
		position: 'Software Engineer Intern (Frontend)',
		description: [
			'Utilised TypeScript and MobX to develop features for an accessibility design checker, empowering users to enhance the accessibility of their designs in compliance with accessibility standards such as WCAG.',
			'Reduced the volume of help tickets by implementing a tool that identifies and addresses accessibility issues in user designs, improving the overall user experience.',
			'Maintained comprehensive documentation, to facilitate understanding, collaboration and future maintenance by team members.',
		],
		date: 'Dec 2023 - Feb 2024',
		skills: [],
		icon: faBriefcase,
	},
	canva: {
		title: 'Canva',
		position: 'Upcoming Graduate Software Engineer (Frontend)',
		description: [
			'Upcoming Graduate Frontend Software Engineer for the Accessibility Team.',
		],
		date: 'Starting Feb 2025',
		skills: [],
		icon: faBriefcase,
	},
};

const TimeLineElements: TimeLineElementProps[] = [
	exp.canva,
	exp.masters,
	exp.canva_intern,
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
