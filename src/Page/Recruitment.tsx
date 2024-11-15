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
    getRecruitData();
    clearTravelData();
  }, []);
  console.log(recruitData)
  return (
    <div className="flex flex-wrap gap-[35px]">
      {recruitData &&
        recruitData?.map((plan: TravelPlan, index: number) => {
          const isLastElement = index === recruitData.length - 1;
          return (
            <div ref={isLastElement ? lastElementRef : null} key={plan.postId}>
              <RecruitmentPost plan={plan} />
            </div>
          );
        })}
    </div>
  );
});

export default Recruitment;
