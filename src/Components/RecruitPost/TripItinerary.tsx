import { TravelPlan } from "../../mocks/mockData";
import Schedule from "../../assets/icons/schedule.svg";

interface TripItineraryProps {
  travelPlan?: TravelPlan;
}

export default function TripItinerary({ travelPlan }: TripItineraryProps) {
  const getDateByDay = (startDate: string | undefined, dayIndex: number) => {
    if (!startDate) return "";

    const date = new Date(startDate);
    date.setDate(date.getDate() + dayIndex);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    // 요일 구하기
    const weekday = date.toLocaleDateString("ko-KR", { weekday: "short" });

    return `${year}-${month}-${day}(${weekday})`;
  };

  return (
    <div className="card bg-base-100 border h-[1100px] overflow-y-auto">
      <div className="card-body">
        <div>
          <div className="flex items-center mb-4">
            <img src={Schedule} alt="schedule icon" />
            <h2 className="card-title ml-2">여행 일정</h2>
          </div>

          {travelPlan?.days.map((day, dayIndex) => (
            <div key={dayIndex} className="mb-8 last:mb-0">
              <div className="sticky top-0 bg-white py-2 z-10 border-b">
                <div className="flex justify-between">
                  <span className="font-semibold">Day{dayIndex + 1}</span>
                  <span>
                    {getDateByDay(travelPlan?.travelStartDate, dayIndex)}
                  </span>
                </div>
              </div>

              <div className="w-100 h-60 rounded-xl bg-gray-200 flex items-center justify-center mt-2">
                <div>
                  {day.itineraryVisits.map((visit, index) => (
                    <span key={index}>
                      {visit.point}
                      {index < day.itineraryVisits.length - 1 ? " → " : ""}
                    </span>
                  ))}
                </div>
              </div>

              {day.dayDetails.map((detail, index) => (
                <div key={index} className="my-4">
                  <p className="font-medium">{detail.title}</p>
                  <div className="w-100 h-60 rounded-xl bg-gray-200 flex items-center justify-center mt-2">
                    <img
                      src={detail.fileAddress}
                      alt={detail.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <p className="mt-4 mb-8 text-gray-600 text-sm">
                    {detail.description}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
