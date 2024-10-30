const MyTravelJoin = (): JSX.Element => {
  const week = ["일", "월", "화", "수", "목", "금", "토"];

  const travelInfos = [
    {
      travelStartDate: "2024-10-23",
      travelEndDate: "2024-10-30",
      maxParticipants: 6,
      travelCountry: "프랑스",
      deadline: "2024-11-28",
      title: "도쿄 3박4일 가실 mz들~~",
      participantsCount: 4,
    },
    {
      travelStartDate: "2024-12-15",
      travelEndDate: "2024-12-20",
      maxParticipants: 10,
      travelCountry: "이탈리아",
      deadline: "2024-12-01",
      title: "이탈리아 로마투어 같이 가실 분?",
      participantsCount: 10,
    },
  ];

  return (
    <>
      <div className="border-b border-gray-300 flex justify-between items-center mt-10 pb-1">
        <div className="flex items-center">
          <h2 className="text-xl mr-2">여행 신청</h2>
          <span className="text-lg">4</span>
        </div>
      </div>

      <ul className="mt-10 space-y-6">
        {travelInfos.map((info, index) => {
          const today: any = new Date();
          const deadlineDate: any = new Date(info.deadline);
          const diffTime = deadlineDate - today;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          const travelStartDay = new Date(info.travelStartDate).getDay();
          const travelEndDay = new Date(info.travelEndDate).getDay();
          return (
            <li key={index} className="list-none">
              <div className="bg-custom-green rounded-lg w-[600px] h-[86px]">
                <div className="flex justify-between mb-2">
                  <h3 className="text-white text-xl mt-2.5 ml-2.5">
                    {info.title}
                  </h3>
                  <span className="text-white text-base mt-2.5 mr-2.5">
                    마감 {diffDays}일전
                  </span>
                </div>
                <div className="flex justify-between m-2.5">
                  <div className="flex items-center space-x-3">
                    <div className="bg-pink-300 text-white w-[66px] h-[28px] rounded-lg text-center flex items-center justify-center">
                      {info.travelCountry}
                    </div>
                    <span className="text-white text-sm">
                      참여인원 {info.participantsCount}/{info.maxParticipants}
                    </span>
                    <span className="text-white text-sm">
                      {info.travelStartDate}({week[travelStartDay]}) ~{" "}
                      {info.travelEndDate}({week[travelEndDay]})
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    {info.participantsCount !== info.maxParticipants ? (
                      <div className="bg-white text-green-500 border border-green-500 w-[66px] h-8 rounded-lg text-center text-sm flex items-center justify-center">
                        모집중
                      </div>
                    ) : (
                      <div className="bg-white text-red-500 border border-red-500 w-[66px] h-8 rounded-lg text-center text-sm flex items-center justify-center">
                        모집 완료
                      </div>
                    )}
                    <button className="btn btn-sm bg-white border border-gray-500 w-[90px] rounded-md text-center flex items-center justify-center">
                      취소하기
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MyTravelJoin;
