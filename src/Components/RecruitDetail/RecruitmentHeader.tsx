import { useQuery } from "react-query";
import Calendar from "../../assets/icons/date_range.svg";
import Group from "../../assets/icons/group.svg";
import { TravelPlan } from "../../mocks/mockData";
import fetchCall from "../../Utils/apiFetch";
import { useParams } from "react-router-dom";

interface RecruitmentHeaderProps {
  travelPlan?: TravelPlan;
}

interface Participation {
  participationId: number;
  postId: number;
  userId: string;
}

interface ApiResponse {
  data: {
    data: Participation[];
  };
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
    queryFn: async () => {
      if (!postId) {
        throw new Error("포스트 ID가 없습니다.");
      }
      const response = await fetchCall<ApiResponse>(
        `/api/v1/posts/${postId}/participations`,
        "get",
      );

      console.log("참여자:", response);
      if (!response.data.data) {
        throw new Error("사용자 데이터를 받아올 수 없습니다.");
      }
      return response.data.data;
    },
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
            <img src={Group} />
            <span className="whitespace-nowrap">
              {Participation?.length}/{travelPlan.maxParticipants}명
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
