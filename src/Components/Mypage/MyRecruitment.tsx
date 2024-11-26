import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchCall from "../../Utils/apiFetch";
import { mappingCountry } from "../../Utils/mappingCountry";

interface TravelPlan {
  postId: string;
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
  status: string;
}

interface TravelPlanResponse {
  data: {
    data: {
      content: TravelPlan;
    };
  };
}

interface participantion {
  participationId: number;
  postId: number;
  userId: string;
}

const MyRecruitment = (): JSX.Element => {
  const navigate = useNavigate();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const userId = localStorage.getItem("USER_ID");

  const [recruitDataList, setRecruitDataList] = useState<TravelPlan[]>([]);

  useEffect(() => {
    const fetchMyRecruitData = async () => {
      try {
        if (!userId) {
          console.error("USER_ID가 로컬 스토리지에 없습니다.");
          return;
        }

        const response = await fetchCall<TravelPlanResponse>(
          `/api/v1/posts`,
          "get",
        );
        const participationResponse = await fetchCall<participantion[]>(
          "/api/v1/posts/participations/by-join-joinready",
          "get",
        );
        
        const today = new Date();
        today.setHours(0, 0, 0, 0); // 현재 날짜의 시간 부분을 초기화

        const participatingPostIds = participationResponse.data.data.map(
          (item: { postId: number }) => item.postId,
        );
        // travelStartDate가 현재보다 미래이고, userId가 동일한 여행 계획만 필터링
        const filteredPlans = response.data.data.content.filter(
          (plan: TravelPlan) => {
            const travelStartDate = new Date(plan.travelStartDate);

            // 날짜 유효성 검증 및 필터링
            if (isNaN(travelStartDate.getTime())) {
              console.warn("Invalid travelStartDate:", plan.travelStartDate);
              return false;
            }

            return (
              travelStartDate >= today &&
              participatingPostIds.includes(plan.postId) &&
              String(plan.userId) === String(userId)
            );
          },
        );

        // 필터링된 계획에 참여자 수 추가
        const plansWithParticipants = await Promise.all(
          filteredPlans.map(async (plan: TravelPlan) => {
            try {
              const participants = await fetchCall<participantion[]>(
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

        // 최종 데이터를 상태에 저장
        setRecruitDataList(plansWithParticipants);
      } catch (error) {
        console.error("Error fetching recruitment data:", error);
      }
    };

    fetchMyRecruitData();
  }, [userId]);

  const voting = async (postId: string) => {
    try {
      await fetchCall(`/api/v1/posts/${postId}/voting-starts`, "post");
      alert("투표 올림");
    } catch (error) {
      console.error(`Error voting`, error);
    }
  };

  const clickRecruitForm = () => {
    navigate("/recruitment/write");
  };

  return (
    <>
      <section>
        <div className="border-b border-gray-300 flex justify-between items-end mt-10 pb-1">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold mr-2">여행 모집</h2>
            <span className="text-lg">{recruitDataList.length}</span>
          </div>
          <button
            className="btn btn-sm w-[100px] !h-[32px] btn-success rounded-lg mr-5 text-white"
            onClick={clickRecruitForm}
          >
            모집글 작성
          </button>
        </div>
        <ul className="mt-5 space-y-6">
          {recruitDataList.map(plan => {
            const today: any = new Date();
            console.log(today);
            const deadlineDate: any = new Date(plan.deadline);
            console.log(deadlineDate);
            const deadlineWith21Hours = new Date(
              deadlineDate.getTime() + 21 * 60 * 60 * 1000,
            ); // 마감 시간 + 21시간 (마감 날짜 기준 다음날 00시)
            const remainingDays = Math.ceil(
              (deadlineDate.getTime() - today.getTime()) /
                (1000 * 60 * 60 * 24),
            );
            console.log(remainingDays);
            const startDayOfWeek =
              week[new Date(plan.travelStartDate).getDay()];
            const endDayOfWeek = week[new Date(plan.travelEndDate).getDay()];
            // 매핑된 국가 이름을 travelCountry에 할당
            const travelCountry =
              mappingCountry(plan.travelCountry, "en") || plan.travelCountry;

            return (
              <li key={plan.postId} className="list-none">
                <div
                  className="bg-white rounded-lg w-[660px] h-[86px] mx-auto drop-shadow-lg cursor-pointer"
                  onClick={() => navigate(`/recruitment/${plan.postId}`)}
                >
                  <div className="flex justify-between">
                    <h3 className="text-xl mt-2.5 ml-2.5">{plan.title}</h3>
                    {today < deadlineWith21Hours ? (
                      <span className="text-base mt-2.5 mr-2.5">
                        마감 {remainingDays}일 전
                      </span>
                    ) : (
                      <span className="text-base mt-2.5 mr-2.5">
                        모집 마감 완료
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between ">
                    <div className="flex items-center m-2.5 space-x-8">
                      <div className="bg-custom-red text-white max-w-[72px] px-[4px] rounded-lg flex items-center justify-center">
                        <span className="truncate">{travelCountry}</span>
                      </div>
                      <span>
                        참여인원 {plan.participantsCount}/{plan.maxParticipants}
                      </span>
                      <span>
                        {plan.travelStartDate}({startDayOfWeek}) ~{" "}
                        {plan.travelEndDate}({endDayOfWeek})
                      </span>
                    </div>
                    <div className="flex space-x-2.5 items-center m-2.5">
                      {plan.status === "모집중" ? (
                        <div className="bg-white text-green-500 w-[60px] h-6 rounded-lg text-center text-xs flex items-center justify-center">
                          모집중
                        </div>
                      ) : plan.status === "모집완료" ? (
                        <div className="bg-white text-red-500 w-[62px] h-6 rounded-lg text-center text-xs flex items-center justify-center">
                          모집완료
                        </div>
                      ) : plan.status === "투표중" ? (
                        <div className="bg-white text-red-500 w-[62px] h-6 rounded-lg text-center text-xs flex items-center justify-center">
                          투표중
                        </div>
                      ) : (
                        ""
                      )}
                      {plan.status === "모집완료" ? (
                        <button
                          className="btn btn-xs btn-error text-white rounded-md text-center  z-10"
                          onClick={e => {
                            e.stopPropagation();
                            // fetchDeleteParticipation(plan.postId);
                            voting(plan.postId);
                          }}
                        >
                          취소하기
                        </button>
                      ) : (
                        ""
                      )}
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

export default MyRecruitment;
