import { SetStateAction, useState, useEffect } from "react";
import axios from "axios";
import profileImg from "../../assets/profileImg.webp";
import { useNavigate } from "react-router-dom";

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

const ProfileEdit = (): JSX.Element => {
  const [profileData, setProfileData] = useState({
    introduction: "",
    nickname: "",
    mbti: "",
    smoking: "",
    gender: "",
    birth: "",
    fileAddress: "",
    lang: [] as string[],
    countryName: [] as string[],
    rating_avg: 0.0,
  });

  const [error, setError] = useState("");
  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate();

  // 기존 프로필 내용 가져오기
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await fetchCall("/api/v1/users/:userId/profile", "GET");
        setProfileData({
          ...data,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  // 프로필 수정
  const profileUpdate = async () => {
    try {
      const data = await fetchCall(
        "/api/v1/users/${responseData.id}/profile",
        "patch",
        profileData,
      );
      setProfileData({
        ...data,
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  // 닉네임 유효성 검사 및 업데이트
  const handleNicknameChange = (event: { target: { value: any } }) => {
    const value = event.target.value;
    setProfileData(prev => ({
      ...prev,
      nickname: value,
    }));

    // 특수 문자 유효성 검사
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
    if (specialCharPattern.test(value)) {
      setError("특수문자를 사용할 수 없습니다.");
    } else {
      setError("");
    }
  };

  // 자기소개 업데이트
  const maxChars = 150;
  const handleMyInfoChange = (event: {
    target: { value: SetStateAction<any> };
  }) => {
    setProfileData(prev => ({
      ...prev,
      introduction: event.target.value,
    }));
  };

  // 생년월일 업데이트
  const handleBirthChange = (event: { target: { value: any } }) => {
    setProfileData(prev => ({
      ...prev,
      birth: event.target.value,
    }));
  };

  // 성별 업데이트
  const handleGenderChange = (gender: string) => {
    setProfileData(prev => ({
      ...prev,
      gender: gender,
    }));
  };

  // 흡연 여부 업데이트
  const handleSmokingChange = (smoking: string) => {
    setProfileData(prev => ({
      ...prev,
      smoking: smoking,
    }));
  };

  // MBTI 업데이트
  const handleMbtiChange = (event: { target: { value: any } }) => {
    setProfileData(prev => ({
      ...prev,
      mbti: event.target.value,
    }));
  };

  // 저장 버튼 클릭 핸들러
  const handleUpdateProfile = async () => {
    await profileUpdate();
    navigate("/mypage");
  };

  // 폼 유효성 검사
  useEffect(() => {
    setFormValid(
      profileData.nickname.trim() !== "" &&
        profileData.birth.trim() !== "" &&
        profileData.gender.trim() !== "" &&
        profileData.smoking.trim() !== "" &&
        profileData.mbti.trim() !== "" &&
        error === "",
    );
  }, [profileData, error]);

  return (
    <>
      <div className="border-b border-gray-300 flex justify-between items-center mt-10 pb-1">
        <div className="flex items-center">
          <h2 className="text-3xl mr-2">프로필 수정</h2>
        </div>
      </div>

      <form>
        <div className="h-40 border-b border-gray-300">
          <div className="flex items-center justify-between pt-[22px]">
            {/* 프로필 이미지 변경 */}
            <div className="flex flex-col items-center">
              <img
                className="w-20 h-20 rounded-full border border-gray-300"
                src={profileData.fileAddress === "" ? profileImg : ""}
                alt="Profile"
              />
              <label htmlFor="file">
                <div className="mt-2 px-4 py-1 bg-gray-300 text-gray-700 text-sm rounded-md cursor-pointer">
                  프로필 변경
                </div>
              </label>
              <input type="file" id="file" className="hidden" />
            </div>

            {/* 닉네임 변경 및 중복검사 */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm mb-1">닉네임</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Nickname"
                  className="border border-gray-300 rounded px-2 py-1 text-sm w-60"
                  value={profileData.nickname}
                  onChange={handleNicknameChange}
                />
                <button
                  className={`${profileData.nickname === "" ? "btn-disabled bg-gray-300 text-gray-500 cursor-not-allowed" : ""} px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded-md`}
                >
                  중복 검사
                </button>
              </div>
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
          </div>
        </div>

        {/* 자기소개 변경 */}
        <div className="mt-8 border-b border-gray-300 pb-4">
          <label className="text-gray-700 text-base mb-2 block">
            자기소개 글
          </label>
          <textarea
            className="w-full border border-gray-300 rounded p-2 text-sm resize-none"
            placeholder="여기서 자기소개 수정 가능합니다."
            maxLength={maxChars}
            value={profileData.introduction}
            onChange={handleMyInfoChange}
            rows={4}
          />
          <div className="text-gray-500 text-sm text-right mt-1">
            {profileData.introduction.length}/{maxChars} 자
          </div>
        </div>

        {/* 생년월일 변경 */}
        <div className="mt-8 pb-4">
          <label className="text-gray-700 text-base mb-2 block">생년월일</label>
          <input
            type="date"
            className="w-25 border border-black rounded p-2 text-sm cursor-pointer"
            value={profileData.birth}
            onChange={handleBirthChange}
          />
        </div>

        {/* 성별 변경 */}
        <div className="mt-4 pb-4">
          <label className="text-gray-700 text-base mb-2 block">성별</label>
          <div className="flex space-x-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={profileData.gender === "male"}
                onChange={() => handleGenderChange("male")}
                className="mr-2"
              />
              남자
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={profileData.gender === "female"}
                onChange={() => handleGenderChange("female")}
                className="mr-2"
              />
              여자
            </label>
          </div>
        </div>

        {/* 흡연 여부 변경 */}
        <div className="mt-4 pb-4">
          <label className="text-gray-700 text-base mb-2 block">
            흡연 여부
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="smoking"
                value="흡연"
                checked={profileData.smoking === "흡연"}
                onChange={() => handleSmokingChange("흡연")}
                className="mr-2"
              />
              흡연
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="smoking"
                value="비흡연"
                checked={profileData.smoking === "비흡연"}
                onChange={() => handleSmokingChange("비흡연")}
                className="mr-2"
              />
              비흡연
            </label>
          </div>
        </div>

        {/* MBTI 변경 */}
        <div className="mt-4">
          <label className="text-gray-700 text-base mb-2 block">MBTI</label>
          <select
            className="w-20 border border-gray-300 rounded p-2 text-sm"
            value={profileData.mbti}
            onChange={handleMbtiChange}
          >
            <option value="">선택</option>
            <option value="ISTJ">ISTJ</option>
            <option value="ISFJ">ISFJ</option>
            <option value="INFJ">INFJ</option>
            <option value="INTJ">INTJ</option>
            <option value="ISTP">ISTP</option>
            <option value="ISFP">ISFP</option>
            <option value="INFP">INFP</option>
            <option value="INTP">INTP</option>
            <option value="ESTP">ESTP</option>
            <option value="ESFP">ESFP</option>
            <option value="ENFP">ENFP</option>
            <option value="ENTP">ENTP</option>
            <option value="ESTJ">ESTJ</option>
            <option value="ESFJ">ESFJ</option>
            <option value="ENFJ">ENFJ</option>
            <option value="ENTJ">ENTJ</option>
          </select>
        </div>
      </form>

      <button
        className={`w-full mt-8 py-2 text-xl rounded-md ${
          formValid
            ? "bg-custom-green text-white hover:bg-custom-green"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        onClick={handleUpdateProfile}
        disabled={!formValid}
      >
        저장
      </button>
    </>
  );
};

export default ProfileEdit;
