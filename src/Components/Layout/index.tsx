import { Outlet, useLocation } from "react-router-dom";
import Header from "../Common/Header";

const Layout = () => {
  const location = useLocation();
  const hideHeaderRoutes = ["/signIn", "/signUp"];

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Outlet />
    </>
  );
};

export default Layout;