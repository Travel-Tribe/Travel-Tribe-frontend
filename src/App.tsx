import "./App.css";
import { BrowserRouter, useLocation } from "react-router-dom";
import Router from "./Router/routes";
import Header from "./Components/Common/Header";

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ["/signIn", "/signUp"];

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
