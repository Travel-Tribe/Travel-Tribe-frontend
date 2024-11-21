import React from "react";
import { useRecruitPostStore } from "../../../store/recruitPostStore";

const ResetBtn = React.memo(() => {
  const { clearTravelData } = useRecruitPostStore();
  return (
    <button
      className="btn w-[130px] h-[35px] bg-custom-blue text-white mr-[30px]"
      onClick={clearTravelData}
    >
      글 초기화
    </button>
  );
});

export default ResetBtn;
