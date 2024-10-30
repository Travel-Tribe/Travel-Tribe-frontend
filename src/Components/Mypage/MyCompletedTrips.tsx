const MyCompletedTrips = (): JSX.Element => {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const today = new Date();

  const travelInfos = [
    {
      travelStartDate: "2024-10-23",
      travelEndDate: "2024-10-29",
      maxParticipants: 6,
      travelCountry: "프랑스",
      deadline: "2024-9-28",
      title: "도쿄 3박4일 가실 mz들~~",
      participantsCount: 6,
    },
    {
      travelStartDate: "2024-10-23",
      travelEndDate: "2024-10-29",
      maxParticipants: 6,
      travelCountry: "프랑스",
      deadline: "2024-9-28",
      title: "도쿄 3박4일 가실 mz들~~",
      participantsCount: 6,
    },
    {
      travelStartDate: "2024-10-23",
      travelEndDate: "2024-10-29",
      maxParticipants: 6,
      travelCountry: "프랑스",
      deadline: "2024-9-28",
      title: "도쿄 3박4일 가실 mz들~~",
      participantsCount: 6,
    },
    {
      travelStartDate: "2024-9-15",
      travelEndDate: "2024-9-20",
      maxParticipants: 10,
      travelCountry: "이탈리아",
      deadline: "2024-7-01",
      title: "이탈리아 로마투어 같이 가실 분?",
      participantsCount: 10,
    },
  ];
  const completedTrips = travelInfos.filter(info => {
    const travelEndDate = new Date(info.travelEndDate);
    return travelEndDate < today;
  });
  console.log(completedTrips);

  return (
    <>
      <div className="border-b border-gray-300 flex justify-between items-center mt-10 pb-1">
        <div className="flex items-center">
          <h2 className="text-3xl mr-2">다녀온 여행</h2>
          <span className="text-lg">{completedTrips.length}</span>
        </div>
      </div>
      <div>
        <ul
          className={`mt-10 space-y-6 ${
            completedTrips.length > 6 ? "h-[660px] overflow-y-auto" : ""
          }`}
        >
          {completedTrips.map((info, index) => {
            const travelStartDay = new Date(info.travelStartDate).getDay();
            const travelEndDay = new Date(info.travelEndDate).getDay();

            return (
              <li key={index} className="list-none">
                <div className="w-[580px] h-[86px] bg-custom-green rounded-lg">
                  <div className="flex justify-between">
                    <h3 className="text-white text-xl mt-2.5 ml-2.5">
                      {info.title}
                    </h3>
                  </div>
                  <div className="flex items-center m-2.5 space-x-8 justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-[66px] h-[28px] text-white bg-pink-300 rounded-lg text-center flex items-center justify-center">
                        {info.travelCountry}
                      </div>
                      <span className="text-white">
                        참여인원 {info.participantsCount}/{info.maxParticipants}
                      </span>
                      <span className="text-white">
                        {info.travelStartDate}({week[travelStartDay]}) ~{" "}
                        {info.travelEndDate}({week[travelEndDay]})
                      </span>
                    </div>
                    <button className="w-20 p-1 rounded-md bg-custom-red text-white">평점 주기</button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default MyCompletedTrips;
