import { experience, projects, skills } from '../../data/content';

export type BoardItem =
	| { id: string; type: 'polaroid'; x: number; y: number; rot: number }
	| { id: string; type: 'bio'; x: number; y: number; rot: number }
	| {
			id: string;
			type: 'label';
			x: number;
			y: number;
			rot: number;
			text: string;
			tone: 'rose' | 'jade';
	  }
	| { id: string; type: 'contact'; x: number; y: number; rot: number }
	| {
			id: string;
			type: 'exp';
			x: number;
			y: number;
			rot: number;
			refId: string;
	  }
	| {
			id: string;
			type: 'project';
			x: number;
			y: number;
			rot: number;
			refId: string;
	  }
	| {
			id: string;
			type: 'skill';
			x: number;
			y: number;
			rot: number;
			refId: string;
	  };

// deterministic "hand-placed" jitter & rotation (no Math.random — stable on re-render)
const jit = (i: number, range: number) => ((i * 53) % (range * 2)) - range;
const rotOf = (i: number) => (((i * 37) % 9) - 4) * 0.9;

export const BOARD_W = 2280;
export const BOARD_H = 1640;

const grid = (
	startX: number,
	startY: number,
	cols: number,
	cellW: number,
	cellH: number,
	i: number
) => {
	const col = i % cols;
	const row = Math.floor(i / cols);
	return {
		x: startX + col * cellW + jit(i, 14),
		y: startY + row * cellH + jit(i + 3, 16),
		rot: rotOf(i),
	};
};

export const buildItems = (): BoardItem[] => {
	const items: BoardItem[] = [];

	// intro cluster
	items.push({ id: 'me', type: 'polaroid', x: 140, y: 150, rot: -4 });
	items.push({ id: 'bio', type: 'bio', x: 470, y: 150, rot: 2.5 });

	// labels
	items.push({
		id: 'lbl-exp',
		type: 'label',
		x: 150,
		y: 470,
		rot: -2,
		text: 'experience',
		tone: 'rose',
	});
	items.push({
		id: 'lbl-proj',
		type: 'label',
		x: 1520,
		y: 70,
		rot: 2,
		text: 'projects',
		tone: 'jade',
	});
	items.push({
		id: 'lbl-skills',
		type: 'label',
		x: 1520,
		y: 760,
		rot: -2,
		text: 'skills',
		tone: 'rose',
	});

	// experience grid (left/centre)
	experience.forEach((e, i) => {
		const g = grid(140, 560, 4, 330, 250, i);
		items.push({ id: `exp-${e.id}`, type: 'exp', refId: e.id, ...g });
	});

	// projects grid (top-right)
	projects.forEach((p, i) => {
		const g = grid(1520, 150, 2, 320, 300, i);
		items.push({ id: `proj-${p.id}`, type: 'project', refId: p.id, ...g });
	});

	// skill stickers (right, below projects)
	skills.forEach((s, i) => {
		const g = grid(1520, 830, 4, 130, 86, i);
		items.push({ id: `skill-${s.id}`, type: 'skill', refId: s.id, ...g });
	});

	// contact note
	items.push({ id: 'contact', type: 'contact', x: 470, y: 470, rot: 3 });

	return items;
};
