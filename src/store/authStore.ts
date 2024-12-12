import { create } from "zustand";
import fetchCall from "../apis/fetchCall";
import { STORAGE_KEYS } from "../constants/STORAGE_KEYS";
import { jwtDecode } from "jwt-decode"; // Ensure this is correctly imported

interface DecodedToken {
  exp: number; // 만료 시간
}

interface AuthState {
  accessToken: string | null;
  expiration: number | null; // 만료 시간을 상태로 관리
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
  expiration: (() => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now(); // 만료 여부 확인
      console.log(decoded.exp * 1000 < Date.now());
      if (isExpired) {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        return null;
      }
      return decoded.exp * 1000;
    }
    return null;
  })(),
  setAccessToken: token => {
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      const expiration = decoded.exp * 1000;
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(
        STORAGE_KEYS.TOKEN_EXPIRATION,
        expiration.toString(),
      );
      set({ accessToken: token, expiration });
    } else {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRATION);
      set({ accessToken: null, expiration: null });
    }
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
          const expiration = decoded.exp * 1000;
          set({ accessToken: newAccessToken, expiration });
          localStorage.setItem(STORAGE_KEYS.TOKEN, newAccessToken);
          localStorage.setItem(
            STORAGE_KEYS.TOKEN_EXPIRATION,
            expiration.toString(),
          );
        } else {
          set({ accessToken: null, expiration: null });
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
          localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRATION);
        }
      } catch (error) {
        localStorage.clear();
        window.location.href = "/signIn";
      }
    }, TOKEN_REFRESH_INTERVAL);
  },
  stopTokenRefresh: () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  },
}));
