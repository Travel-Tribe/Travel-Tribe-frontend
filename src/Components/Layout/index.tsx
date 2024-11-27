import { Outlet, useLocation } from "react-router-dom";
import Header from "../Common/Header";

const Layout = () => {
  const location = useLocation();
  const hideHeaderRoutes = ["/signIn", "/signUp", "/recruitment/write"];

  return (
    <div className="bg-custom-bg min-h-[100vh] h-[100%]">
      {!hideHeaderRoutes.includes(location.pathname) &&
        !location.pathname.startsWith("/mypage") &&
        !location.pathname.startsWith("/recruitment/edit") && <Header />}
      <Outlet />
    </div>
  );
};

export default Layout;
