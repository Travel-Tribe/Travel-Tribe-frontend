const MyTravelHistory = (): JSX.Element => {
  const week = ["일", "월", "화", "수", "목", "금", "토"];

  const travelInfos = [
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
    }, {
      travelStartDate: "2024-12-15",
      travelEndDate: "2024-12-20",
      travelCountry: "이탈리아",
      title: "이탈리아 로마투어 같이 가실 분?",
    },
  ];
  console.log(travelInfos.length);
  return (
    <>
      <div className="border-b border-gray-300 flex justify-between items-center mt-10 pb-1">
        <div className="flex items-center">
          <h2 className="text-3xl mr-2">여행 후기</h2>
          <span className="text-lg">{travelInfos.length}</span>
        </div>
      </div>
      <ul
        className={`mt-5 space-y-6 ${
          travelInfos.length > 5 ? "w-[620px] max-h-[550px] overflow-y-auto" : ""
        }`}
      >
        {travelInfos.map((info, index) => {
          const travelStartDay = new Date(info.travelStartDate).getDay();
          const travelEndDay = new Date(info.travelEndDate).getDay();

          return (
            <li key={index} className="list-none">
              <div className="w-[600px] h-[86px] bg-custom-green rounded-lg">
                <div className="flex justify-between">
                  <h3 className="text-white text-xl mt-2.5 ml-2.5">
                    {info.title}
                  </h3>
                </div>
                <div className="flex items-center m-2.5 space-x-8">
                  <div className="bg-custom-red text-white max-w-[72px] px-[4px] rounded-lg flex items-center justify-center">
                    <span className="truncate">{info.travelCountry}</span>
                  </div>
                  <span className="text-white">
                    {info.travelStartDate}({week[travelStartDay]}) ~{" "}
                    {info.travelEndDate}({week[travelEndDay]})
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MyTravelHistory;
