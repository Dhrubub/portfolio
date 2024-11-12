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
		w-[80vw] xs:w-[200px] project-card-shadow h-full rounded-xl'
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
				<div className='px-2 py-2 flex flex-col flex-grow'>
					<div className='font-normal text-sm flex'>{title}</div>
					<div className='flex-grow'>
						{skills.map((skill: String, index) => (
							<span
								key={index}
								className='mr-1 border border-white px-1 rounded text-[10px]'
							>
								{skill.toUpperCase()}
							</span>
						))}
					</div>
					<div
						className={`flex flex-1 w-fit ml-auto mt-2 ${
							github && link ? 'justify-between' : 'justify-end'
						}`}
					>
						<div className=''>
							{github && (
								<a
									href={github}
									target='_blank'
									rel='noopener noreferrer'
								>
									<FontAwesomeIcon
										icon={faGithub}
										className='pl-2'
									/>
								</a>
							)}
							{link && (
								<a
									href={link}
									target='_blank'
									rel='noopener noreferrer'
								>
									<FontAwesomeIcon
										icon={faLink}
										className='pl-2'
									/>
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
