import React, { useState } from "react";
import useLocalStorage from "../../../Hooks/useLocalStorage";
import fetchCall from "../../../Utils/apiFetch";

interface EmailChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailChangeModal: React.FC<EmailChangeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [emailInput, setEmailInput] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validationStatus, setValidationStatus] = useState({
    isChecking: false,
    isAvailable: false,
  });

  // 이메일 입력 핸들러
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
    setError("");
    setSuccess(""); 
  };

  // 인증번호 입력 핸들러
  const handleCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCode(e.target.value);
  };

  // 이메일 중복 검사
  const handleEmailDuplicateCheck = async () => {
    if (!emailInput) return;
    setValidationStatus({ isChecking: true, isAvailable: false });
    setError("");
    setSuccess("");
    try {
      const response = await fetchCall(
        `/api/v1/users/duplicate?type=email&query=${encodeURIComponent(emailInput)}`,
        "post",
      );
      const isDuplicate = response.data;

      if (isDuplicate) {
        setError("이미 사용 중인 이메일입니다");
        setValidationStatus({ isChecking: false, isAvailable: false });
      } else {
        setSuccess("사용 가능한 이메일입니다");
        setValidationStatus({ isChecking: false, isAvailable: true });
      }
    } catch (error) {
      console.error("이메일 중복 검사 중 에러 발생:", error);
      setError("이메일 중복 확인 중 오류가 발생했습니다");
      setValidationStatus({ isChecking: false, isAvailable: false });
    }
  };

  // 이메일 인증번호 전송
  const sendVerificationCode = async () => {
    if (!validationStatus.isAvailable || isCooldown) return; // 쿨다운 중이면 요청 막기
  
    try {
      const data = { email: emailInput };
      console.log(data);
      const response = await fetchCall(
        `/api/v1/users/change-email/request`,
        "post",
        data
      );
      setVerificationCode(response.data.code);
      setIsCodeSent(true);
      setIsCooldown(true); // 쿨다운 시작
      alert("인증 코드가 전송되었습니다.");
  
      // 1분 후에 다시 인증 코드 전송 가능하게 설정
      setTimeout(() => setIsCooldown(false), 60000); // 60000ms = 1분
    } catch (error) {
      console.error("인증 코드 전송 중 에러 발생:", error);
      alert("인증 코드 전송에 실패했습니다.");
    }
  };

  // 이메일 변경
  const handleEmailChange = async () => {
    if (inputCode === verificationCode) {
      try {
        const data = { email: emailInput, code: inputCode };
        await fetchCall(`api/v1/users/change-email/verify`, "post", data);
        alert("이메일이 성공적으로 변경되었습니다.");
        onClose();
      } catch (error) {
        console.error("이메일 변경 중 에러 발생:", error);
        alert("이메일 변경에 실패했습니다.");
      }
    } else {
      setError("인증 코드가 올바르지 않습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[504px]">
        <h3 className="text-center text-base mb-5 text-gray-500">
          이메일 변경
        </h3>
        <p className="text-center text-sm text-gray-600 mb-4">
          이메일을 수정하기 위해 인증 절차가 필요합니다.
        </p>

        {/* 이메일 입력 및 중복 검사 */}
        <div className="flex items-center border rounded p-2 mb-4">
          <input
            type="email"
            placeholder="이메일 입력"
            className="flex-grow outline-none"
            value={emailInput}
            onChange={handleEmailInput}
          />
          <button
            className="text-sm bg-gray-200 px-2 py-1 rounded ml-2"
            onClick={handleEmailDuplicateCheck}
            disabled={!emailInput || validationStatus.isChecking}
          >
            중복 검사
          </button>
        </div>
        {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
        {success && <p className="text-green-500 text-xs mb-4">{success}</p>}

        {/* 인증 코드 전송 버튼 */}
        <button
          className="text-sm bg-gray-200 px-2 py-1 rounded w-full mb-4"
          onClick={sendVerificationCode}
          disabled={!validationStatus.isAvailable || isCodeSent}
        >
          인증 코드 전송
        </button>

        {/* 인증 코드 입력 */}
        <input
          type="text"
          placeholder="인증번호 입력"
          className="w-full border rounded p-2 mb-4"
          value={inputCode}
          onChange={handleCodeInput}
          disabled={!isCodeSent}
        />

        {/* 변경 및 취소 버튼 */}
        <div className="flex justify-center gap-4">
          <button
            className={`px-4 py-2 rounded ${
              isCodeSent && inputCode
                ? "bg-green-200 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleEmailChange}
            disabled={!isCodeSent || !inputCode}
          >
            변경하기
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-600 px-4 py-2 rounded"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailChangeModal;
