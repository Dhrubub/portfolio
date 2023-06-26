import styles from '../style';
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
} from './index';

// const items = [
// 	{ icon: react, name: 'React' },
// 	{ icon: angular, name: 'Angular' },
// 	{ icon: vue, name: 'Vue' },
// 	{ icon: django, name: 'Django' },
// 	{ icon: android, name: 'Android' },
// 	{ icon: unity, name: 'Unity' },
// 	{ icon: ros, name: 'ROS' },
// 	{ icon: jupyter, name: 'Jupyter' },
// 	{ icon: aws, name: 'AWS' },
// 	{ icon: git, name: 'Git' },
// 	{ icon: js, name: 'JavaScript' },
// 	{ icon: ts, name: 'TypeScript' },
// 	{ icon: cpp, name: 'C++' },
// 	{ icon: java, name: 'Java' },
// 	{ icon: python, name: 'Python' },
// 	{ icon: html, name: 'HTML' },
// 	{ icon: css, name: 'CSS' },
// ];

const Skills = () => {
	return (
		<section
			className={`${styles.paddingX} flex flex-1 justify-center items-center max-w-[800px] w-[80%] m-auto`}
		>
			{/* <div className='shadow rounded-lg w-full justify-center items-center grid grid-cols-4 gap-4'>
				{items.map((item, index) => (
					<span key={index} className='flex flex-col items-center'>
						<img
							className='w-[20px]'
							src={item.icon}
							alt={item.name}
						/>
						<span className='text-xs'>{item.name}</span>
					</span>
				))}
			</div> */}
		</section>
	);
};

export default Skills;
