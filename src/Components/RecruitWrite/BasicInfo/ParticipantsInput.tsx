import React from "react";
import { useRecruitPostStore } from "../../../store/recruitPostStore";

const ParticipantsInput = React.memo(() => {
  const updateTravelData = useRecruitPostStore(state => state.updateTravelData);
  const maxParticipants = useRecruitPostStore(
    state => state.postData.maxParticipants,
  );

  return (
    <div className="flex items-center mb-2">
      <p className="text-[18px] mr-2">모집인원:</p>
      <select
        className="select select-sm focus:outline-custom-green w-[60px] text-[16px] border border-gray-300 px-2"
        value={maxParticipants}
        onChange={e =>
          updateTravelData("maxParticipants", parseInt(e.target.value))
        }
      >
        {[...Array(10)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
});

export default ParticipantsInput;
