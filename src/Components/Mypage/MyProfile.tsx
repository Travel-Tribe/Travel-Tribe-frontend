import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { STORAGE_KEYS } from "../../Constants/STORAGE_KEYS";
import { useProfileStore } from "../../store/profileStore";
import { useUserProfile, useUserBasicInfo } from "../../hooks/userQueries";

import MyRecruitment from "./MyRecruitment";
import MyTravelJoin from "./MyTravelJoin";
import profileImg from "../../assets/profile-img.webp";
import CountryName from "./SideComponents/CountryName";
import MyLang from "./SideComponents/MyLang";

const MyProfile = (): JSX.Element => {
  const {
    profileData,
    setProfileData,
    setAge,
    age,
    nickname,
    initializeBasicInfo,
  } = useProfileStore();
  const navigate = useNavigate();
  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
  const profileCheck = localStorage.getItem(STORAGE_KEYS.PROFILE_CHECK);

  const {
    data: userProfile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useUserProfile(userId!);

  const {
    data: userBasicInfo,
    isLoading: isBasicInfoLoading,
    isError: isBasicInfoError,
  } = useUserBasicInfo();

  const mbtiColors: { [key: string]: string } = {
    ISTJ: "bg-istj",
    ISFJ: "bg-isfj",
    INFJ: "bg-infj",
    INTJ: "bg-intj",
    ISTP: "bg-istp",
    ISFP: "bg-isfp",
    INFP: "bg-infp",
    INTP: "bg-intp",
    ESTP: "bg-estp",
    ESFP: "bg-esfp",
    ENFP: "bg-enfp",
    ENTP: "bg-entp",
    ESTJ: "bg-estj",
    ESFJ: "bg-esfj",
    ENFJ: "bg-enfj",
    ENTJ: "bg-entj",
  };

  useEffect(() => {
    if (profileCheck === "false") {
      navigate("/mypage/profileCreate");
    } else if (userProfile) {
      setProfileData(userProfile);

      if (!age && userProfile.birth) {
        setAge(userProfile.birth);
      }
      if (userBasicInfo) {
        initializeBasicInfo(userBasicInfo); // nickname과 phone 초기화
      }
    }
  }, [
    profileCheck,
    userProfile,
    userBasicInfo,
    navigate,
    setProfileData,
    setAge,
    initializeBasicInfo,
    age,
  ]);

  if (isProfileLoading || isBasicInfoLoading) {
    return <div>로딩 중...</div>;
  }

  if (isProfileError || isBasicInfoError) {
    return <div>프로필 데이터를 가져오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <main className="ml-[60px] py-5">
      {/* Profile Card */}
      <section className="w-[660px] p-8 bg-white border border-gray-200 rounded-xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <img
              className="w-16 h-16 rounded-full"
              src={
                profileData.fileAddress
                  ? `${import.meta.env.VITE_API_BASE_URL}/api/v1/file/preview?fileUrl=${profileData.fileAddress}`
                  : profileImg
              }
            />
            <div className="ml-5">
              <span className="block text-lg font-bold">
                <span className="mr-1">{nickname}</span>님
              </span>
              <div className="flex items-center space-x-5">
                <span>{age}세</span>
                <span>
                  {profileData.gender === "남자" ||
                  profileData.gender === "MALE"
                    ? "남자"
                    : "여자"}
                </span>
                <span className="flex items-center">
                  ⭐{" "}
                  <span className="ml-1">
                    ({profileData.ratingAvg?.toFixed(1) ?? "0.0"}/5.0)
                  </span>
                </span>
                <span>
                  {profileData.smoking === "흡연자" ||
                  profileData.smoking === "YES"
                    ? "흡연"
                    : "비흡연"}
                </span>
              </div>
            </div>
          </div>
          <div
            className={`py-0.5 px-2 text-center text-base rounded-xl flex items-center justify-center text-white ${
              profileData.mbti && mbtiColors[profileData.mbti]
                ? mbtiColors[profileData.mbti]
                : "bg-custom-gray"
            }`}
          >
            {profileData.mbti}
          </div>
        </div>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg mb-5 focus:outline-none"
          placeholder="자기소개를 작성해주세요."
          value={profileData.introduction}
          readOnly
        />
        <MyLang lang={profileData.langAbilities} />
        <CountryName countries={profileData.visitedCountries} />
        <button
          className="w-full btn btn-outline btn-success hover:!text-white"
          onClick={() => navigate("/mypage/myProfileEdit")}
        >
          프로필 수정
        </button>
      </section>

      {/* 여행 모집 */}
      <MyRecruitment />
      {/* 여행 신청 */}
      <MyTravelJoin />
    </main>
  );
};

export default MyProfile;
