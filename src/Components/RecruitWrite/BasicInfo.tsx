import React from "react";
import TitleInput from "./basicInfo/TitleInput";
import ParticipantsInput from "./basicInfo/ParticipantsInput";
import TravelDateSelect from "./basicInfo/TravelDateSelect";
import DestinationSelect from "./basicInfo/DestinationSelect";
import RegionInput from "./basicInfo/RegionInput";

const BasicInfo = React.memo(() => {
  return (
    <div className="mb-[30px]">
      <h2 className="text-[24px] font-bold">기본 정보</h2>
      <div className="w-full h-[1px] bg-black my-2"></div>
      <TitleInput />
      <ParticipantsInput />
      <TravelDateSelect />
      <DestinationSelect />
      <RegionInput />
    </div>
  );
});

export default BasicInfo;
