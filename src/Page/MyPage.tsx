import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Mypage/Sidebar";

const MyPage = (): JSX.Element => {
  return (
    <>
      <div className="min-h-screen bg-custom-bg">
        <div className="w-[1160px] mx-auto flex pt-10 pb-10">
          {/* 사이드바 */}
          <Sidebar />

          {/* 메인 섹션 */}
          <div className="w-[860px] ml-2.5 bg-white">
            <div className="w-[600px] my-20 mx-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
