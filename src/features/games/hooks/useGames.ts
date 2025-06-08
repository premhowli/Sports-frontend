import { useCallback, useState } from 'react';
import { fetchGames } from '../../../api/gamesApi';
import { useGamesStore } from '../../../store/gamesStore';
import { useFocusEffect } from '@react-navigation/native';
import { useRef } from 'react';

export const useGames = (skipInitialFetch: boolean = false) => {
    const [loading, setLoading] = useState(true);
    const setGamesData = useGamesStore(state => state.setGamesData);
    const games = useGamesStore(state => state.games);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);


    const loadGames = useCallback(async () => {
        try {
            const { data, err } = await fetchGames();
            console.log('Fetched games: ', data);
            data && setGamesData(data);
            if (err) {
                console.log('Error fetching games:', err);
            }
        } catch (err) {
            console.error('Error fetching games:', err);
        } finally {
            setLoading(false);
        }
    }, [setGamesData]);

    const stopPolling = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const startPolling = useCallback(() => {
        if (!intervalRef.current) {
            const interval = setInterval(loadGames, 5000);
            intervalRef.current = interval;
        }
    }, [loadGames]);


    useFocusEffect(
        useCallback(() => {
            // Fetch once immediately
            !skipInitialFetch && loadGames();
            // Start interval
            startPolling();
            // Cleanup: stop interval when screen loses focus/unmounts
            return () => stopPolling();
        }, [loadGames, startPolling, stopPolling, skipInitialFetch])
    );

    return { games, loading, startPolling, stopPolling };
};
