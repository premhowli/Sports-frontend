import { APIResult, request } from '../core/apiClient';
import { Game } from '../types/game';
import { Prediction } from '../types/prediction';
export interface PredictionResponse {
    gameId: string;
    predictions: Prediction[];
}

export const fetchGames = async (): Promise<APIResult<Game[]>> => {
    return request<Game[]>({
        url: '/games',
        method: 'GET',
    });
};

// Submit a new prediction
export const submitPrediction = async (
    gameId: string,
    pick: string,
): Promise<APIResult<Prediction>> => {
    return request<Prediction>({
        url: '/predictions',
        method: 'POST',
        data: { gameId, pick },
    });
    // const response = await api.post('/predictions', { gameId, pick });
    // return response.data;
};


// Get all predictions for a game (optional)
export const getPredictionsForGame = async (
    gameId: string
): Promise<APIResult<PredictionResponse>> => {
    return request<PredictionResponse>({
        url: `predictions/game/${gameId}`,
        method: 'GET',
    });
};
