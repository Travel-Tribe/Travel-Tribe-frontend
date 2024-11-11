import React, { useState } from "react";
import { useTravelData } from "../../../Hooks/useTravelData";

const Age = React.memo((): JSX.Element => {
  const { updateTravelData } = useTravelData();
  const [minAge, setMinAge] = useState<string>("1");
  const [maxAge, setMaxAge] = useState<string>("99");

  const handleAgeChange = (
    type: "min" | "max",
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (type === "min") {
      updateTravelData("limitMinAge", Number(e.target.value));
      setMinAge(e.target.value);
    } else {
      updateTravelData("limitMaxAge", Number(e.target.value));
      setMaxAge(e.target.value);
    }
  };

  return (
    <div className="flex items-center mb-2">
      <p className="text-[18px] mr-2">나이:</p>
      <select
        className="select select-sm w-[60px] text-[16px] border border-gray-300 rounded-sm px-2 mr-[5px]"
        value={minAge}
        onChange={e => handleAgeChange("min", e)}
      >
        {[...Array(99)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      ~
      <select
        className="select select-sm w-[60px] text-[16px] border border-gray-300 rounded-sm px-2 ml-[5px]"
        onChange={e => handleAgeChange("max", e)}
        value={maxAge}
      >
        {[...Array(99)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Age;
