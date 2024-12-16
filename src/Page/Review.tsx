import React, { useEffect } from "react";
import { useReviewPostStore } from "../store/reviewPostStore";
import { getFilterParams } from "../utils/getFilterParams";
import { ItemType, useInfiniteFetch } from "../hooks/useInfinityFetch";
import { ErrorType, ReviewType } from "../type/types";
import { AxiosError } from "axios";
import { ReviewPost } from "../components/post/ReviewPost";
import { ERROR } from "../constants/MESSAGE";

interface ReviewProps {
  selectedContinent?: string;
  selectedCountry?: string;
  city?: string;
  search?: string;
}

const Review = React.memo(
  ({
    selectedContinent,
    selectedCountry,
    city,
    search,
  }: ReviewProps): JSX.Element => {
    const { resetForm } = useReviewPostStore();

    useEffect(() => {
      resetForm();
      window.scrollTo(0, 0);
    }, [resetForm]);

    const filters = getFilterParams(
      search,
      city,
      selectedContinent,
      selectedCountry,
    );

    const { data, isError, error, lastElementRef, isFetchingNextPage } =
      useInfiniteFetch({
        endpoint: "/api/v1/reviews",
        filters,
      });

    if (isError) {
      console.error(
        "에러",
        (error as AxiosError<ErrorType>).response?.data?.errors[0]
          ?.errorMessage,
      );
      return (
        <>
          {ERROR.LOAD_POST_LIST} :
          {
            (error as AxiosError<ErrorType>).response?.data?.errors[0]
              ?.errorMessage
          }
        </>
      );
    }

    // 타입 가드 함수
    const isReviewType = (item: ItemType | undefined): item is ReviewType => {
      return item !== undefined && (item as ReviewType).reviewId !== undefined;
    };

    return (
      <div className="post-flex-container">
        {data.filter(isReviewType).map((review: ReviewType, index: number) => {
          const isLastElement = index === data.length - 1;
          return (
            <div
              ref={isLastElement ? lastElementRef : null}
              key={review.reviewId}
            >
              <ReviewPost review={review} />
            </div>
          );
        })}

        {isFetchingNextPage && <div>Loading more...</div>}
      </div>
    );
  },
);

export default Review;
