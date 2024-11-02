import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const isLogin =
    localStorage.getItem("TOKEN") && localStorage.getItem("USER_ID");

  return isLogin ? <Outlet /> : <Navigate to="/signIn" />;
};

export default PrivateRoutes;
