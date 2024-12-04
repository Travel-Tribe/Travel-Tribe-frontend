import React from "react";
import { ReviewType } from "../../type/types";
import { Link } from "react-router-dom";
import { mappingCountry } from "../../Utils/mappingCountry";

export const ReviewPost = React.memo(
  ({ review }: { review: ReviewType }): JSX.Element => {
    return (
      <div className="mb-[20px]">
        <Link
          to={`/recruitment/${review.postId}/review/${review.reviewId}`}
          key={review.postId}
          className="w-[300px] bg-white border rounded-lg overflow-hidden flex flex-col items-start"
        >
          {review?.files[0]?.fileAddress && (
            <img
              src={
                import.meta.env.VITE_API_BASE_URL +
                `/api/v1/file/preview?fileUrl=${review.files[0].fileAddress}`
              }
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
        </Link>
      </div>
    );
  },
);
