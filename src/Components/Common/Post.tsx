import React from "react";
import { TravelPlan } from "../../mocks/mockData";
import { Link } from "react-router-dom";

interface PostProps {
  plan: TravelPlan;
}

const Post = React.memo(({ plan }: PostProps): JSX.Element => {
  return (
    <div className="mb-[20px]">
      <Link
        to={`/recruitment/${plan.id}`}
        key={plan.id}
        className="w-[300px] h-[290px] border rounded-tl-lg rounded-tr-lg overflow-hidden flex flex-col items-start border-b-0"
      >
        <img
          src={
            "https://placehold.co/300x150/000000/FFFFFF.png"
            // plan.days[0].dayDetails[0].fileAddress
          }
          alt={plan.title}
          className="w-[300px] h-[150px] object-cover"
        />
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
      <div className="w-full h-[30px] flex justify-between items-center px-[25px] border rounded-bl-lg rounded-br-lg border-t-0">
        <Link to={"#"} className="text-[12px]">
          작성자
        </Link>
        <div
          className={`w-[50px] h-[20px] text-[12px] rounded-[8px] text-white ${
            new Date(plan.deadline) < new Date()
              ? "bg-custom-green"
              : "bg-custom-pink"
          } text-center`}
        >
          {new Date(plan.deadline) < new Date() ? "모집중" : "모집 종료"}
        </div>
      </div>
    </div>
  );
});

export default Post;
