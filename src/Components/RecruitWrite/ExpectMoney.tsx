import React from "react";
import AccommodationFee from "./ExpectMoney/AccommodationFee";
import AirplaneFee from "./ExpectMoney/AirplaneFee";
import EctFee from "./ExpectMoney/EctFee";
import { useTravelData } from "../../Hooks/useTravelData";

const ExpectMoney = React.memo((): JSX.Element => {
  const { travelData } = useTravelData();

  return (
    <div className="mb-[30px]">
      <h2 className="text-[24px] font-bold">예상 비용</h2>
      <div className="w-full h-[1px] bg-black my-2"></div>
      <ul className="list-disc pl-4">
        <AccommodationFee />
        <AirplaneFee />
        <EctFee />
      </ul>
      <p className="text-[18px] mr-2">
        비용:{" "}
        {travelData.accommodationFee +
          travelData.airplaneFee +
          travelData.ectFee}
      </p>
    </div>
  );
});

export default ExpectMoney;
