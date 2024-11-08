import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import resume from '../assets/Dhruv_Resume.pdf';

const Resume = () => {
	const navigate = useNavigate();

	useEffect(() => {
		// Open the PDF in the same tab
		window.open(resume, '_self');
		navigate('/', { replace: true });
	}, [navigate]);

	return null; // No UI needed since we're opening the PDF
};

export default Resume;
