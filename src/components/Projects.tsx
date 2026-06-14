import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import SectionHeading from './SectionHeading';
import { projects, skills } from '../data/content';
import { useHighlight } from '../context/HighlightContext';

const Projects = () => {
	const { activeSkill } = useHighlight();
	const activeEverywhere =
		!!activeSkill && !!skills.find((s) => s.id === activeSkill)?.everywhere;

	return (
		<section
			id='projects'
			className='mx-auto max-w-5xl px-6 py-16 sm:px-10 sm:py-24 scroll-mt-20'
		>
			<SectionHeading
				index='02'
				kicker='// things I’ve made'
				title='Projects'
			/>
			<p className='mb-8 -mt-4 font-mono text-xs text-inkFaint'>
				a few favourites · more always cooking 🍳
			</p>

			<div className='grid gap-6 sm:grid-cols-2'>
				{projects.map((p) => {
					const dimmed =
						!!activeSkill &&
						!activeEverywhere &&
						!p.tech.includes(activeSkill);
					const lit = !!activeSkill && p.tech.includes(activeSkill);
					return (
						<a
							key={p.id}
							href={p.link || p.github}
							target='_blank'
							rel='noopener noreferrer'
							data-cursor='hover'
							className={`group relative block overflow-hidden rounded-2xl border bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 ${
								lit
									? 'border-rose ring-2 ring-rose/30'
									: 'border-line'
							} ${dimmed ? 'opacity-40' : 'opacity-100'}`}
						>
							<div className='relative aspect-[16/10] overflow-hidden bg-surface2'>
								<img
									src={p.image}
									alt={p.title}
									loading='lazy'
									className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
								/>
								<div className='absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10' />
							</div>
							<div className='p-4 sm:p-5'>
								<div className='flex items-start justify-between gap-3'>
									<h3 className='font-display text-lg font-semibold text-ink'>
										{p.title}
									</h3>
									<span className='mt-1 text-inkFaint transition-colors group-hover:text-rose'>
										<FontAwesomeIcon
											icon={
												p.link
													? faArrowUpRightFromSquare
													: faGithub
											}
										/>
									</span>
								</div>
								<p className='mt-1 text-sm leading-relaxed text-inkSoft'>
									{p.blurb}
								</p>
								<div className='mt-3 flex flex-wrap gap-1.5'>
									{p.stack.map((s) => (
										<span
											key={s}
											className='rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-inkSoft'
										>
											{s}
										</span>
									))}
								</div>
							</div>
						</a>
					);
				})}
			</div>
		</section>
	);
};

export default Projects;
