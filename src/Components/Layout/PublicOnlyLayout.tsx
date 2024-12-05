import { Navigate, Outlet } from "react-router-dom";

const PublicOnlyLayout = () => {
  const isLogin =
    localStorage.getItem("TOKEN") && localStorage.getItem("USER_ID");

  return !isLogin ? <Outlet /> : <Navigate to="/" />;
};

export default PublicOnlyLayout;
