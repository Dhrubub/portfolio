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
			title: 'Full stack web app',
			image: PythonPerfect,
			skills: ['python', 'flask', 'Sqlite'],
			github: 'https://github.com/Dhrubub/PythonPerfect',
			// link: 'https://github.com/Dhrubub/PythonPerfect',
		},
		{
			title: 'Evolutionary Trading Bot',
			image: TradingBot,
			skills: ['python', 'genetic algorithm'],
			github: 'https://github.com/Dhrubub/Evolutionary-Trading-Bot',
		},
		{
			title: 'Community Spirit Foundation',
			image: CSF,
			skills: ['django', 'vue'],
			github: 'https://github.com/codersforcauses/csf',
		},
		{
			title: '3D Particle Simulator',
			image: Particles,
			skills: ['c#', 'unity'],
			github: 'https://github.com/Dhrubub/small-molecules',
		},
	];
	return (
		<section id='projects'>
			<div className='w-fit m-auto my-3 sm:my-6 px-3'>
				<h1 className='mb-1 px-4 font-semibold text-center text-tertiary text-[24px] sm:text-[48px]'>
					Projects
				</h1>
				<div className='sm:w-[300px] w-full border-t-[1px] border-t-tertiary opacity-75'></div>
			</div>

			<p className='m-auto w-fit text-[24px] text-secondary'>
				More projects coming soon!
			</p>
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
