import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router/routes";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, //// 창이 포커스될 때 자동으로 리페치하지 않음
      retry: 0, // 실패시 재시도 안함
    },
  },
});

function App() {
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
