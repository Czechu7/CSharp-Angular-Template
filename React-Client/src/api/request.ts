import axios, { type AxiosInstance, type Method, type ResponseType } from 'axios';
import { z } from 'zod';

export const apiClient = axios.create({
    headers: {
        ['Content-Type']: 'application/json',
        Accept: 'application/json',
    },
});

type Props<T extends z.ZodSchema> = {
    url: string;
    method: Method;
    schema: T;
    data?: FormData | Record<string, unknown>;
    params?: Record<string, unknown>;
    /**
     * @default 'json'
     */
    type?: ResponseType;
    onError?: (err: Error) => z.output<T> | void;
    axiosInstance?: AxiosInstance;
};

export const request = async <T extends z.ZodSchema>({
    url,
    onError,
    method,
    schema,
    data,
    params,
    type = 'json',
    axiosInstance = apiClient,
}: Props<T>): Promise<z.output<T>> => {
    // implement auth getting here
    const baseUrl = '';
    const token = '';

    const getApiInstance = (): AxiosInstance => {
        if (!axiosInstance) {
            return apiClient;
        }
        return axiosInstance;
    };

    const contentType = data instanceof FormData ? 'multipart/form-data' : 'application/json';

    try {
        const response = await getApiInstance().request({
            url,
            method,
            params,
            data,
            baseURL: baseUrl,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': contentType,
            },
            responseType: type,
        });

        return schema.parse(response.data);
    } catch (err) {
        if (err instanceof Error) {
            const altResult = onError?.(err);

            if (typeof altResult !== 'undefined') {
                return altResult;
            }
        }

        throw err;
    }
};
