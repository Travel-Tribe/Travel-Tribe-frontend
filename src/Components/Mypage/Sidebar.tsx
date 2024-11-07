import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "../../Hooks/useLocalStorage";
import fetchCall from "../../Utils/apiFetch";
import { STORAGE_KEYS } from "../../Constants/STORAGE_KEYS";
import profileImg from "../../assets/profileImg.webp";

interface ApiResponse {
  result: "SUCCESS" | "FAIL";
  errors: null | string;
  data: boolean | string;
}

const fetchSideUserProfile = async (userId: string) => {
  try {
    const response = await fetchCall<{ fileAddress: string }>(
      `/api/v1/users/${userId}/profile`,
      "get",
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile data:", error);
    return null;
  }
};

const fetchSideUserData = async () => {
  try {
    const response = await fetchCall<{ nickname: string }>(
      `/api/v1/users`,
      "get",
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

const Sidebar = (): JSX.Element => {
  const [sidebarProfileData, setSidebarProfileData] = useState({
    nickname: "",
    fileAddress: "",
  });
  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID) || "";
  const [token, setToken] = useLocalStorage(STORAGE_KEYS.TOKEN);
  const navigate = useNavigate();
  const [selected, setSelected] = useState("내 프로필");
  const location = useLocation();

  const onClickLogout = async () => {
    try {
      await fetchCall("/logout", "post");
      localStorage.removeItem(STORAGE_KEYS.USER_ID);
      localStorage.removeItem(STORAGE_KEYS.PROFILE_CHECK);
      document.cookie =
        "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setToken(null);
      navigate("/");
    } catch (error) {
      console.error("POST 요청에 실패했습니다:", error);
    }
  };

  const loadProfileData = async () => {
    if (userId) {
      const profile = await fetchSideUserProfile(userId);
      const userData = await fetchSideUserData();
      if (profile && userData) {
        setSidebarProfileData({
          fileAddress: profile.fileAddress,
          nickname: userData.nickname,
        });
      }
    }
  };
  loadProfileData();

  useEffect(() => {
    loadProfileData();
  }, [userId]);

  useEffect(() => {
    const pathMap: { [key: string]: string } = {
      "/mypage": "내 프로필",
      "/mypage/completedTrips": "다녀온 여행들",
      "/mypage/travelHistory": "내 후기 글",
      "/mypage/accountSettings": "계정 설정",
    };
    setSelected(pathMap[location.pathname] || "내 프로필");
  }, [location.pathname]);

  return (
    <aside className="w-[400px] h-screen p-5 bg-white drop-shadow-lg">
      <h1 className="text-4xl font-bold">
        <Link to="/">여행족</Link>
      </h1>
      <div className="flex flex-col items-center my-10">
        <img
          className="w-[112px] h-[112px] rounded-full"
          src={sidebarProfileData.fileAddress || profileImg}
        />
        <span className="w-[320px] h-8 mt-3 font-bold text-2xl overflow-y-hidden text-center">
          {sidebarProfileData.nickname || "닉네임"}
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
                      ? "travelHistory"
                      : "completedTrips"
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
            <Link to="/mypage/accountSettings">계정 설정</Link>
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
