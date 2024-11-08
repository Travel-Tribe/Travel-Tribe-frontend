import React from "react";
import { useTravelData } from "../../../Hooks/useTravelData";

const TitleInput = React.memo(() => {
  const { travelData, updateTravelData } = useTravelData();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTravelData("title", e.target.value);
  };

  return (
    <div className="flex items-center mb-2">
      <p className="text-[18px] mr-2">제목:</p>
      <input
        type="text"
        placeholder="제목을 입력해주세요."
        className="w-[400px] h-[32px] px-2 truncate border border-gray-300 rounded-sm"
        value={travelData.title}
        onChange={handleChange}
      />
    </div>
  );
});

export default TitleInput;
