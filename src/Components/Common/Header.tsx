import React from "react";
import { Link } from "react-router-dom";

const Header = React.memo((): JSX.Element => {
  return (
    <div className="w-full h-10 mt-5 mb-7 mx-auto max-w-[1440px] min-w-[540px] px-3 flex justify-between align-center">
      <h1 className="text-4xl font-bold">여행족</h1>
      
      <div className="text-16">
        <Link to="/signIn" className="text-black hover:underline">
          로그인
        </Link>
        <span className="mx-2">/</span>
        <Link to="/signUp" className="text-black hover:underline">
          회원가입
        </Link>
      </div>
    </div>
  );
});

export default Header;
