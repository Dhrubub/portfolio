import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Resume = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const files = import.meta.glob('../assets/resume/*.pdf');
		const filePath = Object.keys(files)[0]; // Get the first PDF file

		files[filePath]().then((module) => {
			const resumePath = (module as { default: string }).default;
			window.open(resumePath, '_self');
			navigate('/', { replace: true });
		});
	}, [navigate]);

	return null; // No UI needed since we're opening the PDF
};

export default Resume;
