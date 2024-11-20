import React from "react";
import { Link } from "react-router-dom";
import { CommunityListProps, ReviewTypes, TravelPlan } from "../mocks/mockData";
import { mappingCountry } from "../Utils/mappingCountry";

interface PostProps {
  plan: TravelPlan;
}

export const RecruitmentPost = React.memo(
  ({ plan }: PostProps): JSX.Element => {
    return (
      <div className="mb-[20px]">
        <Link
          to={`/recruitment/${plan.postId}`}
          key={plan.userId}
          className="w-[300px] h-[290px] border rounded-tl-lg rounded-tr-lg overflow-hidden flex flex-col items-start border-b-0 bg-white"
        >
          {plan.days[0].dayDetails[0].fileAddress && (
            <img
              src={plan.days[0].dayDetails[0].fileAddress}
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
          <Link to={"#"} className="text-[12px]">
            작성자
          </Link>
          <div
            className={`px-[8px] py-[3px] text-[12px] rounded-[8px] text-white ${
              new Date(plan.deadline) > new Date()
                ? "bg-custom-green"
                : "bg-custom-pink"
            } text-center`}
          >
            {new Date(plan.deadline) > new Date() ? "모집중" : "모집 종료"}
          </div>
        </div>
      </div>
    );
  },
);

interface ReviewPostProps {
  review: ReviewTypes;
}

export const ReviewPost = React.memo(
  ({ review }: ReviewPostProps): JSX.Element => {
    console.log(review);
    return (
      <div className="mb-[20px]">
        <Link
          to={`/recruitment/${review.postId}/review/${review.reviewId}`}
          key={review.postId}
          className="w-[300px] h-[290px] bg-white border rounded-tl-lg rounded-tr-lg overflow-hidden flex flex-col items-start border-b-0"
        >
          {review.files && (
            <img
              src={review.files[0].fileAddress}
              alt={review.title}
              className="w-[300px] h-[150px] object-cover"
            />
          )}
          <div className="pl-[25px] max-w-[250px] mb-[20px]">
            <p className="text-[16px] truncate mb-[10px] mt-[10px]">
              {review.title}
            </p>
            <p className="text-[12px] truncate">대륙: {review.continent}</p>
            <p className="text-[12px] truncate">
              여행 국가: {mappingCountry(review.country, "en")}
            </p>
            <p className="text-[12px] truncate">여행 지역: {review.region}</p>
          </div>

          <div className="w-full border-t bc-[#DEDEDE]" />
        </Link>
        <div className="w-full h-[30px] bg-white flex justify-between items-center px-[25px] border rounded-bl-lg rounded-br-lg border-t-0">
          <Link to={"#"} className="text-[12px]">
            작성자
          </Link>
        </div>
      </div>
    );
  },
);

interface CommunityPostProps {
  community: CommunityListProps;
}

export const CommunityPost = React.memo(
  ({ community }: CommunityPostProps): JSX.Element => {
    console.log(community);
    return (
      <div className="mb-[20px]">
        <Link
          to={`/community/${community.communityId}`}
          key={community.communityId}
          className="w-[300px] h-[290px] bg-white border rounded-tl-lg rounded-tr-lg overflow-hidden flex flex-col items-start border-b-0"
        >
          {community.file[0].fileAddress && (
            <img
              src={community.file[0].fileAddress}
              alt={community.title}
              className="w-[300px] h-[150px] object-cover"
            />
          )}
          <div className="pl-[25px] max-w-[250px] mb-[20px]">
            <p className="text-[16px] truncate mb-[10px] mt-[10px]">
              {community.title}
            </p>
            <p className="text-[12px] truncate">대륙: {community.continent}</p>
            <p className="text-[12px] truncate">
              여행 국가: {community.country}
            </p>
            <p className="text-[12px] truncate">
              여행 지역: {community.region}
            </p>
            <p className="text-[12px] truncate">
              작성 날짜: {community.createDate}
            </p>
          </div>

          <div className="w-full border-t bc-[#DEDEDE]" />
        </Link>
        <div className="w-full h-[30px] bg-white flex justify-between items-center px-[25px] border rounded-bl-lg rounded-br-lg border-t-0">
          <Link to={"#"} className="text-[12px]">
            작성자
          </Link>
        </div>
      </div>
    );
  },
);
