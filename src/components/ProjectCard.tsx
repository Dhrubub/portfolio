import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface ProjectCardProps {
	title: string;
	image: any;
	skills: any[];
	github?: string;
	link?: string;
}

const ProjectCard = ({
	title,
	image,
	skills,
	github,
	link,
}: ProjectCardProps) => {
	return (
		<div
			className='flex justify-between flex-col
		w-[280px] project-card-shadow h-full rounded-xl'
		>
			<div className='relative pb-[100%]'>
				{/* Image (Replace 'image-url' with the actual image URL) */}
				<img
					className='absolute inset-0 object-cover object-center w-full h-full rounded-t-xl dark:border-[1px] dark:border-secondary dark:border-b-0'
					src={image}
					alt={title}
				/>
			</div>
			<div className='flex flex-col h-full text-primary bg-secondary dark:text-secondary dark:bg-footer rounded-b-xl border-[1px] border-secondary'>
				<div className='px-3 py-4 flex-grow'>
					{/* Title */}
					<div className='font-bold mb-2'>{title}</div>
					<div className='icons mt-4'>
						{skills.map((icon, index) => (
							<span key={index} className='mr-2'>
								{icon}
							</span>
						))}
						<div
							className={`flex flex-1 w-[18%] mr-0 ml-auto ${
								github && link
									? 'justify-between'
									: 'justify-end'
							}`}
						>
							{github && (
								<a
									href={github}
									target='_blank'
									rel='noopener noreferrer'
								>
									<FontAwesomeIcon icon={faGithub} />
								</a>
							)}
							{link && (
								<a
									href={link}
									target='_blank'
									rel='noopener noreferrer'
								>
									<FontAwesomeIcon icon={faLink} />
								</a>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
