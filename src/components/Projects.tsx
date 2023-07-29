import React from 'react';

import {
	react,
	angular,
	vue,
	django,
	android,
	unity,
	ros,
	jupyter,
	aws,
	git,
	js,
	ts,
	cpp,
	java,
	python,
	html,
	css,
	latex,
	dark_aws,
	dark_django,
	dark_jupyter,
	dark_latex,
	dark_ros,
	dark_unity,
} from './index';
import ProjectCard from './ProjectCard';
import styles from '../style';

import PythonPerfect from '../assets/projects/python-perfect.png';
import TradingBot from '../assets/projects/trading-bot.png';
import CSF from '../assets/projects/csf.png';
import Particles from '../assets/projects/particles.png';

const Projects = () => {
	const projects = [
		{
			title: 'Python Perfect',
			image: PythonPerfect,
			skills: [],
			github: 'https://github.com/Dhruv8601/PythonPerfect',
			link: 'https://github.com/Dhruv8601/PythonPerfect',
		},
		{ title: 'Evolutionary Trading Bot', image: TradingBot, skills: [] },
		{
			title: 'Community Spirit Foundation',
			image: CSF,
			skills: [],
		},
		{ title: '3D Particle Simulator', image: Particles, skills: [] },
		{ title: 'Full stack web app', image: PythonPerfect, skills: [] },
	];
	return (
		<section id='projects'>
			<div className='w-fit m-auto my-3 sm:my-6 px-3'>
				<h1 className='mb-1 px-4 font-semibold text-center text-tertiary text-[24px] sm:text-[48px]'>
					Projects
				</h1>
				<div className='sm:w-[300px] w-full border-t-[1px] border-t-tertiary opacity-75'></div>
			</div>
			{/* <div
				className={`sm:px-16 ss:px-6 flex flex-1 flex-wrap justify-center items-center max-w-[800px] m-auto`}
			>
				{projects.map((item, index) => (
					<div>
						<ProjectCard title={item.title} skills={[]} />
					</div>
				))}
			</div> */}

			<div className='flex flex-wrap justify-center max-w-[1600px] feedback-container relative m-auto'>
				{projects.map((project, index) => (
					<div className='p-3'>
						<ProjectCard key={index} {...project} />
					</div>
				))}
			</div>
		</section>
	);
};

export default Projects;
