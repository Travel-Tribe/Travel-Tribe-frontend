import React from "react";
import TravelDay from "./plan/TravelDay";

const TravelPlan = React.memo((): JSX.Element => {
  return (
    <>
      <h2 className="text-[24px] font-bold">여행 일정</h2>
      <div className="w-full h-[1px] bg-black my-2"></div>
      <TravelDay />
    </>
  );
});

export default TravelPlan;
