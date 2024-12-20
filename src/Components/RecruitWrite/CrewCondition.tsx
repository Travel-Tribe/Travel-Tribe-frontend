import React from "react";
import Age from "./crewCondition/Age";
import Gender from "./crewCondition/Gender";
import Smoke from "./crewCondition/Smoke";

const CrewCondition = React.memo((): JSX.Element => {
  return (
    <div className="mb-[30px]">
      <h2 className="text-[24px] font-bold">참여 조건</h2>
      <div className="w-full h-[1px] bg-black my-2"></div>
      <Age />
      <Gender />
      <Smoke />
    </div>
  );
});

export default CrewCondition;
