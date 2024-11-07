const MypageTest = () => {
  const week = ["일", "월", "화", "수", "목", "금", "토"];

  const travelInfos = [
    {
      id: "1",
      travelStartDate: "2024-10-23",
      travelEndDate: "2024-10-30",
      maxParticipants: 6,
      travelCountry: "프랑스",
      deadline: "2024-11-28",
      title: "도쿄 3박4일 가실 mz들~~",
      participantsCount: 4,
    },
    {
      id: "2",
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
      <section>
        <div className="border-b border-gray-300 flex justify-between items-end mt-10 pb-1">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold mr-2">여행 모집</h2>
            <span className="text-lg">4</span>
          </div>
          <button
            className="btn btn-sm w-[100px] !h-[32px] bg-custom-teal-green  rounded-lg mr-5 hover:bg-custom-teal-green text-white"
            // onClick={clickRecruitForm}
          >
            모집글 작성
          </button>
        </div>
        <ul className="mt-5 space-y-6">
          {travelInfos.map(plan => {
            const today: any = new Date();
            const deadlineDate: any = new Date(plan.deadline);
            const remainingDays = Math.ceil(
              (deadlineDate.getTime() - today.getTime()) /
                (1000 * 60 * 60 * 24),
            );

            const startDayOfWeek =
              week[new Date(plan.travelStartDate).getDay()];
            const endDayOfWeek = week[new Date(plan.travelEndDate).getDay()];

            return (
              <li key={plan.id} className="list-none">
                <div className="bg-white rounded-lg w-[660px] h-[86px] mx-auto drop-shadow-lg">
                  <div className="flex justify-between">
                    <h3 className=" text-xl mt-2.5 ml-2.5">{plan.title}</h3>
                    <span className=" text-base mt-2.5 mr-2.5">
                      마감 {remainingDays}일 전
                    </span>
                  </div>
                  <div className="flex items-center m-2.5 space-x-8">
                    <div className=" bg-custom-red  max-w-[72px] px-[4px] rounded-lg flex items-center justify-center">
                      <span className="truncate">{plan.travelCountry}</span>
                    </div>
                    <span className="">참여인원 0/{plan.maxParticipants}</span>
                    <span className="">
                      {plan.travelStartDate}({startDayOfWeek}) ~{" "}
                      {plan.travelEndDate}({endDayOfWeek})
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};
export default MypageTest;
