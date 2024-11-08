import React from "react";
import { useTravelData } from "../../../Hooks/useTravelData";

const AirplaneFee = React.memo((): JSX.Element => {
  const { travelData, updateTravelData } = useTravelData();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTravelData("airplaneFee", Number(e.target.value));
  };

  return (
    <li className="mb-[10px]">
      <p className="text-[18px] mr-2">항공비:</p>
      <input
        type="text"
        value={travelData.airplaneFee}
        className="border border-gray-300 rounded-sm w-[100px] px-2 text-[16px]"
        onChange={handleChange}
      />
    </li>
  );
});

export default AirplaneFee;
