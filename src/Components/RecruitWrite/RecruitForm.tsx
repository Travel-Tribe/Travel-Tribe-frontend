import React from "react";
import BasicInfo from "./BasicInfo";
import { useTravelData } from "../../Hooks/useTravelData";
import CrewCondition from "./CrewCondition";
import ExpectMoney from "./ExpectMoney";

const RecruitForm = React.memo((): JSX.Element => {
  const { travelData } = useTravelData();
  console.log(travelData);

  return (
    <div
      className="w-[90%] min-w-[512px] mt-[30px] mx-auto overflow-y-scroll"
      style={{ height: "calc(100% - 150px)" }}
    >
      {/* 기본 정보 */}
      <BasicInfo />
      {/* 모집 조건 */}
      <CrewCondition />
      {/* 예상 금액 */}
      <ExpectMoney />
      {/* 여행 일정 */}
    </div>
  );
});

export default RecruitForm;
