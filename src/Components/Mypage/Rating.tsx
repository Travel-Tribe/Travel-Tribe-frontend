import React, { useState, useEffect } from "react";
import fetchCall from "../../Utils/apiFetch";
import { useProfileStore } from "../../store/profileStore";
import profileImg from "../../assets/profile-img.webp";
import { FaStar, FaRegStarHalf } from "react-icons/fa";
import { useParticipantsProfiles } from "../../Hooks/userQueries";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  participants: string[];
  postId: string;
  onRatingComplete: () => void;
}

const Rating: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
  participants,
  postId,
  onRatingComplete,
}): JSX.Element | null => {
  const [ratings, setRatings] = useState<number[]>([]);
  const { data: userProfiles, isLoading } =
    useParticipantsProfiles(participants);
  console.log(userProfiles);
  const handleRatingSubmit = async () => {
    try {
      // 각 userId와 평점을 서버로 전송
      await Promise.all(
        participants.map((userId, index) => {
          const rating = ratings[index];
          console.log("postId", postId);
          return fetchCall(`api/v1/posts/${postId}/rating`, "post", {
            receiverId: Number(userId),
            score: rating,
          });
        }),
      );
      console.log("평점이 서버에 전송되었습니다:", ratings);
      alert("평점이 저장되었습니다.");
      onClose();
      onRatingComplete();
    } catch (error) {
      console.error("Error submitting ratings:", error);
    }
  };

  useEffect(() => {
    setRatings(Array(participants.length).fill(0.0));
  }, [participants]);

  const handleRatingChange = (index: number, value: number) => {
    const newRatings = [...ratings];
    newRatings[index] = value;
    setRatings(newRatings);
  };

  const handleStarClick = (
    index: number,
    starIndex: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const clickPosition = event.clientX - left;
    const isHalf = clickPosition < width / 2; // 클릭 위치가 별의 왼쪽인지 확인
    const newRating = starIndex + (isHalf ? 0.5 : 1);
    console.log(
      `Clicked star ${starIndex + 1}, position: ${
        isHalf ? "left (half)" : "right (full)"
      }`,
    );
    handleRatingChange(index, newRating);
  };
  const renderStars = (rating: number, index: number) => {
    console.log(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const isFull = i + 1 <= rating;
      const isHalf = i + 0.5 === rating;

      stars.push(
        <div
          key={i}
          className="relative cursor-pointer"
          style={{
            display: "inline-block",
            position: "relative",
            width: "24px",
            height: "24px",
          }}
          onClick={event => handleStarClick(index, i, event)}
        >
          {/* 기본 회색 별 */}
          <FaStar
            className="text-gray-300"
            style={{
              width: "24px",
              height: "24px",
            }}
          />

          {/* 왼쪽 반쪽 노란색 별 */}
          {isHalf && (
            <FaStar
              className="text-yellow-500"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "24px",
                height: "24px",
                clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
              }}
            />
          )}

          {/* 전체 노란색 별 */}
          {isFull && (
            <FaStar
              className="text-yellow-500"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "24px",
                height: "24px",
              }}
            />
          )}
        </div>,
      );
    }
    return stars;
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
            const profile = userProfiles?.[userId] || {
              nickname: "Unknown",
              fileAddress: profileImg,
            };

            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center justify-center">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={
                      profile.fileAddress
                        ? import.meta.env.VITE_API_BASE_URL +
                          `/api/v1/file/preview?fileUrl=${profile.fileAddress}`
                        : profileImg
                    }
                    alt="User profile"
                  />
                  <span className="ml-5 w-[200px] truncate">
                    {profile.nickname}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-700 mr-2.5">평점</span>
                  {/* <input
                    type="number"
                    value={rating}
                    min={0}
                    max={5}
                    step={0.5}
                    onChange={e =>
                      handleRatingChange(index, parseFloat(e.target.value))
                    }
                    className="w-16 border border-gray-300 rounded p-1 text-center"
                  /> */}
                  {renderStars(rating, index)}
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
