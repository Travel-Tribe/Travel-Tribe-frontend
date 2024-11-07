import { FC } from "react";

interface TravelInfo {
  travelStartDate: string;
  travelEndDate: string;
  travelCountry: string;
  title: string;
}

const MyTravelHistory: FC = (): JSX.Element => {
  const week = ["일", "월", "화", "수", "목", "금", "토"];

  const travelInfos: TravelInfo[] = [
    {
      travelStartDate: "2024-10-23",
      travelEndDate: "2024-10-30",
      travelCountry: "프랑스",
      title: "도쿄 3박4일 가실 mz들~~",
    },
    {
      travelStartDate: "2024-12-15",
      travelEndDate: "2024-12-20",
      travelCountry: "이탈리아",
      title: "이탈리아 로마투어 같이 가실 분?",
    },
    {
      travelStartDate: "2024-12-15",
      travelEndDate: "2024-12-20",
      travelCountry: "이탈리아",
      title: "이탈리아 로마투어 같이 가실 분?",
    },
    {
      travelStartDate: "2024-12-15",
      travelEndDate: "2024-12-20",
      travelCountry: "이탈리아",
      title: "이탈리아 로마투어 같이 가실 분?",
    },
    {
      travelStartDate: "2024-12-15",
      travelEndDate: "2024-12-20",
      travelCountry: "이탈리아",
      title: "이탈리아 로마투어 같이 가실 분?",
    },
    {
      travelStartDate: "2024-12-15",
      travelEndDate: "2024-12-20",
      travelCountry: "이탈리아",
      title: "이탈리아 로마투어 같이 가실 분?",
    },
  ];

  return (
    <main className="flex flex-col w-[660px] ml-[60px] py-5">
      <div className="border-b border-gray-300 flex justify-between items-center mt-10 pb-1">
        <div className="flex items-center">
          <h2 className="text-3xl mr-2">여행 후기</h2>
          <span className="text-lg">{travelInfos.length}</span>
        </div>
      </div>
      <ul
        className={`mt-10 space-y-6 ${
          travelInfos.length > 5 ? "w-[680px] h-[660px] overflow-y-auto" : ""
        }`}
      >
        {travelInfos.map((info, index) => {
          const travelStartDay = new Date(info.travelStartDate).getDay();
          const travelEndDay = new Date(info.travelEndDate).getDay();

          return (
            <li key={index} className="list-none">
              <div className="bg-white rounded-lg w-[660px] h-[86px] mx-auto drop-shadow-lg">
                <div className="flex justify-between">
                  <h3 className="text-xl mt-2.5 ml-2.5">{info.title}</h3>
                </div>
                <div className="flex items-center m-2.5 space-x-8 justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-custom-red text-white max-w-[72px] px-[4px] rounded-lg flex items-center justify-center">
                      <span className="truncate">{info.travelCountry}</span>
                    </div>
                    <span>
                      {info.travelStartDate}({week[travelStartDay]}) ~{" "}
                      {info.travelEndDate}({week[travelEndDay]})
                    </span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default MyTravelHistory;
