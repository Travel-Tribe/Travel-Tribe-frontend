import fetchCall from "../../Utils/apiFetch";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

const MypageTest = () => {
  const navigate = useNavigate();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const userId = localStorage.getItem("USER_ID");

  const [participationDataList, setParticipationDataList] = useState<TravelPlan[]>([]);

  useEffect(() => {
    const fetchMyRecruitData = async () => {
      try {
        if (!userId) {
          console.error("USER_ID가 로컬 스토리지에 없습니다.");
          return;
        }

        const response = await fetchCall<TravelPlanResponse>(`/api/v1/posts/participations`, "get");
        console.log(response);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // 현재 날짜의 시간 부분을 초기화

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
              travelStartDate >= today && String(plan.userId) === String(userId)
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
                participantsCount: participants.data.length, // 참여 인원 수 추가
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
        setParticipationDataList(plansWithParticipants);
      } catch (error) {
        console.error("Error fetching recruitment data:", error);
      }
    };

    fetchMyRecruitData();
  }, [userId]);

  return (
    <>
      <section>
        <div className="flex justify-between items-center mt-10 pb-1">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold mr-2">신청</h2>
            <span className="text-lg">4</span>
          </div>
        </div>

        <ul className="mt-4 space-y-6">
          {participationDataList.map((info, index) => {
            const today: any = new Date();
            const deadlineDate: any = new Date(info.deadline);
            const diffTime = deadlineDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            const travelStartDay = new Date(info.travelStartDate).getDay();
            const travelEndDay = new Date(info.travelEndDate).getDay();
            return (
              <li key={index} className="list-none">
                <div className="bg-white rounded-lg w-[660px] h-[86px] mx-auto drop-shadow-lg">
                  <div className="flex justify-between mb-2">
                    <h3 className=" text-xl mt-2.5 ml-2.5">{info.title}</h3>
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
                          {info.travelCountry}
                        </span>
                      </div>
                      <span className="text-base">
                        참여인원 {info.participantsCount}/{info.maxParticipants}
                      </span>
                      <span className="text-base">
                        {info.travelStartDate}({week[travelStartDay]}) ~{" "}
                        {info.travelEndDate}({week[travelEndDay]})
                      </span>
                    </div>
                    <div className="flex space-x-2.5 items-center">
                      {info.participantsCount !== info.maxParticipants ? (
                        <div className="bg-white text-green-500  w-[60px] h-6 rounded-lg text-center text-xs flex items-center justify-center">
                          모집중
                        </div>
                      ) : (
                        // <div className="bg-white border border-red-500 text-red-500 w-[62px] h-6 rounded-lg text-center text-xs flex items-center justify-center">
                        <div className="bg-white text-red-500 w-[62px] h-6 rounded-lg text-center text-xs flex items-center justify-center">
                          모집 완료
                        </div>
                      )}
                      <button className="btn btn-xs bg-red-500 text-white rounded-md text-center hover:bg-custom-pink-hover">
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
export default MypageTest;
