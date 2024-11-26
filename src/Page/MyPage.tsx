import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Mypage/Sidebar";

const MyPage = (): JSX.Element => {
  return (
    <>
      <div className="min-h-screen bg-custom-bg">
        <div className="flex min-w-[900px] max-w-[1240px] mx-auto px-5">
          {/* 사이드바 */}
          <Sidebar />

          <Outlet />
          {/* 메인 섹션 */}
        </div>
      </div>
    </>
  );
};

export default MyPage;
