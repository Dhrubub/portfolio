import {
	IconDefinition,
	faBriefcase,
	faGraduationCap,
	faLaptopCode,
} from '@fortawesome/free-solid-svg-icons';

import react from '../assets/logos/react.svg';
import angular from '../assets/logos/angular.svg';
import vue from '../assets/logos/vue.svg';
import django from '../assets/logos/django.svg';
import dark_django from '../assets/logos/dark/django.svg';
import android from '../assets/logos/android.svg';
import unity from '../assets/logos/unity.svg';
import dark_unity from '../assets/logos/dark/unity.svg';
import ros from '../assets/logos/ros.svg';
import dark_ros from '../assets/logos/dark/ros.svg';
import jupyter from '../assets/logos/jupyter.svg';
import dark_jupyter from '../assets/logos/dark/jupyter.svg';
import aws from '../assets/logos/aws.svg';
import dark_aws from '../assets/logos/dark/aws.svg';
import git from '../assets/logos/git.svg';
import js from '../assets/logos/js.svg';
import ts from '../assets/logos/ts.svg';
import cpp from '../assets/logos/cpp.svg';
import java from '../assets/logos/java.svg';
import python from '../assets/logos/python.svg';
import html from '../assets/logos/html.svg';
import r from '../assets/logos/R.svg';
import latex from '../assets/logos/latex.svg';
import dark_latex from '../assets/logos/dark/latex.svg';

import PythonPerfect from '../assets/projects/python-perfect.png';
import TradingBot from '../assets/projects/trading-bot.png';
import CSF from '../assets/projects/csf.png';
import Particles from '../assets/projects/particles.png';

/* ----------------------------- profile / live ----------------------------- */

export const profile = {
	name: 'Dhruv Jobanputra',
	first: 'Dhruv',
	roles: ['a software engineer', 'a frontend dev', 'an a11y nerd', 'a tinkerer'],
	location: 'Perth, Australia',
	timezone: 'Australia/Perth',
	status: 'Frontend Engineer @ Canva',
	nowBuilding: 'this very website 👀',
	bio: 'Recently graduated with a Master of Professional Engineering (Software) with Distinction from UWA, and now a Frontend Engineer at Canva on the Accessibility team. I like building things that are calm to use and quietly over-engineered — and making the web work for everyone.',
	email: 'dhruvjobanputra8@gmail.com',
	resumeLabel: 'Résumé',
};

export const socials = [
	{ id: 'github', label: 'GitHub', url: 'https://github.com/Dhrubub' },
	{
		id: 'linkedin',
		label: 'LinkedIn',
		url: 'https://www.linkedin.com/in/dhruvjobanputra/',
	},
	{ id: 'email', label: 'Email', url: 'mailto:dhruvjobanputra8@gmail.com' },
];

/* ------------------------------- skills ------------------------------- */

export interface Skill {
	id: string;
	label: string;
	icon: string;
	iconDark?: string;
	/** family for grouping */
	group: 'languages' | 'frameworks' | 'tools';
}

export const skills: Skill[] = [
	{ id: 'ts', label: 'TypeScript', icon: ts, group: 'languages' },
	{ id: 'js', label: 'JavaScript', icon: js, group: 'languages' },
	{ id: 'python', label: 'Python', icon: python, group: 'languages' },
	{ id: 'java', label: 'Java', icon: java, group: 'languages' },
	{ id: 'cpp', label: 'C++', icon: cpp, group: 'languages' },
	{ id: 'html', label: 'HTML/CSS', icon: html, group: 'languages' },
	{ id: 'r', label: 'R', icon: r, group: 'languages' },
	{ id: 'react', label: 'React', icon: react, group: 'frameworks' },
	{ id: 'angular', label: 'Angular', icon: angular, group: 'frameworks' },
	{ id: 'vue', label: 'Vue', icon: vue, group: 'frameworks' },
	{
		id: 'django',
		label: 'Django',
		icon: django,
		iconDark: dark_django,
		group: 'frameworks',
	},
	{ id: 'git', label: 'Git', icon: git, group: 'tools' },
	{ id: 'android', label: 'Android', icon: android, group: 'tools' },
	{
		id: 'unity',
		label: 'Unity',
		icon: unity,
		iconDark: dark_unity,
		group: 'tools',
	},
	{ id: 'ros', label: 'ROS', icon: ros, iconDark: dark_ros, group: 'tools' },
	{
		id: 'jupyter',
		label: 'Jupyter',
		icon: jupyter,
		iconDark: dark_jupyter,
		group: 'tools',
	},
	{ id: 'aws', label: 'AWS', icon: aws, iconDark: dark_aws, group: 'tools' },
	{
		id: 'latex',
		label: 'LaTeX',
		icon: latex,
		iconDark: dark_latex,
		group: 'tools',
	},
];

