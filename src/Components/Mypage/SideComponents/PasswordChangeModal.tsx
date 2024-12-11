import React, { useEffect, useState } from "react";
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
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const passwordCriteria =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const isValidNewPassword = passwordCriteria.test(newPassword);
  const isMatchingPasswords = newPassword === confirmPassword;
  const isSameAsCurrent = newPassword === currentPassword;
  const userId = localStorage.getItem("USER_ID");

  const resetFields = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPassword({ current: false, new: false, confirm: false });
  };

  useEffect(() => {
    if (!isOpen) resetFields();
  }, [isOpen]);

  const handlePasswordUpdate = async () => {
    if (!userId) return;
    try {
      await fetchCall(`/api/v1/users/password`, "patch", {
        password: currentPassword,
        newPassword,
      });
      alert("비밀번호가 성공적으로 변경되었습니다.");
      onClose();
    } catch (error) {
      console.error("Error updating password:", error);
      alert("비밀번호 변경에 실패했습니다.");
    }
  };

  const toggleShowPassword = (field: keyof typeof showPassword) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-[504px]"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-center text-base mb-5 text-gray-500">
          비밀번호 변경
        </h3>
        <form>
          {/* 현재 비밀번호 입력 */}
          <div className="relative mb-4">
            <input
              type={showPassword.current ? "text" : "password"}
              placeholder="현재 비밀번호"
              className="w-full border rounded p-2 bg-gray-100"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => toggleShowPassword("current")}
              className="absolute inset-y-0 right-2 text-gray-500"
            >
              {showPassword.current ? "숨기기" : "보기"}
            </button>
          </div>

          {/* 새 비밀번호 입력 */}
          <div className="relative mb-2">
            <input
              type={showPassword.new ? "text" : "password"}
              placeholder="새 비밀번호"
              className="w-full border rounded p-2 bg-gray-100"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => toggleShowPassword("new")}
              className="absolute inset-y-0 right-2 text-gray-500"
            >
              {showPassword.new ? "숨기기" : "보기"}
            </button>
          </div>
          {!isValidNewPassword && (
            <p className="text-red-500 text-sm mt-1">
              비밀번호는 특수문자, 영어, 숫자를 포함한 8자 이상이어야 합니다.
            </p>
          )}

          {/* 새 비밀번호 확인 입력 */}
          <div className="relative mb-2">
            <input
              type={showPassword.confirm ? "text" : "password"}
              placeholder="새 비밀번호 확인"
              className="w-full border rounded p-2 bg-gray-100"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => toggleShowPassword("confirm")}
              className="absolute inset-y-0 right-2 text-gray-500"
            >
              {showPassword.confirm ? "숨기기" : "보기"}
            </button>
          </div>
          {!isMatchingPasswords && (
            <p className="text-red-500 text-sm mt-1">
              새 비밀번호와 동일하지 않습니다.
            </p>
          )}

          {/* 변경 버튼 */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              type="button"
              className={`px-4 py-2 rounded ${
                isValidNewPassword && !isSameAsCurrent && isMatchingPasswords
                  ? "btn bg-custom-teal-green text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={
                !isValidNewPassword || isSameAsCurrent || !isMatchingPasswords
              }
              onClick={handlePasswordUpdate}
            >
              변경하기
            </button>
            <button
              type="button"
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
