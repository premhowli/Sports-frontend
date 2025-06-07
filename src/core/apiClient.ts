import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:4000/api'; // replace with IP if needed

export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
});

export type APIResult<T> = {
    data?: T;
    err?: string;
    status?: number;
};

// The core function for all requests
export async function request<T>(
    config: AxiosRequestConfig
): Promise<APIResult<T>> {
    try {
        const response = await api.request<T>(config);
        return { data: response.data, status: response.status };
    } catch (error: any) {
        // AxiosError will have response/message/code
        let errMsg = 'Network error';
        let status = 0;
        if (axios.isAxiosError(error)) {
            errMsg =
                error.response?.data?.message ||
                error.response?.statusText ||
                error.message;
            status = error.response?.status || 0;
        } else if (error instanceof Error) {
            errMsg = error.message;
        }
        return { err: errMsg, status };
    }
}
