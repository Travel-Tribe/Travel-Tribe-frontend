import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import MyLang from "./SideComponents/MyLang";
import CountryName from "./SideComponents/CountryName";
import profileImg from "../../assets/profileImg.webp";
import GradeIcon from "../../assets/icons/grade_20dp_E8EAED_FILL0_wght400_GRAD0_opsz20.svg";
import ProfileMbti from "./SideComponents/ProfileMbti";

// fetchCall 함수 생성
const fetchCall = async (url: string, method: string, data?: any) => {
  try {
    const response = await axios({
      url,
      method,
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const Profile = (): JSX.Element => {
  const [profileData, setProfileData] = useState({
    introduction: "",
    nickname: "",
    mbti: "",
    smoking: "",
    gender: "",
    birth: "",
    fileAddress: "",
    langAbilities: [] as string[],
    visitedCountries: [] as string[],
    rating_avg: 0.0,
  });

  const userId = localStorage.getItem("USER_ID");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (userId) {
          const data = await fetchCall(
            `/api/v1/users/${userId}/profile`,
            "GET",
          );
          setProfileData({
            ...data,
          });
        } else {
          console.error("USER_ID가 로컬 스토리지에 없습니다.");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, [userId]);

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
          <img
            className="w-12 h-12 rounded-full"
            src={profileData.fileAddress === "" ? profileImg : ""}
          />
          <div className="flex flex-col ml-5 text-base space-y-1">
            <div className="flex items-center">
              <span className="mr-1 text-black">{profileData.nickname}</span>님
            </div>
            <div className="flex items-center space-x-5">
              <span>{age}세</span>
              <span>{profileData.gender === "male" ? "남자" : "여자"}</span>
              <span className="flex items-center">
                <img src={GradeIcon} />
                <span className="ml-1">({profileData.rating_avg}/5.0)</span>
              </span>
              <span>{profileData.smoking}</span>
            </div>
          </div>
        </div>
        <ProfileMbti mbtiData={profileData.mbti} />
      </div>

      <div className="text-sm my-10">{profileData.introduction}</div>

      <MyLang lang={profileData.langAbilities} />
      <CountryName countries={profileData.visitedCountries} />

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
