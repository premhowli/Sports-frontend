import { Prediction } from './prediction';

export interface UserStats {
    wins: number;
    losses: number;
    pending: number;
}

export interface User {
    id: string;
    username: string;
    balance: number;
    predictions: Prediction[];
    stats: UserStats;
}
