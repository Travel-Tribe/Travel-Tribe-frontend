import React, { useEffect, useState } from "react";
import { useTravelData } from "../../Hooks/useTravelData";
import SpecificLocationSearch from "./SpecificLocationSearch";
import { getDiffDate } from "../../Utils/getDiffDate";

const TravelPlan = React.memo((): JSX.Element => {
  const { travelData } = useTravelData();
  const [destinations, setDestinations] = useState(
    Array.from(
      {
        length: getDiffDate(
          travelData.travelStartDate,
          travelData.travelEndDate,
        ),
      },
      () => [{ location: "", description: "", image: null }],
    ),
  );

  useEffect(() => {
    setDestinations(
      Array.from(
        {
          length: getDiffDate(
            travelData.travelStartDate,
            travelData.travelEndDate,
          ),
        },
        () => [{ location: "", description: "", image: null }],
      ),
    );
  }, [travelData]);

  const handleAddDestination = (dayIndex: number) => {
    const updatedDestinations = [...destinations];
    updatedDestinations[dayIndex] = [
      ...updatedDestinations[dayIndex],
      { location: "", description: "", image: null },
    ];
    setDestinations(updatedDestinations);
  };

  const handleInputChange = (
    dayIndex: number,
    destIndex: number,
    field: string | null,
    value: any,
  ) => {
    const updatedDestinations = [...destinations];
    updatedDestinations[dayIndex][destIndex][field] = value;
    setDestinations(updatedDestinations);
  };

  return (
    <div>
      <h2 className="text-[24px] font-bold">여행 일정</h2>
      <div className="w-full h-[1px] bg-black my-2"></div>

      <SpecificLocationSearch />

      {destinations.map((dayDestinations, dayIndex) => (
        <div key={dayIndex} className="w-[500px] relative mb-[30px]">
          <p className="text-[18px]">{`2024-12-${25 + dayIndex} (DAY-${dayIndex + 1})`}</p>
          <button
            className="btn btn-sm !h-[32px] bg-custom-green text-white absolute top-0 right-0"
            onClick={() => handleAddDestination(dayIndex)}
          >
            추가하기
          </button>
          <div className="w-[400px] border">
            {dayDestinations.map((destination, destIndex) => (
              <div key={destIndex}>
                <div className="flex items-center ml-[15px] mb-[10px] mt-[10px]">
                  <p className="text-[16px] w-[70px]">여행지: </p>
                  <input
                    type="text"
                    placeholder="여행지를 입력해주세요."
                    className="w-[300px] h-[18px] text-[12px] px-2 truncate border border-gray-300"
                    value={destination.location}
                    onChange={e =>
                      handleInputChange(
                        dayIndex,
                        destIndex,
                        "location",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="flex ml-[15px] mb-[10px]">
                  <p className="text-[16px] w-[70px]">설명: </p>
                  <textarea
                    placeholder="설명을 입력해주세요."
                    className="w-[300px] h-[100px] px-2 text-[12px] truncate border border-gray-300"
                    value={destination.description}
                    onChange={e =>
                      handleInputChange(
                        dayIndex,
                        destIndex,
                        "description",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="flex items-center ml-[15px] mb-[30px]">
                  <p className="text-[16px] w-[70px]">이미지:</p>
                  <div className="relative">
                    <input
                      type="file"
                      className="opacity-0 absolute inset-0 w-full h-full z-10 cursor-pointer"
                      onChange={e =>
                        handleInputChange(
                          dayIndex,
                          destIndex,
                          "image",
                          e.target.files[0],
                        )
                      }
                    />
                    <div className="w-[300px] h-[24px] leading-[24px] text-[12px] bg-white border border-gray-300 rounded-md text-gray-700 text-center">
                      파일을 선택하세요
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

export default TravelPlan;
