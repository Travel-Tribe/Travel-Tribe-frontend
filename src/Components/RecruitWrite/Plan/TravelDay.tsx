import React from "react";
import { useRecruitPostStore } from "../../../store/recruitPostStore";
import DayDetail from "./DayDetail";

const TravelDay = React.memo((): JSX.Element => {
  const { postData } = useRecruitPostStore();

  const getCalculatedDate = (startDate: string, dayIndex: number): string => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + dayIndex);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  return (
    <>
      {postData.days.map((_, dayIndex: number) => (
        <div
          key={dayIndex}
          tabIndex={dayIndex}
          className="collapse collapse-arrow w-[600px] mb-[30px]"
        >
          <input type="checkbox" />
          <p className="collapse-title text-[18px] mb-[10px]">
            {`${getCalculatedDate(postData.travelStartDate, dayIndex)} (DAY-${dayIndex + 1})`}
          </p>
          <div className="collapse-content w-[400px] border">
            <DayDetail dayIndex={dayIndex} days={postData.days} />
          </div>
        </div>
      ))}
    </>
  );
});

export default TravelDay;
