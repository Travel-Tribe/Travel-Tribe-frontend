import { useEffect, useState } from "react";

const ProfileMbti = ({ mbtiData }: { mbtiData: string }): JSX.Element => {
  const [mbti, setMbti] = useState("MBTI");

  useEffect(() => {
    if (mbtiData) setMbti(mbtiData);
  }, [mbtiData]);

  return (
    <div
      className={`py-0.5 px-2 bg-custom-gray text-white text-center text-base rounded-xl flex items-center justify-center
    ${mbti.charAt(0).toLowerCase() === "i" ? "bg-custom-purple" : "bg-custom-red"}`}
    >
      {mbti}
    </div>
  );
};

export default ProfileMbti;
