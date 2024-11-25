import React, { useCallback, useEffect, useRef } from "react";
import fetchCall from "../Utils/apiFetch";
import { TravelPlan } from "../mocks/mockData";
import { useRecruitPostStore } from "../store/recruitPostStore";
import { mappingContinent } from "../Utils/mappingContinent";
import { mappingCountry } from "../Utils/mappingCountry";
import { useInfiniteQuery } from "react-query";
import { RecruitmentPost } from "../Components/Post";
import { useProfileStore } from "../store/profileStore";
import { STORAGE_KEYS } from "../Constants/STORAGE_KEYS";

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
        mbti: mbti !== "선택" ? mbti : "",
      };

      // 빈값 필터 제거
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      console.log(params.toString());
      return "&" + params.toString();
    };

    const fetchRecruitData = async ({ pageParam = 0 }) => {
      const response = await fetchCall<{
        data: {
          data: { content: TravelPlan[]; totalPages: number };
        };
      }>(`/api/v1/posts?page=${pageParam}${getFilterParams()}`, "get");
      return {
        totalPages: response.data.data.totalPages,
        content: response.data.data.content,
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
        "recruitData",
        search,
        city,
        selectedContinent,
        selectedCountry,
        mbti,
      ],
      queryFn: fetchRecruitData,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length;
        return nextPage < lastPage.totalPages ? nextPage : undefined;
      },
      keepPreviousData: true, // 이전 데이터를 유지
    });

    useEffect(() => {
      clearTravelData();
      const userId: string | null = localStorage.getItem(STORAGE_KEYS.USER_ID);
      if (userId) {
        const fetchUserProfile = async (userId: string) => {
          await fetchProfileData(userId);
        };
        fetchUserProfile(userId);
      }
    }, [clearTravelData]);

    const observer = useRef<IntersectionObserver | null>(null);

    const lastElementRef = useCallback((node: HTMLDivElement | null) => {
      if (isLoading || !hasNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            fetchNextPage();
          }
        },
        {
          threshold: 0.8, // 요소의 80%가 보일 때 콜백 실행
        },
      );

      if (node) observer.current.observe(node);
    }, []);

    if (isError) {
      console.error("에러", error.response?.data?.errors[0]?.errorMessage);
      return <>{error.response?.data?.errors[0]?.errorMessage}</>;
    }

    const recruitment = data?.pages.flatMap(page => page.content) || [];

    return (
      <div className="flex flex-wrap gap-[35px]">
        {recruitment &&
          recruitment.map((plan: TravelPlan, index: number) => {
            const isLastElement = index === recruitment.length - 1;
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
