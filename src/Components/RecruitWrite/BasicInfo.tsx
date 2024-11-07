import React from "react";
import TitleInput from "./BasicInfo/TitleInput";
import ParticipantsInput from "./BasicInfo/ParticipantsInput";
import TravelDatesSelect from "./BasicInfo/TravelDatesSelect";
import DestinationSelect from "./BasicInfo/DestinationSelect";
import RegionInput from "./BasicInfo/RegionInput";

const BasicInfo = React.memo(() => {
  return (
    <div className="mb-[30px]">
      <h2 className="text-[24px] font-bold">기본 정보</h2>
      <div className="w-full h-[1px] bg-black my-2"></div>
      <TitleInput />
      <ParticipantsInput />
      <TravelDatesSelect />
      <DestinationSelect />
      <RegionInput />
    </div>
  );
});

export default BasicInfo;
