import fetchCall from "../../Utils/apiFetch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mappingCountry } from "../../Utils/mappingCountry";
import { STORAGE_KEYS } from "../../Constants/STORAGE_KEYS";

interface TravelPlan {
  postId: number;
  id: string;
  title: string;
  travelStartDate: string;
  travelEndDate: string;
  maxParticipants: number;
  travelCountry: string;
  continent: string;
  deadline: string;
  participantsCount: number;
  userId: string;
}

interface TravelPlanResponse {
  data: {
    data: {
      content: TravelPlan[];
    };
  };
}

interface Participation {
  participationId: number;
  postId: number;
  ParticipationStatus: string;
}

const MyTravelJoin = () => {
  const navigate = useNavigate();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);

  const [filteredPlans, setFilteredPlans] = useState<TravelPlan[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) {
          console.error("USER_ID가 로컬 스토리지에 없습니다.");
          return;
        }

        // 전체 모집글 조회
        const { data: allPostsResponse } = await fetchCall<TravelPlanResponse>(
          `/api/v1/posts`,
          "get",
        );
        const allPosts = allPostsResponse.data.content;

        // 참여 데이터 조회
        const participationResponse = await fetchCall<Participation[]>(
          "/api/v1/posts/participations",
          "get",
        );

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // 참여 중인 postId 리스트 추출
        const participatingPostIds = participationResponse.data.data.map(
          (item: { postId: number }) => item.postId,
        );
        console.log(participatingPostIds);
        // 전체 모집글 중 조건에 맞는 글 필터링
        const filteredPlans = allPosts.filter(plan => {
          const travelStartDate = new Date(plan.travelStartDate);

          // 날짜 유효성 검증 및 필터링
          if (isNaN(travelStartDate.getTime())) {
            console.warn("Invalid travelStartDate:", plan.travelStartDate);
            return false;
          }

          // 조건: travelStartDate가 오늘 이후 && userId가 일치 && 참여 중인 postId에 포함
          return (
            travelStartDate >= today &&
            participatingPostIds.includes(plan.postId) &&
            String(plan.userId) !== userId
          );
        });

        console.log(filteredPlans);
        const plansWithParticipants = await Promise.all(
          filteredPlans.map(async (plan: TravelPlan) => {
            try {
              // 모집글별 참여자 데이터 조회
              const participants = await fetchCall<Participation[]>(
                `/api/v1/posts/${plan.postId}/participations`,
                "get",
              );

              return {
                ...plan,
                participantsCount: participants.data.data.length, // 참여 인원 수 추가
              };
            } catch (error) {
              console.error(
                `Error fetching participants for postId ${plan.postId}:`,
                error,
              );
              return {
                ...plan,
                participantsCount: 0, // 에러 발생 시 기본값 설정
              };
            }
          }),
        );

        // 최종 필터링된 모집글 설정
        setFilteredPlans(plansWithParticipants);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [userId]);

  const deleteParticipation = async (postId: number) => {
    try {
      const response = await fetchCall(
        `api/v1/posts/${postId}/participations`,
        "delete",
      );
      setFilteredPlans(prev => prev.filter(plan => plan.postId !== postId));
      console.log(response);
    } catch (error) {
      console.error("참여 취소 중 오류 발생:", error);
    }
  };

  return (
    <>
      <section>
        <div className="flex justify-between items-center mt-10 pb-1">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold mr-2">신청</h2>
            <span className="text-lg">{filteredPlans.length}</span>
          </div>
        </div>

        <ul className="mt-4 space-y-6">
          {filteredPlans.map((plan, index) => {
            const today: any = new Date();
            const deadlineDate: any = new Date(plan.deadline);
            const diffTime = deadlineDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            const travelStartDay = new Date(plan.travelStartDate).getDay();
            const travelEndDay = new Date(plan.travelEndDate).getDay();

            const travelCountry =
              mappingCountry(plan.travelCountry, "en") || plan.travelCountry;
            return (
              <li key={index} className="list-none">
                <div
                  className="bg-white rounded-lg w-[660px] h-[86px] mx-auto drop-shadow-lg cursor-pointer"
                  onClick={() => navigate(`/recruitment/${plan.postId}`)}
                >
                  <div className="flex justify-between mb-2">
                    <h3 className=" text-xl mt-2.5 ml-2.5">{plan.title}</h3>
                    <div className="flex items-center">
                      <span className=" text-base ml-2.5 mt-2.5 mr-2.5">
                        마감 {diffDays}일전
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between m-2.5">
                    <div className="flex items-center space-x-3">
                      <div className="bg-custom-red text-white max-w-[72px] px-[4px] rounded-lg flex items-center">
                        <span className="text-base truncate">
                          {travelCountry}
                        </span>
                      </div>
                      <span className="text-base">
                        참여인원 {plan.participantsCount}/{plan.maxParticipants}
                      </span>
                      <span className="text-base">
                        {plan.travelStartDate}({week[travelStartDay]}) ~{" "}
                        {plan.travelEndDate}({week[travelEndDay]})
                      </span>
                    </div>
                    <div className="flex space-x-2.5 items-center">
                      {plan.participantsCount !== plan.maxParticipants ? (
                        <div className="bg-white text-green-500  w-[60px] h-6 rounded-lg text-center text-xs flex items-center justify-center">
                          모집중
                        </div>
                      ) : (
                        // <div className="bg-white border border-red-500 text-red-500 w-[62px] h-6 rounded-lg text-center text-xs flex items-center justify-center">
                        <div className="bg-white text-red-500 w-[62px] h-6 rounded-lg text-center text-xs flex items-center justify-center">
                          모집 완료
                        </div>
                      )}
                      <button
                        className="btn btn-xs btn-error text-white rounded-md text-center "
                        onClick={e => {
                          e.stopPropagation();
                          deleteParticipation(plan.postId);
                        }}
                      >
                        취소하기
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};
export default MyTravelJoin;
