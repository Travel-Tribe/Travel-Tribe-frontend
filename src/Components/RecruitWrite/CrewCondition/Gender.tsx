import React, { useEffect } from "react";
import { useRecruitPostStore } from "../../../store/recruitPostStore";

const Gender = React.memo((): JSX.Element => {
  const updateTravelData = useRecruitPostStore(state => state.updateTravelData);
  const limitSex = useRecruitPostStore(state => state.postData.limitSex);

  useEffect(() => {
    if (limitSex === "무관") updateTravelData("limitSmoke", "UNRELATED");
    if (limitSex === "남자") updateTravelData("limitSmoke", "MALE");
    if (limitSex === "여자") updateTravelData("limitSmoke", "FEMALE");
  }, []);

  return (
    <div className="flex items-center mb-2">
      <p className="text-[18px] mr-2">성별 :</p>
      <select
        className="select select-sm  w-[80px] text-[16px] border border-gray-300 rounded-sm px-2"
        onChange={e => updateTravelData("limitSex", e.target.value)}
        value={limitSex}
      >
        <option value="UNRELATED">무관</option>
        <option value="MALE">남자</option>
        <option value="FEMALE">여자</option>
      </select>
    </div>
  );
});

export default Gender;
