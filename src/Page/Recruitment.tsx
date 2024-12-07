import React, { useEffect } from "react";
import { useRecruitPostStore } from "../store/recruitPostStore";
import { useProfileStore } from "../store/profileStore";
import { STORAGE_KEYS } from "../Constants/STORAGE_KEYS";
import { getFilterParams } from "../Utils/getFilterParams";
import { ItemType, useInfiniteFetch } from "../Hooks/useInfinityFetch";
import { ErrorType, TravelPlanType } from "../type/types";
import { AxiosError } from "axios";
import { RecruitmentPost } from "../Components/Post/RecruitmentPost";

interface RecruitmentProps {
  selectedContinent?: string;
  selectedCountry?: string;
  city?: string;
  search?: string;
  mbti?: string;
}

const Recruitment = React.memo(
  ({
    selectedContinent,
    selectedCountry,
    city,
    search,
    mbti,
  }: RecruitmentProps): JSX.Element => {
    const { clearTravelData } = useRecruitPostStore();
    const { fetchProfileData } = useProfileStore();
    const filters = getFilterParams(
      search,
      city,
      selectedContinent,
      selectedCountry,
      mbti,
    );

    const { data, isError, error, lastElementRef, isFetchingNextPage } =
      useInfiniteFetch({
        endpoint: "/api/v1/posts",
        filters,
      });

    useEffect(() => {
      clearTravelData();
      const initialize = async () => {
        const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
        if (userId) {
          await fetchProfileData(userId);
        }
      };
      initialize();
      window.scrollTo(0, 0);
    }, [clearTravelData, fetchProfileData]);

    if (isError) {
      console.error(
        "에러",
        (error as AxiosError<ErrorType>).response?.data?.errors[0]
          ?.errorMessage,
      );
      return (
        <>
          {
            (error as AxiosError<ErrorType>).response?.data?.errors[0]
              ?.errorMessage
          }
        </>
      );
    }

    // 타입 가드 함수
    const isTravelPlanType = (
      item: ItemType | undefined,
    ): item is TravelPlanType => {
      return (
        item !== undefined && (item as TravelPlanType).postId !== undefined
      );
    };

    return (
      <div className="post-flex-container">
        {data &&
          data
            .filter(isTravelPlanType)
            .map((plan: TravelPlanType, index: number) => {
              const isLastElement = index === data.length - 1;
              return (
                <div
                  ref={isLastElement ? lastElementRef : null}
                  key={plan.postId}
                >
                  <RecruitmentPost plan={plan} />
                </div>
              );
            })}
        {isFetchingNextPage && <div>Loading more...</div>}
      </div>
    );
  },
);

export default Recruitment;
