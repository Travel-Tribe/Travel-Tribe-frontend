import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchCall from "../../Utils/apiFetch";

interface TravelPlan {
  id: string;
  title: string;
  travelStartDate: string;
  travelEndDate: string;
  maxParticipants: number;
  travelCountry: string;
  continent: string;
  deadline: string;
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
          const response = await fetchCall<TravelPlan[]>(
            `/api/v1/posts/${userId}`,
            "get",
          );
          setRecruitDataList(response.data);
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
      <div className="border-b border-gray-300 flex justify-between items-end mt-10 pb-1">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold mr-2">여행 모집</h2>
          <span className="text-lg">{recruitDataList.length}</span>
        </div>
        <button
          className="btn btn-sm w-[100px] !h-[32px] bg-custom-green text-white rounded-lg mr-5 hover:bg-custom-green"
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
            (deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
          );

          const startDayOfWeek = week[new Date(plan.travelStartDate).getDay()];
          const endDayOfWeek = week[new Date(plan.travelEndDate).getDay()];

          return (
            <li key={plan.id} className="list-none">
              <div className="w-[600px] h-[86px] bg-custom-green rounded-lg">
                <div className="flex justify-between">
                  <h3 className="text-white text-xl mt-2.5 ml-2.5">
                    {plan.title}
                  </h3>
                  <span className="text-white text-base mt-2.5 mr-2.5">
                    마감 {remainingDays}일 전
                  </span>
                </div>
                <div className="flex items-center m-2.5 space-x-8">
                  <div className=" bg-custom-red text-white max-w-[72px] px-[4px] rounded-lg flex items-center justify-center">
                    <span className="truncate">{plan.travelCountry}</span>
                  </div>
                  <span className="text-white">
                    참여인원 0/{plan.maxParticipants}
                  </span>
                  <span className="text-white">
                    {plan.travelStartDate}({startDayOfWeek}) ~{" "}
                    {plan.travelEndDate}({endDayOfWeek})
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MyRecruitment;
