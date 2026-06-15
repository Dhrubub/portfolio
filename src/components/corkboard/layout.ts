import { experience, projects, skills } from '../../data/content';
import gradPhoto from '../../assets/photos/grad.jpg';
import crewPhoto from '../../assets/photos/crew.jpg';
import tennisPhoto from '../../assets/photos/tennis.jpg';
import weekendPhoto from '../../assets/photos/weekend.jpg';
import canvaPhoto from '../../assets/photos/canva.jpg';
import coastPhoto from '../../assets/photos/coast.jpg';

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
			type: 'note';
			x: number;
			y: number;
			rot: number;
			title: string;
			lines: string[];
	  }
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
			/** CSS object-position (e.g. 'center 28%') to nudge the framing */
			focus?: string;
			/** landscape polaroid (fits wide group photos) */
			wide?: boolean;
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

const PHOTOS: {
	src: string;
	caption: string;
	x: number;
	y: number;
	rot: number;
	focus?: string;
	wide?: boolean;
}[] = [
	{ src: gradPhoto, caption: 'we made it 🎓', x: 720, y: 140, rot: -5 },
	{ src: coastPhoto, caption: 'perth 🌆', x: 90, y: 1215, rot: 2 },
	{ src: tennisPhoto, caption: 'court time 🎾', x: 462, y: 1230, rot: -3 },
	{ src: weekendPhoto, caption: 'weekend escape 🌴', x: 835, y: 1215, rot: 3 },
	{ src: crewPhoto, caption: 'the crew ✨', x: 1208, y: 1230, rot: -4 },
	{ src: canvaPhoto, caption: 'canva 🎨', x: 1580, y: 1180, rot: 3 },
];

export const buildItems = (): BoardItem[] => {
	const items: BoardItem[] = [];

	// intro cluster
	items.push({ id: 'me', type: 'polaroid', x: 70, y: 95, rot: -4 });
	items.push({ id: 'bio', type: 'bio', x: 340, y: 90, rot: 2 });
	items.push({ id: 'contact', type: 'contact', x: 1080, y: 80, rot: 3 });

	// "currently" note (learning + hobbies) — fills the cork under contact
	items.push({
		id: 'currently',
		type: 'note',
		x: 1085,
		y: 265,
		rot: -2,
		title: '// currently',
		lines: [
			'🎨 learning to draw',
			'🤸 working on a handstand',
			'🏋️ hitting the gym',
		],
	});

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
		y: 28,
		rot: 2,
		text: 'projects',
		tone: 'jade',
	});
	items.push({
		id: 'lbl-skills',
		type: 'label',
		x: 1540,
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
			src: p.src,
			caption: p.caption,
			x: p.x,
			y: p.y,
			rot: p.rot,
			focus: p.focus,
			wide: p.wide,
		})
	);

	// nudge everything inward so there's comfortable cork margin inside the frame
	const OFFSET = 70;
	return items.map((it) => ({ ...it, x: it.x + OFFSET, y: it.y + OFFSET }));
};
