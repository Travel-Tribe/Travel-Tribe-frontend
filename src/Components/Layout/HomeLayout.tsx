import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "../common/SearchBar";
import SelectBox from "../common/SelectBox";
import { COUNTRY_DATA } from "../../constants/COUNTRY_DATA";
import { STORAGE_KEYS } from "../../constants/STORAGE_KEYS";
import { MBTI } from "../../constants/MBTI";
import Recruitment from "../../page/Recruitment";
import Review from "../../page/Review";
import Community from "../../page/Community";

const HomeLayout = () => {
  const [selectedTab, setSelectedTab] = useState<"모집" | "후기" | "커뮤니티">(
    "모집",
  );
  const [selectedContinent, setSelectedContinent] = useState<string>("선택");
  const [selectedCountry, setSelectedCountry] = useState<string>("선택");
  const [city, setCity] = useState<string>("");
  const [mbti, setMbti] = useState<string>("선택");
  const [search, setSearch] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const urlList = location.pathname.split("/");
    setSelectedTab(
      urlList.includes("recruitment")
        ? "모집"
        : urlList.includes("community")
          ? "커뮤니티"
          : "후기",
    );
    setSelectedContinent("선택");
    setSelectedCountry("선택");
    setCity("");
    setMbti("선택");
    setSearch("");
  }, [location]);

  const isTokenAvailable = localStorage.getItem(STORAGE_KEYS.TOKEN);

  const renderTabLink = (path, label) => (
    <Link
      to={path}
      onClick={() => setSelectedTab(label)}
      className={`cursor-pointer text-[24px] pb-2 ${
        selectedTab === label
          ? "text-black border-b border-black"
          : "text-black opacity-40"
      }`}
    >
      {label}
    </Link>
  );

  const renderWriteButton = (path, label) => (
    <Link
      to={path}
      className="btn btn-sm !h-[32px] btn-success text-white ml-2"
    >
      {label}
    </Link>
  );

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
    <div className="container mx-auto px-4 pb-8">
      <div className="flex space-x-4 mb-[30px]">
        {renderTabLink("/recruitment", "모집")}
        {renderTabLink("/review", "후기")}
        {renderTabLink("/community", "커뮤니티")}
      </div>
      {location.pathname !== "/community" && (
        <div className="flex gap-[30px]">
          <SelectBox
            options={Object.keys(COUNTRY_DATA)}
            selectedValue={selectedContinent}
            initialText="대륙"
            onSelect={e => handleContinentChange(e)}
          />
          <SelectBox
            options={COUNTRY_DATA[selectedContinent]}
            selectedValue={selectedCountry}
            initialText="국가"
            onSelect={e => handleCountryChange(e)}
          />
          <input
            className="input w-[140px] !h-[32px] select-bordered border-custom-green focus:border-custom-green focus:outline-none focus:ring-custom-green focus:ring-1"
            type="text"
            onChange={handleCityChange}
            value={city}
            placeholder="도시 입력"
          />
          {selectedTab === "모집" && (
            <SelectBox
              options={[...MBTI]}
              selectedValue={mbti}
              initialText="MBTI"
              onSelect={e => handleMbti(e)}
            />
          )}

          <button
            className="btn btn-sm !h-[32px] btn-success text-white"
            onClick={handleClickReset}
          >
            초기화
          </button>
        </div>
      )}
      <div className="flex justify-between items-center">
        {location.pathname !== "/community" && (
          <SearchBar value={search} setValue={setSearch} />
        )}

        <div className="ml-auto flex items-center">
          {isTokenAvailable && location.pathname === "/community" && (
            <Link
              to={`/community/write`}
              className="btn btn-sm !h-[32px] btn-success text-white mb-7"
            >
              게시글 작성
            </Link>
          )}

          {isTokenAvailable && location.pathname === "/recruitment" && (
            <Link
              to={`/recruitment/write`}
              className="btn btn-sm !h-[32px] btn-success text-white ml-2"
            >
              모집 글 작성
            </Link>
          )}
        </div>
      </div>
      {location.pathname === "/recruitment" && (
        <Recruitment
          selectedContinent={selectedContinent}
          selectedCountry={selectedCountry}
          city={city}
          search={search}
          mbti={mbti}
        />
      )}
      {location.pathname === "/review" && (
        <Review
          selectedContinent={selectedContinent}
          selectedCountry={selectedCountry}
          city={city}
          search={search}
        />
      )}
      {location.pathname === "/community" && (
        <Community
          selectedContinent={selectedContinent}
          selectedCountry={selectedCountry}
          city={city}
          search={search}
        />
      )}
    </div>
  );
};

export default HomeLayout;
