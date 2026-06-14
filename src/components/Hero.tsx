import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faFileLines } from '@fortawesome/free-solid-svg-icons';
import avatar from '../assets/avatar.jpg';
import avatarAI from '../assets/avatar-2.jpg';
import { profile } from '../data/content';

/* ---- cycling typewriter for the role line ---- */
const useTypewriter = (words: string[], enabled: boolean) => {
	const [text, setText] = useState(enabled ? '' : words[0]);
	const [i, setI] = useState(0);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		if (!enabled) return;
		const word = words[i % words.length];
		const done = !deleting && text === word;
		const cleared = deleting && text === '';
		const delay = done ? 1500 : cleared ? 200 : deleting ? 45 : 80;

		const t = setTimeout(() => {
			if (done) return setDeleting(true);
			if (cleared) {
				setDeleting(false);
				return setI((p) => p + 1);
			}
			setText((prev) =>
				deleting
					? word.slice(0, prev.length - 1)
					: word.slice(0, prev.length + 1)
			);
		}, delay);
		return () => clearTimeout(t);
	}, [text, deleting, i, words, enabled]);

	return text;
};

/* ---- live Perth clock ---- */
const usePerthTime = () => {
	const [time, setTime] = useState('');
	useEffect(() => {
		const tick = () => {
			try {
				setTime(
					new Intl.DateTimeFormat('en-AU', {
						hour: '2-digit',
						minute: '2-digit',
						hour12: false,
						timeZone: profile.timezone,
					}).format(new Date())
				);
			} catch {
				setTime('');
			}
		};
		tick();
		const id = setInterval(tick, 1000 * 30);
		return () => clearInterval(id);
	}, []);
	return time;
};

const container = {
	hidden: {},
	show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
	hidden: { opacity: 0, y: 18 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Hero = () => {
	const reduce = useReducedMotion();
	const role = useTypewriter(profile.roles, !reduce);
	const time = usePerthTime();
	const [casual, setCasual] = useState(false);
	const clicks = useRef(0);

	const onPortraitClick = () => {
		setCasual((p) => !p);
		clicks.current += 1;
	};

	return (
		<section
			id='home'
			className='relative mx-auto flex min-h-[88vh] max-w-7xl items-center px-6 pt-10 pb-16 sm:px-10'
		>
			<motion.div
				variants={container}
				initial='hidden'
				animate='show'
				className='grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center w-full'
			>
				{/* left: intro */}
				<div className='order-2 lg:order-1'>
					<motion.p
						variants={item}
						className='font-mono text-sm text-rose mb-4'
					>
						<span className='text-inkFaint'>{'// '}</span>hello,
						world. I'm
					</motion.p>

					<motion.h1
						variants={item}
						className='font-display font-bold tracking-tight text-ink leading-[1.02] text-[clamp(2.6rem,8vw,5.2rem)]'
					>
						{profile.first}
						<span className='text-rose'>.</span>
					</motion.h1>

					<motion.div
						variants={item}
						className='mt-1 font-display font-medium text-ink leading-tight text-[clamp(1.4rem,4.5vw,2.4rem)] flex flex-wrap items-baseline gap-x-3'
					>
						<span className='text-inkSoft'>I'm</span>
						<span className='text-rose'>
							{role}
							<span className='caret'>|</span>
						</span>
					</motion.div>

					<motion.p
						variants={item}
						className='mt-6 max-w-[34rem] text-inkSoft text-[15px] sm:text-base leading-relaxed'
					>
						{profile.bio}
					</motion.p>

					{/* live chips */}
					<motion.div
						variants={item}
						className='mt-6 flex flex-wrap gap-2.5 text-[13px] font-mono'
					>
						<span className='inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-inkSoft'>
							<span className='relative flex h-2 w-2'>
								<span className='absolute inline-flex h-full w-full rounded-full bg-jade opacity-75 animate-ping' />
								<span className='relative inline-flex h-2 w-2 rounded-full bg-jade' />
							</span>
							{profile.status}
						</span>
						{time && (
							<span className='inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-inkSoft'>
								🕑 {time} in Perth
							</span>
						)}
						<span className='inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-inkSoft'>
							🔨 building {profile.nowBuilding}
						</span>
					</motion.div>

					{/* actions */}
					<motion.div
						variants={item}
						className='mt-8 flex flex-wrap items-center gap-3'
					>
						<a
							href='#contact'
							className='group inline-flex items-center gap-2 rounded-xl bg-rose px-5 py-2.5 font-medium text-surface shadow-card transition-transform hover:-translate-y-0.5'
						>
							Say hi
							<FontAwesomeIcon
								icon={faArrowRight}
								className='transition-transform group-hover:translate-x-1'
							/>
						</a>
						<Link
							to='/resume'
							className='inline-flex items-center gap-2 rounded-xl border border-lineStrong px-5 py-2.5 font-medium text-ink transition-colors hover:border-rose hover:text-rose'
						>
							<FontAwesomeIcon icon={faFileLines} />
							{profile.resumeLabel}
						</Link>
						<span className='hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-inkFaint'>
							press
							<kbd className='rounded border border-line bg-surface px-1.5 py-0.5 text-ink'>
								⌘K
							</kbd>
							to jump around
						</span>
					</motion.div>
				</div>

				{/* right: portrait */}
				<motion.div
					variants={item}
					className='order-1 lg:order-2 flex justify-center lg:justify-end'
				>
					<div className='relative'>
						<div
							className='absolute -inset-3 rounded-[2rem] border border-dashed border-lineStrong'
							aria-hidden
						/>
						<button
							onClick={onPortraitClick}
							data-cursor='hover'
							title='psst, click me'
							className='relative block overflow-hidden rounded-[1.6rem] border border-line bg-surface shadow-card float-bob'
						>
							<img
								src={casual ? avatarAI : avatar}
								alt={profile.name}
								className='h-[260px] w-[260px] sm:h-[320px] sm:w-[320px] object-cover transition-all duration-500'
							/>
							<span className='pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-ink/80 px-3 py-1 font-mono text-[11px] text-bg backdrop-blur'>
								click me
							</span>
						</button>
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
};

export default Hero;
