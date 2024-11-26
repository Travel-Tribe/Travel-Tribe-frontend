import React, { useCallback, useEffect, useState } from "react";
import { getDiffDate } from "../../Utils/getDiffDate";
import SpecificLocationSearch from "./SpecificLocationSearch";
import { useRecruitPostStore } from "../../store/recruitPostStore";
import { postImgUrl } from "../../Utils/postImgUrl";

const TravelPlan = React.memo((): JSX.Element => {
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
    const newDays = Array.from({ length: numberOfDays }, () => ({
      dayDetails: [{ title: "", description: "", fileAddress: "" }],
      itineraryVisits: [{ latitude: 0, longitude: 0, orderNumber: 1 }],
    }));

    setDays(newDays);

    if (postData.days[0]) {
      setDays(postData.days);
    }
  }, [postData.travelStartDate, postData.travelEndDate]);

  const handleAddDaySchedule = useCallback(
    (dayIndex: number) => {
      const newDays = [...days];
      const newDayDetails = [
        ...newDays[dayIndex].dayDetails,
        { title: "", description: "", fileAddress: "" },
      ];
      const newItineraryVisits = [
        ...newDays[dayIndex].itineraryVisits,
        {
          latitude: 0,
          longitude: 0,
          orderNumber: newDays[dayIndex].itineraryVisits.length + 1,
        },
      ];
      newDays[dayIndex] = {
        dayDetails: newDayDetails,
        itineraryVisits: newItineraryVisits,
      };

      setDays(newDays);
    },
    [days],
  );

  const handleDayDetailsInputChange = (
    dayIndex: number,
    destIndex: number,
    field: "title" | "description" | "fileAddress",
    e:
      | string
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | null,
  ) => {
    const newDays = [...days];
    if (typeof e === "string")
      newDays[dayIndex].dayDetails[destIndex][field] = e;
    else if (e !== null)
      newDays[dayIndex].dayDetails[destIndex][field] = e.target.value;
    updateTravelData("days", newDays);
    updateTravelData("days", newDays);
  };

  const handleItineraryVisitsSelectChange = (
    dayIndex: number,
    destIndex: number,
    field: "latitude" | "longitude",
    value: number,
  ) => {
    const newDays = [...days];
    newDays[dayIndex].itineraryVisits[destIndex][field] = value;
    updateTravelData("days", newDays);
  };

  return (
    <div>
      <h2 className="text-[24px] font-bold">여행 일정</h2>
      <div className="w-full h-[1px] bg-black my-2"></div>
      {days.map((day, dayIndex) => (
        <div key={dayIndex} className="w-[600px] mb-[30px]">
          <p className="text-[18px] mb-[10px]">
            {`${postData.travelStartDate.split("-")[0]}-${postData.travelStartDate.split("-")[1].padStart(2, "0")}-${String(Number(postData.travelStartDate.split("-")[2]) + dayIndex).padStart(2, "0")} (DAY-${dayIndex + 1})`}
          </p>
          <div className="w-[400px] border">
            {day.dayDetails.map((info, destIndex) => (
              <div key={destIndex}>
                <div className="flex items-center ml-[15px] mb-[10px] mt-[10px]">
                  <p className="text-[16px] w-[70px]">여행지: </p>
                  <SpecificLocationSearch
                    placeName={info.title}
                    dayIndex={dayIndex}
                    destIndex={destIndex}
                    onPlaceSelected={handleItineraryVisitsSelectChange}
                    onInputChanged={handleDayDetailsInputChange}
                  />
                </div>
                <div className="flex ml-[15px] mb-[10px]">
                  <p className="text-[16px] w-[70px]">설명: </p>
                  <textarea
                    placeholder="설명을 입력해주세요."
                    className="w-[380px] h-[100px] px-2 text-[12px] truncate border border-gray-300"
                    value={info.description}
                    onChange={e =>
                      handleDayDetailsInputChange(
                        dayIndex,
                        destIndex,
                        "description",
                        e,
                      )
                    }
                  />
                </div>
                <div className="flex items-center ml-[15px] mb-[30px]">
                  <p className="text-[16px] w-[70px]">이미지:</p>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".png, .jpeg, .jpg"
                      className="w-[300px] h-[24px] leading-[24px] text-[12px] bg-white border border-gray-300 rounded-md text-gray-700 text-center cursor-pointer"
                      onChange={async e => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        const url = await postImgUrl(file);
                        handleDayDetailsInputChange(
                          dayIndex,
                          destIndex,
                          "fileAddress",
                          url,
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              className="btn btn-block h-[18px] btn-success text-white"
              onClick={() => handleAddDaySchedule(dayIndex)}
            >
              추가하기
            </button>
          </div>
        </div>
      ))}
    </div>
  );
});

export default TravelPlan;
