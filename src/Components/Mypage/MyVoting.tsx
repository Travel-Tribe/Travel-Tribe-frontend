import { useEffect, useState } from "react";
import fetchCall from "../../apis/fetchCall";
import { STORAGE_KEYS } from "../../Constants/STORAGE_KEYS";
import { mappingCountry } from "../../Utils/mappingCountry";
import Voting from "./SideComponents/Voting";
import {
  TravelPlanType,
  ParticipationType,
  ApiResponse,
} from "../../type/types";

interface ExtendedTravelPlanType extends TravelPlanType {
  votingStartsId: number;
  votingStatus: string;
}

interface TravelPlanResponse extends ApiResponse<TravelPlanType[]> {}
interface ParticipationResponse
  extends ApiResponse<ParticipationType[]> {}

interface VotingResponse
  extends ApiResponse<{
    postId: number;
    votingStartsId: number;
    votingStatus: string;
  }> {}

const MyVoting = (): JSX.Element => {
  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const [travelInfos, setTravelInfos] = useState<ExtendedTravelPlanType[]>([]);
  const [openVotingId, setOpenVotingId] = useState<number | null>(null); // 현재 열려 있는 Voting ID

  const fetchVoting = async (postId: number): Promise<any> => {
    try {
      const response = await fetchCall<VotingResponse>(
        `/api/v1/posts/${postId}/voting-starts`,
        "get",
      );

      return response?.data;
    } catch (error) {
      console.error("Fetching voting data failed:", error);
      alert("투표가 시작되지 않았습니다.");
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Step 1: 전체 모집글 조회
        const  allPosts  = await fetchCall<TravelPlanResponse>(
          `/api/v1/posts`,
          "get",
        );

        // Step 2: 참여 데이터 조회
        const participationResponse = await fetchCall<ParticipationResponse>(
          "/api/v1/posts/participations/by-join-joinready",
          "get",
        );

        // 참여 중인 postId 리스트 추출
        const participatingPostIds = participationResponse.data.data.map(
          (item: { postId: number }) => item.postId,
        );

        // Step 3: 내가 참여한 post만 필터링
        const participatingPosts = allPosts.filter((post: { postId: number }) =>
          participatingPostIds.includes(post.postId),
        );

        const votingPosts = participatingPosts.filter(
          (post: { status: string }) => post.status === "투표중",
        );

        // Step 4: 투표가 생성된 post만 필터링
        const validPosts: ExtendedTravelPlanType[] = [];
        for (const post of votingPosts) {
          const votingData = await fetchVoting(post.postId);
          if (votingData?.data.votingStartsId) {
            validPosts.push({
              ...post,
              votingStatus: votingData?.data.votingStatus,
              votingStartsId: votingData?.data.votingStartsId,
            });
          }
        }

        // Step 5: 날짜 조건으로 필터링
        const filteredPlans = validPosts.filter(plan => {
          const travelStartDate = new Date(plan.travelStartDate);

          if (isNaN(travelStartDate.getTime())) {
            console.warn("Invalid travelStartDate:", plan.travelStartDate);
            return false;
          }

          // 조건: travelStartDate가 오늘 이후
          return travelStartDate >= today;
        });

        // 최종 결과 설정
        setTravelInfos(filteredPlans);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
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
        className={`mt-10 space-y-6 ${
          travelInfos.length > 5 ? "w-[680px] h-[660px] overflow-y-auto" : ""
        }`}
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
                onClick={() => {
                  if (info.votingStatus === "STARTING") {
                    handleOpenVoting(info.postId ?? 0); // 현재 투표 ID 설정
                  } else {
                    alert("투표를 시작할 수 없습니다."); // 실패 시 메시지 표시
                  }
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
              {/* 조건부 렌더링: openVotingId가 현재 postId와 일치하는 경우에만 Voting 컴포넌트 렌더링 */}
              {openVotingId === info.postId && (
                <Voting
                  isOpen={openVotingId === info.postId}
                  onClose={handleCloseVoting}
                  title={info.title}
                  travelCountry={info.travelCountry}
                  travelStartDate={info.travelStartDate}
                  travelEndDate={info.travelEndDate}
                  votingStartsId={info.votingStartsId}
                  postId={info.postId}
                />
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default MyVoting;