/* ------------------------------ experience ------------------------------ */

export type ExpKind = 'work' | 'education' | 'volunteer';

export interface ExperienceItem {
	id: string;
	org: string;
	role: string;
	date: string;
	/** sort/scrub key — the year the role started (or is anchored to) */
	year: number;
	kind: ExpKind;
	icon: IconDefinition;
	description: string[];
	/** skill ids used here — powers the interactive skills highlight */
	tech: string[];
	current?: boolean;
}

const iconFor = (kind: ExpKind): IconDefinition =>
	kind === 'education'
		? faGraduationCap
		: kind === 'volunteer'
		? faLaptopCode
		: faBriefcase;

const make = (
	i: Omit<ExperienceItem, 'icon'> & { icon?: IconDefinition }
): ExperienceItem => ({ ...i, icon: i.icon ?? iconFor(i.kind) });

export const experience: ExperienceItem[] = [
	make({
		id: 'canva-grad',
		org: 'Canva',
		role: 'Graduate Software Engineer (Frontend)',
		date: 'Feb 2025 — now',
		year: 2025,
		kind: 'work',
		current: true,
		tech: ['ts', 'react'],
		description: [
			'Frontend engineer on the Accessibility team — making Canva usable for everyone.',
		],
	}),
	make({
		id: 'masters',
		org: 'UWA',
		role: 'Master of Professional Engineering, Distinction (Software)',
		date: 'Feb 2023 — Dec 2024',
		year: 2023,
		kind: 'education',
		tech: [],
		description: ['WAM 82.36%', 'GPA 6.73 / 7'],
	}),
	make({
		id: 'canva-intern',
		org: 'Canva',
		role: 'Software Engineer Intern (Frontend)',
		date: 'Dec 2023 — Feb 2024',
		year: 2023.9,
		kind: 'work',
		tech: ['ts', 'react'],
		description: [
			'Built features for an accessibility design checker with TypeScript & MobX, helping users meet standards like WCAG.',
			'Shipped a tool that flags & fixes a11y issues in designs — cutting related help tickets.',
			'Kept the docs comprehensive so the team could keep moving after me.',
		],
	}),
	make({
		id: 'csf',
		org: 'Coders for Causes',
		role: 'Volunteer Software Engineer',
		date: 'Jun 2023 — Jul 2023',
		year: 2023.5,
		kind: 'volunteer',
		tech: ['django', 'vue', 'python'],
		description: [
			'Full-stack work with Django & Vue.js for the not-for-profit Community Spirit Foundation.',
			'Designed backend infrastructure and wired up auth + CRUD across several apps.',
			'Collaborated with a team to ship features with a focus on UX.',
		],
	}),
	make({
		id: 'research',
		org: 'UWA',
		role: 'Research Assistant',
		date: 'Nov 2022 — Sep 2023',
		year: 2022.8,
		kind: 'work',
		tech: ['python', 'jupyter'],
		description: [
			'Published a literature review at EUVIP 2023 on diagnosing ear disease from otoscopic images with deep learning.',
			'Built a deep-learning model in Python & Keras to classify ear diseases.',
		],
	}),
	make({
		id: 'honours',
		org: 'UWA',
		role: 'BSc, First Class Honours (Software Eng & CS)',
		date: 'Feb 2022 — Nov 2022',
		year: 2022,
		kind: 'education',
		tech: ['python'],
		description: [
			'WAM 82.13% · GPA 6.40 / 7',
			'Thesis: using deep learning to diagnose ear diseases from otoscopic images.',
		],
	}),
	make({
		id: 'visagio',
		org: 'Visagio',
		role: 'Technology Consultant Intern',
		date: 'May 2022 — Mar 2023',
		year: 2022.4,
		kind: 'work',
		tech: ['angular', 'ts', 'python'],
		description: [
			'Built web-tool features in Angular & TypeScript that streamlined manual processes (~15% more efficient).',
			'Restructured code to improve quality and shrink the bundle ~10%.',
			'Led a Python data-viz project that lifted process efficiency ~30%.',
			'Wrote APIs and fetched data with C#, SQL & .NET; ran the CI/CD on Azure.',
		],
	}),
	make({
		id: 'soar',
		org: 'Soar.Earth',
		role: 'Software Engineer Intern',
		date: 'Aug 2020 — Jul 2022',
		year: 2020.6,
		kind: 'work',
		tech: ['react', 'ts', 'java', 'android'],
		description: [
			'Reworked the Soar.Earth UI in React, Redux & TypeScript — part of a 10× jump in registrations to 50,000.',
			'Automated testing with React Testing Library & Cypress.',
			'Shipped features, fixed bugs and ran QA under Agile.',
			'Modernised legacy code with Java & Android Studio.',
		],
	}),
	make({
		id: 'facilitator',
		org: 'UWA',
		role: 'Lab Facilitator',
		date: 'Mar 2022 — Jun 2022',
		year: 2022.2,
		kind: 'work',
		tech: ['java'],
		description: [
			'Tutored ~15 students through CITS1001 Software Engineering (Java).',
			'Marked projects, gave feedback and invigilated exams.',
		],
	}),
	make({
		id: 'undergrad',
		org: 'UWA',
		role: 'BSc (Engineering Science, Computer Science)',
		date: 'Feb 2019 — Nov 2021',
		year: 2019,
		kind: 'education',
		tech: [],
		description: ['WAM 80.50% · GPA 6.50 / 7'],
	}),
	make({
		id: 'school',
		org: 'Willetton SHS',
		role: 'High School',
		date: '2014 — 2018',
		year: 2014,
		kind: 'education',
		tech: [],
		description: [
			'ATAR 99.40 (top 0.6% in the state)',
			'Specialist & Methods Maths, Chemistry, Physics, English, Hindi',
		],
	}),
];

