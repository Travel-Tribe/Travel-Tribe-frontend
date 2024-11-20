import { useQuery } from "react-query";
import { useReviewPostStore } from "../../store/reviewPostStore";
import fetchCall from "../../Utils/apiFetch";

interface TravelPlan {
  postId: number;
  continent: string;
  travelCountry: string;
  region: string;
  travelStartDate: string;
  travelEndDate: string;
  maxParticipants: string;
}

interface PostInfoProps {
  postId: string;
}

interface ApiResponse {
  data: {
    data: TravelPlan;
  };
}

const PostInfo = ({ postId }: PostInfoProps) => {
  // store hooks를 상단에서 한 번만 호출
  const { formData, setFormData } = useReviewPostStore();

  const { isError, isLoading } = useQuery<TravelPlan>({
    queryKey: ["post", postId],
    queryFn: async () => {
      const response = await fetchCall<ApiResponse>(
        `/api/v1/posts/${postId}`,
        "get",
      );
      console.log("포스트:", response);
      return response.data.data;
    },
    onSuccess: data => {
      setFormData({
        continent: data.continent,
        country: data.travelCountry,
        region: data.region,
        travelStartDate: data.travelStartDate,
        travelEndDate: data.travelEndDate,
        participants: data.maxParticipants,
        title: formData.title || "",
        contents: formData.contents || "", // 기존 값 유지
        files: formData.files || [],
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error">데이터를 불러오는데 실패했습니다.</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">대륙</span>
          </label>
          <input
            type="text"
            value={formData.continent}
            className="input input-bordered w-full"
            disabled
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">국가</span>
          </label>
          <input
            type="text"
            value={formData.country}
            className="input input-bordered w-full"
            disabled
          />
        </div>
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">도시</span>
        </label>
        <input
          type="text"
          value={formData.region}
          className="input input-bordered w-full"
          disabled
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">여행 시작일</span>
          </label>
          <input
            type="text"
            value={formData.travelStartDate}
            className="input input-bordered w-full"
            disabled
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">여행 종료일</span>
          </label>
          <input
            type="text"
            value={formData.travelEndDate}
            className="input input-bordered w-full"
            disabled
          />
        </div>
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">동행인원</span>
        </label>
        <input
          type="number"
          value={formData.participants}
          className="input input-bordered w-full"
          disabled
        />
      </div>
    </div>
  );
};

export default PostInfo;
