import React, { useEffect, useState } from "react";
import { getDiffDate } from "../../../Utils/getDiffDate";
import { useRecruitPostStore } from "../../../store/recruitPostStore";
import DayDetail from "./DayDetail";
import { DayType } from "../../../type/types";

const TravelDay = React.memo((): JSX.Element => {
  const { postData, updateTravelData } = useRecruitPostStore();
  const [days, setDays] = useState([
    {
      dayDetails: [{ title: "", description: "", fileAddress: "" }],
      itineraryVisits: [{ latitude: 0, longitude: 0, orderNumber: 1 }],
    },
  ]);

  useEffect(() => {
    const numberOfDays = getDiffDate(
      postData.travelStartDate,
      postData.travelEndDate,
    );

    setDays(prevDays => {
      if (numberOfDays < prevDays.length) {
        const truncatedDays = prevDays.slice(0, numberOfDays);
        updateTravelData("days", truncatedDays);
        return truncatedDays;
      }

      if (numberOfDays > prevDays.length) {
        const newDays = Array.from(
          { length: numberOfDays - prevDays.length },
          () => ({
            dayDetails: [{ title: "", description: "", fileAddress: "" }],
            itineraryVisits: [{ latitude: 0, longitude: 0, orderNumber: 1 }],
          }),
        );
        const updatedDays = [...prevDays, ...newDays];
        updateTravelData("days", updatedDays);
        return updatedDays;
      }

      return prevDays;
    });
  }, [postData.travelStartDate, postData.travelEndDate, updateTravelData]);

  return (
    <>
      {days.map((day: DayType, dayIndex: number) => (
        <div key={dayIndex} className="w-[600px] mb-[30px]">
          <p className="text-[18px] mb-[10px]">
            {`${postData.travelStartDate.split("-")[0]}-${postData.travelStartDate.split("-")[1].padStart(2, "0")}-${String(Number(postData.travelStartDate.split("-")[2]) + dayIndex).padStart(2, "0")} (DAY-${dayIndex + 1})`}
          </p>
          <div className="w-[400px] border">
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
