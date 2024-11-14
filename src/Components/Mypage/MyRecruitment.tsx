import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
}

interface TravelPlanResponse {
  data: {
    content: TravelPlan;
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
        if (userId) {
          const response = await fetchCall<TravelPlanResponse>(
            `/api/v1/posts`,
            "get",
          );
          const today = new Date();

          // travelStartDate가 현재보다 미래인 여행 계획만 필터링합니다.

          const filteredPlans = response.data.content.filter((plan: { travelStartDate: string | number | Date; }) => {
            const travelStartDate = new Date(plan.travelStartDate);
            return travelStartDate >= today;
          });

          const plansWithParticipants = await Promise.all(
            filteredPlans.map(async (plan: { postId: any }) => {
              const participants = await fetchCall<participantion[]>(
                `/api/v1/posts/${plan.postId}/participations`,
                "get",
              );
              return {
                ...plan,
                participantsCount: participants.data.length, // 참여 인원 수 추가
              };
            }),
          );
          setRecruitDataList(plansWithParticipants);
        } else {
          console.error("USER_ID가 로컬 스토리지에 없습니다.");
        }
      } catch (error) {
        console.error("Error fetching recruitment data:", error);
      }
    };
    fetchMyRecruitData();
  }, [userId]);
  

  
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
            className="btn btn-sm w-[100px] !h-[32px] bg-custom-teal-green  rounded-lg mr-5 hover:bg-custom-teal-green text-white"
            onClick={clickRecruitForm}
          >
            모집글 작성
          </button>
        </div>
        <ul className="mt-5 space-y-6">
          {recruitDataList.map(plan => {
            const today: any = new Date();
            const deadlineDate: any = new Date(plan.deadline);
            const remainingDays = Math.ceil(
              (deadlineDate.getTime() - today.getTime()) /
                (1000 * 60 * 60 * 24),
            );

            const startDayOfWeek =
              week[new Date(plan.travelStartDate).getDay()];
            const endDayOfWeek = week[new Date(plan.travelEndDate).getDay()];
            // 매핑된 국가 이름을 travelCountry에 할당
            const travelCountry =
              mappingCountry(plan.travelCountry, "en") || plan.travelCountry;

            return (
              <li key={plan.postId} className="list-none">
                <Link to={`/recruitment/${plan.postId}`}>
                  <div className="bg-white rounded-lg w-[660px] h-[86px] mx-auto drop-shadow-lg">
                    <div className="flex justify-between">
                      <h3 className=" text-xl mt-2.5 ml-2.5">{plan.title}</h3>
                      <span className=" text-base mt-2.5 mr-2.5">
                        마감 {remainingDays}일 전
                      </span>
                    </div>
                    <div className="flex justify-between ">
                      <div className="flex items-center m-2.5 space-x-8">
                        <div className=" bg-custom-red  max-w-[72px] px-[4px] rounded-lg flex items-center justify-center">
                          <span className="truncate">{travelCountry}</span>
                        </div>
                        <span className="">
                          참여인원 {plan.participantsCount}/{plan.maxParticipants}
                        </span>
                        <span className="">
                          {plan.travelStartDate}({startDayOfWeek}) ~{" "}
                          {plan.travelEndDate}({endDayOfWeek})
                        </span>
                      </div>
                      <div className="flex space-x-2.5 items-center m-2.5">
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
                        <button className="btn btn-xs bg-red-500 text-white rounded-md text-center hover:bg-custom-pink-hover">
                          취소하기
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default MyRecruitment;
