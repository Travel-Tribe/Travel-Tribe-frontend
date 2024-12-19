import React, { useState } from "react";
import { ReviewType } from "../../type/types";
import { Link } from "react-router-dom";
import { mappingCountry } from "../../utils/mappingCountry";
import { convertContinentName } from "../../utils/convertContinentName";

export const ReviewPost = React.memo(
  ({ review }: { review: ReviewType }): JSX.Element => {
    const [img, setImg] = useState(
      import.meta.env.VITE_API_BASE_URL +
        `/api/v1/file/preview?fileUrl=${review?.files[0]?.fileAddress}`,
    );

    const [userImg, setUserImg] = useState(
      import.meta.env.VITE_API_BASE_URL +
        `/api/v1/file/preview?fileUrl=${review.profileFileAddress}`,
    );

    const handleDefaultImageError = () => {
      setImg("/../src/assets/default-image.jpeg"); // 기본 이미지로 변경
    };

    const handleUserImageError = () => {
      setUserImg("/../src/assets/profile-img.webp"); // 기본 이미지로 변경
    };

    return (
      <Link
        to={`/recruitment/${review.postId}/review/${review.reviewId}`}
        key={review.postId}
        className="w-full max-w-[300px] border rounded-lg overflow-hidden flex flex-col items-start bg-white"
      >
        <img
          src={img}
          alt={review?.title || "기본 이미지"}
          className="w-full aspect-[2/1] object-cover"
          onError={handleDefaultImageError}
        />
        <div className="px-4 py-3">
          <p className="text-[16px] truncate mb-2">{review.title}</p>
          <p className="text-[12px] truncate">
            대륙: {convertContinentName(review.continent)}
          </p>
          <p className="text-[12px] truncate">
            여행 국가: {mappingCountry(review.country, "en")}
          </p>
          <p className="text-[12px] truncate">여행 지역: {review.region}</p>
          <p className="text-[12px] truncate">MBTI: {review.mbti}</p>
        </div>
        <div className="w-full border-t border-gray-300" />
        <div className="w-full h-[30px] flex items-center  bg-white pl-4 ">
          <img
            className="w-[14px] h-[14px] mr-2 rounded-full"
            src={userImg}
            alt="프로필 이미지"
            onError={handleUserImageError}
          />
          <div className="text-[12px]">{review.nickname}</div>
        </div>
      </Link>
    );
  },
);
