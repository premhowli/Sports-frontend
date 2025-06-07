import { create } from 'zustand';
import { Game } from '../types/game'; // adjust path

interface GamesState {
    games: Game[];
    setGamesData: (games: Game[]) => void;
    getGameById: (id: string) => Game | undefined;
}

export const useGamesStore = create<GamesState>(set => ({
    games: [],
    setGamesData: (games: Game[]) => set({ games }),
    getGameById: (id: string): Game | undefined => {
        const { games } = useGamesStore.getState();
        return games.find(g => g.id === id);
    },
}));
