import { create } from "zustand";
import fetchCall from "../Utils/apiFetch";
import { STORAGE_KEYS } from "../Constants/STORAGE_KEYS";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number; // 만료 시간
}

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  startTokenRefresh: () => void;
  stopTokenRefresh: () => void; // 클린업 함수 추가
}

let intervalId: number | null = null; // 타이머 ID 저장

export const useAuthStore = create<AuthState>(set => ({
  accessToken: (() => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now(); // 만료 여부 확인
      if (isExpired) {
        localStorage.removeItem(STORAGE_KEYS.TOKEN); // 만료된 토큰 삭제
        return null;
      }
    }
    return token;
  })(),
  setAccessToken: token => {
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(
        STORAGE_KEYS.TOKEN_EXPIRATION,
        (decoded.exp * 1000).toString(),
      );
    } else {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRATION);
    }
    set({ accessToken: token });
  },
  startTokenRefresh: () => {
    const TOKEN_REFRESH_INTERVAL = 29 * 60 * 1000; // 29분
    if (intervalId !== null) {
      clearInterval(intervalId);
    }
    intervalId = window.setInterval(async () => {
      try {
        const response = await fetchCall<{
          headers: { access: string };
        }>("/api/v1/users/reissue", "post");

        const newAccessToken = response.headers.access;
        if (newAccessToken) {
          const decoded: DecodedToken = jwtDecode(newAccessToken);
          set({ accessToken: newAccessToken });
          localStorage.setItem(STORAGE_KEYS.TOKEN, newAccessToken);
          localStorage.setItem(
            STORAGE_KEYS.TOKEN_EXPIRATION,
            (decoded.exp * 1000).toString(),
          );
        } else {
          console.error("토큰이 응답에 포함되지 않았습니다.");
          set({ accessToken: null });
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
          localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRATION);
        }
      } catch (error) {
        console.error("토큰 재발급 실패:", error);
        localStorage.clear();
        window.location.href = "/signIn";
      }
    }, TOKEN_REFRESH_INTERVAL);
  },
  stopTokenRefresh: () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
      console.log("토큰 갱신 Interval 정리됨");
    }
  },
}));
