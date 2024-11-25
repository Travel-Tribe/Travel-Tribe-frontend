import { create } from "zustand";
import fetchCall from "../Utils/apiFetch";
import { STORAGE_KEYS } from "../Constants/STORAGE_KEYS";

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  startTokenRefresh: () => void;
}

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

    setInterval(async () => {
      try {
        const response = await fetchCall<{
          headers: { access: string };
        }>("/api/v1/users/reissue", "post");

        const newAccessToken = response.headers.access;
        if (newAccessToken) {
          set({ accessToken: newAccessToken });
          localStorage.setItem(STORAGE_KEYS.TOKEN, newAccessToken);
          console.log("새로운 토큰 저장:", newAccessToken);
        } else {
          console.error("토큰이 응답에 포함되지 않았습니다.");
          set({ accessToken: null });
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
        }
      } catch (error) {
        console.error("토큰 재발급 실패:", error);
        set({ accessToken: null });
        localStorage.clear();
        window.location.href = "/login"; // 로그아웃 처리
      }
    }, TOKEN_REFRESH_INTERVAL);
  },
}));
