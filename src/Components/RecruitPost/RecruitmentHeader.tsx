import Calendar from "../../assets/icons/date_range.svg";
import Group from "../../assets/icons/group.svg";
import { TravelPlan } from "../../mocks/mockData";

interface RecruitmentHeaderProps {
  travelPlan?: TravelPlan;
  // 현재 참가자 수는 API에서 받아오기
}

const RecruitmentHeader = ({
  travelPlan,
}: RecruitmentHeaderProps): JSX.Element => {
  if (!travelPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  } // 또는 로딩 상태나 에러 처리

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
    return `${dateString}(${dayOfWeek})`;
  };

  return (
    <div className="card bg-base-100">
      <div className="px-8 pt-8">
        <div className="flex items-center">
          <button className="btn btn-xs btn-success text-white">모집중</button>
          <span className="ml-3 text-sm text-center">
            모집마감: {travelPlan.deadline}
          </span>
        </div>
        <h2 className="card-title text-2xl">{travelPlan.title}</h2>
        <div className="flex flex-wrap gap-4 mt-0.5 font-medium">
          <div className="flex">
            <img src={Group} />
            <span className="whitespace-nowrap">
              2/{travelPlan.maxParticipants}명
            </span>
          </div>
          <div className="flex">
            <img src={Calendar} />
            <span>
              {formatDate(travelPlan.travelStartDate)} ~
              {formatDate(travelPlan.travelEndDate)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentHeader;
