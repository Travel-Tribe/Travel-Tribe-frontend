import React, { useEffect, useState } from "react";
import fetchCall from "../../../apis/fetchCall";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../../../constants/STORAGE_KEYS";
import { checkDuplicate } from "../../../apis/user";
import Modal from "../../common/Modal";
import { VALIDATION, SUCCESS, ERROR } from "../../../constants/MESSAGE";

interface EmailChangeModalProps {
  isOpen: boolean;
  onClosed: () => void;
}

const EmailChangeModal: React.FC<EmailChangeModalProps> = ({
  isOpen,
  onClosed,
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
  const [modalMessage, setModalMessage] = useState("");
  const [setToken] = useLocalStorage(STORAGE_KEYS.TOKEN);
  const navigate = useNavigate();

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

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
    setError("");
    setSuccess("");

    const emailRegex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!emailRegex.test(e.target.value)) {
      setError(VALIDATION.INVALID_EMAIL);
      setValidationStatus({ isChecking: false, isAvailable: false });
    }
  };

  const handleCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCode(e.target.value);
  };

  const handleEmailDuplicateCheck = async () => {
    if (!emailInput) return;
    setValidationStatus({ isChecking: true, isAvailable: false });
    setError("");
    setSuccess("");
    try {
      const isDuplicate = checkDuplicate("email", emailInput);

      if (!isDuplicate) {
        setError("이미 사용중인 이메일입니다");
        setValidationStatus({ isChecking: false, isAvailable: false });
      } else {
        setSuccess("사용 가능한 이메일입니다");
        setValidationStatus({ isChecking: false, isAvailable: true });
      }
    } catch (error) {
      setError("이메일 중복 확인에 실패했습니다.");
      setValidationStatus({ isChecking: false, isAvailable: false });
    }
  };

  const sendVerificationCode = async () => {
    if (!validationStatus.isAvailable || isCooldown) return;

    try {
      await fetchCall(`/api/v1/users/change-email/request`, "post", {
        email: emailInput,
      });
      setIsCodeSent(true);
      setIsCooldown(true);
      // setModalMessage(SUCCESS.SEND_CODE);

      setTimeout(() => setIsCooldown(false), 60000);
    } catch (error) {
      setModalMessage(ERROR.SEND_CODE);
    }
  };

  const handleEmailChange = async () => {
    try {
      await fetchCall(`/api/v1/users/change-email/verify`, "post", {
        email: emailInput,
        code: inputCode,
      });
      setModalMessage(SUCCESS.CHANGE_EMAIL);
    } catch (error) {
      setModalMessage(ERROR.CHANGE_EMAIL);
    }
  };

  const handleModalClose = () => {
    setModalMessage("");
    // 조건부로 EmailChangeModal을 닫음
    if (modalMessage === SUCCESS.CHANGE_EMAIL) {
      if (typeof setToken === "function") {
        setToken(null);
      }
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      navigate("/signIn");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={(e) => {
        e.stopPropagation(); // 이벤트 전파 차단
        onClosed(); // 외부 클릭 시 EmailChangeModal 닫기
      }}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-[504px]"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 이벤트 전파 차단
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
          className={`btn btn-sm text-sm bg-gray-200 px-2 py-1 rounded w-full mb-4 ${
            validationStatus.isAvailable && !isCodeSent
              ? ""
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={sendVerificationCode}
          disabled={!validationStatus.isAvailable || isCodeSent}
        >
          인증 코드 전송
        </button>

        <input
          type="text"
          placeholder="인증번호 입력"
          className={`w-full border rounded p-2 mb-4 ${
            isCodeSent ? "" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          value={inputCode}
          onChange={handleCodeInput}
          disabled={!isCodeSent}
        />

        <div className="flex justify-center gap-4">
          <button
            className={`px-4 py-2 rounded ${
              isCodeSent && inputCode
                ? "btn bg-custom-teal-green text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleEmailChange}
            disabled={!isCodeSent || !inputCode}
          >
            변경하기
          </button>
          <button
            onClick={onClosed} // EmailChangeModal 닫기 버튼
            className="btn btn-md bg-gray-200 text-gray-600 px-4 py-2 rounded"
          >
            취소
          </button>
        </div>
      </div>
      <Modal
        isOpen={!!modalMessage}
        onClose={handleModalClose} // Modal 닫기만 처리
        message={modalMessage}
      />
    </div>
  );
};

export default EmailChangeModal;
