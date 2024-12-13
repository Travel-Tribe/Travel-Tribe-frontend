import { useQuery } from "react-query";
import { AuthorProfileType, TravelPlanType } from "../../type/types";
import profileImage from "../../assets/profile-img.webp";
import { getUserProfile } from "../../apis/participation";

interface TripHostProfileProps {
  travelPlan?: TravelPlanType;
}

export default function TripHostProfile({ travelPlan }: TripHostProfileProps) {
  const userId = travelPlan?.userId?.toString();

  const {
    data: userData,
    isLoading,
    error,
  } = useQuery<AuthorProfileType>({
    queryKey: ["user", userId],
    queryFn: async () => getUserProfile(userId!),
    enabled: Boolean(userId),
  });

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다:</div>;

  return (
    <div className="card bg-base-100 border">
      <div className="card-body">
        <div className="flex items-center gap-3">
          <div className="avatar placeholder">
            {userData?.fileAddress ? (
              <div className="w-12 h-12">
                <img
                  src={
                    import.meta.env.VITE_API_BASE_URL +
                      `/api/v1/file/preview?fileUrl=${userData.fileAddress}` ||
                    "/src/assets/profile-img.webp"
                  }
                  onError={e => {
                    e.currentTarget.src = "/src/assets/profile-img.webp";
                    e.currentTarget.onerror = null;
                  }}
                  alt={`${userData.nickname}의 프로필`}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            ) : (
              <div className="w-12 h-12 flex items-center justify-center rounded-full">
                <img src={profileImage} alt="기본 프로필" />
              </div>
            )}
          </div>
          <div>
            <div>
              <span className="text-sm text-center">{userData?.nickname}</span>
              <span className="text-sm text-center ml-3">
                성별 {userData?.gender === "MALE" ? "남" : "여"}
              </span>
              <span className="text-sm text-center ml-3">{userData?.mbti}</span>
            </div>
            <div>
              <span className="text-sm text-center">
                평점 {userData?.ratingAvg ?? 0}
              </span>
              <span className="ml-3 text-sm text-center">
                여행 {userData?.count}회
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
