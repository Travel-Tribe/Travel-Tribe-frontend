import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MyLang from "./SideComponents/MyLang";
import CountryName from "./SideComponents/CountryName";
import profileImg from "../../assets/profileImg.webp";
import GradeIcon from "../../assets/icons/grade_20dp_E8EAED_FILL0_wght400_GRAD0_opsz20.svg";
import ProfileMbti from "./SideComponents/ProfileMbti";

const Profile = (): JSX.Element => {
  const [profileData, setProfileData] = useState({
    introduction: "",
    nickName: "닉네임",
    mbti: "",
    smoking: "",
    gender: "",
    birth: "",
    // fileAddress: "",
    lang: [] as string[],
    countryName: [] as string[],
    ratingAvg: 4.5,
  });
  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await fetch("/api/v1/users/:userId/profile");
      const data = await response.json();
      console.log({...data});
      setProfileData({
        ...data,
        nickName: "닉네임",
        ratingAvg: 4.5,
      });
    };
    fetchProfileData();
  }, []);
  console.log(profileData);

  const navigate = useNavigate();

  const today = new Date();
  const birthDate = new Date(profileData.birth);
  let age = today.getFullYear() - birthDate.getFullYear();

  if (
    !(
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate())
    )
  )
    age -= 1;

  const clickProfileEdit = () => {
    navigate("/mypage/myProfileEdit");
  };
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img className="w-12 h-12 rounded-full" src={profileImg} />
          <div className="flex flex-col ml-5 text-base space-y-1">
            <div className="flex items-center">
              <span className="mr-1 text-black">{profileData.nickName}</span>님
            </div>
            <div className="flex items-center space-x-5">
              <span>{age}세</span>
              <span>{profileData.gender}</span>
              <span className="flex items-center">
                <img src={GradeIcon} />
                <span className="ml-1">({profileData.ratingAvg}/5.0)</span>
              </span>
              <span>{profileData.smoking}</span>
            </div>
          </div>
        </div>
        <ProfileMbti mbtiData={profileData.mbti} />
      </div>

      <div className="text-sm my-10">{profileData.introduction}</div>

      <MyLang lang={profileData.lang} />
      <CountryName countries={profileData.countryName} />

      <div className="flex">
        <button
          className="btn w-[560px] h-[42px] mt-8 mb-2 rounded-lg border border-custom-green text-custom-green bg-white mx-auto hover:text-white hover:bg-custom-green hover:border-none"
          onClick={clickProfileEdit}
        >
          프로필 수정
        </button>
      </div>
    </>
  );
};

export default Profile;
