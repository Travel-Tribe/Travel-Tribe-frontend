import "./App.css";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router/routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { useAuthStore } from "./store/authStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 창이 포커스될 때 자동으로 리페치하지 않음
      retry: 0, // 실패시 재시도 안함
      staleTime: 60000, // 1분
    },
  },
});

function App() {
  // const { startTokenRefresh, stopTokenRefresh } = useAuthStore();

  // useEffect(() => {
  //   startTokenRefresh(); // 앱 시작 시 토큰 갱신 주기 시작

  //   return () => {
  //     stopTokenRefresh(); // 앱 언마운트 시 Interval 제거
  //   };
  // }, [startTokenRefresh, stopTokenRefresh]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
