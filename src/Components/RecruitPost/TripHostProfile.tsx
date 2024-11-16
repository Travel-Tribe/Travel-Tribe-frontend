import { useQuery } from "react-query";
import { TravelPlan } from "../../mocks/mockData";
import fetchCall from "../../Utils/apiFetch";

interface UserProfile {
  nickname: string;
  gender: string;
  ratingAvg: number | null;
  count: string;
  profile: string;
}

interface UserData {
  data: UserProfile;
}

interface UseResponse {
  data: UserData;
}

interface TripHostProfileProps {
  travelPlan?: TravelPlan;
}

export default function TripHostProfile({ travelPlan }: TripHostProfileProps) {
  const userId = travelPlan?.userId;
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery<UserProfile>({
    queryKey: ["user", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("호스트 ID가 없습니다.");
      }
      const response = await fetchCall<UseResponse>(
        `api/v1/users/${userId}`,
        "get",
      );

      console.log("유저:", response);
      if (!response.data.data) {
        throw new Error("사용자 데이터를 받아올 수 없습니다.");
      }
      return response.data.data;
    },
    // enabled: Boolean(travelPlan?.userId),
  });

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다:</div>;

  return (
    <div className="card bg-base-100 border">
      <div className="card-body">
        <div className="flex items-center gap-3">
          <div className="avatar placeholder">
            {userData?.profile ? (
              <img
                src={userData.profile}
                alt={`${userData.nickname}의 프로필`}
              />
            ) : (
              <div className="bg-neutral text-neutral-content w-12 h-12 flex items-center justify-center rounded-full">
                <span className="text-xs">사진</span>
              </div>
            )}
          </div>
          <div>
            <div>
              <span className="text-sm text-center">{userData?.nickname}</span>
              <span className="text-sm text-center ml-3">
                성별 {userData?.gender === "MALE" ? "남" : "여"}
              </span>
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
