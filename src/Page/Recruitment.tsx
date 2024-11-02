import React, { useState } from "react";
import SelectBox from "../Components/Common/SelectBox";

const Recruitment = React.memo((): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<"모집" | "후기">("모집");
  const continents = [
    "아프리카",
    "아시아",
    "유럽",
    "북아메리카",
    "남아메리카",
    "오세아니아",
  ];
  const [selectedContinent, setSelectedContinent] = useState<string>(
    continents[0],
  );

  const handleSelect = (continent: string) => {
    setSelectedContinent(continent);
  };

  return (
    <div className="max-w-[1347px] min-w-[540px] w-full mx-auto px-[20px]">
      <div className="flex space-x-4 mb-[30px]">
        {/* 모집 탭 */}
        <div
          onClick={() => setSelectedTab("모집")}
          className={`cursor-pointer text-[24px] ${
            selectedTab === "모집"
              ? "text-black border-b border-black"
              : "text-black opacity-40"
          } pb-2`}
        >
          모집
        </div>

        {/* 후기 탭 */}
        <div
          onClick={() => setSelectedTab("후기")}
          className={`cursor-pointer text-[24px] ${
            selectedTab === "후기"
              ? "text-black border-b border-black"
              : "text-black opacity-40"
          } pb-2`}
        >
          후기
        </div>
      </div>
      <SelectBox
        options={continents}
        selectedValue={selectedContinent}
        onSelect={handleSelect}
      />
    </div>
  );
});

export default Recruitment;
