import { useNavigate } from "react-router-dom";

const MyRecruitment = (): JSX.Element => {
  const navigate = useNavigate();
  const week = ["일", "월", "화", "수", "목", "금", "토"];

  const travelInfos = [
    {
      travelStartDate: "2024-10-23",
      travelEndDate: "2024-10-30",
      maxParticipants: 6,
      travelCountry: "프랑스",
      deadline: "2024-11-28",
      title: "도쿄 3박4일 가실 mz들~~",
      participantsCount: 4
    },
    {
      travelStartDate: "2024-12-15",
      travelEndDate: "2024-12-20",
      maxParticipants: 10,
      travelCountry: "이탈리아",
      deadline: "2024-12-01",
      title: "이탈리아 로마투어 같이 가실 분?",
      participantsCount: 7
    }
  ];

  const clickRecruitForm = () => {
    navigate("/recruitment/write");
  };

  return (
    <>
      <div className="border-b border-gray-300 flex justify-between items-end mt-10 pb-1.5">
        <div className="flex items-center">
          <h2 className="text-xl mr-2">여행 모집</h2>
          <span className="text-lg">{travelInfos.length}</span>
        </div>
        <button
          className="btn w-[120px] h-[38px] bg-custom-green text-white rounded-lg mr-5 hover:bg-custom-green"
          onClick={clickRecruitForm}
        >
          모집글 작성
        </button>
      </div>
      <ul className="mt-10 space-y-6">
        {travelInfos.map((info, index) => {
          const today:any = new Date();
          const deadlineDate:any = new Date(info.deadline);
          const diffTime = deadlineDate - today;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          const travelStartDay = new Date(info.travelStartDate).getDay();
          const travelEndDay = new Date(info.travelEndDate).getDay();

          return (
            <li key={index} className="list-none">
              <div className="w-[600px] h-[86px] bg-custom-green rounded-lg">
                <div className="flex justify-between">
                  <h3 className="text-white text-xl mt-2.5 ml-2.5">{info.title}</h3>
                  <span className="text-white text-base mt-2.5 mr-2.5">
                    마감 {diffDays}일 전
                  </span>
                </div>
                <div className="flex items-center m-2.5 space-x-8">
                  <div className="w-[66px] h-[28px] text-white bg-pink-300 rounded-lg text-center flex items-center justify-center">
                    {info.travelCountry}
                  </div>
                  <span className="text-white">
                    참여인원 {info.participantsCount}/{info.maxParticipants}
                  </span>
                  <span className="text-white">
                    {info.travelStartDate}({week[travelStartDay]}) ~ {info.travelEndDate}(
                    {week[travelEndDay]})
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

export default MyRecruitment;
