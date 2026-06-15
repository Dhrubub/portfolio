import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlus,
	faMinus,
	faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { experience, ExpKind, skills } from '../data/content';
import { useRafScroll } from '../hooks/useScroll';
import { useHighlight } from '../context/HighlightContext';
import { RichText } from './RichText';

const INITIAL = 6;
const THRESHOLD = 0.58; // fraction of viewport height where the playhead sits

const kindLabel: Record<ExpKind, string> = {
	work: 'work',
	education: 'study',
	volunteer: 'volunteer',
};

const Timeline = () => {
	const reduce = useReducedMotion();
	const { activeSkill } = useHighlight();
	const activeEverywhere =
		!!activeSkill && !!skills.find((s) => s.id === activeSkill)?.everywhere;
	const [expanded, setExpanded] = useState(false);
	const visible = expanded ? experience : experience.slice(0, INITIAL);

	const listRef = useRef<HTMLOListElement>(null);
	const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
	const [fillPx, setFillPx] = useState(0);
	const [reachedArr, setReachedArr] = useState<boolean[]>([]);

	const recompute = () => {
		const list = listRef.current;
		if (!list) return;
		const rect = list.getBoundingClientRect();
		const playhead = window.innerHeight * THRESHOLD;
		setFillPx(Math.min(rect.height, Math.max(0, playhead - rect.top)));
		setReachedArr(
			dotRefs.current.map(
				// colour the icon as soon as the fill line reaches its top edge
				(d) => !!d && d.getBoundingClientRect().top + 8 <= playhead
			)
		);
	};
	const recomputeRef = useRef(recompute);
	recomputeRef.current = recompute;

	useRafScroll(() => recomputeRef.current());

	// keep the fill correct on resize/expand even without scrolling
	useEffect(() => {
		const onResize = () => recomputeRef.current();
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);
	useEffect(() => {
		recomputeRef.current();
	}, [expanded]);

	return (
		<div>
			<ol ref={listRef} className='relative'>
				{/* rail overlay — fill tip sits exactly on the playhead */}
				<div className='pointer-events-none absolute left-0 top-0 bottom-0 z-0 w-10 sm:w-12'>
					<span className='absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-line' />
					<span
						className='absolute left-1/2 top-0 w-[2px] -translate-x-1/2 bg-rose'
						style={{ height: `${fillPx}px` }}
					/>
				</div>

				<div className='space-y-7 sm:space-y-9'>
					{visible.map((item, i) => {
						const reached =
							reachedArr[i] ?? false;
						const dimmed =
							!!activeSkill &&
							!activeEverywhere &&
							!item.tech.includes(activeSkill);
						const lit =
							!!activeSkill && item.tech.includes(activeSkill);
						return (
							<motion.li
								key={item.id}
								initial={reduce ? false : { opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: '-60px' }}
								transition={{ duration: 0.45, ease: 'easeOut' }}
								className='grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3rem_1fr] gap-x-4 sm:gap-x-6'
							>
								{/* dot */}
								<div
									ref={(el) => (dotRefs.current[i] = el)}
									className='relative z-10 flex justify-center pt-1.5'
								>
									<span
										className={`grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-bg transition-transform duration-200 ${
											reached
												? 'text-rose'
												: 'text-inkFaint scale-90'
										}`}
									>
										<FontAwesomeIcon
											icon={item.icon}
											className='text-base sm:text-lg'
										/>
									</span>
								</div>

								{/* card */}
								<div
									className={`group transition-opacity duration-300 ${
										dimmed ? 'opacity-40' : 'opacity-100'
									}`}
								>
									<div
										data-cursor='hover'
										className={`transform-gpu rounded-2xl border bg-surface p-4 sm:p-5 shadow-card transition-transform duration-300 group-hover:-translate-y-0.5 ${
											lit
												? 'border-rose ring-2 ring-rose/30'
												: 'border-line'
										}`}
									>
										<div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
											<span className='font-mono text-xs text-rose'>
												{item.date}
											</span>
											<span className='rounded border border-line px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-inkFaint'>
												{kindLabel[item.kind]}
											</span>
											{item.current && (
												<span className='rounded border border-jade/40 bg-jadeSoft px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-jade'>
													now
												</span>
											)}
										</div>
										<h3 className='mt-1.5 font-display text-base font-semibold leading-snug text-ink sm:text-lg'>
											{item.link ? (
												<a
													href={item.link}
													target='_blank'
													rel='noopener noreferrer'
													className='hover:text-rose'
												>
													{item.org}
													<FontAwesomeIcon
														icon={faArrowUpRightFromSquare}
														className='ml-1 text-[0.6em] align-middle text-inkFaint'
													/>
												</a>
											) : (
												item.org
											)}
											<span className='font-body font-normal text-inkSoft'>
												{'  ·  '}
												{item.role}
											</span>
										</h3>
										{item.description.length > 0 && (
											<ul className='mt-2 space-y-1'>
												{item.description.map((d, j) => (
													<li
														key={j}
														className='flex gap-2 text-sm leading-relaxed text-inkSoft'
													>
														<span className='mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-rose/60' />
														<span>
															<RichText>{d}</RichText>
														</span>
													</li>
												))}
											</ul>
										)}
									</div>
								</div>
							</motion.li>
						);
					})}
				</div>
			</ol>

			{experience.length > INITIAL && (
				<div className='mt-8 flex justify-center'>
					<button
						data-cursor='hover'
						onClick={() => {
							if (expanded)
								document
									.getElementById('experience')
									?.scrollIntoView({ behavior: 'smooth' });
							setExpanded((p) => !p);
						}}
						className='group inline-flex items-center gap-2 rounded-full border border-lineStrong bg-surface px-4 py-2 font-mono text-sm text-inkSoft transition-colors hover:border-rose hover:text-rose'
					>
						<FontAwesomeIcon
							icon={expanded ? faMinus : faPlus}
							className='transition-transform group-hover:scale-110'
						/>
						{expanded
							? 'show less'
							: `${experience.length - INITIAL} more`}
					</button>
				</div>
			)}
		</div>
	);
};

export default Timeline;
