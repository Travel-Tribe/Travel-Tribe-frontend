import React, { useEffect, useState } from "react";
import SearchBar from "../Components/Recruitment/SearchBar";
import fetchCall from "../Utils/apiFetch";
import { TravelPlan } from "../mocks/mockData";
import Post from "../Components/Common/Post";
import SelectBox from "../Components/Common/SelectBox";
import { COUNTRY_DATA } from "../Constants/COUNTRY_DATA";

const Recruitment = React.memo((): JSX.Element => {
  const [recruitData, setRecruitData] = useState<TravelPlan[]>([]);
  const [selectedTab, setSelectedTab] = useState<"모집" | "후기">("모집");
  const [selectedContinent, setSelectedContinent] = useState<string>("아시아");
  const [selectedCountry, setSelectedCountry] = useState<string>("한국");
  const [selectedCity, setSelectedCity] = useState<string>("");

  useEffect(() => {
    const getRecruitData = async () => {
      try {
        const data: { data: { post: TravelPlan[] } } = await fetchCall(
          "/api/v1/posts",
          "get",
        );

        setRecruitData(data.data.post);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    getRecruitData();
  }, []);

  // 검색 시 디바운스 적용

  const handleContinentChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedContinent(event.target.value);
    setSelectedCountry(""); // 대륙 변경 시 국가 초기화
    setSelectedCity(""); // 도시 초기화
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div className="max-w-[1347px] min-w-[540px] w-full mx-auto px-[20px] gap-[50px]">
      <div className="flex space-x-4 mb-[30px]">
        {/* 모집 탭 */}
        <div
          onClick={() => setSelectedTab("모집")}
          className={`cursor-pointer text-[24px] ${
            selectedTab === "모집"
              ? "text-black border-b border-black"
              : "text-black opacity-40"
          } pb-2`}
        >
          모집
        </div>

        {/* 후기 탭 */}
        <div
          onClick={() => setSelectedTab("후기")}
          className={`cursor-pointer text-[24px] ${
            selectedTab === "후기"
              ? "text-black border-b border-black"
              : "text-black opacity-40"
          } pb-2`}
        >
          후기
        </div>
      </div>
      <div className="flex gap-[30px]">
        <SelectBox
          options={Object.keys(COUNTRY_DATA)}
          selectedValue={selectedContinent}
          onSelect={e => handleContinentChange(e)}
        />
        {selectedContinent && (
          <SelectBox
            options={Object.keys(COUNTRY_DATA[selectedContinent])}
            selectedValue={selectedCountry}
            onSelect={e => handleCountryChange(e)}
          />
        )}
        {selectedCountry && (
          <SelectBox
            options={COUNTRY_DATA[selectedContinent][selectedCountry]}
            selectedValue={selectedCity}
            onSelect={e => handleCityChange(e)}
          />
        )}
      </div>

      <SearchBar />

      <div className="flex flex-wrap gap-[35px]">
        {recruitData.map(plan => (
          <Post key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
});

export default Recruitment;
