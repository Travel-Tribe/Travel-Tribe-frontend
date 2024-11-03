import { useState, useEffect, useRef } from "react";
import profileImg from "../../assets/profileImg.webp";
import { useNavigate } from "react-router-dom";
import fetchCall from "../../Utils/apiFetch";

interface UserProfile {
  introduction: string;
  nickname: string;
  mbti: string;
  smoking: string;
  gender: string;
  birth: string;
  fileAddress: string;
}

const ProfileEdit = (): JSX.Element => {
  const [profileData, setProfileData] = useState<UserProfile>({
    introduction: "",
    nickname: "",
    mbti: "",
    smoking: "",
    gender: "",
    birth: "",
    fileAddress: "",
  });
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [validationStatus, setValidationStatus] = useState({
    isChecking: false,
    isAvailable: false,
  });

  const navigate = useNavigate();
  const userId = localStorage.getItem("USER_ID");
  const profileCheck = localStorage.getItem("ProfileCheck") === "true";

  // 프로필 데이터 불러오기
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!userId) {
        console.error("USER_ID가 로컬 스토리지에 없습니다.");
        return;
      }
      try {
        const userData = await fetchCall<UserProfile>(`/api/v1/users`, "get");

        if (profileCheck) {
          const data = await fetchCall<UserProfile>(
            `/api/v1/users/${userId}/profile`,
            "get",
          );
          setProfileData({
            ...data.data,
            nickname: userData.data.data.nickname,
          });
        } else {
          setProfileData({
            ...profileData,
            nickname: userData.data.data.nickname,
          });
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [userId, profileCheck]);

  // 프로필 업데이트
  const profileUpdate = async () => {
    try {
      if (userId) {
        const updatedData = await fetchCall<UserProfile>(
          `/api/v1/users/${userId}/profile`,
          "patch",
          { ...profileData, introduction: profileData.introduction },
        );
        setProfileData(updatedData);
      }
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
  };

  // 프로필 이미지 파일 선택 시 처리
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileData(prev => ({ ...prev, fileAddress: imageUrl }));
    }
  };

  // 닉네임 유효성 검사 및 중복 체크
  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setProfileData(prev => ({ ...prev, nickname: value }));

    if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      setError("특수문자를 사용할 수 없습니다.");
    } else {
      setError("");
    }
  };

  const handleNicknameDuplicate = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setValidationStatus({ isChecking: true, isAvailable: false });
    setError("");
    setSuccess("");

    try {
      const response = await fetchCall(
        `/api/v1/users/duplicate?type=nickname&query=${encodeURIComponent(profileData.nickname)}`,
        "post",
      );
      console.log(response);
      if (!response.data) {
        setSuccess("사용 가능한 닉네임입니다");
        setValidationStatus({ isChecking: false, isAvailable: true });
      }
    } catch (error) {
      setError("이미 사용 중인 닉네임입니다");
      setValidationStatus({ isChecking: false, isAvailable: false });
    }
  };

  // 자기소개 업데이트
  const handleMyInfoChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    setProfileData(prev => ({ ...prev, introduction: value }));
  };

  // 생년월일, 성별, 흡연 여부, MBTI 업데이트
  const handleBirthChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setProfileData(prev => ({ ...prev, birth: event.target.value }));
  const handleGenderChange = (gender: string) =>
    setProfileData(prev => ({ ...prev, gender }));
  const handleSmokingChange = (smoking: string) =>
    setProfileData(prev => ({ ...prev, smoking }));
  const handleMbtiChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setProfileData(prev => ({ ...prev, mbti: event.target.value }));

  // 프로필 저장
  const handleUpdateProfile = async () => {
    await profileUpdate();
    localStorage.setItem("ProfileCheck", "true");
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
        <h2 className="text-3xl">프로필 수정</h2>
      </div>

      <form>
        <div className="h-40 border-b border-gray-300 flex justify-between items-center pt-5">
          <div className="flex flex-col items-center">
            <img
              className="w-20 h-20 rounded-full border border-gray-300"
              src={profileData.fileAddress || profileImg}
              alt="Profile"
            />
            <label htmlFor="file">
              <div className="mt-2 px-4 py-1 bg-gray-300 text-gray-700 text-sm rounded-md cursor-pointer">
                프로필 변경
              </div>
            </label>
            <input
              type="file"
              id="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

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
                className={`px-3 py-1 ${!profileData.nickname ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-300 text-gray-700"} text-sm rounded-md`}
                onClick={handleNicknameDuplicate}
                disabled={!profileData.nickname || validationStatus.isChecking}
              >
                {validationStatus.isChecking ? "확인 중..." : "중복 검사"}
              </button>
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            {success && (
              <p className="text-green-500 text-xs mt-1">{success}</p>
            )}
          </div>
        </div>

        {/* 자기소개 */}
        <div className="mt-8 border-b border-gray-300 pb-4">
          <label className="text-gray-700 text-base mb-2 block">
            자기소개 글
          </label>
          <textarea
            className="w-full border border-gray-300 rounded p-2 text-sm resize-none"
            placeholder="여기서 자기소개 수정 가능합니다."
            maxLength={150}
            value={profileData.introduction}
            onChange={handleMyInfoChange}
            rows={4}
          />
          <div className="text-gray-500 text-sm text-right mt-1">
            {profileData.introduction.length}/150 자
          </div>
        </div>

        {/* 생년월일 */}
        <div className="mt-8 pb-4">
          <label className="text-gray-700 text-base mb-2 block">생년월일</label>
          <input
            type="date"
            className="w-25 border border-black rounded p-2 text-sm cursor-pointer"
            value={profileData.birth}
            onChange={handleBirthChange}
          />
        </div>

        {/* 성별 */}
        <div className="mt-4 pb-4">
          <label className="text-gray-700 text-base mb-2 block">성별</label>
          <div className="flex space-x-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="MALE"
                checked={profileData.gender === "MALE"}
                onChange={() => handleGenderChange("MALE")}
                className="mr-2"
              />{" "}
              남자
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="FEMALE"
                checked={profileData.gender === "FEMALE"}
                onChange={() => handleGenderChange("FEMALE")}
                className="mr-2"
              />{" "}
              여자
            </label>
          </div>
        </div>

        {/* 흡연 여부 */}
        <div className="mt-4 pb-4">
          <label className="text-gray-700 text-base mb-2 block">
            흡연 여부
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="smoking"
                value="YES"
                checked={profileData.smoking === "YES"}
                onChange={() => handleSmokingChange("YES")}
                className="mr-2"
              />{" "}
              흡연
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="smoking"
                value="NO"
                checked={profileData.smoking === "NO"}
                onChange={() => handleSmokingChange("NO")}
                className="mr-2"
              />{" "}
              비흡연
            </label>
          </div>
        </div>

        {/* MBTI */}
        <div className="mt-4">
          <label className="text-gray-700 text-base mb-2 block">MBTI</label>
          <select
            className="w-20 border border-gray-300 rounded p-2 text-sm"
            value={profileData.mbti}
            onChange={handleMbtiChange}
          >
            <option value="">선택</option>
            {[
              "ISTJ",
              "ISFJ",
              "INFJ",
              "INTJ",
              "ISTP",
              "ISFP",
              "INFP",
              "INTP",
              "ESTP",
              "ESFP",
              "ENFP",
              "ENTP",
              "ESTJ",
              "ESFJ",
              "ENFJ",
              "ENTJ",
            ].map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </form>

      <button
        className={`w-full mt-8 py-2 text-xl rounded-md ${formValid ? "bg-custom-green text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
        onClick={handleUpdateProfile}
        disabled={!formValid}
      >
        저장
      </button>
    </>
  );
};

export default ProfileEdit;
