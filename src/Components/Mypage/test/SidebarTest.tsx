import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useLocalStorage from "../../../Hooks/useLocalStorage";
import fetchCall from "../../../Utils/apiFetch";
import { STORAGE_KEYS } from "../../../Constants/STORAGE_KEYS";
import profileImg from "../../../assets/profileImg.webp";

interface ApiResponse {
  result: "SUCCESS" | "FAIL";
  errors: null | string;
  data: boolean | string;
}

// Axios 응답 타입 (필요한 필드만 포함)
interface AxiosResponse {
  data: ApiResponse;
}

const MypageTest = () => {
  const [token, setToken] = useLocalStorage(STORAGE_KEYS.TOKEN);
  const navigate = useNavigate();
  console.log(token, document.cookie);
  const onClickLogout = async () => {
    try {
      await fetchCall<AxiosResponse>("/logout", "post");
      localStorage.removeItem(STORAGE_KEYS.USER_ID);
      localStorage.removeItem(STORAGE_KEYS.PROFILE_CHECK);
      document.cookie =
        "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setToken(null);
      // if (response.data.result === "SUCCESS") {
      //   // await fetchCall(`/logoutCookie:${document.cookie}`, "post");
      //   localStorage.removeItem(STORAGE_KEYS.USER_ID);
      //   localStorage.removeItem(STORAGE_KEYS.PROFILE_CHECK);
      //   document.cookie =
      //     "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      //   setToken(null);
      // }
      navigate("/");
    } catch (error) {
      console.error("POST 요청에 실패했습니다:", error);
    }
  };

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
  console.log(selected);

  const handleSelect = (menu: string) => {
    setSelected(menu);
  };

  return (
    <>
      {/* Sidebar */}
      <aside className="w-[400px] h-screen p-5 bg-white drop-shadow-lg">
        <h1 className="text-4xl font-bold">
          <Link to={"/"}>여행족</Link>
        </h1>
        <div className="flex flex-col items-center my-10">
          <img className="w-[112px] h-[112px] rounded-full" src={profileImg} />
          <span className="w-[320px] h-8 mt-3 font-bold text-2xl overflow-y-hidden text-center">
            닉네임
          </span>
        </div>
        <nav className="font-semibold space-y-8 pt-4">
          <ul className="list-none space-y-8">
            <li className="py-1">
              <Link
                to="/test"
                className={`text-xl font-normal ${selected === "프로필" ? "border-b border-black py-1" : ""}`}
                onClick={() => handleSelect("프로필")}
              >
                내 프로필
              </Link>
            </li>
            <li className="text-xl font-normal">
              <Link
                to="/test"
                className={`text-xl font-normal ${selected === "내 후기 글" ? "border-b border-black py-1" : ""}`}
                onClick={() => handleSelect("내 후기 글")}
              >
                내 후기 글
              </Link>
            </li>
            <li className="text-xl font-normal">
              <Link
                to="/test"
                className={`text-xl font-normal ${selected === "다녀온 여행들" ? "border-b border-black py-1" : ""}`}
                onClick={() => handleSelect("다녀온 여행들")}
              >
                다녀온 여행들
              </Link>
            </li>
          </ul>
          <ul className="border-t border-black py-2.5 flex justify-center space-x-5">
            <li className="text-sm">계정 설정</li>
            <li className="text-sm cursor-pointer" onClick={onClickLogout}>로그아웃</li>
          </ul>
          {/* <a href="#" className="block">
            내 프로필
          </a>
          <a href="#" className="block">
            내 후기 글
          </a>
          <a href="#" className="block">
            다녀온 여행들
          </a>
          <a href="#" className="block">
            계정 설정
          </a>
          <a href="#" className="block text-red-500" onClick={onClickLogout}>
            로그아웃
          </a> */}
        </nav>
      </aside>
    </>
  );
};
export default MypageTest;
