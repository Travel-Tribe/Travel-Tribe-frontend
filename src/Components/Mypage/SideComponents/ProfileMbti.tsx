import { useEffect, useState } from "react";

const ProfileMbti = ({ mbtiData }: { mbtiData: string }): JSX.Element => {
  const [mbti, setMbti] = useState("MBTI");

  useEffect(() => {
    if (mbtiData) setMbti(mbtiData);
  }, [mbtiData]);

  return (
    <div
      className={`w-16 h-5 bg-custom-gray text-white text-center text-xs rounded-lg flex items-center justify-center
    ${mbti.charAt(0).toLowerCase() === "i" ? "bg-custom-purple" : "bg-custom-red"}`}
    >
      {mbti}
    </div>
  );
};

export default ProfileMbti;
