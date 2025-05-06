import axios, { type AxiosInstance, type AxiosError, type ParamsSerializerOptions } from 'axios';

export interface ApiRequestTemplate<D = unknown> {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    data?: D;
    params?: any;
    headerOption?: Record<string, string>;
    paramsSerializer?: ParamsSerializerOptions;
}


export interface CommonResponse<T = any> {
    isSuccess: boolean;
    message?: string;
    data: T;
}

const INTERNAL_API_BASE_URL = '/api';

export default async function axiosClient<T, D = unknown>(
    requestData: ApiRequestTemplate<D>,
): Promise<CommonResponse<T>> {
    try {
    
        const response = await axios<CommonResponse<T>>(requestData.url, {
            method: requestData.method,
            data: requestData.data ?? undefined,
            params: requestData.params,
            headers: {
                'Content-Type': 'application/json',
                ...requestData.headerOption,
            },
            baseURL: INTERNAL_API_BASE_URL,
        });

        if (response.headers['x-redirect-url']) {
            if (typeof window !== 'undefined') {
                 window.location.href = response.headers['x-redirect-url'];
                 throw new Error('리다이렉트트');
            }
        }

       
        if (response.data && typeof response.data.isSuccess === 'boolean') {
             if (response.data.isSuccess) {
                 return response.data;
             } else {
                 throw new Error(response.data?.message);
             }
        } else {
             throw new Error("API 연결 에러러");
        }

    } catch (error) {
        const axiosError = error as AxiosError<CommonResponse<unknown>>; 
        console.error('<==================== axios Error =========================>');
        console.error('axiosClient 에러 ---> :', error);
        console.error('<==================== axios Error END =====================>');

    
        const responseData = axiosError.response?.data;
        const message = responseData?.message || axiosError.message || '알 수 없는 에러가 발생했습니다';
        const status = axiosError.response?.status;


        throw new Error(`API 에러 ---> ${status ? ` (${status})` : ''}: ${message}`);
    }
}



