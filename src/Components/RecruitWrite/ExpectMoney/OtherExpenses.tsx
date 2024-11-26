import React from "react";
import { useRecruitPostStore } from "../../../store/recruitPostStore";

const OtherExpenses = React.memo((): JSX.Element => {
  const updateTravelData = useRecruitPostStore(state => state.updateTravelData);
  const otherExpenses = useRecruitPostStore(
    state => state.postData.otherExpenses,
  );

  return (
    <li className="mb-[10px]">
      <p className="text-[18px] mr-2">기타비용:</p>
      <input
        type="text"
        value={otherExpenses}
        className="input w-[200px] h-[24px] border border-gray-300 px-2 text-[16px]"
        onChange={e =>
          updateTravelData("otherExpenses", Number(e.target.value))
        }
      />
    </li>
  );
});

export default OtherExpenses;
