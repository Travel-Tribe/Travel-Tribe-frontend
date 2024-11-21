import { useState } from "react";
import { mappingCountry } from "../../../Utils/mappingCountry";
import fetchCall from "../../../Utils/apiFetch";

interface VotingProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  travelCountry: string;
  travelStartDate?: string;
  travelEndDate?: string;
  votingStartsId: number;
  postId: number;
}

// interface VotingApproval {
//   approval: boolean;
// }

const Voting: React.FC<VotingProps> = ({
  isOpen,
  onClose,
  title,
  travelCountry,
  travelEndDate,
  travelStartDate,
  votingStartsId,
  postId,
}) => {
  const [selectedOption, setSelectedOption] = useState<true | false | null>(
    null,
  );
  console.log(selectedOption);
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString); // 문자열을 Date 객체로 변환
    const year = date.getFullYear().toString().slice(-2); // 마지막 두 자리 연도
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 (1~12), 두 자리로 맞춤
    const day = String(date.getDate()).padStart(2, "0"); // 일, 두 자리로 맞춤
    return `${year}/${month}/${day}`;
  };

  const travelCountries = mappingCountry(travelCountry, "en") || travelCountry;

  const fetchVoting = async () => {
    try {
      await fetchCall(
        `/api/v1/posts/${postId}/voting-starts/${votingStartsId}/votings`,
        "post",
        { approval: selectedOption },
      );
    } catch (error) {
      console.error("Error submitting votting:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        {/* 닫기 버튼 */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✖
        </button>

        {/* 제목 */}
        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        {/* 여행 정보 */}
        <div className="flex items-center mb-4">
          <div className="bg-custom-red text-white max-w-[72px] px-[4px] rounded-lg flex items-center justify-center">
            <span className="truncate">{travelCountries}</span>
          </div>
          <span className="ml-3 text-gray-600 text-sm">
            일정 ({formatDate(travelStartDate)} ~ {formatDate(travelEndDate)})
          </span>
        </div>

        {/* 투표 옵션 */}
        <div className="flex items-center gap-4 mb-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="vote"
              value="찬성"
              className="radio radio-primary"
              onChange={() => setSelectedOption(true)}
            />
            <span className="ml-2">찬성</span>
          </label>

          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="vote"
              value="반대"
              className="radio radio-primary"
              onChange={() => setSelectedOption(false)}
            />
            <span className="ml-2">반대</span>
          </label>
        </div>

        {/* 투표하기 버튼 */}
        <button className="btn btn-primary w-full" onClick={() => fetchVoting()}>
          투표하기
        </button>
      </div>
    </div>
  );
};

export default Voting;
