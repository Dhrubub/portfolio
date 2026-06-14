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
			type: 'skillboard';
			x: number;
			y: number;
			rot: number;
			w: number;
			h: number;
	  }
	| {
			id: string;
			type: 'photo';
			x: number;
			y: number;
			rot: number;
			src: string;
			caption: string;
	  }
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

export const BOARD_W = 2160;
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
		x: startX + col * cellW + jit(i, 12),
		y: startY + row * cellH + jit(i + 3, 14),
		rot: rotOf(i),
	};
};

// placeholder photos via Lorem Picsum (stable per seed). Swap src for your own later.
const photo = (seed: string) => `https://picsum.photos/seed/${seed}/420/420`;
const PHOTOS: { seed: string; caption: string; x: number; y: number; rot: number }[] = [
	{ seed: 'dhruv-grad', caption: 'we made it 🎓', x: 720, y: 100, rot: -5 },
	{ seed: 'dhruv-coast', caption: 'perth coast 🌊', x: 80, y: 1215, rot: 2 },
	{ seed: 'dhruv-code', caption: 'late nights ☕', x: 450, y: 1230, rot: -3 },
	{ seed: 'dhruv-hike', caption: 'weekend escape ⛰️', x: 820, y: 1215, rot: 3 },
	{ seed: 'dhruv-team', caption: 'the crew ✨', x: 1180, y: 1230, rot: -4 },
	{ seed: 'dhruv-canva', caption: 'day 1 @ canva 🎨', x: 1470, y: 1180, rot: 3 },
];

export const buildItems = (): BoardItem[] => {
	const items: BoardItem[] = [];

	// intro cluster
	items.push({ id: 'me', type: 'polaroid', x: 70, y: 95, rot: -4 });
	items.push({ id: 'bio', type: 'bio', x: 340, y: 90, rot: 2 });
	items.push({ id: 'contact', type: 'contact', x: 1080, y: 80, rot: 3 });

	// labels
	items.push({
		id: 'lbl-exp',
		type: 'label',
		x: 80,
		y: 500,
		rot: -2,
		text: 'experience',
		tone: 'rose',
	});
	items.push({
		id: 'lbl-proj',
		type: 'label',
		x: 1460,
		y: 55,
		rot: 2,
		text: 'projects',
		tone: 'jade',
	});
	items.push({
		id: 'lbl-skills',
		type: 'label',
		x: 1470,
		y: 702,
		rot: -3,
		text: 'skills',
		tone: 'rose',
	});

	// experience grid (left two-thirds), threaded by twine in time order
	experience.forEach((e, i) => {
		const g = grid(70, 570, 4, 320, 225, i);
		items.push({ id: `exp-${e.id}`, type: 'exp', refId: e.id, ...g });
	});

	// projects (top-right)
	projects.forEach((p, i) => {
		const g = grid(1460, 105, 2, 255, 285, i);
		items.push({ id: `proj-${p.id}`, type: 'project', refId: p.id, ...g });
	});

	// skills on their own paper sheet (a notepad page, not a cork board)
	items.push({
		id: 'skillboard',
		type: 'skillboard',
		x: 1440,
		y: 720,
		rot: -1,
		w: 510,
		h: 400,
	});
	skills.forEach((s, i) => {
		const g = grid(1475, 780, 4, 113, 66, i);
		items.push({ id: `skill-${s.id}`, type: 'skill', refId: s.id, ...g });
	});

	// scattered photos
	PHOTOS.forEach((p, i) =>
		items.push({
			id: `photo-${i}`,
			type: 'photo',
			src: photo(p.seed),
			caption: p.caption,
			x: p.x,
			y: p.y,
			rot: p.rot,
		})
	);

	// nudge everything inward so there's comfortable cork margin inside the frame
	const OFFSET = 70;
	return items.map((it) => ({ ...it, x: it.x + OFFSET, y: it.y + OFFSET }));
};
