import { Navigate, Outlet } from "react-router-dom";

const PrivateLayout = () => {
  const isLogin =
    localStorage.getItem("TOKEN") && localStorage.getItem("USER_ID");

  return isLogin ? <Outlet /> : <Navigate to="/signIn" />;
};

export default PrivateLayout;
