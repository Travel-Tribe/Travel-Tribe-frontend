import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchCall from "../../../Utils/apiFetch";

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 비밀번호 유효성 검사 정규식
  const passwordCriteria =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const meetsCriteria = passwordCriteria.test(newPassword);
  const isSameAsCurrent = newPassword === currentPassword;
  const isConfirmationMismatch =
    confirmPassword !== "" && newPassword !== confirmPassword;

  const userId = localStorage.getItem("USER_ID");

  const passwordUpdate = async () => {
    try {
      if (userId) {
        const response = await fetchCall(`api/v1/users/password`, "patch", {
          password: confirmPassword,
        });
        console.log(response);
      }
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
  };

  const ClickChange = async () => {
    console.log("비밀번호 변경완료");
    await passwordUpdate();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[504px]">
        <h3 className="text-center text-base mb-5 text-gray-500">
          비밀번호 변경
        </h3>
        <form>
          {/* 새 비밀번호 입력 */}
          <div className="relative mb-2">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="새 비밀번호"
              className="w-full border rounded p-2 bg-gray-100"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-2 text-gray-500"
            >
              {showNewPassword ? "숨기기" : "보기"}
            </button>
          </div>
          {!meetsCriteria && (
            <p className="text-red-500 text-sm mt-1">
              비밀번호는 특수문자, 영어, 숫자를 포함한 8자 이상이어야 합니다.
            </p>
          )}

          {/* 새 비밀번호 확인 입력 */}
          <div className="relative mb-2">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="새 비밀번호 확인"
              className="w-full border rounded p-2 bg-gray-100"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-2 text-gray-500"
            >
              {showConfirmPassword ? "숨기기" : "보기"}
            </button>
          </div>
          {isConfirmationMismatch && (
            <p className="text-red-500 text-sm mt-1">
              새 비밀번호와 동일하지 않습니다.
            </p>
          )}
          {/* 버튼 */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              type="button"
              className={`px-4 py-2 rounded ${meetsCriteria && !isSameAsCurrent && !isConfirmationMismatch ? "bg-custom-green text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              disabled={
                !meetsCriteria || isSameAsCurrent || isConfirmationMismatch
              }
              onClick={ClickChange}
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
        </form>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
