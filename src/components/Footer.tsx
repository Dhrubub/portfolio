import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { profile, socials } from '../data/content';

const iconFor = (id: string) =>
	id === 'github' ? faGithub : id === 'linkedin' ? faLinkedin : faEnvelope;

const Footer = () => {
	const [copied, setCopied] = useState(false);
	const copy = () => {
		navigator.clipboard?.writeText(profile.email).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 1600);
		});
	};

	return (
		<footer
			id='contact'
			className='border-t border-line bg-bgTint scroll-mt-20'
		>
			<div className='mx-auto max-w-5xl px-6 py-16 sm:px-10 sm:py-24'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					<p className='font-mono text-sm text-rose'>
						{'// '}let’s talk
					</p>
					<h2 className='mt-2 font-display text-[clamp(2rem,6vw,3.5rem)] font-bold leading-tight text-ink'>
						Building something?
						<br />
						<span className='text-inkSoft'>I’d love to hear about it.</span>
					</h2>

					<div className='mt-8 flex flex-wrap items-center gap-3'>
						<a
							href={`mailto:${profile.email}`}
							data-cursor='hover'
							className='inline-flex items-center gap-2 rounded-xl bg-rose px-5 py-3 font-medium text-surface shadow-card transition-transform hover:-translate-y-0.5'
						>
							<FontAwesomeIcon icon={faEnvelope} />
							{profile.email}
						</a>
						<button
							onClick={copy}
							data-cursor='hover'
							className='inline-flex items-center gap-2 rounded-xl border border-lineStrong px-4 py-3 text-ink transition-colors hover:border-rose hover:text-rose'
						>
							<FontAwesomeIcon icon={copied ? faCheck : faCopy} />
							{copied ? 'copied!' : 'copy'}
						</button>
					</div>

					<div className='mt-8 flex gap-3'>
						{socials.map((s) => (
							<a
								key={s.id}
								href={s.url}
								target='_blank'
								rel='noopener noreferrer'
								data-cursor='hover'
								aria-label={s.label}
								className='grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface text-inkSoft transition-all hover:-translate-y-0.5 hover:border-rose hover:text-rose'
							>
								<FontAwesomeIcon icon={iconFor(s.id)} />
							</a>
						))}
					</div>
				</motion.div>

				<div className='mt-16 flex flex-col gap-1 border-t border-line pt-6 font-mono text-xs text-inkFaint sm:flex-row sm:items-center sm:justify-between'>
					<span>
						built with React, Tailwind &amp; a bit of{' '}
						<span className='text-rose'>over-engineering</span> ✦
					</span>
					<span>last updated {profile.lastUpdated}</span>
					<span>© {profile.name} · {profile.location}</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
