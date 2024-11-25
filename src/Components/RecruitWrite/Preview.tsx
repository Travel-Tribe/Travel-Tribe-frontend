import React from "react";
import {
  TripCost,
  TripDetails,
  TripItinerary,
  TripRules,
} from "../RecruitDetail";
import { useRecruitPostStore } from "../../store/recruitPostStore";

const Preview = React.memo((): JSX.Element => {
  const { postData } = useRecruitPostStore();

  return (
    <div className="px-[10px] pt-[10px]">
      <div className="mb-[10px]">
        <TripDetails travelPlan={postData} />
      </div>
      <div className="mb-[10px]">
        <TripCost travelPlan={postData} />
      </div>
      <div className="mb-[10px]">
        <TripRules travelPlan={postData} />
      </div>
      <div className="mb-[10px]">
        {/* <TripItinerary travelPlan={postData} /> */}
      </div>
    </div>
  );
});

export default Preview;
