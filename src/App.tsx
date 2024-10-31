import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router/routes";
import fetchCall from "./Utils/apiFetch";

function App() {
  const handlePosts = async () => {
    try {
      const response = await fetchCall("/login", "post", {
        email: "test@example.com",
        password: "password123",
      });
      console.log(response.headers);
      console.log(response.data);
    } catch (error) {
      console.error("POST 요청에 실패했습니다:", error);
    }
  };

  handlePosts();

  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
