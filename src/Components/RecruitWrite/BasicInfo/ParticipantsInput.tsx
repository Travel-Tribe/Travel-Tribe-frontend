import React from "react";
import { useTravelData } from "../../../Hooks/useTravelData";

const ParticipantsInput = React.memo(() => {
  const { travelData, updateTravelData } = useTravelData();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateTravelData("maxParticipants", parseInt(e.target.value));
  };

  return (
    <div className="flex items-center mb-2">
      <p className="text-[18px] mr-2">모집인원:</p>
      <select
        className="select select-sm focus:outline-custom-green w-[60px] text-[16px] border border-gray-300 rounded-sm px-2"
        value={travelData.maxParticipants}
        onChange={handleChange}
      >
        {[...Array(11)].map((_, i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    </div>
  );
});

export default ParticipantsInput;
