import React, { useCallback, useEffect, useRef, useState } from "react";
import fetchCall from "../Utils/apiFetch";
import { TravelPlan } from "../mocks/mockData";
import Post from "../Components/Common/Post";
import { useRecruitPostStore } from "../store/recruitPostStore";
import { mappingContinent } from "../Utils/mappingContinent";
import { mappingCountry } from "../Utils/mappingCountry";
import { useQuery } from "react-query";
import debounce from "lodash.debounce";

interface RecruitmentProps {
  selectedContinent: string;
  selectedCountry: string;
  city: string;
  search: string;
  mbti: string;
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
    const [page, setPage] = useState(0);

    const getFilterParams = () => {
      const params = new URLSearchParams();
      if (search) params.append("title", search);
      if (city) params.append("content", city);
      if (selectedContinent !== "선택" && selectedContinent !== "기타")
        params.append("continent", mappingContinent[selectedContinent]);
      if (selectedCountry !== "선택" && selectedContinent !== "기타")
        params.append("country", mappingCountry(selectedCountry, "ko"));
      if (mbti !== "선택") params.append("mbti", mbti);
      params.append("page", page.toString());
      return params.toString();
    };

    const fetchRecruitData = async () => {
      const response = await fetchCall(
        `/api/v1/posts?${getFilterParams()}`,
        "get",
      );
      return response.data.content<TravelPlan[]>;
    };

    const debouncedFetchRecruitData = debounce(fetchRecruitData, 500);

    useEffect(() => {
      clearTravelData();
      debouncedFetchRecruitData();
      return () => debouncedFetchRecruitData.cancel();
    }, [search, city, selectedContinent, selectedCountry, mbti, page]);

    const {
      data: recruitData,
      isError,
      error,
    } = useQuery({
      queryKey: ["recruitData"],
      queryFn: async () => {
        const response = fetchRecruitData();
        console.log(response);
        return response;
      },
    });

    const observer = useRef<IntersectionObserver | null>(null);

    // Intersection Observer 설정
    const lastElementRef = useCallback((node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            setPage(prevPage => prevPage + 1); // 페이지를 증가시키고 새로운 데이터를 로드
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

    return (
      <div className="flex flex-wrap gap-[35px]">
        {recruitData &&
          recruitData.map((plan: TravelPlan, index: number) => {
            const isLastElement = index === recruitData.length - 1;
            return (
              <div
                ref={isLastElement ? lastElementRef : null}
                key={plan.postId}
              >
                <Post plan={plan} />
              </div>
            );
          })}
      </div>
    );
  },
);

export default Recruitment;
