import React from "react";
import SearchBar from "../Components/Recruitment/SearchBar";
import { Link } from "react-router-dom";

const Review = (): JSX.Element => {
  return (
    <div className="max-w-[1347px] min-w-[540px] w-full mx-auto px-[20px]">
      <div className="flex space-x-4 mb-[30px]">
        <Link
          to={"/recruitment"}
          className={`cursor-pointer text-[24px] text-black opacity-40 pb-2 `}
        >
          모집
        </Link>

        <div
          className={`cursor-pointer text-[24px] text-black border-b border-black pb-2`}
        >
          후기
        </div>
      </div>
      <div className="flex"></div>
      <SearchBar />
    </div>
  );
};

export default Review;
