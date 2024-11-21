import React, { useCallback, useEffect, useRef } from "react";
import fetchCall from "../Utils/apiFetch";
import { ReviewTypes } from "../mocks/mockData";
import { mappingContinent } from "../Utils/mappingContinent";
import { mappingCountry } from "../Utils/mappingCountry";
import { useInfiniteQuery } from "react-query";
import { ReviewPost } from "../Components/Post";
import { useReviewPostStore } from "../store/reviewPostStore";

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

    const getFilterParams = () => {
      const filters: Record<string, string> = {
        title: search || "",
        content: city || "",
        continent:
          selectedContinent && selectedContinent !== "선택"
            ? mappingContinent[selectedContinent]
            : "",
        country:
          selectedCountry !== "선택" && selectedContinent !== "기타"
            ? mappingCountry(selectedCountry, "ko")
            : "",
      };

      // 빈 값 필터 제거
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      return "&" + params.toString();
    };

    const fetchRecruitData = async ({ pageParam = 0 }) => {
      const response = await fetchCall<{
        data: {
          totalPages: number;
          data: { reviews: ReviewTypes[] };
        };
      }>(`/api/v1/reviews?page=${pageParam}${getFilterParams()}`, "get");
      return {
        totalPages: response.data.totalPages,
        reviews: response.data.data.reviews,
      };
    };

    const {
      data,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isLoading,
      isError,
      error,
    } = useInfiniteQuery({
      queryKey: [
        "reviewData",
        search,
        city,
        selectedContinent,
        selectedCountry,
      ],
      queryFn: fetchRecruitData,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length;
        return nextPage < lastPage.totalPages ? nextPage : undefined;
      },
      keepPreviousData: true,
    });

    useEffect(() => {
      resetForm();
    }, [resetForm]);

    const observer = useRef<IntersectionObserver | null>(null);

    const lastElementRef = useCallback(
      (node: HTMLDivElement | null) => {
        if (isLoading || !hasNextPage) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
          entries => {
            if (entries[0].isIntersecting) {
              fetchNextPage();
            }
          },
          { threshold: 0.8 },
        );

        if (node) observer.current.observe(node);
      },
      [fetchNextPage, hasNextPage, isLoading],
    );

    if (isError) {
      console.error("에러", error);
      return <>에러가 발생했습니다.</>;
    }

    const reviews = data?.pages.flatMap(page => page.reviews) || [];

    return (
      <div className="flex flex-wrap gap-[35px]">
        {reviews.map((review: ReviewTypes, index: number) => {
          const isLastElement = index === reviews.length - 1;
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
