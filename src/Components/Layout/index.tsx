import { Outlet, useLocation } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Layout = () => {
  const location = useLocation();
  const hideHeaderRoutes = ["/signIn", "/signUp", "/recruitment/write"];

  return (
    <div className="bg-custom-bg flex flex-col min-h-screen">
      {!hideHeaderRoutes.includes(location.pathname) &&
        !location.pathname.startsWith("/mypage") &&
        !location.pathname.startsWith("/recruitment/edit") && <Header />}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
