import { useState, useEffect, useCallback } from 'react';
import { getPredictionByGameId, savePrediction } from '../utils/predictionStorage';
import { getPredictionsForGame, submitPrediction } from '../../../api/predictionsApis';
import { Game } from '../../../types/game';
import { Prediction } from '../../../types/prediction';
import { useGamesStore } from '../../../store/gamesStore';
import Toast from 'react-native-simple-toast';

export const usePrediction = (gameId: string) => {
    const games = useGamesStore(state => state.games);
    const [gameData, setGameData] = useState<Game | null>(null);
    const [prediction, setPrediction] = useState<Prediction | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const game = games.find(gameItem => gameItem.id === gameId);
        setGameData(game ?? null);
    }, [gameId, games]);

    const checkExistingPrediction = useCallback(async () => {
        console.log('<<<<< checking prediction in local storage');
        let pred = await getPredictionByGameId(gameId);
        console.log(`<<<<<< prediction found in local storage ${JSON.stringify(pred)}`);
        if (!pred) {
            console.log('<<<<<< local prediction not found. fetching from api');
            const {data } = await getPredictionsForGame(gameId);
            if (data) {
                pred = data.predictions.find(val => val.gameId === gameId);
            }
        }
        setPrediction(pred ?? null);
    }, [gameId]);

    const handlePrediction = useCallback(
        async (team: string) => {
            if (!gameData) {
                return;
            }
            if (gameData) {
                setLoading(true);
                // setPrediction(pickedValue)
                try {
                    const { data, err } = await submitPrediction(gameData.id, team);
                    // if (pred.status)
                    if (data) {
                        setPrediction(data);
                        savePrediction(data);
                    }
                    if (err) {
                        Toast.showWithGravity('Oops! Something went wrong. try again', Toast.SHORT, Toast.BOTTOM, {
                            // backgroundColor: '#fff',
                            // textColor: '#f00',
                        });
                    }

                    // setPicked(team);
                    console.log('Prediction submitted:', data);
                } catch (err: any) {
                    console.warn(
                        'Prediction error:',
                        err.response?.data?.message || err.message,
                    );
                }
                finally {
                    setLoading(false);
                }
            } else {
                console.log(
                    `<<<<< data unavailable ${JSON.stringify(gameData)}`,
                );
            }
        },
        [gameData],
    );

    return { prediction, checkExistingPrediction, handlePrediction, loading };
};
