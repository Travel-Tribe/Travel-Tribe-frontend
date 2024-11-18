import React, { useCallback, useEffect, useRef, useState } from "react";
import fetchCall from "../Utils/apiFetch";
import { TravelPlan } from "../mocks/mockData";
import { useRecruitPostStore } from "../store/recruitPostStore";
import { mappingContinent } from "../Utils/mappingContinent";
import { mappingCountry } from "../Utils/mappingCountry";
import { useQuery } from "react-query";
import debounce from "lodash.debounce";
import { RecruitmentPost } from "../Components/Post";

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
    const [data, setData] = useState<TravelPlan[]>([]);
    const page = useRef(0);

    const getFilterParams = () => {
      const params = new URLSearchParams();
      if (search) params.append("title", search);
      if (city) params.append("content", city);
      if (selectedContinent && selectedContinent !== "선택")
        params.append("continent", mappingContinent[selectedContinent]);
      if (selectedCountry !== "선택" && selectedContinent !== "기타")
        params.append("country", mappingCountry(selectedCountry, "ko"));
      if (mbti !== "선택") params.append("mbti", mbti);
      params.append("page", page.current.toString());
      return params.toString();
    };

    const fetchRecruitData = async () => {
      const response = await fetchCall<{
        data: {
          totalPages: number;
          data: { content: TravelPlan[] };
        };
      }>(`/api/v1/posts?${getFilterParams()}`, "get");
      return {
        totalPages: response.data.totalPages,
        content: response.data.data.content,
      };
    };

    const debouncedFetchRecruitData = debounce(fetchRecruitData, 500);

    const {
      data: recruitData,
      isError,
      error,
      isLoading,
    } = useQuery({
      queryKey: [
        "recruitData",
        search,
        city,
        selectedContinent,
        selectedCountry,
        mbti,
        page,
      ],
      queryFn: async () => {
        const response = fetchRecruitData();
        return response;
      },
      onSuccess: newData => {
        if (page.current) {
          // page가 증가한 경우에만 데이터 추가
          setData(prevData => [...prevData, ...newData.content]);
        } else {
          // 첫 페이지라면 데이터 덮어쓰기
          setData(newData.content);
        }
      },
    });

    useEffect(() => {
      clearTravelData();
      debouncedFetchRecruitData();
      return () => debouncedFetchRecruitData.cancel();
    }, []);

    const observer = useRef<IntersectionObserver | null>(null);

    const lastElementRef = useCallback((node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            page.current += 1; // 페이지를 증가시키고 새로운 데이터를 로드
          }
        },
        {
          threshold: 0.8, // 요소의 80%가 보일 때 콜백 실행
        },
      );

      if (node) observer.current.observe(node);
    }, []);

    if (isError) {
      console.error("에러", error);
      return <>에러 입니다.</>;
    }

    if (isLoading) {
      return <div>로딩중...</div>;
    }

    return (
      <div className="flex flex-wrap gap-[35px]">
        {data &&
          data.map((plan: TravelPlan) => {
            const isLastElement =
              page.current === Number(recruitData?.totalPages);
            return (
              <div
                ref={isLastElement ? lastElementRef : null}
                key={plan.postId}
              >
                <RecruitmentPost plan={plan} />
              </div>
            );
          })}
      </div>
    );
  },
);

export default Recruitment;
