import React, { useEffect, useState } from "react";
import { getDiffDate } from "../../../utils/getDiffDate";
import { useRecruitPostStore } from "../../../store/recruitPostStore";
import { DayType } from "../../../type/types";
import DayDetail from "./DayDetail";

const TravelDay = React.memo((): JSX.Element => {
  const { postData, updateTravelData } = useRecruitPostStore();
  const [days, setDays] = useState(postData.days);

  useEffect(() => {
    const numberOfDays = getDiffDate(
      postData.travelStartDate,
      postData.travelEndDate,
    );

    setDays(prevDays => {
      if (numberOfDays < prevDays.length) {
        const truncatedDays = prevDays.slice(0, numberOfDays);
        return truncatedDays;
      }

      if (numberOfDays > prevDays.length) {
        const newDays = Array.from(
          { length: numberOfDays - prevDays.length },
          () => ({
            dayDetails: [{ title: "", description: "", fileAddress: "" }],
            itineraryVisits: [{ latitude: 0, longitude: 0, orderNumber: 0 }],
          }),
        );
        const updatedDays = [...prevDays, ...newDays];
        return updatedDays;
      }

      return prevDays;
    });
  }, [postData.travelStartDate, postData.travelEndDate, updateTravelData]);

  const getCalculatedDate = (startDate: string, dayIndex: number): string => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + dayIndex);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  return (
    <>
      {days.map((day: DayType, dayIndex: number) => (
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
            <DayDetail
              day={day}
              dayIndex={dayIndex}
              days={days}
              setDays={setDays}
            />
          </div>
        </div>
      ))}
    </>
  );
});

export default TravelDay;
