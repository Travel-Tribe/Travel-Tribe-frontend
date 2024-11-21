import react, { useState } from "react";

interface VotingProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const Voting: React.FC<VotingProps> = ({ isOpen, onClose, title }) => {
  const [selectedOption, setSelectedOption] = useState<"찬성" | "반대" | null>(
    null,
  );

  if (!isOpen) return null;

  const handleVote = () => {
    if (selectedOption) {
      alert(`"${selectedOption}"에 투표했습니다!`);
    } else {
      alert("투표 항목을 선택해주세요.");
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
        <h2 className="text-lg font-semibold mb-4">여행 모집글 제목</h2>

        {/* 여행 정보 */}
        <div className="flex items-center mb-4">
          <span className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm">
            일본
          </span>
          <span className="ml-3 text-gray-600 text-sm">
            일정 (24/10/23 ~ 24/10/30)
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
              onChange={() => setSelectedOption("찬성")}
            />
            <span className="ml-2">찬성</span>
          </label>

          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="vote"
              value="반대"
              className="radio radio-primary"
              onChange={() => setSelectedOption("반대")}
            />
            <span className="ml-2">반대</span>
          </label>
        </div>

        {/* 투표하기 버튼 */}
        <button className="btn btn-primary w-full" onClick={handleVote}>
          투표하기
        </button>
      </div>
    </div>
  );
};

export default Voting;
