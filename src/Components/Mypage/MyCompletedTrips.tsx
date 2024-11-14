import { useState, useEffect } from "react";
import fetchCall from "../../Utils/apiFetch";
import Rating from "./Rating";
import { Participations } from "../../mocks/mockData";
import { STORAGE_KEYS } from "../../Constants/STORAGE_KEYS";

interface TravelPlan {
  postId: string;
  title: string;
  travelStartDate: string;
  travelEndDate: string;
  maxParticipants: number;
  travelCountry: string;
  deadline: string;
  participation: Participations[];
}

interface participantion {
  participationId: number;
  postId: number;
  userId: string;
}

const MyCompletedTrips = (): JSX.Element => {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const today = new Date();
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const [travelInfos, setTravelInfos] = useState<TravelPlan[]>([]);
  const [filteredTravelInfos, setFilteredTravelInfos] = useState<TravelPlan[]>(
    [],
  );
  const [participationUserId, setParticipationUserId] = useState<string[]>([]);

  // const completedTrips = travelInfos.filter((info: TravelPlan) => {
  //   const travelEndDate = new Date(info.travelEndDate);
  //   return travelEndDate < today;
  // });
  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);

  const fetchCompletedTrips = async () => {
    try {
      const response = await fetchCall<{ post: TravelPlan[] }>(
        "/api/v1/posts",
        "get",
      );
      const completedTrips = response.data.content.filter(
        (info: TravelPlan) => {
          const travelEndDate = new Date(info.travelEndDate);
          return travelEndDate < today;
        },
      );

      const tripsWithUserParticipation = await Promise.all(
        completedTrips.map(async (info: { postId: string }) => {
          const isParticipant = await fetchParticipation(info.postId);
          return isParticipant ? info : null;
        }),
      );

      // 참여중인 여행만 필터링하여 상태에 저장
      setFilteredTravelInfos(
        tripsWithUserParticipation.filter(Boolean) as TravelPlan[],
      );
    } catch (error) {
      console.error("Error fetching participation data:", error);
    }
  };

  const fetchParticipation = async (postId: string) => {
    try {
      const response = await fetchCall<participantion[]>(
        `/api/v1/posts/${postId}/participations`,
        "get",
      );
      const userIds = response.data.map(
        (participation: { userId: string }) => participation.userId,
      );
      console.log(userIds);
      if (userIds.includes(userId || "")) {
        setParticipationUserId(userIds);
        return true;
      } else {
        return false;
      }
      setParticipationUserId(userIds);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchCompletedTrips();
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
                        <span className="truncate">{info.travelCountry}</span>
                      </div>
                      <span className="">
                        참여인원 {info.maxParticipants}/{info.maxParticipants}
                      </span>
                      <span className="">
                        {info.travelStartDate}({week[travelStartDay]}) ~{" "}
                        {info.travelEndDate}({week[travelEndDay]})
                      </span>
                    </div>
                    <button
                      className="btn btn-sm rounded-md"
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
                  </div>
                </div>
                {activeModalIndex === index && (
                  <Rating
                    isOpen={activeModalIndex === index}
                    onClose={() => setActiveModalIndex(null)}
                    participants={participationUserId}
                    postId={info.postId}
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
