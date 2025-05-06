import axios, { type AxiosInstance, type AxiosError } from 'axios';

const apiKey = process.env.MOCKAROO_API_KEY;
const authKey = process.env.MOCKAROO_AUTH_KEY;
const baseUrlPrefix = process.env.MOCKAROO_API_BASE_URL_PREFIX;
const apiSuffix = process.env.MOCKAROO_API_SUFFIX;

const EXTERNAL_API_BASE_URL = `${baseUrlPrefix}/${apiKey}${apiSuffix}`;

if (!apiKey || !authKey || !baseUrlPrefix || !apiSuffix) {
    console.error("서버 에러: 설정 값들이 없습니다!");
}

const externalAxiosClient: AxiosInstance = axios.create({
    baseURL: EXTERNAL_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authKey}`,
    },
    timeout: 10000, 
});


externalAxiosClient.interceptors.request.use(
    (config) => {
        console.log(`--- 외부 API 요청 --- : ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
        return config;
    },
    (error) => {
        console.error('--- 외부 API 요청 에러 --- :', error);
        return Promise.reject(error);
    }
);

externalAxiosClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error: AxiosError) => {
        console.error(`--- 외부 API 요청 에러 코드 --- : ${error.response?.status}`);
        console.error(`--- 외부 API 요청 에러 메세지 --- :`, error.response?.data);
        return Promise.reject(error);
    }
);

export default externalAxiosClient;

