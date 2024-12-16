import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import fetchCall from "../../apis/fetchCall";
import { STORAGE_KEYS } from "../../constants/STORAGE_KEYS";
import profileImg from "../../assets/profile-img.webp";
import { useProfileStore } from "../../store/profileStore";
import { useUserProfile } from "../../hooks/userQueries";

interface ApiResponse {
  result: "SUCCESS" | "FAIL";
  errors: null | string;
  data: boolean | string;
}

// Axios 응답 타입 (필요한 필드만 포함)
interface AxiosResponse {
  data: ApiResponse;
}

const Sidebar = (): JSX.Element => {
  const {
    profileData,
    setNickname,
    nickname,
    resetProfileData,
    setProfileData,
  } = useProfileStore();
  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID) || "";
  const [setToken] = useLocalStorage(STORAGE_KEYS.TOKEN);
  const navigate = useNavigate();
  const [selected, setSelected] = useState("내 프로필");
  const location = useLocation();

  const { data: userProfile } = useUserProfile(userId!);

  const loadProfileData = async () => {
    if (!userId) return;

    try {
      // 프로필 데이터 가져오기
      if (userProfile) {
        setProfileData(userProfile);
      }
      setNickname(nickname);
    } catch (error) {
      console.error("Error loading profile data:", error);
    }
  };

  const onClickLogout = async () => {
    try {
      const response = await fetchCall<AxiosResponse>("/logout", "post");

      if (response.data.result === "SUCCESS") {
        localStorage.removeItem(STORAGE_KEYS.USER_ID);
        localStorage.removeItem(STORAGE_KEYS.PROFILE_CHECK);
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        if (typeof setToken === "function") {
          setToken(null);
        }
        resetProfileData();
        navigate("/");
      }
    } catch (error) {
      console.error("POST 요청에 실패했습니다:", error);
    }
  };

  useEffect(() => {
    loadProfileData();
  }, [userId, location.pathname]);

  useEffect(() => {
    const pathMap: { [key: string]: string } = {
      "/mypage": "내 프로필",
      "/mypage/completed-trips": "다녀온 여행들",
      "/mypage/review": "내 후기 글",
      "/mypage/account-settings": "계정 설정",
      "/mypage/voting": "투표 확인",
    };
    setSelected(pathMap[location.pathname] || "내 프로필");
  }, [location.pathname]);

  return (
    <aside className="w-[400px] h-screen sticky top-0 p-5 bg-white drop-shadow-lg">
      <h1 className="text-4xl font-bold">
        <Link to="/">여행족</Link>
      </h1>
      <div className="flex flex-col items-center my-10">
        <img
          className="w-[112px] h-[112px] rounded-full"
          src={
            profileData.fileAddress
              ? import.meta.env.VITE_API_BASE_URL +
                `/api/v1/file/preview?fileUrl=${profileData.fileAddress}`
              : profileImg
          }
        />
        <span className="w-[320px] h-8 mt-3 font-bold text-2xl overflow-y-hidden text-center">
          {nickname || "닉네임"}
        </span>
      </div>
      <nav className="font-semibold space-y-8 pt-4">
        <ul className="list-none space-y-8">
          {["내 프로필", "내 후기 글", "다녀온 여행들"].map(menu => (
            <li key={menu}>
              <Link
                to={`/mypage/${
                  menu === "내 프로필"
                    ? ""
                    : menu === "내 후기 글"
                      ? "review"
                      : "completed-trips"
                }`}
                className={`text-xl font-normal ${
                  selected === menu
                    ? "border-b border-black py-1 font-bold text-black"
                    : "text-gray-500"
                }`}
                onClick={() => setSelected(menu)}
              >
                {menu}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="border-t border-black py-2.5 flex justify-center space-x-5">
          <li className="text-sm">
            <Link to="/mypage/voting">투표 확인</Link>
          </li>
          <li className="text-sm">
            <Link to="/mypage/account-settings">계정 설정</Link>
          </li>
          <li className="text-sm cursor-pointer" onClick={onClickLogout}>
            로그아웃
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
