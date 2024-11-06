import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../../Hooks/useLocalStorage";
import fetchCall from "../../Utils/apiFetch";
import { STORAGE_KEYS } from "../../Constants/STORAGE_KEYS";

interface ApiResponse {
  result: "SUCCESS" | "FAIL";
  errors: null | string;
  data: boolean | string;
}

// Axios 응답 타입 (필요한 필드만 포함)
interface AxiosResponse {
  data: ApiResponse;
}

const Header = React.memo((): JSX.Element => {
  const [token, setToken] = useLocalStorage(STORAGE_KEYS.TOKEN);
  const navigate = useNavigate();

  const onClickLogout = async () => {
    try {
      const response = await fetchCall<AxiosResponse>("/logout", "post");
      // const response = await fetchCall(`/logoutCookie:${document.cookie}`, "post");
      console.log("logout", response);
      if (response.data.result === "SUCCESS") {
        localStorage.removeItem(STORAGE_KEYS.USER_ID);
        localStorage.removeItem(STORAGE_KEYS.PROFILE_CHECK);
        document.cookie =
          "refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setToken(null);
        navigate("/recruitment");
      }
    } catch (error) {
      console.error("POST 요청에 실패했습니다:", error);
    }
  };

  return (
    <div className="w-full h-10 mt-[20px] mb-[30px] mx-auto max-w-[1347px] min-w-[540px] flex justify-between align-center">
      <h1 className="text-4xl font-bold">
        <Link to={"/"}>여행족</Link>
      </h1>
      {token === "null" || token === null ? (
        <div className="text-16 flex align-center">
          <Link to="/signIn" className="text-black hover:underline">
            로그인
          </Link>
          <span className="mx-2">/</span>
          <Link to="/signUp" className="text-black hover:underline">
            회원가입
          </Link>
        </div>
      ) : (
        <div className="text-16">
          <span className="text-black hover:underline" onClick={onClickLogout}>
            로그아웃
          </span>
          <span className="mx-2">/</span>
          <Link to="/mypage" className="text-black hover:underline">
            마이페이지
          </Link>
        </div>
      )}
    </div>
  );
});

export default Header;
