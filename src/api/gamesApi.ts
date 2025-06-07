import { Game } from '../types/game';
import { APIResult, request } from '../core/apiClient';

export const fetchGames = async (): Promise<APIResult<Game[]>> => {
  return request<Game[]>({
    url: '/games',
    method: 'GET',
  });
};
