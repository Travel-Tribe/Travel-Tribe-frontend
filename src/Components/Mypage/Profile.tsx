import { useNavigate } from "react-router-dom";

import MyLang from "./SideComponents/MyLang";
import CountryName from "./SideComponents/CountryName";
import profileImg from "../../assets/profileImg.webp";
import GradeIcon from "../../assets/icons/grade_20dp_E8EAED_FILL0_wght400_GRAD0_opsz20.svg";
import ProfileMbti from "./SideComponents/ProfileMbti";

const Profile = (): JSX.Element => {
  const introduction = "저를 소개합니다. 저는 여행을 좋아합니다";
  const nickName = "닉네임";
  const birth = "1997-10-26";
  const gender = "남자";
  const ratingAvg = 4.5;
  const smoking = "비흡연";
  const mbti = "enfp";
  const lang = ["영어", "일본어", "중국어"];
  const countryName = ["미국", "일본", "런던"];

  const navigate = useNavigate();

  const today = new Date();
  const birthDate = new Date(birth);
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
          <div className="flex flex-col ml-5 text-xs space-y-1">
            <div className="flex items-center">
              <span className="mr-1 text-black">{nickName}</span>님
            </div>
            <div className="flex items-center space-x-5">
              <span>{age}세</span>
              <span>{gender}</span>
              <span className="flex items-center">
                <img src={GradeIcon} />
                <span className="ml-1">({ratingAvg}/5.0)</span>
              </span>
              <span>{smoking}</span>
            </div>
          </div>
        </div>
        <ProfileMbti mbtiData={mbti} />
      </div>

      <div className="text-sm my-10">{introduction}</div>

      <MyLang lang={lang} />
      <CountryName countries={countryName} />

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
