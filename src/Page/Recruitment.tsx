import React, { useCallback, useEffect, useRef, useState } from "react";
import fetchCall from "../Utils/apiFetch";
import { TravelPlan } from "../mocks/mockData";
import Post from "../Components/Common/Post";
import { useRecruitPostStore } from "../store/recruitPostStore";
import SearchBar from "../Components/Common/SearchBar";
import { STORAGE_KEYS } from "../Constants/STORAGE_KEYS";
import { Link } from "react-router-dom";
import SelectBox from "../Components/Common/SelectBox";
import { MBTI } from "../Constants/MBTI";
import { COUNTRY_DATA } from "../Constants/COUNTRY_DATA";
import { mappingContinent } from "../Utils/mappingContinent";
import { mappingCountry } from "../Utils/mappingCountry";
import { useQuery } from "react-query";
import debounce from "lodash.debounce";

const Recruitment = React.memo((): JSX.Element => {
  const [selectedContinent, setSelectedContinent] = useState<string>("선택");
  const [selectedCountry, setSelectedCountry] = useState<string>("선택");
  const [city, setCity] = useState<string>("");
  const [mbti, setMbti] = useState<string>("선택");
  const [search, setSearch] = useState<string>("");
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

  const handleContinentChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedContinent(event.target.value);
    setSelectedCountry("선택"); // 대륙 변경 시 국가 초기화
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleMbti = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMbti(event.target.value);
  };

  const handleClickReset = () => {
    setSelectedContinent("선택");
    setSelectedCountry("선택");
    setCity("");
    setMbti("선택");
    setSearch("");
  };

  return (
    <div className="max-w-[1347px] min-w-[540px] w-full mx-auto px-[20px] gap-[50px]">
      <div className="flex space-x-4 mb-[30px]">
        <Link
          to={"/recruitment"}
          className={`cursor-pointer text-[24px] text-black border-b border-black pb-2`}
        >
          모집
        </Link>

        <Link
          to={"/review"}
          className={`cursor-pointer text-[24px] text-black opacity-40 pb-2`}
        >
          후기
        </Link>
      </div>
      <div className="flex gap-[30px]">
        <SelectBox
          options={Object.keys(COUNTRY_DATA)}
          selectedValue={selectedContinent}
          onSelect={e => handleContinentChange(e)}
        />
        <SelectBox
          options={COUNTRY_DATA[selectedContinent]}
          selectedValue={selectedCountry}
          onSelect={e => handleCountryChange(e)}
        />
        <input
          className="input w-[140px] h-[30px] select-bordered border-custom-green"
          type="text"
          onChange={handleCityChange}
          value={city}
          placeholder="도시 입력"
        />
        <SelectBox
          options={[...MBTI]}
          selectedValue={mbti}
          onSelect={e => handleMbti(e)}
        />
        <button
          className="btn btn-sm !h-[32px] bg-custom-green text-white"
          onClick={handleClickReset}
        >
          초기화
        </button>
      </div>
      <div className="flex justify-between items-center">
        <SearchBar value={search} setValue={setSearch} />
        {localStorage.getItem(STORAGE_KEYS.TOKEN) && (
          <Link
            to={`write`}
            className="btn btn-sm !h-[32px] bg-custom-green text-white"
          >
            모집 글 작성
          </Link>
        )}
      </div>
      <div className="flex flex-wrap gap-[35px]">
        {recruitData &&
          recruitData.map((plan: TravelPlan, index: number) => {
            // 마지막 요소에 ref를 연결하여 Intersection Observer를 활성화
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
    </div>
  );
});

export default Recruitment;
