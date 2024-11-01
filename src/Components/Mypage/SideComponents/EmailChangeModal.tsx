import React, { useState } from "react";
import axios from "axios";
import useLocalStorage from "../../../Hooks/useLocalStorage";
import { UserMockData } from "../../../mocks/mockData.js";

interface EmailChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

const EmailChangeModal: React.FC<EmailChangeModalProps> = ({
  isOpen,
  onClose,
}) => {
  // const [emailAuth,setEmailAuth] = useState({"email":})
  const [storedEmail, setStoredEmail] = useLocalStorage("userEmail");
  const [emailInput, setEmailInput] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);

  // 이메일 입력
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };
  // 인증번호 입력
  const handleCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCode(e.target.value);
  };

  // 이메일 인증번호 전송
  const sendVerificationCode = async () => {
    try {
      const data = { email: emailInput };
      const response = await fetchCall(
        "/api/v1/users/change-email/request",
        "POST",
        data,
      );
      setVerificationCode(response.code); // 응답에서 인증 코드 저장
      setIsCodeSent(true);
      alert("인증 코드가 전송되었습니다.");
    } catch (error) {
      console.error("Error sending verification code:", error);
      alert("인증 코드 전송에 실패했습니다.");
    }
  };

  // 이메일 변경
  const handleEmailChange = async () => {
    if (inputCode === verificationCode) {
      try {
        const data = { email: emailInput, code: inputCode };
        const response = await fetchCall(
          "api/v1/users/change-email/verify",
          "post",
          data,
        );
        console.log(response);
        // setStoredEmail(emailInput);
        alert("이메일이 성공적으로 변경되었습니다.");
        onClose;
      } catch (error) {
        console.error("Error sending verification code:", error);
      }
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
            onClick={sendVerificationCode}
            disabled={!emailInput || isCodeSent}
          >
            인증
          </button>
        </div>
        {isCodeSent && (
          <>
            <input
              type="text"
              placeholder="인증번호 입력"
              className="w-full border rounded p-2 mb-4"
              value={inputCode}
              onChange={handleCodeInput}
            />
            <div className="flex justify-center gap-4">
              <button
                className="bg-green-200 text-white px-4 py-2 rounded"
                onClick={handleEmailChange}
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
          </>
        )}
      </div>
    </div>
  );
};

export default EmailChangeModal;
