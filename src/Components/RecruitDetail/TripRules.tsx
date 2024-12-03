import { AiOutlineWarning } from "react-icons/ai";
import { TravelPlan } from "../../mocks/mockData";

interface TripRulesProps {
  travelPlan?: TravelPlan;
}

export default function TripRules({ travelPlan }: TripRulesProps) {
  return (
    <div className="card bg-base-100 border">
      <div className="card-body">
        <div>
          <div className="flex items-center mb-4">
            <AiOutlineWarning className="w-6 h-6" />
            <h2 className="card-title ml-2">참여 조건</h2>
          </div>
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col mt-2">
              <span className="text-sm text-gray-500">나이</span>
              <span className="text-sm">
                {travelPlan?.limitMinAge}-{travelPlan?.limitMaxAge}세
              </span>
            </div>
            <div className="flex flex-col mt-2">
              <span className="text-sm text-gray-500">성별</span>
              <span className="text-sm">{travelPlan?.limitSex}</span>
            </div>
            <div className="flex flex-col mt-2">
              <span className="text-sm text-gray-500">흡연</span>
              <span className="text-sm">{travelPlan?.limitSmoke}</span>
            </div>
            <div className="flex flex-col mt-2">
              <span className="text-sm text-gray-500">보증금</span>
              <span className="text-sm">100,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
