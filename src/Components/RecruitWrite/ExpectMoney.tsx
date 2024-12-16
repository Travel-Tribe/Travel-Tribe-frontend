import React from "react";
import AccommodationFee from "./expectMoney/AccommodationFee";
import AirplaneFee from "./expectMoney/AirplaneFee";
import { useRecruitPostStore } from "../../store/recruitPostStore";
import OtherExpenses from "./expectMoney/OtherExpenses";

const ExpectMoney = React.memo((): JSX.Element => {
  const { postData } = useRecruitPostStore();

  return (
    <div className="mb-[30px]">
      <h2 className="text-[24px] font-bold">예상 비용</h2>
      <div className="w-full h-[1px] bg-black my-2"></div>
      <ul className="list-disc pl-4">
        <AccommodationFee />
        <AirplaneFee />
        <OtherExpenses />
      </ul>
      <p className="text-[18px] mr-2">
        총 비용:{" "}
        {(
          postData.accommodationFee +
          postData.airplaneFee +
          postData.otherExpenses
        ).toLocaleString()}{" "}
      </p>
    </div>
  );
});

export default ExpectMoney;
