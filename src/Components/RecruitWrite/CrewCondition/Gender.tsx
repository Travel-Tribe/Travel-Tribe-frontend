import React from "react";
import { useRecruitPostStore } from "../../../store/recruitPostStore";

const Gender = React.memo((): JSX.Element => {
  const updateTravelData = useRecruitPostStore(state => state.updateTravelData);
  const limitSex = useRecruitPostStore(state => state.postData.limitSex);

  return (
    <div className="flex items-center mb-2">
      <p className="text-[18px] mr-2">성별 :</p>
      <select
        className="select select-sm  w-[80px] text-[16px] border border-gray-300 px-2"
        onChange={e => updateTravelData("limitSex", e.target.value)}
        value={limitSex}
      >
        <option value="무관">무관</option>
        <option value="남자">남자</option>
        <option value="여자">여자</option>
      </select>
    </div>
  );
});

export default Gender;
