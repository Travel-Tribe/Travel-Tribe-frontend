import React, { useState, useEffect } from "react";
import profileImg from "../../assets/profileImg.webp";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  participants: number;
}

const Rating: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
  participants,
}): JSX.Element | null => {
  const [ratings, setRatings] = useState<number[]>([]);

  useEffect(() => {
    // participants 수에 맞게 ratings 배열 초기화
    setRatings(Array(participants).fill(0.0));
  }, [participants]);

  console.log(participants);

  const handleRatingChange = (index: number, value: number) => {
    const newRatings = [...ratings];
    newRatings[index] = value;
    setRatings(newRatings);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[440px] h-[536px] rounded-lg p-6 shadow-lg overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">평점 주기</h2>
          <button className="text-gray-500" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="space-y-4">
          {ratings.map((rating, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center justify-center">
                <img className="w-12 h-12 rounded-full" src={profileImg} />
                <span className="ml-2.5 w-[200px] truncate">닉네임</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 mr-2.5">평점</span>
                <input
                  type="number"
                  value={rating}
                  min={0}
                  max={5}
                  step={0.5}
                  onChange={e =>
                    handleRatingChange(index, parseFloat(e.target.value))
                  }
                  className="w-16 border border-gray-300 rounded p-1 text-center"
                />
              </div>
            </div>
          ))}
        </div>
        <button
          className="mt-6 btn border border-custom-green bg-white w-full hover:bg-custom-green hover:text-white"
          onClick={() => {
            console.log("평점이 저장되었습니다:", ratings);
            alert("평점이 저장되었습니다.");
            onClose();
          }}
        >
          평점 주기
        </button>
      </div>
    </div>
  );
};

export default Rating;
