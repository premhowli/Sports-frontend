import { getItem, setItem } from '../../../core/localStorage';
import { Prediction } from '../../../types/prediction';
const PREDICTION_KEY = 'predictions';

export const savePrediction = async (prediction: Prediction) => {
    try {
        const stored = await getItem(PREDICTION_KEY);
        const current: Prediction[] = stored ? JSON.parse(stored) : [];

        const updated = [...current.filter(p => p.gameId !== prediction.gameId), prediction];
        await setItem(PREDICTION_KEY, JSON.stringify(updated));
    } catch (err) {
        console.error('Failed to save prediction:', err);
    }
};

export const getPredictionByGameId = async (gameId: string): Promise<Prediction | undefined> => {
    try {
        const stored = await getItem(PREDICTION_KEY);
        const current: Prediction[] = stored ? JSON.parse(stored) : [];
        return current.find(p => p.gameId === gameId);
    } catch (err) {
        console.error('Failed to load prediction:', err);
        return undefined;
    }
};

export const getAllPredictions = async (): Promise<Prediction[]> => {
    try {
        const stored = await getItem(PREDICTION_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (err) {
        console.error('Failed to get predictions:', err);
        return [];
    }
};
