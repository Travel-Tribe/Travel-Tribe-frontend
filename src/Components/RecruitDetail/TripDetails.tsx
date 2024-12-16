import { LuMapPin } from "react-icons/lu";
import CountryMap from "./tripMap/CountryMap";
import { TravelPlanType } from "../../type/types";

export default function TripDetails({
  travelPlan,
}: {
  travelPlan?: TravelPlanType;
}) {
  return (
    <div className="card bg-base-100 border">
      <div className="card-body">
        <div>
          <div className="flex items-center mb-4">
            <LuMapPin className="w-6 h-6" />
            <h2 className="card-title ml-2">여행 정보</h2>
          </div>
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col">
              <div className="flex flex-col mt-2">
                <span className="text-sm text-gray-500">여행 지역</span>
                <span className="text-sm">
                  {travelPlan?.travelCountry} - {travelPlan?.region}
                </span>
              </div>
              <div className="flex flex-col mt-2">
                <span className="text-sm text-gray-500">여행 기간</span>
                <span className="text-sm">
                  {travelPlan?.travelStartDate} ~ {travelPlan?.travelEndDate}
                </span>
              </div>
            </div>
            <div className="w-60 h-40 rounded-xl overflow-hidden">
              {travelPlan?.travelCountry && (
                <CountryMap country={travelPlan?.travelCountry} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
