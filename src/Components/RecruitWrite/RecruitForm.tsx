import React from "react";
import BasicInfo from "./BasicInfo";
import CrewCondition from "./CrewCondition";
import ExpectMoney from "./ExpectMoney";
import TravelPlan from "./TravelPlan";

const RecruitForm = React.memo((): JSX.Element => {
  return (
    <div
      className="w-[80%] min-w-[600px] mt-[30px] mx-auto overflow-y-scroll"
      style={{ height: "calc(100% - 150px)" }}
    >
      {/* 기본 정보 */}
      <BasicInfo />
      {/* 모집 조건 */}
      <CrewCondition />
      {/* 예상 금액 */}
      <ExpectMoney />
      {/* 여행 일정 */}
      <TravelPlan />
    </div>
  );
});

export default RecruitForm;
