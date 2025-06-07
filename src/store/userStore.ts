import { create } from 'zustand';
import { User } from '../types/user'; // adjust path

interface UserState {
    user: User | null;
    setUser: (user: User) => void;
}

export const useUserStore = create<UserState>(set => ({
    user: null,
    setUser: (user) => set({ user }),
}));
