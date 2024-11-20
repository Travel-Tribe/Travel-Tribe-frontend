import { Navigate, Outlet } from "react-router-dom";

const ProfileRequiredRoutes = () => {
  const profileCheck = localStorage.getItem("ProfileCheck");

  return profileCheck === "true" ? (
    <Outlet />
  ) : (
    <Navigate
      to="/mypage/myProfileEdit"
      replace
      state={{ message: "프로필 작성이 필요한 서비스입니다." }}
    />
  );
};

export default ProfileRequiredRoutes;
