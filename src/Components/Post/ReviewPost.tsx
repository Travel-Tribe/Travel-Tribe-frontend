import React, { useState } from "react";
import { ReviewType } from "../../type/types";
import { Link } from "react-router-dom";
import { mappingCountry } from "../../Utils/mappingCountry";

export const ReviewPost = React.memo(
  ({ review }: { review: ReviewType }): JSX.Element => {
    const [imgSrc, setImgSrc] = useState(
      import.meta.env.VITE_API_BASE_URL +
        `/api/v1/file/preview?fileUrl=${review?.files[0]?.fileAddress}`,
    );

    const [userImg, setUserImg] = useState(
      import.meta.env.VITE_API_BASE_URL +
        `/api/v1/file/preview?fileUrl=${review.profileFileAddress}`,
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
          to={`/recruitment/${review.postId}/review/${review.reviewId}`}
          key={review.postId}
          className="w-[300px] border rounded-tl-lg rounded-tr-lg overflow-hidden flex flex-col items-start border-b-0 bg-white"
        >
          <img
            src={imgSrc}
            alt={review?.title || "기본 이미지"}
            className="w-[300px] h-[150px] object-cover"
            onError={handleDefaultImageError}
          />
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
        <div className="w-full h-[30px] flex items-center bg-white pl-[25px] border rounded-bl-lg rounded-br-lg border-t-0">
          <img
            className="w-[12px] h-[12px] mr-[5px] radius-full"
            src={userImg}
            alt="프로필 이미지"
            onError={handleUserImageError}
          />
          <div className="text-[12px]">{review.nickname}</div>
        </div>
      </div>
    );
  },
);
