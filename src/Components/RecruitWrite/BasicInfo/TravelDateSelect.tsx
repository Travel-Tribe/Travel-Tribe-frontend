import React, { useCallback, useMemo } from "react";
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

  const startYear = useMemo(() => travelStartDate.split("-")[0], []);
  const currentYear = new Date().getFullYear();
  const years = Array.from({
    length: Math.abs(Number(currentYear) - Number(startYear) + 2),
  }).map((_, i) => i + Number(startYear));

  const setMonth = useCallback(
    (year: number) => {
      return year > currentYear
        ? Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
            <option key={month} value={month}>
              {month}
            </option>
          ))
        : Array.from(
            { length: 12 - new Date().getMonth() },
            (_, i) => i + 1 + new Date().getMonth(),
          ).map(month => (
            <option key={month} value={month}>
              {month}
            </option>
          ));
    },
    [currentYear],
  );

  const getDaysInMonth = useCallback(
    (year: number, month: number, isSameMonth?: boolean) => {
      const days = [];
      const date = new Date(year, month, 0);
      const totalDays = date.getDate();
      let day = isSameMonth ? Number(travelStartDate.split("-")[2]) : 1;
      for (day; day <= totalDays; day++) {
        const dayOfWeek = new Date(year, month - 1, day).toLocaleString(
          "ko-KR",
          {
            weekday: "short",
          },
        );
        days.push({ day, dayOfWeek });
      }
      return days.map(day => (
        <option key={day.day} value={day.day}>
          {day.day}({day.dayOfWeek})
        </option>
      ));
    },
    [],
  );

  const formatDateToYMD = (inputDate: Date | string | number): string => {
    const date = new Date(inputDate);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date input");
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <div className="flex items-center mb-2">
        <p className="text-[18px] mr-2">여행 시작 날짜:</p>
        <select
          className="select select-sm focus:outline-custom-green w-[80px] text-[16px] border border-gray-300 mr-1 px-2"
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
          className="select select-sm focus:outline-custom-green w-[80px] text-[16px] border border-gray-300 mx-1 px-2"
          value={Number(travelStartDate.split("-")[1])}
          onChange={e =>
            updateTravelData(
              "travelStartDate",
              formatDateToYMD(
                `${travelStartDate.split("-")[0]}-${e.target.value}-${travelStartDate.split("-")[2]}`,
              ),
            )
          }
        >
          {setMonth(Number(travelStartDate.split("-")[0]))}
        </select>
        월
        <select
          className="select select-sm focus:outline-custom-green w-[80px] text-[16px] border border-gray-300 mx-1 px-2"
          value={Number(travelStartDate.split("-")[2])}
          onChange={e =>
            updateTravelData(
              "travelStartDate",
              formatDateToYMD(
                `${travelStartDate.split("-")[0]}-${travelStartDate.split("-")[1]}-${e.target.value}`,
              ),
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
          className="select select-sm focus:outline-custom-green w-[80px] text-[16px] border border-gray-300 mr-1 px-2"
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
          className="select select-sm focus:outline-custom-green w-[80px] text-[16px] border border-gray-300 mx-1 px-2"
          value={Number(travelEndDate.split("-")[1])}
          onChange={e =>
            updateTravelData(
              "travelEndDate",
              formatDateToYMD(
                `${travelEndDate.split("-")[0]}-${e.target.value}-${travelEndDate.split("-")[2]}`,
              ),
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
          className="select select-sm focus:outline-custom-green w-[80px] text-[16px] border border-gray-300 mx-1 px-2"
          value={Number(travelEndDate.split("-")[2])}
          onChange={e =>
            updateTravelData(
              "travelEndDate",
              formatDateToYMD(
                `${travelEndDate.split("-")[0]}-${travelEndDate.split("-")[1]}-${e.target.value}`,
              ),
            )
          }
        >
          {getDaysInMonth(
            Number(travelEndDate.split("-")[0]),
            Number(travelEndDate.split("-")[1]),
            Number(travelStartDate.split("-")[0]) ===
              Number(travelEndDate.split("-")[0]) &&
              Number(travelStartDate.split("-")[1]) ===
                Number(travelEndDate.split("-")[1]),
          )}
        </select>
        일
      </div>

      <div className="flex items-center mb-2">
        <p className="text-[18px] mr-2">모집 마감 날짜:</p>
        <select
          className="select select-sm focus:outline-custom-green w-[80px] text-[16px] border border-gray-300 mr-1 px-2"
          value={deadline.split("-")[0]}
          onChange={e =>
            updateTravelData(
              "deadline",
              formatDateToYMD(
                `${e.target.value}-${deadline.split("-")[1]}-${deadline.split("-")[2]}`,
              ),
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
          className="select select-sm focus:outline-custom-green w-[80px] text-[16px] border border-gray-300 mx-1 px-2"
          value={Number(deadline.split("-")[1])}
          onChange={e =>
            updateTravelData(
              "deadline",
              formatDateToYMD(
                `${deadline.split("-")[0]}-${e.target.value}-${deadline.split("-")[2]}`,
              ),
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
          className="select select-sm focus:outline-custom-green w-[80px] text-[16px] border border-gray-300 mx-1 px-2"
          value={Number(deadline.split("-")[2])}
          onChange={e =>
            updateTravelData(
              "deadline",
              formatDateToYMD(
                `${deadline.split("-")[0]}-${deadline.split("-")[1]}-${e.target.value}`,
              ),
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
