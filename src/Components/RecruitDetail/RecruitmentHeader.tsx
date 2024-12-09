import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { LuCalendarDays } from "react-icons/lu";
import { MdOutlinePeople } from "react-icons/md";
import { TravelPlanType } from "../../type/types";
import { getParticipations } from "../../apis/participation";

interface RecruitmentHeaderProps {
  travelPlan?: TravelPlanType;
}

const RecruitmentHeader = ({ travelPlan }: RecruitmentHeaderProps) => {
  const params = useParams<{ id: string }>();
  const postId = params.id;
  console.log("URL postId:", postId);

  const {
    data: Participation,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["participations", postId],
    queryFn: async () => getParticipations(postId!),
    enabled: Boolean(travelPlan?.userId),
  });

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!travelPlan) return <div className="error"></div>;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
    return `${dateString}(${dayOfWeek})`;
  };

  return (
    <div className="card bg-base-100">
      <div className="p-8">
        <div className="flex items-center">
          {/* Participation?.length !== travelPlan.maxParticipants */}
          <button
            className={`btn btn-xs text-white pointer-events-none ${travelPlan.status === "모집중" ? "btn-success" : travelPlan.status === "투표중" ? "btn-error" : "bg-btn-closed"}`}
          >
            {travelPlan.status}
          </button>
          <span className="ml-3 text-sm text-center">
            모집마감: {travelPlan.deadline}
          </span>
        </div>
        <h2 className="card-title text-2xl mt-2">{travelPlan.title}</h2>
        <div className="flex flex-wrap gap-4 mt-0.5 font-medium">
          <div className="flex">
            <MdOutlinePeople className="w-6 h-6" />
            <span className="whitespace-nowrap">
              {Participation?.length}/{travelPlan.maxParticipants}명
            </span>
          </div>
          <div className="flex items-center">
            <LuCalendarDays className="w-5 h-5" />
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
