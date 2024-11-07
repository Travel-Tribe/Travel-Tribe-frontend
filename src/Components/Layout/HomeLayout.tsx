import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "../Common/SearchBar";
import { COUNTRY_DATA } from "../../Constants/COUNTRY_DATA";
import SelectBox from "../Common/SelectBox";
import { STORAGE_KEYS } from "../../Constants/STORAGE_KEYS";
import { MBTI } from "../../Constants/MBTI";

const HomeLayout = () => {
  const [selectedTab, setSelectedTab] = useState<"모집" | "후기">("모집");
  const [selectedContinent, setSelectedContinent] = useState<string>("아시아");
  const [selectedCountry, setSelectedCountry] = useState<string>("한국");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [mbti, setMbti] = useState<string>("");
  // 검색 시 디바운스 적용
  const location = useLocation();

  useEffect(() => {
    const urlList = location.pathname.split("/");
    if (urlList.includes("recruitment")) setSelectedTab("모집");
    else setSelectedTab("후기");
  }, [location]);

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

  const handleMbti = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMbti(event.target.value);
  };

  return (
    <div className="max-w-[1347px] min-w-[540px] w-full mx-auto px-[20px] gap-[50px]">
      <div className="flex space-x-4 mb-[30px]">
        <Link
          to={"/recruitment"}
          onClick={() => setSelectedTab("모집")}
          className={`cursor-pointer text-[24px] ${
            selectedTab === "모집"
              ? "text-black border-b border-black"
              : "text-black opacity-40"
          } pb-2`}
        >
          모집
        </Link>

        <Link
          to={"/review"}
          onClick={() => setSelectedTab("후기")}
          className={`cursor-pointer text-[24px] ${
            selectedTab === "후기"
              ? "text-black border-b border-black"
              : "text-black opacity-40"
          } pb-2`}
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
        {selectedTab === "모집" && (
          <SelectBox
            options={[...MBTI]}
            selectedValue={mbti}
            onSelect={e => handleMbti(e)}
          />
        )}
      </div>
      <div className="flex justify-between items-center">
        <SearchBar />
        {localStorage.getItem(STORAGE_KEYS.TOKEN) && (
          <Link
            to={`${location.pathname}/write`}
            className="btn btn-sm !h-[32px] bg-custom-green text-white"
          >
            {selectedTab} 글 작성
          </Link>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default HomeLayout;
