import React, { useState, useEffect } from "react";
import fetchCall from "../../Utils/apiFetch";
import { useProfileStore } from "../../store/profileStore";
import profileImg from "../../assets/profileImg.webp";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  participants: string[];
  postId: string;
}

const Rating: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
  participants,
  postId,
}): JSX.Element | null => {
  const [ratings, setRatings] = useState<number[]>([]);
  const { userProfiles, fetchParticipantsProfiles } = useProfileStore();

  const handleRatingSubmit = async () => {
    try {
      // 각 userId와 평점을 서버로 전송
      await Promise.all(
        participants.map((userId, index) => {
          const rating = ratings[index];
          return fetchCall(`api/v1/posts/${postId}/rating`, "post", {
            receiverUserId: userId,
            score: rating,
          });
        }),
      );
      console.log("평점이 서버에 전송되었습니다:", ratings);
      alert("평점이 저장되었습니다.");
      onClose();
    } catch (error) {
      console.error("Error submitting ratings:", error);
    }
  };

  useEffect(() => {
    setRatings(Array(participants.length).fill(0.0));
    fetchParticipantsProfiles(participants);
  }, [participants]);

  const handleRatingChange = (index: number, value: number) => {
    const newRatings = [...ratings];
    newRatings[index] = value;
    setRatings(newRatings);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white w-[540px] h-[536px] rounded-lg p-6 shadow-lg overflow-y-auto z-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">평점 주기</h2>
          <button className="text-gray-500" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="space-y-4">
          {ratings.map((rating, index) => {
            const userId = participants[index];
            const profile = userProfiles[userId] || {
              nickname: "Unknown",
              fileAddress: profileImg,
            };
            const profileImage = profile.fileAddress || profileImg;
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center justify-center">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={profileImage}
                    alt="User profile"
                  />
                  <span className="ml-5 w-[200px] truncate">
                    {profile.nickname}
                  </span>
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
            );
          })}
        </div>
        <button
          className="mt-6 btn border border-custom-green bg-white w-full hover:bg-custom-green hover:text-white"
          onClick={() => {
            console.log("평점이 저장되었습니다:", ratings);
            alert("평점이 저장되었습니다.");
            onClose();
            handleRatingSubmit();
          }}
        >
          평점 주기
        </button>
      </div>
    </div>
  );
};

export default Rating;
