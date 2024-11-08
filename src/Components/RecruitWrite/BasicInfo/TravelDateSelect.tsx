import { useEffect, useState, useMemo } from "react";
import React from "react";
import { useTravelData } from "../../../Hooks/useTravelData";

const getDaysInMonth = (year: number, month: number) => {
  const days = [];
  const date = new Date(year, month, 0);
  const totalDays = date.getDate();
  for (let day = 1; day <= totalDays; day++) {
    const dayOfWeek = new Date(year, month - 1, day).toLocaleString("ko-KR", {
      weekday: "short",
    });
    days.push({ day, dayOfWeek });
  }
  return days;
};

const TravelDateSelect = React.memo(() => {
  const { travelData, updateTravelData } = useTravelData();
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  const [selectedStartDate, setSelectedStartDate] = useState<{
    year: number;
    month: number;
    day: number;
  }>({ year: currentYear, month: 1, day: 1 });
  const [selectedEndDate, setSelectedEndDate] = useState<{
    year: number;
    month: number;
    day: number;
  }>({ year: currentYear, month: 1, day: 1 });

  const [daysInMonth, setDaysInMonth] = useState<
    { day: number; dayOfWeek: string }[]
  >([]);

  useEffect(() => {
    if (travelData.travelStartDate) {
      const year = parseInt(travelData.travelStartDate.slice(0, 4), 10);
      const month = parseInt(travelData.travelStartDate.slice(5, 7), 10);
      setDaysInMonth(getDaysInMonth(year, month));
    }
  }, [travelData.travelStartDate]);

  const handleDateChange =
    (key: "year" | "month" | "day", type: "start" | "end") =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      const [year, month, day] =
        type === "start"
          ? travelData.travelStartDate.split("-")
          : travelData.travelEndDate.split("-");

      const updatedDate =
        type === "start"
          ? `${key === "year" ? value : year}-${key === "month" ? value.padStart(2, "0") : month}-${key === "day" ? value.padStart(2, "0") : day}`
          : `${key === "year" ? value : year}-${key === "month" ? value.padStart(2, "0") : month}-${key === "day" ? value.padStart(2, "0") : day}`;

      updateTravelData(
        type === "start" ? "travelStartDate" : "travelEndDate",
        updatedDate,
      );

      if (type === "start") {
        setSelectedStartDate({
          ...selectedStartDate,
          [key]: value,
        });
      } else {
        setSelectedEndDate({
          ...selectedStartDate,
          [key]: value,
        });
      }
    };

  const getDayOptions = useMemo(() => {
    return daysInMonth.map(day => (
      <option key={day.day} value={day.day}>
        {day.day} ({day.dayOfWeek})
      </option>
    ));
  }, [daysInMonth]);

  return (
    <div>
      <div className="flex items-center mb-2">
        <p className="text-[18px] mr-2">여행 시작 날짜:</p>
        <select
          className="select select-sm focus:outline-custom-green w-[80px] text-[16px] border border-gray-300 rounded-sm mr-1 px-2"
          value={selectedStartDate.year}
          onChange={handleDateChange("year", "start")}
        >
          <option value={currentYear}>{currentYear}</option>
          <option value={nextYear}>{nextYear}</option>
        </select>
        년
        <select
          className="select select-sm focus:outline-custom-green w-[60px] text-[16px] border border-gray-300 rounded-sm mx-1 px-2"
          value={selectedStartDate.month}
          onChange={handleDateChange("month", "start")}
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
          value={selectedStartDate.day}
          onChange={handleDateChange("day", "start")}
        >
          {getDayOptions}
        </select>
        일
      </div>

      <div className="flex items-center mb-2">
        <p className="text-[18px] mr-2">여행 종료 날짜:</p>
        <select
          className="select select-sm focus:outline-custom-green w-[80px] text-[16px] border border-gray-300 rounded-sm mr-1 px-2"
          value={selectedEndDate.year}
          onChange={handleDateChange("year", "end")}
        >
          <option value={currentYear}>{currentYear}</option>
          <option value={nextYear}>{nextYear}</option>
        </select>
        년
        <select
          className="select select-sm focus:outline-custom-green w-[60px] text-[16px] border border-gray-300 rounded-sm mx-1 px-2"
          value={selectedEndDate.month}
          onChange={handleDateChange("month", "end")}
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
          value={selectedEndDate.day}
          onChange={handleDateChange("day", "end")}
        >
          {getDayOptions}
        </select>
        일
      </div>
    </div>
  );
});

export default TravelDateSelect;
