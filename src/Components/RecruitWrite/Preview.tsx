import React from "react";
import { useTravelData } from "../../Hooks/useTravelData";
import { TripCost, TripDetails, TripRules } from "../RecruitPost";

const Preview = React.memo((): JSX.Element => {
  const { travelData } = useTravelData();
  return (
    <div className="px-[10px] pt-[10px]">
      <div className="mb-[10px]">
        <TripDetails travelPlan={travelData} />
      </div>
      <div className="mb-[10px]">
        {/* <TripCost travelPlan={travelData} /> */}
      </div>
      <div className="mb-[10px]">
        <TripRules travelPlan={travelData} />
      </div>
    </div>
  );
});

export default Preview;
