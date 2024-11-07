import Calendar from "../../assets/icons/date_range.svg";
import Group from "../../assets/icons/group.svg";

// interface RecruitmentHeaderProps {
//   travelPlan: TravelPlan;
//   // 현재 참가자 수는 API에서 받아오기
//   currentParticipants?: number;
// }

const RecruitmentHeader = (): JSX.Element => {
  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
  //   return `${date.toLocaleDateString("ko-KR")}(${dayOfWeek})`;
  // };

  // const isRecruiting = new Date(travelPlan.deadline) > new Date();

  return (
    <div className="card bg-base-100 mb-6">
      <div className="card-body">
        <div className="flex items-center">
          <button className="btn btn-xs btn-success text-white">모집중</button>
          <span className="ml-3 text-sm text-center">모집마감: 2024-12-31</span>
        </div>
        <h2 className="card-title text-2xl">도쿄 미식 여행</h2>
        <div className="flex flex-wrap gap-4 mt-0.5 font-medium">
          <div className="flex">
            <img src={Group} />
            <span className="whitespace-nowrap">2/4명</span>
          </div>
          <div className="flex">
            <img src={Calendar} />
            <span>2024-11-12 ~ 2024-12-11</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentHeader;
