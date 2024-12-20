import React from "react";
import { useRecruitPostStore } from "../../../store/recruitPostStore";

const Age = React.memo((): JSX.Element => {
  const updateTravelData = useRecruitPostStore(state => state.updateTravelData);
  const limitMinAge = useRecruitPostStore(state => state.postData.limitMinAge);
  const limitMaxAge = useRecruitPostStore(state => state.postData.limitMaxAge);

  return (
    <div className="flex items-center mb-2">
      <p className="text-[18px] mr-2">나이:</p>
      <select
        className="select select-sm w-[60px] text-[16px] border border-gray-300 px-2 mr-[5px]"
        value={limitMinAge}
        onChange={e => updateTravelData("limitMinAge", Number(e.target.value))}
      >
        {[...Array(99)].map((_, i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
      ~
      <select
        className="select select-sm w-[60px] text-[16px] border border-gray-300 px-2 ml-[5px]"
        value={limitMaxAge}
        onChange={e => updateTravelData("limitMaxAge", Number(e.target.value))}
      >
        {[...Array(99 - limitMinAge)].map((_, i) => (
          <option key={i + limitMinAge} value={i + limitMinAge}>
            {i + limitMinAge}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Age;
