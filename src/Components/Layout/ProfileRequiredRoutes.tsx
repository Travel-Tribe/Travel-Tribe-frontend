import { Navigate, Outlet } from "react-router-dom";

export const ProfileRequiredRoutes = () => {
  const profile = localStorage.getItem("Profile");

  return profile ? (
    <Outlet />
  ) : (
    <Navigate
      to="/mypage/myProfileEdit"
      replace
      state={{ message: "프로필 작성이 필요한 서비스입니다." }}
    />
  );
};
