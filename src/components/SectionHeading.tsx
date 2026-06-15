import { motion } from 'framer-motion';

interface Props {
	index: string; // e.g. "01"
	title: string;
	kicker?: string; // mono label shown above
	id?: string;
}

const SectionHeading = ({ index, title, kicker, id }: Props) => (
	<div id={id} className='mb-8 sm:mb-12 scroll-mt-24'>
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-80px' }}
			transition={{ duration: 0.5 }}
			className='flex items-end gap-4'
		>
			<span className='font-mono text-sm text-rose'>{index}</span>
			<div className='flex-1'>
				{kicker && (
					<p className='font-mono text-xs text-inkFaint mb-1'>
						{kicker}
					</p>
				)}
				<h2 className='font-display font-bold tracking-tight text-ink text-[clamp(1.9rem,5vw,3rem)] leading-none'>
					{title}
				</h2>
			</div>
			<span className='mb-2 hidden h-px flex-1 bg-line sm:block' />
		</motion.div>
	</div>
);

export default SectionHeading;
