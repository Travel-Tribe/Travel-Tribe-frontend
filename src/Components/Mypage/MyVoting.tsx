import { useEffect, useState } from "react";
import fetchCall from "../../Utils/apiFetch";
import { STORAGE_KEYS } from "../../Constants/STORAGE_KEYS";
import { mappingCountry } from "../../Utils/mappingCountry";
import Voting from "./SideComponents/Voting";

interface TravelInfo {
  postId: number;
  reviewId: string;
  continent: string;
  travelCountry: string;
  region: string;
  title: string;
  contents: string;
  fileAddress: string | null;
  travelStartDate?: string;
  travelEndDate?: string;
}

interface ReviewResponse {
  data: {
    reviews: TravelInfo[];
  };
}

interface TravelPlanResponse {
  data: {
    data: {
      content: TravelPlan;
    };
  };
}

interface TravelDatesResponse {
  data: Array<{
    travelStartDate: string;
    travelEndDate: string;
  }>;
}

const MyVoting = (): JSX.Element => {
  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const [travelInfos, setTravelInfos] = useState<TravelInfo[]>([]);
  const [openVotingId, setOpenVotingId] = useState<number | null>(null); // 현재 열려 있는 Voting ID

  const fetchParticipation = async () => {
    try {
      const participationResponse = await fetchCall(
        `api/v1/posts/participations`,
        "get",
      );
      console.log(participationResponse);
    } catch (error) {}
  };

  // useEffect(() => {
  //   const fetchVoting = async () => {
  //     try {
  //       const response = await fetchCall(`api/v1/posts/${postId}/voting-starts`,'get')
  //     } catch (error) {

  //     }
  //   }
  // })

  const fetchVoting = async (postId: number) => {
    try {
      const response = await fetchCall(
        `/api/v1/posts/${postId}/voting-starts`,
        "get",
      );
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 전체 모집글 조회
        const { data: allPostsResponse } = await fetchCall<TravelPlanResponse>(
          `/api/v1/posts`,
          "get",
        );
        const allPosts = allPostsResponse.data.content;

        // 참여 데이터 조회
        const participationResponse = await fetchCall(
          "/api/v1/posts/participations",
          "get",
        );

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // 참여 중인 postId 리스트 추출
        const participatingPostIds = participationResponse.data.data.map(
          (item: { postId: number }) => item.postId,
        );

        const filteredPlans = allPosts.filter(plan => {
          const travelStartDate = new Date(plan.travelStartDate);

          // 날짜 유효성 검증 및 필터링
          if (isNaN(travelStartDate.getTime())) {
            console.warn("Invalid travelStartDate:", plan.travelStartDate);
            return false;
          }
          // 조건: travelStartDate가 오늘 이후 && userId가 일치 && 참여 중인 postId에 포함
          return participatingPostIds.includes(plan.postId);
        });
        setTravelInfos(filteredPlans);
        // 최종 필터링된 모집글 설정
        // setFilteredPlans(plansWithParticipants);
        participatingPostIds.forEach((postId: number) => {
          // fetchVoting(postId); // 각 postId로 fetchVoting 호출
        });
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };
    const fetchVoting = async (postId: number) => {
      try {
        const response = await fetchCall(
          `/api/v1/posts/${postId}/voting-starts`,
          "get",
        );
        return response.data;
      } catch (error) {
        console.error("Fetching voting data failed:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleOpenVoting = (postId: number) => {
    setOpenVotingId(postId);
  };

  const handleCloseVoting = () => {
    setOpenVotingId(null);
  };

  return (
    <main className="flex flex-col w-[660px] ml-[60px] py-5">
      <header className="border-b border-gray-300 flex items-center mt-10 pb-1 space-x-2.5">
        <h2 className="text-3xl">투표 확인</h2>
        <span className="text-lg">{travelInfos.length}</span>
      </header>
      <ul
        className={`mt-10 space-y-6 ${travelInfos.length > 5 ? "w-[680px] h-[660px] overflow-y-auto" : ""}`}
      >
        {travelInfos.map(info => {
          const startDay = info.travelStartDate
            ? week[new Date(info.travelStartDate).getDay()]
            : "";
          const endDay = info.travelEndDate
            ? week[new Date(info.travelEndDate).getDay()]
            : "";

          const travelCountry =
            mappingCountry(info.travelCountry, "en") || info.travelCountry;

          return (
            <li key={info.postId} className="list-none">
              <div
                className="bg-white rounded-lg w-[660px] h-[86px] mx-auto drop-shadow-lg cursor-pointer"
                onClick={async () => {
                  const isVoting = await fetchVoting(Number(info.postId));
                  console.log(isVoting);
                  // if()
                  handleOpenVoting(info.postId);
                }}
              >
                <h3 className="text-xl pt-2.5 pl-2.5">{info.title}</h3>
                <div className="flex items-center m-2.5 space-x-8 justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-custom-red text-white max-w-[72px] px-[4px] rounded-lg flex items-center justify-center">
                      <span className="truncate">{travelCountry}</span>
                    </div>
                    <span>
                      {info.travelStartDate}({startDay}) ~ {info.travelEndDate}(
                      {endDay})
                    </span>
                  </div>
                </div>
              </div>
              {/* <Voting isOpen={true} onClose={handleCloseVoting} title={info.title} /> */}
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default MyVoting;
