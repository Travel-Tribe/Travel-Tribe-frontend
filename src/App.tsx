import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router/routes";
import fetchCall from "./Utils/apiFetch";

function App() {
  const handlePosts = async () => {
    try {
      const response = await fetchCall(
        "/api/v1/users/duplicate?type=email&query=t@t.com",
        "post",
        {
          type: "email",
          query: "t@t.com",
        },
      );
      console.log(response);
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
