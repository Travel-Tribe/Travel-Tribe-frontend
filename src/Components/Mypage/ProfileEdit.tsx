import { SetStateAction, useState, useEffect } from "react";
import profileImg from "../../assets/profileImg.webp";
import { useNavigate } from "react-router-dom";

const ProfileEdit = (): JSX.Element => {
  const userNickName = "닉네임";

  // const 

  const [myInfo, setMyInfo] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [smoking, setSmoking] = useState("");
  const [mbti, setMbti] = useState("");
  const [nickname, setNickname] = useState(userNickName);
  const [error, setError] = useState("");
  const [formValid, setFormValid] = useState(false);

  const navigate = useNavigate();

  const handleNicknameChange = (event: { target: { value: any } }) => {
    const value = event.target.value;
    setNickname(value);

    // 특수 문자 유효성 검사
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
    if (specialCharPattern.test(value)) {
      setError("특수문자를 사용할 수 없습니다.");
    } else {
      setError("");
    }
  };

  const maxChars = 150;
  const handleMyInfoChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setMyInfo(event.target.value);
  };

  const handleUpdateProfile = () => {
    navigate("/mypage");
  };

  useEffect(() => {
    setFormValid(
      nickname.trim() !== "" &&
        birthdate.trim() !== "" &&
        gender.trim() !== "" &&
        smoking.trim() !== "" &&
        mbti.trim() !== "" &&
        error === "",
    );
  }, [nickname, birthdate, gender, smoking, mbti]);

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
            {/* 프로필 이미지와 변경 버튼 */}
            <div className="flex flex-col items-center">
              <img
                className="w-20 h-20 rounded-full border border-gray-300"
                src={profileImg}
                alt="Profile"
              />
              <label htmlFor="file">
                <div className="mt-2 px-4 py-1 bg-gray-300 text-gray-700 text-sm rounded-md cursor-pointer">
                  프로필 변경
                </div>
              </label>
              <input type="file" id="file" className="hidden" />
            </div>
            {/* 닉네임과 중복 검사 버튼 */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm mb-1">닉네임</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Nickname"
                  className="border border-gray-300 rounded px-2 py-1 text-sm w-60"
                  value={nickname}
                  onChange={handleNicknameChange}
                />
                <button
                  className={`${nickname === "" ? "btn-disabled bg-gray-300 text-gray-500 cursor-not-allowed" : ""} px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded-md`}
                >
                  중복 검사
                </button>
              </div>
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
          </div>
        </div>

        {/* 자기소개 수정 */}
        <div className="mt-8 border-b border-gray-300 pb-4">
          <label className="text-gray-700 text-base mb-2 block">
            자기소개 글
          </label>
          <textarea
            className="w-full border border-gray-300 rounded p-2 text-sm resize-none"
            placeholder="여기서 자기소개 수정 가능합니다."
            maxLength={maxChars}
            value={myInfo}
            onChange={handleMyInfoChange}
            rows={4}
          />
          <div className="text-gray-500 text-sm text-right mt-1">
            {myInfo.length}/{maxChars} 자
          </div>
        </div>

        {/* 생년월일 */}
        <div className="mt-8 pb-4">
          <label className="text-gray-700 text-base mb-2 block">생년월일</label>
          <input
            type="date"
            className="w-25 border border-black rounded p-2 text-sm cursor-pointer"
            value={birthdate}
            onChange={e => setBirthdate(e.target.value)}
          />
        </div>

        {/* 성별 */}
        <div className="mt-4 pb-4">
          <label className="text-gray-700 text-base mb-2 block">성별</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="남자"
                checked={gender === "남자"}
                onChange={() => setGender("남자")}
                className="mr-2"
              />
              남자
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="여자"
                checked={gender === "여자"}
                onChange={() => setGender("여자")}
                className="mr-2"
              />
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
            <label className="flex items-center">
              <input
                type="radio"
                name="smoking"
                value="흡연"
                checked={smoking === "흡연"}
                onChange={() => setSmoking("흡연")}
                className="mr-2"
              />
              흡연
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="smoking"
                value="비흡연"
                checked={smoking === "비흡연"}
                onChange={() => setSmoking("비흡연")}
                className="mr-2"
              />
              비흡연
            </label>
          </div>
        </div>

        {/* MBTI */}
        <div className="mt-4">
          <label className="text-gray-700 text-base mb-2 block">MBTI</label>
          <select
            className="w-20 border border-gray-300 rounded p-2 text-sm"
            value={mbti}
            onChange={e => setMbti(e.target.value)}
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
      {/* 저장 버튼 */}
      <button
        className={`w-full mt-8 py-2 text-xl rounded-md ${
          formValid ? "bg-custom-green text-white hover:bg-custom-green" : "bg-gray-300 text-gray-500 cursor-not-allowed"
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
