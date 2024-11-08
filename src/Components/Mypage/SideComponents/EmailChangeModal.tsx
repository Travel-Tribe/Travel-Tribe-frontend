import React, { useEffect, useState } from "react";
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
  const [inputCode, setInputCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validationStatus, setValidationStatus] = useState({
    isChecking: false,
    isAvailable: false,
  });

  const resetFields = () => {
    setEmailInput("");
    setInputCode("");
    setIsCodeSent(false);
    setIsCooldown(false);
    setError("");
    setSuccess("");
    setValidationStatus({ isChecking: false, isAvailable: false });
  };

  useEffect(() => {
    if (!isOpen) resetFields();
  }, [isOpen]);

  // 이메일 입력 핸들러
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
    setError("");
    setSuccess("");

    // 이메일 유효성 검사
    const emailRegex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!emailRegex.test(e.target.value)) {
      setError("유효하지 않은 이메일 형식입니다.");
      setValidationStatus({ isChecking: false, isAvailable: false });
    }
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
        `/api/v1/users/duplicate?type=email&query=${encodeURIComponent(
          emailInput,
        )}`,
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
      setError("이미 사용 중인 이메일입니다");
      setValidationStatus({ isChecking: false, isAvailable: false });
    }
  };

  // 이메일 인증번호 전송
  const sendVerificationCode = async () => {
    if (!validationStatus.isAvailable || isCooldown) return;

    try {
      const data = { email: emailInput };
      await fetchCall(`/api/v1/users/change-email/request`, "post", data);
      setIsCodeSent(true);
      setIsCooldown(true);
      alert("인증 코드가 전송되었습니다.");

      setTimeout(() => setIsCooldown(false), 60000);
    } catch (error) {
      console.error("인증 코드 전송 중 에러 발생:", error);
      alert("인증 코드 전송에 실패했습니다.");
    }
  };

  // 이메일 변경
  const handleEmailChange = async () => {
    try {
      await fetchCall(`/api/v1/users/change-email/verify`, "post", {
        email: emailInput,
        code: inputCode,
      });
      alert("이메일이 성공적으로 변경되었습니다.");
      onClose();
    } catch (error) {
      console.error("이메일 변경 중 에러 발생:", error);
      alert("이메일 변경에 실패했습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-[504px] z-50"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-center text-base mb-5 text-gray-500">
          이메일 변경
        </h3>
        <p className="text-center text-sm text-gray-600 mb-4">
          이메일을 수정하기 위해 인증 절차가 필요합니다.
        </p>

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

        <button
          className="text-sm bg-gray-200 px-2 py-1 rounded w-full mb-4"
          onClick={sendVerificationCode}
          disabled={!validationStatus.isAvailable || isCodeSent}
        >
          인증 코드 전송
        </button>

        <input
          type="text"
          placeholder="인증번호 입력"
          className="w-full border rounded p-2 mb-4"
          value={inputCode}
          onChange={handleCodeInput}
          disabled={!isCodeSent}
        />

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
