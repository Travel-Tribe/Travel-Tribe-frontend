import { create } from "zustand";
import fetchCall from "../Utils/apiFetch";
import { STORAGE_KEYS } from "../Constants/STORAGE_KEYS";

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  startTokenRefresh: () => void;
  stopTokenRefresh: () => void; // 클린업 함수 추가
}

let intervalId: number | null = null; // 타이머 ID 저장

export const useAuthStore = create<AuthState>(set => ({
  accessToken: localStorage.getItem(STORAGE_KEYS.TOKEN),
  setAccessToken: token => {
    if (token) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    } else {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
    }
    set({ accessToken: token });
  },
  startTokenRefresh: () => {
    const TOKEN_REFRESH_INTERVAL = 29 * 60 * 1000; // 29분

    // 기존 Interval 제거 (중복 방지)
    if (intervalId !== null) {
      clearInterval(intervalId);
    }

    // 새로운 Interval 설정
    intervalId = window.setInterval(async () => {
      try {
        const response = await fetchCall<{
          headers: { access: string };
        }>("/api/v1/users/reissue", "post");

        const newAccessToken = response.headers.access;

        if (newAccessToken) {
          set({ accessToken: newAccessToken });
          localStorage.setItem(STORAGE_KEYS.TOKEN, newAccessToken);
        } else {
          console.error("토큰이 응답에 포함되지 않았습니다.");
          set({ accessToken: null });
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
        }
      } catch (error) {
        console.error("토큰 재발급 실패:", error);
        // 로그아웃 처리 로직 추가 가능
        localStorage.clear();
        window.location.href = "/signIn";
      }
    }, TOKEN_REFRESH_INTERVAL);
  },
  stopTokenRefresh: () => {
    if (intervalId !== null) {
      clearInterval(intervalId); // Interval 제거
      intervalId = null; // ID 초기화
      console.log("토큰 갱신 Interval 정리됨");
    }
  },
}));
