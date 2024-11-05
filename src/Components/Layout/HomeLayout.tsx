import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../Common/SearchBar";
import { COUNTRY_DATA } from "../../Constants/COUNTRY_DATA";
import SelectBox from "../Common/SelectBox";

const HomeLayout = () => {
  const [selectedTab, setSelectedTab] = useState<"모집" | "후기">("모집");
  const [selectedContinent, setSelectedContinent] = useState<string>("아시아");
  const [selectedCountry, setSelectedCountry] = useState<string>("한국");
  const [selectedCity, setSelectedCity] = useState<string>("");
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
      </div>
      <SearchBar />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
