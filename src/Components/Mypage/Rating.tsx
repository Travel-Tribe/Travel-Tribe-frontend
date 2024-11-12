import React, { useState, useEffect } from "react";
import fetchCall from "../../Utils/apiFetch";
import profileImg from "../../assets/profileImg.webp";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  participants: string[];
}

interface UserProfile {
  nickname: string;
  fileAddress: string;
}

const Rating: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
  participants,
}): JSX.Element | null => {
  const [ratings, setRatings] = useState<number[]>([]);
  const [userProfiles, setUserProfiles] = useState<{
    [key: string]: UserProfile;
  }>({});

  const fetchUserProfile = async (userId: string) => {
    try {
      const profile = await fetchCall<{ fileAddress: "" }>(
        `/api/v1/users/${userId}/profile`,
        "get",
      );
      const userData = await fetchCall<{ nickname: string }>(
        `/api/v1/users/${userId}`,
        "get",
      );
      return {
        nickname: userData.data.data.nickname,
        fileAddress: profile.data.fileAddress || profileImg,
      };
    } catch (error) {
      console.error("Error fetching profile data:", error);
      return { nickname: "Unknown", fileAddress: profileImg };
    }
  };

  // 각 userId에 대해 닉네임과 fileAddress를 가져와 userProfiles 상태 업데이트
  const fetchUserProfiles = async () => {
    const profiles = await Promise.all(
      participants.map(async userId => {
        const profile = await fetchUserProfile(userId);
        return { userId, profile };
      }),
    );

    const profileMap = profiles.reduce(
      (acc, { userId, profile }) => {
        acc[userId] = profile;
        return acc;
      },
      {} as { [key: string]: UserProfile },
    );
    setUserProfiles(profileMap);
  };

  useEffect(() => {
    setRatings(Array(participants.length).fill(0.0));
    fetchUserProfiles();
  }, [participants]);

  console.log(userProfiles);

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

            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center justify-center">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={profile.fileAddress}
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
          }}
        >
          평점 주기
        </button>
      </div>
    </div>
  );
};

export default Rating;
