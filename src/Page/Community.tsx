import React, { useEffect } from "react";
import { getFilterParams } from "../utils/getFilterParams";
import { CommunityType, ErrorType } from "../type/types";
import { ItemType, useInfiniteFetch } from "../hooks/useInfinityFetch";
import { AxiosError } from "axios";
import { CommunityPost } from "../components/Post/CommunityPost";
import { ERROR } from "../constants/MESSAGE";

interface CommunityProps {
  selectedContinent?: string;
  selectedCountry?: string;
  city?: string;
  search?: string;
}

const Community = React.memo(
  ({
    selectedContinent,
    selectedCountry,
    city,
    search,
  }: CommunityProps): JSX.Element => {
    const filters = getFilterParams(
      search,
      city,
      selectedContinent,
      selectedCountry,
    );

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const { data, isError, error, lastElementRef, isFetchingNextPage } =
      useInfiniteFetch({
        endpoint: "/api/v1/communities",
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
    const isCommunityType = (
      item: ItemType | undefined,
    ): item is CommunityType => {
      return (
        item !== undefined && (item as CommunityType).communityId !== undefined
      );
    };

    return (
      <div className="post-grid-container">
        {data &&
          data
            .filter(isCommunityType)
            .map((community: CommunityType, index: number) => {
              const isLastElement = index === data.length - 1;
              return (
                <div
                  ref={isLastElement ? lastElementRef : null}
                  key={community.communityId}
                >
                  <CommunityPost community={community} />
                </div>
              );
            })}

        {isFetchingNextPage && <div>Loading more...</div>}
      </div>
    );
  },
);

export default Community;
