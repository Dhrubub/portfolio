import React, { useEffect, useState } from 'react';
import styles from '../style';
import { Checkbox } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface ExperimentProps {
	close: () => void;
}

const Experiment = ({ close }: ExperimentProps) => {
	const [show, setShow] = useState(false);
	const [primary, setPrimary] = useState('');
	const [secondary, setSecondary] = useState('');
	const [tertiary, setTertiary] = useState('');
	const [footer, setFooter] = useState('');

	useEffect(() => {
		const themeStyle = document.createElement('style');
		themeStyle.innerHTML = `body {
            --primary: ${primary} !important;
            --secondary: ${secondary} !important;
            --tertiary: ${tertiary} !important;
            --footer: ${footer} !important;
          }
        `;

		if (show) {
			document.body.appendChild(themeStyle);
		} else {
			// Step 1: Get reference to parent element

			// Step 2: Select child elements with the specified tag
			const elementsToRemove = document.body.querySelectorAll('style'); // Replace 'tagname' with the actual tag name you want to remove

			// Step 3: Remove each selected element
			elementsToRemove.forEach((element) => {
				element.parentNode.removeChild(element);
			});
		}
	}, [show, primary, secondary, tertiary, footer]);
	return (
		<div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
			<div className='bg-white custom-shadow z-50 p-4 rounded-md w-[300px]'>
				<div className='cursor-pointer flex flex-1 justify-end mb-5'>
					<FontAwesomeIcon onClick={close} icon={faTimes} />
				</div>
				<div className='flex-1 flex justify-between mb-5'>
					<span>Custom theme:</span>
					<input
						type='checkbox'
						onClick={() => setShow((prev) => !prev)}
					/>
				</div>
				<div className='flex flex-wrap'>
					<div className='flex-1 flex justify-between mb-5'>
						<span>Primary:</span>

						<input
							className='border-[1px] border-black rounded-md'
							type='text'
							onChange={(e) => {
								setPrimary(e.target.value);
							}}
						/>
					</div>
					<div className='flex-1 flex justify-between mb-5'>
						<span>Secondary:</span>
						<input
							className='border-[1px] border-black rounded-md'
							type='text'
							onChange={(e) => {
								setSecondary(e.target.value);
							}}
						/>
					</div>
					<div className='flex-1 flex justify-between mb-5'>
						<span>Tertiary:</span>

						<input
							className='border-[1px] border-black rounded-md'
							type='text'
							onChange={(e) => {
								setTertiary(e.target.value);
							}}
						/>
					</div>
					<div className='flex-1 flex justify-between mb-5'>
						<span>Footer:</span>

						<input
							className='border-[1px] border-black rounded-md'
							type='text'
							onChange={(e) => {
								setFooter(e.target.value);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Experiment;
