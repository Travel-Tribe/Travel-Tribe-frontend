import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { LuCalendarDays } from "react-icons/lu";
import { MdOutlinePeople } from "react-icons/md";
import { TravelPlanType } from "../../type/types";
import { getParticipations } from "../../apis/participation";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

interface RecruitmentHeaderProps {
  travelPlan?: TravelPlanType;
}

const RecruitmentHeader = ({ travelPlan }: RecruitmentHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams<{ id: string }>();
  const postId = params.id;
  console.log("URL postId:", postId);

  const {
    data: participations,
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
    <>
      <div className="card bg-base-100">
        <div className="p-8">
          <div className="flex items-center">
            <button
              className={`btn btn-xs text-white pointer-events-none ${
                travelPlan.status === "모집중"
                  ? "btn-success"
                  : travelPlan.status === "투표중"
                    ? "btn-error"
                    : "bg-btn-closed"
              }`}
            >
              {travelPlan.status}
            </button>
            <span className="ml-3 text-sm text-center">
              모집마감: {travelPlan.deadline}
            </span>
          </div>
          <h2 className="card-title text-2xl mt-2">{travelPlan.title}</h2>
          <div className="flex flex-wrap gap-4 mt-2 font-medium">
            <div
              className="flex items-center hover:text-blue-500 transition-colors cursor-pointer border rounded-lg px-3 py-1.5 hover:border-blue-500"
              onClick={() => setIsModalOpen(true)}
            >
              <MdOutlinePeople className="w-6 h-6" />
              <span className="whitespace-nowrap">
                {participations?.length}/{travelPlan.maxParticipants}명
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

      {/* 참여자 조회 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">참여자 정보</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <IoClose className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 max-h-96 overflow-y-auto">
              {participations?.map(participant => (
                <div
                  key={participant.participationId}
                  className="flex items-center gap-4 p-3 border-b last:border-b-0"
                >
                  <img
                    src={
                      import.meta.env.VITE_API_BASE_URL +
                        `/api/v1/file/preview?fileUrl=${participant.profileFile}` ||
                      "/src/assets/profile-img.webp"
                    }
                    alt={`${participant.nickname}의 프로필`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium">{participant.nickname}</div>
                    <div className="text-sm text-gray-500">
                      {participant.mbti}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full btn btn-success btn-sm text-white"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecruitmentHeader;
