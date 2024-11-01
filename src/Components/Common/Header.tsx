import React from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "../../Hooks/useLocalStorage";
import fetchCall from "../../Utils/apiFetch";

const Header = React.memo((): JSX.Element => {
  const [userId, setUserId] = useLocalStorage("USER_ID");

  const onClickLogout = async () => {
    try {
      await fetchCall("/logout", "post");
      setUserId(null);
    } catch (error) {
      console.error("POST 요청에 실패했습니다:", error);
    }
  };

  return (
    <div className="w-full h-10 mt-5 mb-7 mx-auto max-w-[1440px] min-w-[540px] px-3 flex justify-between align-center">
      <h1 className="text-4xl font-bold">여행족</h1>
      {userId === null || userId === "null" ? (
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
            회원가입
          </Link>
        </div>
      )}
    </div>
  );
});

export default Header;
