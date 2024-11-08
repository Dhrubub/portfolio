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
	r,
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

const Skills = ({ darkMode }) => {
	const items = [
		{ icon: js, name: 'JavaScript' },
		{ icon: ts, name: 'TypeScript' },
		{ icon: cpp, name: 'C++' },
		{ icon: java, name: 'Java' },
		{ icon: python, name: 'Python' },
		{ icon: html, name: 'HTML' },
		{ icon: r, name: 'R' },
		{ icon: react, name: 'React' },
		{ icon: angular, name: 'Angular' },
		{ icon: vue, name: 'Vue' },
		{ icon: darkMode ? dark_django : django, name: 'Django' },
		{ icon: git, name: 'Git' },
		{ icon: android, name: 'Android Studio' },
		{
			icon: darkMode ? dark_unity : unity,
			name: 'Unity',
		},
		{ icon: darkMode ? dark_ros : ros, name: 'ROS' },
		{
			icon: darkMode ? dark_jupyter : jupyter,
			name: 'Jupyter',
		},
		{ icon: darkMode ? dark_aws : aws, name: 'AWS' },
		{
			icon: darkMode ? dark_latex : latex,
			name: 'Latex',
		},
	];

	return (
		<section id='skills' className='my-6'>
			<div className='w-fit m-auto my-3 sm:my-6 px-3'>
				<h1 className='mb-1 px-4 font-semibold text-center text-tertiary text-[24px] sm:text-[48px]'>
					Skills
				</h1>
				<div className='sm:w-[300px] w-full border-t-[1px] border-t-tertiary opacity-75'></div>
			</div>
			<div
				className={`sm:px-16 ss:px-6 flex flex-1 justify-center items-center max-w-[800px] m-auto`}
			>
				<div className='rounded-lg w-full justify-center items-center grid grid-cols-6 gap-4 p-4'>
					{items.map((item, index) => (
						<span
							key={index}
							className='flex flex-col items-center'
						>
							<div className='min-h-[60px] justify-center flex'>
								<img
									className={`
									md:w-[50px] ss:w-[45px] w-[35px] m-auto ${
										item.name.toLowerCase() in
										['django', 'latex']
											? 'md:h-[50px] ss:h-[45px] h-[35px]'
											: ''
									}`}
									src={item.icon}
									alt={item.name}
									title={item.name}
								/>
							</div>
							<span className='text-[12px] hidden ss:block text-secondary text-center'>
								{item.name}
							</span>
						</span>
					))}
				</div>
			</div>
		</section>
	);
};

export default Skills;
