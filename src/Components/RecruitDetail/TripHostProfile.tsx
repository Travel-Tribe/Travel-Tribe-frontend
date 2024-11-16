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
      const response = await fetchCall<{ data: UserProfile }>(
        `api/v1/users/${userId}`,
        "get",
      );

      console.log(response);
      if (!response.data) {
        throw new Error("사용자 데이터를 받아올 수 없습니다.");
      }
      return response.data;
      // return {
      //   nickname: "SEOK",
      //   ratingAvg: null,
      //   gender: "MALE",
      //   count: "12",
      // };
    },
    enabled: Boolean(userId),
  });

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다:</div>;

  return (
    <div className="card bg-base-100 border">
      <div className="card-body">
        <div className="flex items-center">
          <div className="avatar placeholder">
            {userData?.profile ? (
              <img
                src={userData.profile}
                alt={`${userData.nickname}의 프로필`}
              />
            ) : (
              <div className="bg-neutral text-neutral-content w-full h-full flex items-center justify-center">
                <span className="text-xs">사진</span>
              </div>
            )}
          </div>
          <div>
            <div>
              <span className="ml-3 text-sm text-center">
                {userData?.nickname}
              </span>
              <span className="ml-3 text-sm text-center">
                성별 {userData?.gender === "MALE" ? "남" : "여"}
              </span>
            </div>
            <div>
              <span className="ml-3 text-sm text-center">
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
