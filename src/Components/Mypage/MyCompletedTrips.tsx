import { useState, useEffect } from "react";
import fetchCall from "../../Utils/apiFetch";
import Rating from "./Rating";
import { STORAGE_KEYS } from "../../Constants/STORAGE_KEYS";
import { mappingCountry } from "../../Utils/mappingCountry";
import { useNavigate } from "react-router-dom";

interface TravelPlan {
  postId: string;
  title: string;
  travelStartDate: string;
  travelEndDate: string;
  maxParticipants: number;
  travelCountry: string;
  deadline: string;
  participationStatus: string;
  isRatingAllowed: boolean;
  ratingStatus: string;
  participantsCount: number;
  status: string;
  reviewStatus: boolean;
}

interface TravelPlanData {
  data: TravelPlan;
}

interface TravelPlanDataData {
  data: TravelPlanData;
}

interface participantion {
  participationId: number;
  postId: number;
  userId: string;
}

interface Participation {
  participationId: number;
  postId: number;
  ParticipationStatus: string;
  ratingStatus: string;
  userId: string;
}

const MyCompletedTrips = (): JSX.Element => {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const today = new Date();
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const [filteredTravelInfos, setFilteredTravelInfos] = useState<TravelPlan[]>(
    [],
  );
  const [participationUserId, setParticipationUserId] = useState<string[]>([]);
  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
  const navigate = useNavigate();

  const fetchCompletedTrips = async () => {
    try {
      const response = await fetchCall<TravelPlan[]>("/api/v1/posts", "get");
      const myParticipationPostIds = await fetchMyParticipation();
      console.log(myParticipationPostIds);
      const myReviews = await fetchMyReview();
      
      const completedTrips = response.data.data.content
        .filter((info: TravelPlan) => {
          const travelEndDate = new Date(info.travelEndDate);

          return (
            myParticipationPostIds.some(
              (participation: { postId: number }) =>
                participation.postId === Number(info.postId),
            )
          );
        })
        .map((info: TravelPlan) => ({
          ...info,
          isRatingAllowed: true, // 기본값 설정
        }));

      // 참여 중인 여행만 필터링
      const filteredTrips: TravelPlan[] = [];
      for (const trip of completedTrips) {
        const participationInfo = myParticipationPostIds.find(
          (participation: { postId: number }) =>
            participation.postId === Number(trip.postId),
        );
        
        const reviewStatus = myReviews.reviews.find(
          (participation: { userId: string | number }) =>
            String(participation.userId) === userId, // 타입 일치
        );
        
        filteredTrips.push({
          ...trip,
          participantsCount: await fetchParticipation(trip.postId),
          ratingStatus: participationInfo?.ratingStatus || "UNKNOWN",
          reviewStatus: reviewStatus ? true : false, // true 또는 false
        });
      }

      setFilteredTravelInfos(filteredTrips);
    } catch (error) {
      console.error("Error fetching participation data:", error);
      alert(error.response?.data?.errors[0]?.errorMessage); // 백엔드가 보낸 메시지 출력
      throw new Error(error.response?.data?.errors[0]?.errorMessage);
    }
  };

  const fetchMyParticipation = async () => {
    try {
      const response = await fetchCall<Participation[]>(
        `/api/v1/posts/participations/by-travelfinished`,
        "get",
      );
        console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching participation data:", error);
      alert(error.response?.data?.errors[0]?.errorMessage); // 백엔드가 보낸 메시지 출력
      throw new Error(error.response?.data?.errors[0]?.errorMessage);
    }
  };

  // 참여한 유저 목록 조회
  const fetchParticipation = async (postId: string): Promise<boolean> => {
    try {
      const response = await fetchCall<participantion[]>(
        `/api/v1/posts/${postId}/participations`,
        "get",
      );
        console.log(response);
      const userIds = response.data.data.map(
        (participation: { userId: string }) => participation.userId,
      );
      
      const otherUserIds = userIds.filter((id: string | null) => id !== userId);

      setParticipationUserId(otherUserIds);

      return userIds.length;
    } catch (error) {
      console.error("Error fetching profile data:", error);
      return false;
    }
  };

  const fetchMyReview = async () => {
    try {
      const response = await fetchCall<Participation[]>(
        `/api/v1/reviews`,
        "get",
      );

      return response.data.data;
    } catch (error) {
      console.error("Error fetching participation data:", error);
    }
  };

  const handleRatingComplete = (postId: string) => {
    setActiveModalIndex(null); // 모달 닫기
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCompletedTrips();
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    };

    fetchData();
  }, []); // 빈 배열로 설정하여 한 번만 실행
  console.log(filteredTravelInfos);
  return (
    <main className="flex flex-col w-[660px] ml-[60px] py-5">
      <div className="border-b border-gray-300 flex justify-between items-center mt-10 pb-1">
        <div className="flex items-center">
          <h2 className="text-3xl mr-2">다녀온 여행들</h2>
          <span className="text-lg">{filteredTravelInfos.length}</span>
        </div>
      </div>
      <div>
        <ul
          className={`mt-10 space-y-6 ${
            filteredTravelInfos.length > 6
              ? "w-[680px] h-[660px] overflow-y-auto"
              : ""
          }`}
        >
          {filteredTravelInfos.map((info, index) => {
            const travelStartDay = new Date(info.travelStartDate).getDay();
            const travelEndDay = new Date(info.travelEndDate).getDay();
            // const travelCountry =
            //   mappingCountry(info.travelCountry, "en") || info.travelCountry;

            return (
              <li key={info.postId} className="list-none">
                <div className="bg-white rounded-lg w-[660px] h-[86px] mx-auto drop-shadow-lg">
                  <div className="flex justify-between">
                    <h3 className="text-xl mt-2.5 ml-2.5">{info.title}</h3>
                  </div>
                  <div className="flex items-center m-2.5 space-x-8 justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-custom-red text-white max-w-[72px] px-[4px] rounded-lg flex items-center justify-center">
                        {/* <span className="truncate">{travelCountry}</span> */}
                      </div>
                      <span className="">
                        참여인원 {info.participantsCount}/{info.maxParticipants}
                      </span>
                      <span className="">
                        {info.travelStartDate}({week[travelStartDay]}) ~{" "}
                        {info.travelEndDate}({week[travelEndDay]})
                      </span>
                    </div>
                    {info.ratingStatus === "평가미완료" &&
                    info.maxParticipants !== 1 ? (
                      <button
                        className={`btn btn-sm rounded-md ${
                          !info.isRatingAllowed
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={!info.isRatingAllowed}
                        onClick={async () => {
                          const isParticipant = await fetchParticipation(
                            info.postId,
                          );
                          if (isParticipant) {
                            setActiveModalIndex(index);
                          }
                        }}
                      >
                        평점 주기
                      </button>
                    ) : (info.ratingStatus === "평가완료" && !info.reviewStatus) || 
                    (info.maxParticipants === 1 && !info.reviewStatus) ? (
                      <button
                        className={`btn btn-sm rounded-md ${
                          info.participationStatus === "JOIN"
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() =>
                          navigate(`/recruitment/${info.postId}/review/write`)
                        }
                      >
                        후기 작성
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {activeModalIndex === index && (
                  <Rating
                    isOpen={activeModalIndex === index}
                    onClose={() => setActiveModalIndex(null)}
                    participants={participationUserId}
                    postId={info.postId}
                    onRatingComplete={() => handleRatingComplete(info.postId)}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
};

export default MyCompletedTrips;
