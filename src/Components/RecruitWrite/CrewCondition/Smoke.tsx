import React from "react";
import { useRecruitPostStore } from "../../../store/recruitPostStore";

const Smoke = React.memo((): JSX.Element => {
  const updateTravelData = useRecruitPostStore(state => state.updateTravelData);
  const limitSmoke = useRecruitPostStore(state => state.postData.limitSmoke);
  return (
    <div className="flex items-center mb-2">
      <p className="text-[18px] mr-2">흡연 여부:</p>
      <select
        className="select select-sm  w-[100px] text-[16px] border border-gray-300 rounded-sm mr-1 px-2"
        onChange={e => updateTravelData("limitSmoke", e.target.value)}
        value={limitSmoke}
      >
        <option value="UNRELATED">무관</option>
        <option value="SMOKE">흡연자</option>
        <option value="NO_SMOKE">비흡현자</option>
      </select>
    </div>
  );
});

export default Smoke;
