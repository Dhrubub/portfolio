import { useMemo } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import {
	skills,
	skillUsage,
	experience,
	projects,
} from '../data/content';
import { useHighlight } from '../context/HighlightContext';
import { useTheme } from '../theme/ThemeContext';

const Skills = () => {
	const { theme } = useTheme();
	const { activeSkill, setActiveSkill } = useHighlight();

	// lookups for the "used in" readout
	const orgById = useMemo(() => {
		const m: Record<string, string> = {};
		experience.forEach((e) => (m[e.id] = e.org));
		return m;
	}, []);
	const projById = useMemo(() => {
		const m: Record<string, string> = {};
		projects.forEach((p) => (m[p.id] = p.title));
		return m;
	}, []);

	const active = skills.find((s) => s.id === activeSkill);
	const usage = activeSkill ? skillUsage[activeSkill] : null;
	const usedOrgs = usage
		? Array.from(new Set(usage.exp.map((id) => orgById[id]).filter(Boolean)))
		: [];
	const usedProjects = usage
		? usage.proj.map((id) => projById[id]).filter(Boolean)
		: [];

	return (
		<section
			id='skills'
			className='mx-auto max-w-5xl px-6 py-16 sm:px-10 sm:py-24 scroll-mt-20'
		>
			<SectionHeading
				index='03'
				kicker='// the toolbox'
				title='Skills'
			/>

			{/* readout */}
			<div className='mb-6 min-h-[2.5rem] font-mono text-sm'>
				{active ? (
					<motion.p
						key={active.id}
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						className='text-inkSoft'
					>
						<span className='text-rose'>{active.label}</span>
						{usedOrgs.length || usedProjects.length ? (
							<>
								{' '}· used at{' '}
								<span className='text-ink'>
									{[...usedOrgs, ...usedProjects].join(', ')}
								</span>
							</>
						) : (
							<span className='text-inkFaint'>
								{' '}· a trusty sidekick
							</span>
						)}
					</motion.p>
				) : (
					<p className='text-inkFaint'>
						hover a skill to see where it shows up in my timeline
						&amp; projects
					</p>
				)}
			</div>

			<div className='flex flex-wrap gap-3'>
				{skills.map((skill) => {
					const icon =
						theme === 'dark' && skill.iconDark
							? skill.iconDark
							: skill.icon;
					const isActive = activeSkill === skill.id;
					const dimmed = activeSkill && !isActive;
					return (
						<button
							key={skill.id}
							data-cursor='hover'
							onMouseEnter={() => setActiveSkill(skill.id)}
							onMouseLeave={() => setActiveSkill(null)}
							onFocus={() => setActiveSkill(skill.id)}
							onBlur={() => setActiveSkill(null)}
							className={`group flex items-center gap-2.5 rounded-xl border bg-surface px-3.5 py-2.5 transition-all duration-200 ${
								isActive
									? 'border-rose ring-2 ring-rose/30 -translate-y-0.5'
									: 'border-line hover:border-rose'
							} ${dimmed ? 'opacity-40' : 'opacity-100'}`}
						>
							<img
								src={icon}
								alt={skill.label}
								className='h-6 w-6 object-contain transition-transform group-hover:scale-110'
							/>
							<span className='text-sm font-medium text-ink'>
								{skill.label}
							</span>
						</button>
					);
				})}
			</div>
		</section>
	);
};

export default Skills;
