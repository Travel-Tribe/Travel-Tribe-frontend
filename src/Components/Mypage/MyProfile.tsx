import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetchCall from "../../Utils/apiFetch";
import useLocalStorage from "../../Hooks/useLocalStorage";
import { STORAGE_KEYS } from "../../Constants/STORAGE_KEYS";

import SidebarTest from "./test/SidebarTest";
import MyRecruitTest from "./test/MyRecruitTest";
import profileImg from "../../assets/profileImg.webp";
import MyTravelJoinTest from "./test/MyTravelJoinTest";

interface UserProfile {
  introduction: string;
  nickname: string;
  mbti: string;
  smoking: string;
  gender: string;
  birth: string;
  fileAddress: string;
  langAbilities: string[];
  visitedCountries: string[];
  ratingAvg: null | number;
}

const MyProfile = (): JSX.Element => {
  const [profileData, setProfileData] = useState<UserProfile>({
    introduction: "",
    nickname: "",
    mbti: "",
    smoking: "",
    gender: "",
    birth: "",
    fileAddress: "",
    langAbilities: [] as string[],
    visitedCountries: [] as string[],
    ratingAvg: null,
  });

  // const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
  const userId = localStorage.getItem("USER_ID");
  const profileCheck = localStorage.getItem(STORAGE_KEYS.PROFILE_CHECK);

  const navigate = useNavigate();

  useEffect(() => {
    if (profileCheck === "false") {
      navigate("/mypage/myProfileEdit");
      return;
    }
    const fetchProfileData = async () => {
      try {
        if (userId) {
          const data = await fetchCall<UserProfile>(
            `/api/v1/users/${userId}/profile`,
            "get",
          );
          const userData = await fetchCall<UserProfile>(`/api/v1/users`, "get");
          console.log(userData);
          console.log("data", data);

          setProfileData({
            ...data.data,
            nickname: userData.data.data.nickname,
          });
        } else {
          console.error("USER_ID가 로컬 스토리지에 없습니다.");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, [userId, profileCheck, navigate]);

  const today = new Date();
  const birthDate = new Date(profileData.birth);
  const age =
    today.getFullYear() - birthDate.getFullYear() - 1 === -1
      ? 0
      : today.getFullYear() - birthDate.getFullYear() - 1;

  // if (
  //   !(
  //     today.getMonth() > birthDate.getMonth() ||
  //     (today.getMonth() === birthDate.getMonth() &&
  //       today.getDate() >= birthDate.getDate())
  //   )
  // )
  //   age -= 1;

  const clickProfileEdit = () => {
    navigate("/mypage/myProfileEdit");
  };

  return (
    <>
      <main className="ml-[60px] py-5">
        {/* Profile Card */}
        <section className="w-[660px] p-8 bg-white border border-gray-200 rounded-xl">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center">
              <img
                className="w-16 h-16 rounded-full"
                src={profileData.fileAddress || profileImg}
              />
              <div className="ml-5">
                <span className="block text-lg font-bold">
                  <span className="mr-1">{profileData.nickname}</span>님
                </span>
                <div className="flex items-center space-x-5">
                  <span>{age}세</span>
                  <span>{profileData.gender === "MALE" ? "남자" : "여자"}</span>
                  <span className="flex items-center">
                    {/* <img src={GradeIcon} /> */}⭐
                    <span className="ml-1">
                      (
                      {profileData.ratingAvg === undefined ||
                      profileData.ratingAvg === null
                        ? (0).toFixed(1)
                        : profileData.ratingAvg}
                      /5.0)
                    </span>
                  </span>
                  <span>
                    {profileData.smoking === "NO" ? "비흡연" : "흡연"}
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`py-0.5 px-2 bg-custom-gray text-white text-center text-base rounded-xl flex items-center justify-center`}
            >
              {profileData.mbti}
            </div>
          </div>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg mb-5"
            placeholder="자기소개를 작성해주세요."
            value={profileData.introduction}
            readOnly
          />
          <div className="mb-5">
            <h3 className="font-bold mb-2">가능 언어</h3>
            {profileData.langAbilities.length > 0 && (
              <div className="flex mt-2 gap-2">
                {profileData.langAbilities.map((language, index) => (
                  <div
                    key={index}
                    className="h-6 badge text-sm rounded-lg border border-black bg-white text-center m-2.5 flex items-center justify-center"
                  >
                    {language}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mb-5">
            <h3 className="font-bold mb-2">다녀온 국가</h3>
            {profileData.visitedCountries.length > 0 && (
              <div className="flex mt-2 gap-2">
                {profileData.visitedCountries.map((country, index) => (
                  <div
                    key={index}
                    className="h-6 badge text-sm rounded-lg border border-black bg-white text-center m-2.5 flex items-center justify-center"
                  >
                    {country}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            className="w-full btn border border-custom-teal-green text-custom-teal-green bg-white hover:text-white hover:bg-custom-teal-green hover:border-none"
            onClick={clickProfileEdit}
          >
            프로필 수정
          </button>
        </section>

        {/* 여행 모집 */}
        <MyRecruitTest />
        {/* 여행 신청 */}
        <MyTravelJoinTest />
      </main>
    </>
  );
};
export default MyProfile;

{
  /* Sidebar */
}
