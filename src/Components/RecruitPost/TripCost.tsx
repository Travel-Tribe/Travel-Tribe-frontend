import { TravelPlan } from "../../mocks/mockData";
import Money from "../../assets/icons/attach_money.svg";

interface TripCostProps {
  travelPlan?: TravelPlan;
}

export default function TripCost({ travelPlan }: TripCostProps) {
  const totalCost = (travelPlan: TravelPlan | undefined) => {
    if (!travelPlan) return 0;
    return (
      travelPlan.accommodationFee +
      travelPlan.airplaneFee +
      travelPlan.transportationFee
    );
  };

  return (
    <div className="card bg-base-100 border">
      <div className="card-body">
        <div>
          <div className="flex items-center mb-4">
            <img src={Money} alt="money icon" />
            <h2 className="card-title ml-2">예상 비용</h2>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">숙박비</span>
                <span className="text-sm">
                  {travelPlan?.accommodationFee.toLocaleString()}원
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">항공권</span>
                <span className="text-sm">
                  {travelPlan?.airplaneFee.toLocaleString()}원
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">기타비용</span>
                <span className="text-sm">
                  {travelPlan?.transportationFee.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="flex justify-between">
            <span className="text-lg font-medium">총 예상 비용</span>
            <span className="text-lg font-medium w-[200px] text-right">
              {totalCost(travelPlan).toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
