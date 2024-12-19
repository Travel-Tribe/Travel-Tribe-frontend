import React, { useEffect } from "react";
import { useRecruitPostStore } from "../store/recruitPostStore";
import { getFilterParams } from "../utils/getFilterParams";
import { ItemType, useInfiniteFetch } from "../hooks/useInfinityFetch";
import { ErrorType, TravelPlanType } from "../type/types";
import { AxiosError } from "axios";
import { RecruitmentPost } from "../components/post/RecruitmentPost";
import { ERROR } from "../constants/MESSAGE";
import { STORAGE_KEYS } from "../constants/STORAGE_KEYS";
import { useUserProfile } from "../hooks/userQueries";
import { calculateAge } from "../store/profileStore";

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
    const { clearTravelData, updateTravelData } = useRecruitPostStore();
    const filters = getFilterParams(
      search,
      city,
      selectedContinent,
      selectedCountry,
      mbti,
    );

    const userId: string | null = localStorage.getItem(STORAGE_KEYS.USER_ID);

    const {
      data: userProfile,
      isError: isProfileError,
      error: profileError,
    } = useUserProfile(userId!);

    const { data, isError, error, lastElementRef, isFetchingNextPage } =
      useInfiniteFetch({
        endpoint: "/api/v1/posts",
        filters,
      });

    useEffect(() => {
      clearTravelData();
      if (userProfile) {
        updateTravelData("limitMinAge", calculateAge(userProfile.birth));
        updateTravelData("limitMaxAge", calculateAge(userProfile.birth));
      }
      window.scrollTo(0, 0);
    }, [clearTravelData, updateTravelData, userProfile]);

    if (isProfileError) {
      console.error(
        "에러",
        (profileError as AxiosError<ErrorType>).response?.data?.errors[0]
          ?.errorMessage,
      );
      return (
        <>
          {
            (profileError as AxiosError<ErrorType>).response?.data?.errors[0]
              ?.errorMessage
          }
        </>
      );
    }

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
                  className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)]"
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
