import React, { useEffect, useState } from "react";
import { useTravelData } from "../../../Hooks/useTravelData";

const Gender = React.memo((): JSX.Element => {
  const { updateTravelData } = useTravelData();
  const [gender, setGender] = useState<string>("UNRELATED");

  useEffect(() => {
    updateTravelData("limitSex", "UNRELATED");
  }, []);

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateTravelData("limitSex", e.target.value);
    setGender(e.target.value);
  };

  return (
    <div className="flex items-center mb-2">
      <p className="text-[18px] mr-2">성별 :</p>
      <select
        className="select select-sm  w-[80px] text-[16px] border border-gray-300 rounded-sm px-2"
        onChange={e => handleGenderChange(e)}
        value={gender}
      >
        <option value="UNRELATED">무관</option>
        <option value="MALE">남자</option>
        <option value="FEMALE">여자</option>
      </select>
    </div>
  );
});

export default Gender;
