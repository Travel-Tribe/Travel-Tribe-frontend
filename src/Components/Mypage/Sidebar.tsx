import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = (): JSX.Element => {
  const [selected, setSelected] = useState("프로필");
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/mypage":
        setSelected("프로필");
        break;
      case "/mypage/completedTrips":
        setSelected("다녀온 여행");
        break;
      case "/mypage/travelHistory":
        setSelected("여행 후기");
        break;
      case "/mypage/accountSettings":
        setSelected("계정 설정");
        break;
    }
  });

  const handleSelect = (menu: string) => {
    setSelected(menu);
  };
  console.log(selected);
  return (
    <div className="w-[280px] h-[348px] bg-white border border-black flex flex-col pt-5 mr-[9px]">
      <Link to="/mypage">
        <div
          className={`h-[42px] cursor-pointer flex items-center hover:text-black ${selected === "프로필" ? "bg-custom-green text-black" : "text-custom-gray"}`}
          onClick={() => handleSelect("프로필")}
        >
          <span className="ml-5">프로필</span>
        </div>
      </Link>
      <Link to="/mypage/completedTrips">
        <div
          className={`h-[42px] cursor-pointer flex items-center hover:text-black ${selected === "다녀온 여행" ? "bg-custom-green text-black" : "text-custom-gray"}`}
          onClick={() => handleSelect("다녀온 여행")}
        >
          <span className="ml-5">다녀온 여행</span>
        </div>
      </Link>
      <Link to="/mypage/travelHistory">
        <div
          className={`h-[42px] cursor-pointer flex items-center hover:text-black ${selected === "여행 후기" ? "bg-custom-green text-black" : "text-custom-gray"}`}
          onClick={() => handleSelect("여행 후기")}
        >
          <span className="ml-5">여행 후기</span>
        </div>
      </Link>
      <Link to="/mypage/accountSettings">
        <div
          className={`h-[42px] cursor-pointer flex items-center hover:text-black ${selected === "계정 설정" ? "bg-custom-green text-black" : "text-custom-gray"}`}
          onClick={() => handleSelect("계정 설정")}
        >
          <span className="ml-5">계정 설정</span>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
