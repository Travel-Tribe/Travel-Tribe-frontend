import axios, { AxiosError } from "axios";

// 추후 변경
const API_BASE_URL = "https://example.com/api";
const API_TOKEN = "your_api_token";

const axiosInstance = axios.create({
  // baseURL: API_BASE_URL,
  baseURL: "",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  config => {
    // 요청 헤더에 인증 토큰 추가
    config.headers.Authorization = `Bearer ${API_TOKEN}`;
    return config;
  },
  error => {
    // 요청 에러 처리
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
  response => {
    // 응답 데이터를 처리하고 반환
    return response;
  },
  error => {
    // 응답 에러 처리
    const axiosError = error as AxiosError;
    // 여기서 에러 처리 로직 구현
    return Promise.reject(axiosError);
  },
);

export default async function fetchCall<T>(
  url: string,
  method: "get" | "post" | "put" | "delete",
  data?: any,
): Promise<T> {
  const config = {
    method,
    url,
    ...(data && { data }), // data가 있을 경우에만 data 속성 추가
  };
  return axiosInstance(config);
}

// Usage
// const id = 123;
// const result = await fetchCall<{ message: string }>(`/posts`, 'post', { itemId: id });
// console.log(result.message);
