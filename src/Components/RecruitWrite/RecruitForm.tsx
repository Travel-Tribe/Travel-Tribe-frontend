import React from "react";
import BasicInfo from "./BasicInfo";
import CrewCondition from "./CrewCondition";
import ExpectMoney from "./ExpectMoney";
import TravelPlan from "./TravelPlan";
import ResetBtn from "./btn/ResetBtn";
import CancelBtn from "./btn/CancelBtn";
import SubmitBtn from "./btn/SubmitBtn";

const RecruitForm = React.memo((): JSX.Element => {
  return (
    <>
      <div className="w-[80%] h-[calc(100vh-110px)] min-w-[600px] mt-[30px] mx-auto overflow-y-scroll">
        {/* 기본 정보 */}
        <BasicInfo />
        {/* 모집 조건 */}
        <CrewCondition />
        {/* 예상 금액 */}
        <ExpectMoney />
        {/* 여행 일정 */}
        <TravelPlan />
      </div>
      <div
        className="
        sticky bottom-0 left-0 w-full h-[80px] 
        shadow-[0_4px_18px_rgba(0,0,0,0.25)] bg-white
        flex items-center justify-between"
      >
        <div className="invisible ml-[10px]"></div>
        <div className="mr-[10px]">
          <ResetBtn />
          <CancelBtn />
          <SubmitBtn />
        </div>
      </div>
    </>
  );
});

export default RecruitForm;
