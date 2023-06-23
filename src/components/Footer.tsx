import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import styles from '../style';
const Footer = () => {
	const FooterLinks = [
		{
			name: 'github',
			icon: faGithub,
			link: 'https://github.com/Dhruv8601',
		},
		{
			name: 'linkedin',
			icon: faLinkedin,
			link: 'https://www.linkedin.com/in/dhruvjobanputra/',
		},
		{
			name: 'email',
			icon: faEnvelope,
			link: 'mailto:dhruvjobanputra8@gmail.com',
		},
	];
	return (
		<div className='py-6'>
			<div className='w-full flex justify-between items-between ss:justify-evenly px-6 md:flex-row flex-row p-3 '>
				<p className='text-[12px] text-secondary'>
					Copyright Ⓒ Dhruv Jobanputra 2023
				</p>
				<div className='flex flex-row'>
					{FooterLinks.map((link, index) => (
						<FontAwesomeIcon
							key={link.name}
							icon={link.icon}
							className={`w-[21px] h-[21px] object-contain cursor-pointer
                            text-secondary
							${index !== FooterLinks.length - 1 ? 'mr-6' : 'mr-0'}`}
							onClick={() => window.open(link.link, '_blank')}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Footer;
