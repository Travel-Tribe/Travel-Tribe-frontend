import React from "react";
import { useRecruitPostStore } from "../../../store/recruitPostStore";

const AccommodationFee = React.memo((): JSX.Element => {
  const updateTravelData = useRecruitPostStore(state => state.updateTravelData);
  const accommodationFee = useRecruitPostStore(
    state => state.postData.accommodationFee,
  );

  return (
    <li className="mb-[10px]">
      <p className="text-[18px] mr-2">숙박비:</p>
      <input
        type="text"
        value={accommodationFee}
        className="border border-gray-300 rounded-sm w-[200px] px-2 text-[16px]"
        onChange={e =>
          updateTravelData("accommodationFee", Number(e.target.value))
        }
      />
    </li>
  );
});

export default AccommodationFee;
