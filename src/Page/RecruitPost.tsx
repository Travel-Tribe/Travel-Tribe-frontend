import { useParams } from "react-router-dom";
import {
  RecruitmentHeader,
  TripHostProfile,
  TripDetails,
  TripRules,
  TripCost,
  TripItinerary,
} from "../Components/RecruitPost";
import { useQuery } from "react-query";
import { TravelPlan } from "../mocks/mockData";
import fetchCall from "../Utils/apiFetch";

const RecruitPost = (): JSX.Element => {
  const { postId = "" } = useParams<{ postId: string }>();

  const {
    data: travelPlan,
    isLoading,
    error,
  } = useQuery<TravelPlan>({
    queryKey: ["travelPlan", postId],
    queryFn: async () => {
      const response = await fetchCall<TravelPlan[]>(
        `/api/v1/posts/${postId}`,
        "get",
      );
      if (response && response.length > 0) {
        return response[0];
      }
      throw new Error("모집글을 찾을 수 없습니다.");
    },
    enabled: Boolean(postId),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="alert alert-error max-w-md">
        <h3 className="font-bold">오류 발생!</h3>
        <div className="text-sm">
          {error instanceof Error
            ? error.message
            : "여행 계획을 불러오는 중 오류가 발생했습니다."}
        </div>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="btn btn-primary mt-4"
      >
        다시 시도
      </button>
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - 1/2 width */}
        <div className="w-full space-y-6">
          {/* Recruitment Header Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <RecruitmentHeader />
            </div>
          </div>

          {/* Host Profile Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">호스트 프로필</h2>
              <TripHostProfile />
            </div>
          </div>

          {/* Trip Details Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">여행 정보</h2>
              <TripDetails />
            </div>
          </div>

          {/* Trip Rules Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">참여 조건</h2>
              <TripRules />
            </div>
          </div>

          {/* Trip Cost Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">예상 비용</h2>
              <TripCost />
            </div>
          </div>
        </div>

        {/* Right Column - 1/2 width */}
        <div className="w-full">
          <div className="card bg-base-100 shadow-xl sticky top-4">
            <div className="card-body">
              <h2 className="card-title">여행 일정</h2>
              <TripItinerary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitPost;
