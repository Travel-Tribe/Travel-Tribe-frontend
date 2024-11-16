import { useNavigate, useParams } from "react-router-dom";
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
import EditBtn from "../Components/RecruitPost/Buttons/EditBtn";
import JoinBtn from "../Components/RecruitPost/Buttons/JoinBtn";

interface postProps {
  data: TravelPlan;
}

interface postResponse {
  data: postProps;
}

const RecruitPost = (): JSX.Element => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id ?? "0");
  console.log("POST_ID:", postId);

  const {
    data: travelPlan,
    isLoading,
    error,
  } = useQuery<TravelPlan>({
    queryKey: ["travelPlan", postId],
    queryFn: async () => {
      const response = await fetchCall<postResponse>(
        `/api/v1/posts/${postId}`,
        "get",
      );
      console.log("Response:", response);
      if (response.data.data) {
        return response.data.data;
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

  const handleGoToList = () => {
    navigate("/recruitment");
  };

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
    <div className="container mx-auto px-4 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - 1/2 width */}
        <div className="w-full space-y-6">
          {/* Recruitment Header Card */}
          <RecruitmentHeader travelPlan={travelPlan} />

          {/* Host Profile Card */}
          <TripHostProfile travelPlan={travelPlan} />

          {/* Trip Details Card */}
          <TripDetails travelPlan={travelPlan} />

          {/* Trip Rules Card */}
          <TripRules travelPlan={travelPlan} />

          {/* Trip Cost Card */}
          <TripCost travelPlan={travelPlan} />
        </div>

        {/* Right Column - 1/2 width */}
        <div className="w-full">
          <TripItinerary travelPlan={travelPlan} />
        </div>
      </div>
      <div className="flex justify-between mt-3">
        <EditBtn postId={postId} userId={travelPlan?.userId} />
        <div>
          <button
            className="btn btn-sm text-slate-50  btn-error"
            onClick={handleGoToList}
          >
            목록으로
          </button>
          <JoinBtn postId={postId} />
        </div>
      </div>
    </div>
  );
};

export default RecruitPost;
