import { APIResult, request } from '../core/apiClient';
import { User } from '../types/user';

export const fetchUserDetails = async (): Promise<APIResult<User>> => {
    return request<User>({
        url: '/user/details',
        method: 'GET',
    });
};
