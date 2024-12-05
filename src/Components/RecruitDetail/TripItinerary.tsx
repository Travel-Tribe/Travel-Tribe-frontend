import { useState } from "react";
import { DayDetailType, TravelPlanType } from "../../type/types";
import DayMap from "./TripMap/DayMap";
import { IoTimeOutline } from "react-icons/io5";

interface TripItineraryProps {
  travelPlan?: TravelPlanType;
}

const DayHeader = ({ dayIndex, date }: { dayIndex: number; date: string }) => (
  <div className="sticky top-0 bg-base-100 py-3 z-20 border-b px-8">
    <div className="flex items-center justify-between">
      <span className="text-lg font-bold">Day {dayIndex + 1}</span>
      <span className="text-base-content/70">{date}</span>
    </div>
  </div>
);

const DayScheduleCard = ({
  detail,
}: {
  detail: DayDetailType;
  index: number;
}) => {
  const [imageError, setImageError] = useState(false);
  const isDevelopment = import.meta.env.DEV;

  // 이미지 URL을 결정하는 함수
  const getImageUrl = () => {
    if (imageError) {
      return "../../assets/default image.jpeg";
    }
    if (isDevelopment) {
      return detail.fileAddress; // 개발 환경에서는 링크 직접 사용
    }
    return `${import.meta.env.VITE_API_BASE_URL}/api/v1/file/preview?fileUrl=${detail.fileAddress}`;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <h3 className="font-semibold">{detail.title}</h3>
      </div>
      <figure className="my-4">
        <img
          src={getImageUrl()}
          alt={detail.title}
          className="rounded-xl mr-2 w-full h-60 object-cover"
          onError={handleImageError}
        />
      </figure>
      <p className="text-base-content/70 text-sm">{detail.description}</p>
    </div>
  );
};

export default function TripItinerary({ travelPlan }: TripItineraryProps) {
  const formatDate = (startDate: string, dayIndex: number) => {
    if (!startDate) return "";

    const date = new Date(startDate);
    date.setDate(date.getDate() + dayIndex);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const weekday = date.toLocaleDateString("ko-KR", { weekday: "short" });

    return `${year}-${month}-${day}(${weekday})`;
  };

  if (!travelPlan) {
    return (
      <div className="card bg-base-100 h-[1100px] flex items-center justify-center">
        <p className="text-base-content/70">여행 일정이 없습니다.</p>
      </div>
    );
  }
  console.log("플랜:", travelPlan);

  return (
    <div className="h-[1074px]">
      <div className="card bg-base-100 border h-full">
        <div className="card-body p-0 h-full">
          {/* Header */}
          <div className="border-b p-8">
            <div className="flex items-center gap-2">
              <IoTimeOutline className="w-6 h-6" />
              <h2 className="card-title">여행 일정</h2>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto overflow-x-hidden h-[calc(1100px-4rem)] pb-4">
            {travelPlan.days.map((day, dayIndex) => (
              <div key={dayIndex} className="mb-8 last:mb-0">
                <DayHeader
                  dayIndex={dayIndex}
                  date={formatDate(travelPlan.travelStartDate, dayIndex)}
                />

                {day.itineraryVisits?.length > 0 && (
                  <div className="mb-6">
                    <DayMap
                      visits={day.itineraryVisits}
                      dayDetails={day.dayDetails}
                    />
                  </div>
                )}

                {/* Timeline Section */}
                <div className="relative mt-6">
                  {day.dayDetails.length > 0 && (
                    <div className="absolute left-6 top-4 h-[calc(100%-1rem)] w-[1px] bg-gray-400"></div>
                  )}

                  {/* Schedule Cards with Timeline */}
                  {day.dayDetails.map((detail, index) => (
                    <div key={index} className="relative mb-6 last:mb-0">
                      {/* Timeline Dot */}
                      <div className="absolute left-6 top-2 w-2.5 h-2.5 rounded-full bg-gray-600  -translate-x-1/2 z-10"></div>

                      {/* Schedule Card */}
                      <div className="ml-12">
                        <DayScheduleCard detail={detail} index={index} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
