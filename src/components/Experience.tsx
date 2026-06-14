import SectionHeading from './SectionHeading';
import Timeline from './Timeline';

const Experience = () => (
	<section
		id='experience'
		className='mx-auto max-w-5xl px-6 py-16 sm:px-10 sm:py-24 scroll-mt-20'
	>
		<SectionHeading
			index='01'
			kicker='// where I’ve been'
			title='Experience'
		/>
		<p className='mb-8 -mt-4 max-w-lg font-mono text-xs text-inkFaint'>
			tip: drag the dot to scrub, or hover a skill below to light up
			where I used it.
		</p>
		<Timeline />
	</section>
);

export default Experience;
