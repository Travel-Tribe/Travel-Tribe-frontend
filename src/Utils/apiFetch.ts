import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { STORAGE_KEYS } from "../Constants/STORAGE_KEYS";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers?.set("access", token);
    }
    return config;
  },
  error => Promise.reject(error),
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
  method: "get" | "post" | "put" | "delete" | "patch",
  data?: any,
  responseType?: "json" | "blob",
): Promise<T> {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN); // 최신 토큰 가져오기

  const config: AxiosRequestConfig = {
    method,
    url,
    ...(data && { data }),
    responseType: responseType || "json",
    headers: {
      ...(data instanceof FormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" }),
      ...(token ? { access: token } : {}), // access 헤더 추가
    },
  };

  return axiosInstance(config);
}
