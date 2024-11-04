import React, { useEffect, useState } from "react";
import SelectBox from "../Components/Common/SelectBox";
import SearchBar from "../Components/Recruitment/SearchBar";
import fetchCall from "../Utils/apiFetch";
import { TravelPlan } from "../mocks/mockData";
import { Link } from "react-router-dom";

const Recruitment = React.memo((): JSX.Element => {
  const [recruitData, setRecruitData] = useState<TravelPlan[]>([]);
  const [selectedTab, setSelectedTab] = useState<"모집" | "후기">("모집");
  const continents = [
    "아프리카",
    "아시아",
    "유럽",
    "북아메리카",
    "남아메리카",
    "오세아니아",
  ];
  const [selectedContinent, setSelectedContinent] = useState<string>(
    continents[0],
  );

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

  const handleSelect = (continent: string) => {
    setSelectedContinent(continent);
  };

  return (
    <div className="max-w-[1347px] min-w-[540px] w-full mx-auto px-[20px]">
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
      <div className="flex">
        <SelectBox
          options={continents}
          selectedValue={selectedContinent}
          onSelect={handleSelect}
        />
      </div>
      <SearchBar />
      <div className="flex flex-wrap gap-4">
        {recruitData.map(plan => (
          <Link
            to={`#`}
            key={plan.id}
            className="w-[300px] h-[320px] mb-[20px] border rounded-lg overflow-hidden flex flex-col items-start"
          >
            <img
              src={plan.days[0].dayDetails[0].fileAddress}
              alt={plan.title}
              className="w-[300px] h-[150px] object-cover"
            />
            <div className="pl-[25px] max-w-[250px] mb-[20px]">
              <p className="text-[16px] truncate mb-[10px] mt-[10px]">
                {plan.title}
              </p>
              <p className="text-[12px] truncate">
                여헹 날짜: {plan.travelStartDate} ~ {plan.travelEndDate}
              </p>

              <p className="text-[12px] truncate">
                모집 인원: {plan.maxParticipants}
              </p>

              <p className="text-[12px] truncate">여행 지역: {plan.region}</p>

              <p className="text-[12px] truncate">마감 일자: {plan.deadline}</p>
            </div>

            <div className="w-full border-t bc-[#DEDEDE]" />

            <div className="w-full h-[30px] flex justify-between items-center px-[25px]">
              <p className="text-[12px]">작성자</p>
              <button
                className={`w-[50px] h-[20px] text-[12px] rounded-[8px] text-white ${
                  new Date(plan.deadline) < new Date()
                    ? "bg-custom-green"
                    : "bg-custom-pink"
                }`}
              >
                {new Date(plan.deadline) < new Date() ? "모집중" : "모집 종료"}
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
});

export default Recruitment;
