import React from "react";
import { Link } from "react-router-dom";
import { TravelPlanType } from "../../type/types";

export const RecruitmentPost = React.memo(
  ({ plan }: { plan: TravelPlanType }): JSX.Element => {
    return (
      <div className="mb-[20px]">
        <Link
          to={`/recruitment/${plan.postId}`}
          key={plan.userId}
          className="w-[300px] border rounded-tl-lg rounded-tr-lg overflow-hidden flex flex-col items-start border-b-0 bg-white"
        >
          {plan.days[0]?.dayDetails[0]?.fileAddress && (
            <img
              src={
                import.meta.env.VITE_API_BASE_URL +
                `/api/v1/file/preview?fileUrl=${plan.days[0].dayDetails[0].fileAddress}`
              }
              alt={plan.title}
              className="w-[300px] h-[150px] object-cover"
            />
          )}
          <div className="pl-[25px] max-w-[250px] mb-[20px]">
            <p className="text-[16px] truncate mb-[10px] mt-[10px]">
              {plan.title}
            </p>
            <p className="text-[12px] truncate">
              여헹 날짜: {plan.travelStartDate} ~ {plan.travelEndDate}
            </p>

            <p className="text-[12px] truncate">
              모집 인원: {plan.maxParticipants}명
            </p>

            <p className="text-[12px] truncate">여행 지역: {plan.region}</p>

            <p className="text-[12px] truncate">마감 일자: {plan.deadline}</p>
          </div>

          <div className="w-full border-t bc-[#DEDEDE]" />
        </Link>
        <div className="w-full h-[30px] bg-white flex justify-between items-center pl-[25px] pr-[10px] border rounded-bl-lg rounded-br-lg border-t-0">
          <Link to={"#"} className="text-[12px]"></Link>
          <div
            className={`px-[8px] py-[3px] text-[12px] rounded-[8px] text-white ${
              plan.status === "모집완료"
                ? "bg-btn-closed"
                : plan.status !== "투표중"
                  ? "bg-custom-green"
                  : "bg-error"
            } text-center`}
          >
            {plan.status}
          </div>
        </div>
      </div>
    );
  },
);
