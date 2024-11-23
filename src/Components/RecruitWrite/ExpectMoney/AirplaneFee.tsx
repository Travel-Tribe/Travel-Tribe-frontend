import React from "react";
import { useRecruitPostStore } from "../../../store/recruitPostStore";

const AirplaneFee = React.memo((): JSX.Element => {
  const updateTravelData = useRecruitPostStore(state => state.updateTravelData);
  const airplaneFee = useRecruitPostStore(state => state.postData.airplaneFee);

  return (
    <li className="mb-[10px]">
      <p className="text-[18px] mr-2">항공비:</p>
      <input
        type="text"
        value={airplaneFee}
        className="border border-gray-300 rounded-sm w-[200px] px-2 text-[16px]"
        onChange={e => updateTravelData("airplaneFee", Number(e.target.value))}
      />
    </li>
  );
});

export default AirplaneFee;
