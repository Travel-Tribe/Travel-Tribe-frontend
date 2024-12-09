import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TravelPlanType } from "../../type/types";

export const RecruitmentPost = React.memo(
  ({ plan }: { plan: TravelPlanType }): JSX.Element => {
    const [imgSrc, setImgSrc] = useState(
      import.meta.env.VITE_API_BASE_URL +
        `/api/v1/file/preview?fileUrl=${plan.days[0]?.dayDetails[0]?.fileAddress}`,
    );

    const [userImg, setUserImg] = useState(
      import.meta.env.VITE_API_BASE_URL +
        `/api/v1/file/preview?fileUrl=${plan.profileFileAddress}`,
    );

    const handleDefaultImageError = () => {
      setImgSrc("/../src/assets/default-image.jpeg"); // 기본 이미지로 변경
    };

    const handleUserImageError = () => {
      setUserImg("/../src/assets/profile-img.webp"); // 기본 이미지로 변경
    };

    return (
      <div className="mb-[20px]">
        <Link
          to={`/recruitment/${plan.postId}`}
          key={plan.userId}
          className="w-[300px] border rounded-tl-lg rounded-tr-lg overflow-hidden flex flex-col items-start border-b-0 bg-white"
        >
          <img
            src={imgSrc}
            alt={plan.title}
            className="w-[300px] h-[150px] object-cover"
            onError={handleDefaultImageError}
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
        <div className="w-full h-[30px] bg-white flex justify-between items-center pl-[25px] pr-[10px] border rounded-bl-lg rounded-br-lg border-t-0">
          <div className="flex items-center">
            <img
              className="w-[14px] h-[14px] mr-[5px] radius-full"
              src={userImg}
              alt="프로필 이미지"
              onError={handleUserImageError}
            />
            <div className="text-[12px]">{plan.nickname}</div>
          </div>
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
