import React from "react";
import { useRecruitPostStore } from "../../../store/recruitPostStore";
import { Link } from "react-router-dom";

const CancelBtn = React.memo(() => {
  const { clearTravelData } = useRecruitPostStore();
  return (
    <Link
      to={"/recruitment"}
      className="btn w-[130px] h-[35px] btn-error text-white mr-[30px]"
      onClick={clearTravelData}
    >
      취소하기
    </Link>
  );
});

export default CancelBtn;
