import React, { useEffect, useState } from "react";
import { useTravelData } from "../../Hooks/useTravelData";
import { getDiffDate } from "../../Utils/getDiffDate";
import SpecificLocationSearch from "./SpecificLocationSearch";

const TravelPlan = React.memo((): JSX.Element => {
  const { travelData, updateTravelData } = useTravelData();
  const [destinations, setDestinations] = useState(
    Array.from(
      {
        length: getDiffDate(
          travelData.travelStartDate,
          travelData.travelEndDate,
        ),
      },
      () => [{ title: "", description: "", image: null }],
    ),
  );

  const [geometry, setGeometry] = useState(
    Array.from(
      {
        length: getDiffDate(
          travelData.travelStartDate,
          travelData.travelEndDate,
        ),
      },
      () => [{ latitude: 0, longitude: 0, orderNumber: 1 }],
    ),
  );

  useEffect(() => {
    setDestinations(
      Array.from(
        {
          length:
            getDiffDate(travelData.travelStartDate, travelData.travelEndDate) +
            1,
        },
        () => [{ title: "", description: "", image: null }],
      ),
    );
    setGeometry(
      Array.from(
        {
          length:
            getDiffDate(travelData.travelStartDate, travelData.travelEndDate) +
            1,
        },
        () => [{ latitude: 0, longitude: 0, orderNumber: 1 }],
      ),
    );
  }, [travelData.travelEndDate, travelData.travelStartDate]);

  const handleAddDestination = (dayIndex: number) => {
    const updatedDestinations = [...destinations];
    updatedDestinations[dayIndex] = [
      ...updatedDestinations[dayIndex],
      { title: "", description: "", image: null },
    ];

    const updatedGeometry = [...geometry];
    updatedGeometry[dayIndex] = [
      ...updatedGeometry[dayIndex],
      {
        latitude: 0,
        longitude: 0,
        orderNumber: updatedGeometry[dayIndex].length + 1,
      },
    ];

    setDestinations(updatedDestinations);
    setGeometry(updatedGeometry);
  };

  const handleInputChange = (
    dayIndex: number,
    destIndex: number,
    field: string | null,
    value: any,
  ) => {
    if (!field) {
      const updatedGeometry = [...geometry];
      updatedGeometry[dayIndex][destIndex] = value;
      setGeometry(updatedGeometry);
      updateTravelData("days", [
        {
          ...travelData.days[0],
          itineraryVisits: updatedGeometry,
        },
      ]);
    } else {
      const updatedDestinations = [...destinations];
      updatedDestinations[dayIndex][destIndex][field] = value;
      setDestinations(updatedDestinations);
      updateTravelData("days", [
        {
          ...travelData.days[0],
          dayDetails: updatedDestinations,
        },
      ]);
    }
  };

  return (
    <div>
      <h2 className="text-[24px] font-bold">여행 일정</h2>
      <div className="w-full h-[1px] bg-black my-2"></div>

      {destinations.map((day, dayIndex) => (
        <div key={dayIndex} className="w-[500px] relative mb-[30px]">
          <p className="text-[18px]">{`${travelData.travelStartDate.split("-")[0]}-${travelData.travelStartDate.split("-")[1]}-${Number(travelData.travelStartDate.split("-")[2]) + dayIndex} (DAY-${dayIndex + 1})`}</p>
          <button
            className="btn btn-sm !h-[32px] bg-custom-green text-white absolute top-0 right-0"
            onClick={() => handleAddDestination(dayIndex)}
          >
            추가하기
          </button>
          <div className="w-[400px] border">
            {day.map((destination, destIndex) => (
              <div key={destIndex}>
                <div className="flex items-center ml-[15px] mb-[10px] mt-[10px]">
                  <p className="text-[16px] w-[70px]">여행지: </p>
                  <SpecificLocationSearch
                    placeName={destination.title}
                    dayIndex={dayIndex}
                    destIndex={destIndex}
                    onPlaceSelected={handleInputChange}
                  />
                  {/* <input
                    type="text"
                    placeholder="여행지를 입력해주세요."
                    className="w-[300px] h-[18px] text-[12px] px-2 truncate border border-gray-300"
                    value={destination.title}
                    onChange={e =>
                      handleInputChange(
                        dayIndex,
                        destIndex,
                        "title",
                        e.target.value,
                      )
                    }
                  /> */}
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
                          URL.createObjectURL(e.target.files[0]),
                        )
                      }
                    />
                    <div className="w-[300px] h-[24px] leading-[24px] text-[12px] bg-white border border-gray-300 rounded-md text-gray-700 text-center">
                      {/* {destination.image.name || "파일을 선택하세요"} */}
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
