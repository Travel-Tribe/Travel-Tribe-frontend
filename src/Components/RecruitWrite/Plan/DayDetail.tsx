import React, { useCallback } from "react";
import { useRecruitPostStore } from "../../../store/recruitPostStore";
import { DayDetailType, DayType } from "../../../type/types";
import SpecificLocationSearch from "./SpecificLocationSearch";
import { postImgUrl } from "../../../Utils/postImgUrl";

interface DayDetailProps {
  day: DayType;
  dayIndex: number;
  days: DayType[];
  setDays: (value: DayType[]) => void;
}

const DayDetail = ({
  day,
  dayIndex,
  days,
  setDays,
}: DayDetailProps): JSX.Element => {
  const { updateTravelData } = useRecruitPostStore();

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
      updateTravelData("days", newDays);
    },
    [days, setDays, updateTravelData],
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
    <>
      {day.dayDetails.map((info: DayDetailType, destIndex: number) => (
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
            <div>
              <input
                type="file"
                accept=".png, .jpeg, .jpg"
                className="file-input file-input-bordered file-input-sm file-input-success w-[300px] max-w-xs"
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
    </>
  );
};
export default DayDetail;
