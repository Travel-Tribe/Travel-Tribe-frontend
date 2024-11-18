import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { STORAGE_KEYS } from "../Constants/STORAGE_KEYS";

const API_TOKEN = localStorage.getItem(STORAGE_KEYS.TOKEN);

const axiosInstance = axios.create({
  baseURL: "http://34.64.39.55:7070/", //import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  //   credentials: "include",
  // },
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  config => {
    // 요청 헤더에 인증 토큰 추가
    if (API_TOKEN) config.headers.access = `${API_TOKEN}`;
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
  method: "get" | "post" | "put" | "delete" | "patch",
  data?: any,
  responseType?: "json" | "blob",
): Promise<T> {
  const config: AxiosRequestConfig = {
    method,
    url,
    ...(data && { data }),
    responseType: responseType || "json", // data가 있을 경우에만 data 속성 추가
  };

  // Content-Type 설정
  if (data instanceof FormData) {
    // FormData인 경우 Content-Type을 multipart/form-data로 자동 처리
    config.headers = {
      ...config.headers, // 기존 헤더 유지
    };
  } else {
    // JSON 데이터인 경우 Content-Type을 application/json으로 설정
    config.headers = {
      ...config.headers, // 기존 헤더 유지
      "Content-Type": "application/json",
    };
  }

  return axiosInstance(config);
}
