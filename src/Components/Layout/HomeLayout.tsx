import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "../Common/SearchBar";
import SelectBox from "../Common/SelectBox";
import { COUNTRY_DATA } from "../../Constants/COUNTRY_DATA";
import { STORAGE_KEYS } from "../../Constants/STORAGE_KEYS";
import { MBTI } from "../../Constants/MBTI";
import Recruitment from "../../Page/Recruitment";
import Review from "../../Page/Review";
import Community from "../../Page/Community";

const HomeLayout = () => {
  const [selectedTab, setSelectedTab] = useState<"모집" | "후기" | "커뮤니티">(
    "모집",
  );
  const [selectedContinent, setSelectedContinent] = useState<string>("선택");
  const [selectedCountry, setSelectedCountry] = useState<string>("선택");
  const [city, setCity] = useState<string>("");
  const [mbti, setMbti] = useState<string>("선택");
  const [search, setSearch] = useState<string>("");
  // 검색 시 디바운스 적용
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
    <div className="max-w-[1347px] min-w-[740px] w-full mx-auto px-[20px] gap-[50px]">
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

        <Link
          to={"/community"}
          onClick={() => setSelectedTab("커뮤니티")}
          className={`cursor-pointer text-[24px] ${
            selectedTab === "커뮤니티"
              ? "text-black border-b border-black"
              : "text-black opacity-40"
          } pb-2`}
        >
          커뮤니티
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
      <div className="flex justify-between items-center">
        <SearchBar value={search} setValue={setSearch} />
        {localStorage.getItem(STORAGE_KEYS.TOKEN) &&
          location.pathname === "/recruitment" && (
            <Link
              to={`/recruitment/write`}
              className="btn btn-sm !h-[32px] bg-custom-green hover:bg-custom-green-hover text-white"
            >
              모집 글 작성
            </Link>
          )}

        {localStorage.getItem(STORAGE_KEYS.TOKEN) &&
          location.pathname === "/community" && (
            <Link
              to={`/community/write`}
              className="btn btn-sm !h-[32px] btn-success text-white"
            >
              게시글 작성
            </Link>
          )}
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
