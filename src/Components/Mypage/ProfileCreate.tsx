import { useState, useEffect } from "react";
import profileImg from "../../assets/profileImg.webp";
import { useNavigate } from "react-router-dom";
import fetchCall from "../../Utils/apiFetch";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
import { STORAGE_KEYS } from "../../Constants/STORAGE_KEYS";
import SelectBox from "../Common/SelectBox";
import { MBTI } from "../../Constants/MBTI";
import { useProfileStore } from "../../store/profileStore";
import { postImgUrl } from "../../Utils/postImgUrl";

const ProfileCreate = (): JSX.Element | null => {
  const { profileData, setProfileData, updateProfileField } = useProfileStore();
  const profileCheck =
    localStorage.getItem(STORAGE_KEYS.PROFILE_CHECK) == "true";

  const [error, setError] = useState("");
  const [formValid, setFormValid] = useState(false);

  const navigate = useNavigate();
  const animatedComponents = makeAnimated();

  if (profileCheck) {
    return null;
  }

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

  // 프로필 이미지 파일 선택 시 처리
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        // 이미지 업로드 및 URL 생성
        const imgUrl = await postImgUrl(file);

        // const encodedFileAddress = encodeURIComponent(imgUrl);

        const previewResponse = await fetchCall<Blob>(
          `/api/v1/file/preview?fileUrl=${imgUrl}`,
          "get",
          undefined,
          "blob",
        );
          console.log(previewResponse);
        if (previewResponse.data) {
          const imgPreviewUrl = URL.createObjectURL(previewResponse.data);
          // 상태 업데이트 (미리보기 URL)
          updateProfileField("fileAddressPreview", imgPreviewUrl);
        }

        // 상태 업데이트
        updateProfileField("fileAddress", imgUrl); // 최종 이미지 URL
        // updateProfileField("fileAddressPreview", encodedFileAddress); // 미리보기 URL
        console.log("Image URL updated:", imgUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  // 자기소개 업데이트
  const handleMyInfoChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    updateProfileField("introduction", value);
  };

  // 생년월일, 성별, 흡연 여부, MBTI 업데이트
  const handleBirthChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    updateProfileField("birth", event.target.value);
  const handleGenderChange = (gender: string) =>
    updateProfileField("gender", gender);
  const handleSmokingChange = (smoking: string) =>
    updateProfileField("smoking", smoking);
  const handleMbtiChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    updateProfileField("mbti", event.target.value);

  // 프로필 저장
  const handleUpdateProfile = async () => {
    try {
      const { nickname, phone, ...filteredProfileData } = profileData;
      console.log({...filteredProfileData});
      const response = await fetchCall(`/api/v1/users/profile`, "post", {
        ...filteredProfileData,
      });
      localStorage.setItem("ProfileCheck", "true");
      alert("프로필 생성 완료");
      navigate("/mypage");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // 폼 유효성 검사
  useEffect(() => {
    setFormValid(
      profileData.birth.trim() !== "" &&
        profileData.gender.trim() !== "" &&
        profileData.smoking.trim() !== "" &&
        profileData.mbti.trim() !== "" &&
        error === "",
    );
  }, [profileData, error]);

  return (
    <main className="flex flex-col w-[660px] ml-[60px] py-5">
      <div className="border-b border-gray-300 flex justify-between items-center mt-10 pb-1">
        <h2 className="text-3xl">프로필 생성</h2>
      </div>

      <form>
        <div className="h-40 border-b border-gray-300 flex justify-between items-center pt-5">
          <div className="flex flex-col items-center">
          <img
              className="w-20 h-20 rounded-full border border-gray-300"
              src={
                profileData.fileAddressPreview ||
                profileData.fileAddress ||
                profileImg
              }
              alt="Profile"
            />
            <label htmlFor="file">
              <div className="mt-2 px-4 py-1 bg-gray-300 text-gray-700 text-sm rounded-md cursor-pointer">
                프로필 이미지
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
        </div>

        {/* 자기소개 */}
        <div className="mt-8 border-b border-gray-300 pb-4">
          <label className="text-gray-700 text-lg mb-2 block">
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
          <label className="text-gray-700 text-lg mb-2 block">생년월일</label>
          <input
            type="date"
            className="w-25 border border-black rounded p-2 text-sm cursor-pointer"
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
            <label className="text-gray-700 text-lg mb-2 block">
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
        </div>

        {/* MBTI */}
        <div className="mt-4">
          <label className="text-gray-700 text-lg mb-2 block">MBTI</label>
          <SelectBox
            options={[...MBTI]}
            selectedValue={profileData.mbti}
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
            value={profileData.visitedCountries.map(country => ({
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
            value={profileData.langAbilities.map(lang => ({
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
        className={`w-full mt-8 py-2 text-xl rounded-md ${formValid ? "bg-custom-green text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
        onClick={handleUpdateProfile}
        disabled={!formValid}
      >
        저장
      </button>
    </main>
  );
};

export default ProfileCreate;