/* ------------------------------- projects ------------------------------- */

export interface Project {
	id: string;
	title: string;
	blurb: string;
	image: string;
	stack: string[];
	/** skill ids — powers interactive skills highlight */
	tech: string[];
	github?: string;
	link?: string;
}

export const projects: Project[] = [
	{
		id: 'python-perfect',
		title: 'PythonPerfect',
		blurb: 'A full-stack web app for learning Python, interactively.',
		image: PythonPerfect,
		stack: ['Python', 'Flask', 'SQLite'],
		tech: ['python', 'html'],
		github: 'https://github.com/Dhrubub/PythonPerfect',
	},
	{
		id: 'trading-bot',
		title: 'Evolutionary Trading Bot',
		blurb: 'A genetic algorithm that evolves trading strategies over time.',
		image: TradingBot,
		stack: ['Python', 'Genetic Algorithm'],
		tech: ['python'],
		github: 'https://github.com/Dhrubub/Evolutionary-Trading-Bot',
	},
	{
		id: 'csf',
		title: 'Community Spirit Foundation',
		blurb: 'Full-stack site for a not-for-profit, built with Coders for Causes.',
		image: CSF,
		stack: ['Django', 'Vue'],
		tech: ['django', 'vue'],
		github: 'https://github.com/codersforcauses/csf',
	},
	{
		id: 'particles',
		title: '3D Particle Simulator',
		blurb: 'A real-time particle/molecule sim built in Unity.',
		image: Particles,
		stack: ['C#', 'Unity'],
		tech: ['unity'],
		github: 'https://github.com/Dhrubub/small-molecules',
	},
];

/** map of skill id -> where it was used, for the interactive skills hover */
export const skillUsage: Record<string, { exp: string[]; proj: string[] }> = (() => {
	const m: Record<string, { exp: string[]; proj: string[] }> = {};
	for (const s of skills) m[s.id] = { exp: [], proj: [] };
	for (const e of experience)
		for (const t of e.tech) if (m[t]) m[t].exp.push(e.id);
	for (const p of projects)
		for (const t of p.tech) if (m[t]) m[t].proj.push(p.id);
	return m;
})();
