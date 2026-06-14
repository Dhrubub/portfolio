import { createContext, useContext, useState, ReactNode } from 'react';

interface HighlightCtx {
	activeSkill: string | null;
	setActiveSkill: (id: string | null) => void;
}

const Ctx = createContext<HighlightCtx>({
	activeSkill: null,
	setActiveSkill: () => {},
});

export const HighlightProvider = ({ children }: { children: ReactNode }) => {
	const [activeSkill, setActiveSkill] = useState<string | null>(null);
	return (
		<Ctx.Provider value={{ activeSkill, setActiveSkill }}>
			{children}
		</Ctx.Provider>
	);
};

export const useHighlight = () => useContext(Ctx);
