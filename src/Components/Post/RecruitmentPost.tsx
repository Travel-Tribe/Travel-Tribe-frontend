import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TravelPlanType } from "../../type/types";

export const RecruitmentPost = React.memo(
  ({ plan }: { plan: TravelPlanType }): JSX.Element => {
    const [img, setImg] = useState(
      import.meta.env.VITE_API_BASE_URL +
        `/api/v1/file/preview?fileUrl=${plan.days[0]?.dayDetails[0]?.fileAddress}`,
    );

    const [userImg, setUserImg] = useState(
      import.meta.env.VITE_API_BASE_URL +
        `/api/v1/file/preview?fileUrl=${plan.profileFileAddress}`,
    );

    const handleDefaultImageError = () => {
      setImg("/../src/assets/default-image.jpeg"); // 기본 이미지로 변경
    };

    const handleUserImageError = () => {
      setUserImg("/../src/assets/profile-img.webp"); // 기본 이미지로 변경
    };

    return (
      <Link
        to={`/recruitment/${plan.postId}`}
        className="w-full max-w-[300px] border rounded-lg overflow-hidden flex flex-col items-start bg-white"
      >
        <img
          src={img}
          alt={plan.title}
          className="w-full aspect-[2/1] object-cover"
          onError={handleDefaultImageError}
        />
        <div className="px-4 py-2">
          <p className="text-[16px] truncate mb-2">{plan.title}</p>
          <p className="text-[12px] truncate">
            여행 날짜: {plan.travelStartDate} ~ {plan.travelEndDate}
          </p>
          <p className="text-[12px] truncate">
            모집 인원: {plan.maxParticipants}명
          </p>
          <p className="text-[12px] truncate">여행 지역: {plan.region}</p>
          <p className="text-[12px] truncate">마감 일자: {plan.deadline}</p>
        </div>
        <div className="w-full border-t border-gray-300" />
        <div className="w-full h-[30px] bg-white flex justify-between items-center px-4">
          <div className="flex items-center">
            <img
              className="w-[14px] h-[14px] rounded-full mr-2"
              src={userImg}
              alt="프로필 이미지"
              onError={handleUserImageError}
            />
            <div className="text-[12px]">{plan.nickname}</div>
          </div>
          <div
            className={`px-2 py-1 text-[12px] rounded-md text-white ${
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
      </Link>
    );
  },
);
