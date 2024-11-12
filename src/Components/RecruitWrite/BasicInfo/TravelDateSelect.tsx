import React, { useCallback } from "react";
import { useRecruitPostStore } from "../../../store/recruitPostStore";

const TravelDateSelect = React.memo(() => {
  const updateTravelData = useRecruitPostStore(state => state.updateTravelData);
  const travelStartDate = useRecruitPostStore(
    state => state.postData.travelStartDate,
  );
  const travelEndDate = useRecruitPostStore(
    state => state.postData.travelEndDate,
  );
  const deadline = useRecruitPostStore(state => state.postData.deadline);
  const startYear = travelStartDate.split("-")[0];
  const currentYear = new Date().getFullYear();
  const years = Array.from({
    length: Math.abs(Number(currentYear) - Number(startYear) + 2),
  }).map((_, i) => i + Number(startYear));

  const getDaysInMonth = useCallback((year: number, month: number) => {
    const days = [];
    const date = new Date(year, month, 0);
    const totalDays = date.getDate();
    for (let day = 1; day <= totalDays; day++) {
      const dayOfWeek = new Date(year, month - 1, day).toLocaleString("ko-KR", {
        weekday: "short",
      });
      days.push({ day, dayOfWeek });
    }
    return days.map(day => (
      <option key={day.day} value={day.day}>
        {day.day} ({day.dayOfWeek})
      </option>
    ));
  }, []);

  return (
    <div>
      <div className="flex items-center mb-2">
        <p className="text-[18px] mr-2">여행 시작 날짜:</p>
        <select
          className="select select-sm focus:outline-custom-green w-[80px] text-[16px] border border-gray-300 rounded-sm mr-1 px-2"
          value={travelStartDate.split("-")[0]}
          onChange={e =>
            updateTravelData(
              "travelStartDate",
              `${e.target.value}-${travelStartDate.split("-")[1]}-${travelStartDate.split("-")[2]}`,
            )
          }
        >
          {years.map(year => {
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        년
        <select
          className="select select-sm focus:outline-custom-green w-[80px] text-[16px] border border-gray-300 rounded-sm mx-1 px-2"
          value={travelStartDate.split("-")[1]}
          onChange={e =>
            updateTravelData(
              "travelStartDate",
              `${travelStartDate.split("-")[0]}-${e.target.value}-${travelStartDate.split("-")[2]}`,
            )
          }
        >
          {[...Array(12).keys()].map(month => (
            <option key={month + 1} value={month + 1}>
              {month + 1}
            </option>
          ))}
        </select>
        월
        <select
          className="select select-sm focus:outline-custom-green w-[80px] text-[16px] border border-gray-300 rounded-sm mx-1 px-2"
          value={travelStartDate.split("-")[2]}
          onChange={e =>
            updateTravelData(
              "travelStartDate",
              `${travelStartDate.split("-")[0]}-${travelStartDate.split("-")[1]}-${e.target.value}`,
            )
          }
        >
          {getDaysInMonth(
            Number(travelStartDate.split("-")[0]),
            Number(travelStartDate.split("-")[1]),
          )}
        </select>
        일
      </div>

      <div className="flex items-center mb-2">
        <p className="text-[18px] mr-2">여행 종료 날짜:</p>
        <select
          className="select select-sm focus:outline-custom-green w-[80px] text-[16px] border border-gray-300 rounded-sm mr-1 px-2"
          value={travelEndDate.split("-")[0]}
          onChange={e =>
            updateTravelData(
              "travelEndDate",
              `${e.target.value}-${travelEndDate.split("-")[1]}-${travelEndDate.split("-")[2]}`,
            )
          }
        >
          {years.map(year => {
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        년
        <select
          className="select select-sm focus:outline-custom-green w-[80px] text-[16px] border border-gray-300 rounded-sm mx-1 px-2"
          value={travelEndDate.split("-")[1]}
          onChange={e =>
            updateTravelData(
              "travelEndDate",
              `${travelEndDate.split("-")[0]}-${e.target.value}-${travelEndDate.split("-")[2]}`,
            )
          }
        >
          {[...Array(12).keys()].map(month => (
            <option key={month + 1} value={month + 1}>
              {month + 1}
            </option>
          ))}
        </select>
        월
        <select
          className="select select-sm focus:outline-custom-green w-[80px] text-[16px] border border-gray-300 rounded-sm mx-1 px-2"
          value={travelEndDate.split("-")[2]}
          onChange={e =>
            updateTravelData(
              "travelEndDate",
              `${travelEndDate.split("-")[0]}-${travelEndDate.split("-")[1]}-${e.target.value}`,
            )
          }
        >
          {getDaysInMonth(
            Number(travelEndDate.split("-")[0]),
            Number(travelEndDate.split("-")[1]),
          )}
        </select>
        일
      </div>

      <div className="flex items-center mb-2">
        <p className="text-[18px] mr-2">모집 마감 날짜:</p>
        <select
          className="select select-sm focus:outline-custom-green w-[80px] text-[16px] border border-gray-300 rounded-sm mr-1 px-2"
          value={deadline.split("-")[0]}
          onChange={e =>
            updateTravelData(
              "deadline",
              `${e.target.value}-${deadline.split("-")[1]}-${deadline.split("-")[2]}`,
            )
          }
        >
          {years.map(year => {
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        년
        <select
          className="select select-sm focus:outline-custom-green w-[80px] text-[16px] border border-gray-300 rounded-sm mx-1 px-2"
          value={deadline.split("-")[1]}
          onChange={e =>
            updateTravelData(
              "deadline",
              `${deadline.split("-")[0]}-${e.target.value}-${deadline.split("-")[2]}`,
            )
          }
        >
          {[...Array(12).keys()].map(month => (
            <option key={month + 1} value={month + 1}>
              {month + 1}
            </option>
          ))}
        </select>
        월
        <select
          className="select select-sm focus:outline-custom-green w-[80px] text-[16px] border border-gray-300 rounded-sm mx-1 px-2"
          value={deadline.split("-")[2]}
          onChange={e =>
            updateTravelData(
              "deadline",
              `${deadline.split("-")[0]}-${deadline.split("-")[1]}-${e.target.value}`,
            )
          }
        >
          {getDaysInMonth(
            Number(deadline.split("-")[0]),
            Number(deadline.split("-")[1]),
          )}
        </select>
        일
      </div>
    </div>
  );
});

export default TravelDateSelect;
