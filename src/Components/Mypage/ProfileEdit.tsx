import { useEffect, useState } from "react";
import profileImg from "../../assets/profile-img.webp";
import { useNavigate } from "react-router-dom";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
import { STORAGE_KEYS } from "../../constants/STORAGE_KEYS";
import SelectBox from "../common/SelectBox";
import { MBTI } from "../../constants/MBTI";
import { useProfileStore } from "../../store/profileStore";
import { postImgUrl } from "../../utils/postImgUrl";
import { useUserProfile } from "../../hooks/userQueries";
import {
  checkDuplicate,
  updateProfileData,
  updateUserInfo,
} from "../../apis/user";
import Modal from "../common/Modal";
import { SUCCESS, ERROR } from "../../constants/MESSAGE";
import { AxiosError } from "axios";
import { ErrorType } from "../../type/types";

const ProfileEdit = (): JSX.Element => {
  const {
    profileData,
    nickname,
    phone,
    setProfileData,
    updateProfileField,
    setNickname,
    setAge,
  } = useProfileStore();
  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [validationStatus, setValidationStatus] = useState({
    isChecking: false,
    isAvailable: false,
  });
  const [modalState, setModalState] = useState({ isOpen: false, message: "" });

  const navigate = useNavigate();
  const animatedComponents = makeAnimated();
  // react-query hooks
  const { data: userProfile, isLoading } = useUserProfile(userId!);

  useEffect(() => {
    if (!userId || isLoading) return;

    if (userProfile) {
      try {
        setProfileData(userProfile);
      } catch (error) {
        console.error(
          "Error loading profile data:",
          `${ERROR.LOAD_USER_PROFILE} ${(error as AxiosError<ErrorType>).response?.data?.errors[0]?.errorMessage}`,
        );
      }
      if (userProfile.birth) {
        setAge(userProfile.birth);
      }
    }
  }, [userId, isLoading, userProfile, setProfileData, setNickname, setAge]);

  const handleVisitedCountriesChange = (newValue: unknown) => {
    if (Array.isArray(newValue)) {
      setProfileData({
        visitedCountries: newValue.map(
          option => (option as { value: string }).value,
        ),
      });
    }
  };

  const handleLangAbilitiesChange = (newValue: unknown) => {
    if (Array.isArray(newValue)) {
      setProfileData({
        langAbilities: newValue.map(
          option => (option as { value: string }).value,
        ),
      });
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const imgUrl = await postImgUrl(file);
        updateProfileField("fileAddress", imgUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNickname(value);
    setError(
      value.length < 2
        ? "닉네임은 2자 이상이어야 합니다."
        : value.length > 10
          ? "닉네임은 10자 이하여야 합니다."
          : /[^가-힣a-zA-Z0-9]/.test(value)
            ? "닉네임은 한글, 영문, 숫자만 사용할 수 있습니다."
            : "",
    );
  };

  const handleNicknameDuplicate = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setValidationStatus({ isChecking: true, isAvailable: false });
    setError("");
    setSuccess("");

    try {
      const isAvailable = await checkDuplicate("nickname", nickname);
      if (!isAvailable) {
        setError("이미 사용 중인 닉네임입니다.");
        setValidationStatus({ isChecking: false, isAvailable: false });
      } else {
        setSuccess("사용 가능한 닉네임입니다.");
        setValidationStatus({ isChecking: false, isAvailable: true });
      }
    } catch (error) {
      setError("닉네임 확인 중 오류가 발생했습니다.");
      setValidationStatus({ isChecking: false, isAvailable: false });
    }
  };

  const handleMyInfoChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    updateProfileField("introduction", value);
  };

  const handleBirthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateProfileField("birth", event.target.value);
  };

  const handleGenderChange = (gender: string) => {
    updateProfileField("gender", gender);
  };

  const handleSmokingChange = (smoking: string) => {
    updateProfileField("smoking", smoking);
  };

  const handleMbtiChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateProfileField("mbti", event.target.value);
  };

  const handleUpdateProfile = async () => {
    try {
      profileData.gender = profileData.gender === "남자" ? "MALE" : "FEMALE";
      profileData.smoking = profileData.smoking === "흡연자" ? "YES" : "NO";

      await updateProfileData(profileData);
      await updateUserInfo({ nickname, phone });
      setModalState({ isOpen: true, message: `${SUCCESS.EDIT_PROFILE}` });
    } catch (error) {
      setModalState({ isOpen: true, message: `${ERROR.EDIT_PROFILE}` });
    }
  };

  useEffect(() => {
    setFormValid(
      nickname.trim() !== "" &&
        profileData.birth?.trim() !== "" &&
        profileData.gender?.trim() !== "" &&
        profileData.smoking?.trim() !== "" &&
        profileData.mbti?.trim() !== "" &&
        error === "",
    );
  }, [nickname, profileData, error]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <main className="flex flex-col w-[660px] ml-[60px] py-5">
      <div className="border-b border-gray-300 flex justify-between items-center mt-10 pb-1">
        <h2 className="text-3xl">프로필 수정</h2>
      </div>

      <form>
        <div className="h-40 border-b border-gray-300 flex justify-between items-center pt-5">
          <div className="flex flex-col items-center">
            <img
              className="w-20 h-20 rounded-full border border-gray-300"
              src={
                profileData.fileAddress
                  ? import.meta.env.VITE_API_BASE_URL +
                    `/api/v1/file/preview?fileUrl=${profileData.fileAddress}`
                  : profileImg
              }
              alt="Profile"
            />
            <label htmlFor="file">
              <div className="mt-2 btn btn-sm btn-active">프로필 변경</div>
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
                className="text-sm w-60 input input-sm input-bordered"
                value={nickname || ""}
                onChange={handleNicknameChange}
              />
              <button
                className={`btn btn-sm ${!nickname ? "btn-disabled" : "btn-active"}`}
                onClick={handleNicknameDuplicate}
                disabled={!nickname || validationStatus.isChecking}
              >
                {validationStatus.isChecking ? "확인 중..." : "중복 검사"}
              </button>
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            {success && (
              <p className="text-green-500 text-xs mt-1">{success}</p>
            )}
            <div className="form-control w-full"></div>
          </div>
        </div>

        {/* 자기소개 */}
        <div className="mt-8 border-b border-gray-300 pb-4">
          <label className="text-gray-700 text-lg mb-2 block">
            자기소개 글
          </label>
          <textarea
            className="w-full text-sm resize-none textarea textarea-bordered"
            placeholder="여기서 자기소개 수정 가능합니다."
            maxLength={150}
            value={profileData.introduction}
            onChange={handleMyInfoChange}
            rows={4}
          />
          <div className="text-gray-500 text-sm text-right mt-1">
            {profileData.introduction !== undefined
              ? profileData.introduction.length
              : 0}
            /150 자
          </div>
        </div>

        {/* 생년월일 */}
        <div className="mt-8 pb-4">
          <label className="text-gray-700 text-lg mb-2 block">생년월일</label>
          <input
            type="date"
            className="w-[140px] border rounded-lg p-1 text-base cursor-pointer border-custom-green focus:outline-none focus:ring-2 focus:ring-custom-green"
            value={profileData.birth}
            onChange={handleBirthChange}
          />
        </div>
        <div className="flex space-x-8">
          {/* 성별 */}
          <div className="mt-4 pb-4">
            <label className="text-gray-700 text-lg mb-2 block">성별</label>
            <div className="flex space-x-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="남자"
                  checked={
                    profileData.gender === "남자" ||
                    profileData.gender === "MALE"
                  }
                  onChange={() => handleGenderChange("MALE")}
                  className="mr-2 radio radio-xs radio-success"
                />{" "}
                남자
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="여자"
                  checked={
                    profileData.gender === "여자" ||
                    profileData.gender === "FEMALE"
                  }
                  onChange={() => handleGenderChange("FEMALE")}
                  className="mr-2 radio radio-xs radio-success"
                />{" "}
                여자
              </label>
            </div>
          </div>

          {/* 흡연 여부 */}
          <div className="mt-4 pb-4">
            <label className="text-gray-700 text-lg mb-2 block">
              흡연 여부
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="smoking"
                  value="흡연"
                  checked={
                    profileData.smoking === "흡연자" ||
                    profileData.smoking === "YES"
                  }
                  onChange={() => handleSmokingChange("YES")}
                  className="mr-2 radio radio-xs radio-success"
                />{" "}
                흡연
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="smoking"
                  value="비흡연"
                  checked={
                    profileData.smoking === "비흡연자" ||
                    profileData.smoking === "NO"
                  }
                  onChange={() => handleSmokingChange("NO")}
                  className="mr-2 radio radio-xs radio-success"
                />{" "}
                비흡연
              </label>
            </div>
          </div>
        </div>

        {/* MBTI */}
        <div className="mt-4">
          <label className="text-gray-700 text-lg mb-2 block">MBTI</label>
          <SelectBox
            options={[...MBTI]}
            selectedValue={profileData.mbti}
            initialText="MBTI"
            onSelect={handleMbtiChange}
          />
        </div>

        {/* 다녀온 국가 */}
        <div className="mt-4">
          <label className="text-gray-700 text-base mb-2 block">
            다녀온 국가
          </label>
          <CreatableSelect
            isMulti
            components={animatedComponents}
            value={profileData.visitedCountries?.map(country => ({
              label: country,
              value: country,
            }))}
            onChange={handleVisitedCountriesChange}
            placeholder="국가를 입력하세요"
            className="mb-4"
          />
        </div>

        {/* 가능한 언어 */}
        <div className="mt-4">
          <label className="text-gray-700 text-base mb-2 block">
            가능한 언어
          </label>
          <CreatableSelect
            isMulti
            components={animatedComponents}
            value={profileData.langAbilities?.map(lang => ({
              label: lang,
              value: lang,
            }))}
            onChange={handleLangAbilitiesChange}
            placeholder="언어를 입력하세요"
            className="mb-4"
          />
        </div>
      </form>

      <button
        className={`w-full mt-8 btn ${formValid ? "btn-success text-white" : "btn-disabled"}`}
        onClick={handleUpdateProfile}
        disabled={!formValid}
      >
        저장
      </button>
      <Modal
        isOpen={modalState.isOpen}
        onClose={ () => {
          setModalState({ ...modalState, isOpen: false });
          if (modalState.message === SUCCESS.EDIT_PROFILE) {
            setProfileData(profileData);

            navigate("/mypage", { replace: true }); // URL 변경
            window.location.reload();
          }
        }}
        message={modalState.message}
      />
    </main>
  );
};

export default ProfileEdit;
