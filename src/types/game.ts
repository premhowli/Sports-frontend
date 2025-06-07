export type GameStatus = 'scheduled' | 'inProgress' | 'final';

export interface TeamInfo {
  name: string;
  abbreviation: string;
  record: string;
  score?: number;
  logo?: string; // URL to team logo
}

export interface Game {
  id: string;
  status: GameStatus;
  startTime: string;
  period?: string;
  clock?: string;
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  odds?: {
    spread: string;
    favorite: string;
  };
  winner?: string;
}
