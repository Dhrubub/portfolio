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
			link: 'https://github.com/Dhrubub',
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
		<div id='contact' className='shadow py-6'>
			<div className='w-full flex justify-center items-center px-6  flex-col '>
				<p className='text-[18px] sm:text-[24px] text-tertiary mb-4'>
					Contact me
				</p>
				<div className='flex flex-row'>
					{FooterLinks.map((link, index) => (
						<FontAwesomeIcon
							key={link.name}
							icon={link.icon}
							className={`w-[20px] h-[20px] sm:w-[28px] sm:h-[28px] object-contain cursor-pointer
                            text-secondary mb-4
							${index !== FooterLinks.length - 1 ? 'mr-6' : 'mr-0'}`}
							onClick={() => window.open(link.link, '_blank')}
						/>
					))}
				</div>
				<p className='text-[12px] sm:text-[14px] text-secondary'>
					Website built using ReactJS and TailwindCSS
				</p>
				<p className='text-[12px] sm:text-[14px] text-secondary'>
					Last Updated on 27 December 2024
				</p>
			</div>
		</div>
	);
};

export default Footer;
