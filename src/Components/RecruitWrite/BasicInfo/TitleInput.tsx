import React from "react";
import { useRecruitPostStore } from "../../../store/recruitPostStore";

const TitleInput = React.memo(() => {
  const updateTravelData = useRecruitPostStore(state => state.updateTravelData);
  const title = useRecruitPostStore(state => state.postData.title);

  return (
    <div className="flex items-center mb-2">
      <p className="text-[18px] mr-2">제목:</p>
      <input
        type="text"
        placeholder="제목을 입력해주세요."
        className="input w-[400px] h-[32px] px-2 truncate border border-gray-300"
        value={title}
        onChange={e => updateTravelData("title", e.target.value)}
      />
    </div>
  );
});

export default TitleInput;
