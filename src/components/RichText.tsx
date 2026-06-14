import { Fragment, ReactNode } from 'react';

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/**
 * Renders a string, turning markdown-style [label](url) into links.
 * stopPropagation on pointerdown so a link inside a draggable board card
 * doesn't start a drag.
 */
export const RichText = ({ children }: { children: string }) => {
	const parts: ReactNode[] = [];
	let last = 0;
	let key = 0;
	let m: RegExpExecArray | null;
	LINK.lastIndex = 0;
	while ((m = LINK.exec(children))) {
		if (m.index > last) parts.push(children.slice(last, m.index));
		parts.push(
			<a
				key={key++}
				href={m[2]}
				target='_blank'
				rel='noopener noreferrer'
				onPointerDown={(e) => e.stopPropagation()}
				className='text-rose underline decoration-dotted underline-offset-2 hover:decoration-solid'
			>
				{m[1]}
			</a>
		);
		last = m.index + m[0].length;
	}
	if (last < children.length) parts.push(children.slice(last));
	return <Fragment>{parts}</Fragment>;
};
