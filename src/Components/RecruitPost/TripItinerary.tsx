import { TravelPlan } from "../../mocks/mockData";
import Schedule from "../../assets/icons/schedule.svg";
import DayMap from "./DayMap";

interface TripItineraryProps {
  travelPlan?: TravelPlan;
}

const DayScheduleCard = ({
  detail,
  index,
}: {
  detail: { title: string; description: string; fileAddress: string };
  index: number;
}) => (
  <div className="card bg-base-100 shadow-lg mb-6">
    <div className="card-body">
      <div className="flex items-center gap-2">
        <div className="badge badge-primary">Stop {index + 1}</div>
        <h3 className="card-title">{detail.title}</h3>
      </div>
      <figure className="my-4">
        <img
          src={detail.fileAddress}
          alt={detail.title}
          className="rounded-xl w-full h-60 object-cover"
        />
      </figure>
      <p className="text-base-content/70">{detail.description}</p>
    </div>
  </div>
);

const DayHeader = ({ dayIndex, date }: { dayIndex: number; date: string }) => (
  <div className="sticky top-0 bg-base-100 py-3 z-20 border-b mb-4">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-primary">
          Day {dayIndex + 1}
        </span>
      </div>
      <span className="text-base-content/70">{date}</span>
    </div>
  </div>
);

export default function TripItinerary({ travelPlan }: TripItineraryProps) {
  const formatDate = (startDate: string | undefined, dayIndex: number) => {
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

  return (
    <div className="card bg-base-100 border h-[1100px]">
      <div className="card-body p-0">
        {/* Header */}
        <div className="border-b p-4">
          <div className="flex items-center gap-2">
            <img src={Schedule} alt="schedule icon" className="w-6 h-6" />
            <h2 className="card-title">여행 일정</h2>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(1100px-4rem)] px-4">
          {travelPlan.days.map((day, dayIndex) => (
            <div key={dayIndex} className="mb-8 last:mb-0">
              <DayHeader
                dayIndex={dayIndex}
                date={formatDate(travelPlan.travelStartDate, dayIndex)}
              />

              {day.itineraryVisits?.length > 0 && (
                <div className="card bg-base-100 shadow my-6">
                  <div className="card-body p-0 rounded-xl overflow-hidden">
                    <DayMap
                      visits={day.itineraryVisits}
                      dayDetails={day.dayDetails}
                    />
                  </div>
                </div>
              )}

              {day.dayDetails.map((detail, index) => (
                <DayScheduleCard key={index} detail={detail} index={index} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
