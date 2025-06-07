export interface Prediction {
    userId?: string;
    gameId: string;
    predictedWinner: string;
    timestamp: string;
    pick: string;
    amount: number;
    result: string;
    payout: number;
}
export interface PredictionResponse {
    gameId: string;
    predictions: Prediction[];
}
