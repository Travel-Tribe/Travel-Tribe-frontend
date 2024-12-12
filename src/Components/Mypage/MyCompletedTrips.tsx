import { useState, useEffect } from "react";
import fetchCall from "../../apis/fetchCall";
import Rating from "./Rating";
import { STORAGE_KEYS } from "../../constants/STORAGE_KEYS";
import { useNavigate } from "react-router-dom";
import {TravelPlanType,ApiResponse,ParticipationType} from '../../type/types';

interface TravelPlan extends TravelPlanType {
  participantsCount: number;
  reviewStatus: boolean;
  isRatingAllowed: boolean;
  ratingStatus: string;
}

type TravelPlanResponse = ApiResponse<TravelPlan[]>;

// interface Participantion {
//   participationId: number;
//   postId: number;
//   userId: string;
// }

type ParticipantionResponse = ApiResponse<ParticipationType[]>;

interface Review {
  userId: string;
}

type ReviewResponse = ApiResponse<Review[]>;

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
      const response = await fetchCall<TravelPlanResponse>(
        "/api/v1/posts",
        "get",
      );
      const myParticipationPostIds = await fetchMyParticipation();
      const myReviews = await fetchMyReview();

      const completedTrips = response.data.data
        .filter((info: TravelPlan) => {
          return myParticipationPostIds.some(
            (participation: ParticipationType) =>
              participation.postId === Number(info.postId),
          );
        })
        .map((info: TravelPlan) => ({
          ...info,
          isRatingAllowed: true, // 기본값 설정
        }));

      const filteredTrips: TravelPlan[] = [];
      for (const trip of completedTrips) {
        const participationInfo = myParticipationPostIds.find(
          (participation: ParticipationType) =>
            participation.postId === Number(trip.postId),
        );

        const reviewStatus = myReviews.find(
          (review: Review) => String(review.userId) === userId,
        );

        filteredTrips.push({
          ...trip,
          participantsCount: await fetchParticipation(String(trip.postId)),
          ratingStatus: participationInfo?.RatingStatus || "UNKNOWN",
          reviewStatus: !!reviewStatus,
        });
      }

      setFilteredTravelInfos(filteredTrips);
    } catch (error) {
      console.error("Error fetching participation data:", error);
      alert(error.response?.data?.errors[0]?.errorMessage); // 백엔드가 보낸 메시지 출력
    }
  };

  const fetchMyParticipation = async (): Promise<ParticipationType[]> => {
    try {
      const response = await fetchCall<ParticipantionResponse>(
        `/api/v1/posts/participations/by-travelfinished`,
        "get",
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching participation data:", error);
      alert(error.response?.data?.errors[0]?.errorMessage);
      throw new Error(error.response?.data?.errors[0]?.errorMessage);
    }
  };

  const fetchParticipation = async (postId: string): Promise<number> => {
    try {
      const response = await fetchCall<ParticipantionResponse>(
        `/api/v1/posts/${postId}/participations`,
        "get",
      );

      const userIds = response.data.data.map(
        (participation: ParticipationType) => participation.userId,
      );

      const otherUserIds = userIds.filter((id: string) => id !== userId);

      setParticipationUserId(otherUserIds);

      return userIds.length;
    } catch (error) {
      console.error("Error fetching profile data:", error);
      return 0;
    }
  };

  const fetchMyReview = async (): Promise<Review[]> => {
    try {
      const response = await fetchCall<ReviewResponse>("/api/v1/reviews", "get");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return [];
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
  }, []);

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

            return (
              <li key={info.postId} className="list-none">
                <div className="bg-white rounded-lg w-[660px] h-[86px] mx-auto drop-shadow-lg">
                  <div className="flex justify-between">
                    <h3 className="text-xl mt-2.5 ml-2.5">{info.title}</h3>
                  </div>
                  <div className="flex items-center m-2.5 space-x-8 justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-custom-red text-white max-w-[72px] px-[4px] rounded-lg flex items-center justify-center">
                        {/* 국가 정보를 추가하려면 이곳 사용 */}
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
                            String(info.postId),
                          );
                          if (isParticipant) {
                            setActiveModalIndex(index);
                          }
                        }}
                      >
                        평점 주기
                      </button>
                    ) : (info.ratingStatus === "평가완료" &&
                        !info.reviewStatus) ||
                      (info.maxParticipants === 1 && !info.reviewStatus) ? (
                      <button
                        className="btn btn-sm rounded-md"
                        onClick={() =>
                          navigate(`/recruitment/${info.postId}/review/write`)
                        }
                      >
                        후기 작성
                      </button>
                    ) : null}
                  </div>
                </div>
                {activeModalIndex === index && (
                  <Rating
                    isOpen={activeModalIndex === index}
                    onClose={() => setActiveModalIndex(null)}
                    participants={participationUserId}
                    postId={String(info.postId)}
                    onRatingComplete={() => handleRatingComplete(String(info.postId))}
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
