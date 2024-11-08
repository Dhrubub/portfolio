import resume from '../assets/Dhruv_Resume.pdf';

const Resume = () => {
	return (
		<div className='h-screen flex flex-col'>
			<iframe
				src={resume}
				className='h-full w-full'
				title="Dhruv's Resume"
			/>
		</div>
	);
};

export default Resume;
