import { create } from 'zustand';

interface TimeState {
    currentYear: number;
    isPlaying: boolean;
    playbackSpeed: 'REALTIME' | 'DAY' | 'MONTH' | 'YEAR' | 'DECADE';
    play: () => void;
    pause: () => void;
    setSpeed: (speed: 'REALTIME' | 'DAY' | 'MONTH' | 'YEAR' | 'DECADE') => void;
    jumpToYear: (year: number) => void;
    tick: () => void;
}

export const useTimeStore = create<TimeState>((set, get) => ({
    currentYear: 2026,
    isPlaying: false,
    playbackSpeed: 'YEAR',
    play: () => set({ isPlaying: true }),
    pause: () => set({ isPlaying: false }),
    setSpeed: (speed) => set({ playbackSpeed: speed }),
    jumpToYear: (year) => set({ currentYear: Math.max(1957, Math.min(2026, year)) }),
    tick: () => {
        const { currentYear, isPlaying, playbackSpeed } = get();
        if (!isPlaying) return;

        let increment = 0;
        if (playbackSpeed === 'YEAR') increment = 1;
        if (playbackSpeed === 'DECADE') increment = 10;
        // Simplified increments for prototype

        const nextYear = currentYear + increment;
        if (nextYear > 2026) set({ currentYear: 2026, isPlaying: false });
        else set({ currentYear: nextYear });
    }
}));