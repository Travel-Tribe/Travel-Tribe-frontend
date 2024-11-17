import React from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../../Hooks/useLocalStorage";
import fetchCall from "../../../Utils/apiFetch";
import { STORAGE_KEYS } from "../../../Constants/STORAGE_KEYS";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
}) => {
  
  const [token, setToken] = useLocalStorage(STORAGE_KEYS.TOKEN);
  const navigate = useNavigate();

  const clickDeleteAccount = async () => {
    try {
      await fetchCall(`/api/v1/users`, "delete");
      setToken(null);
      navigate("/");
    } catch (error) {
      console.error("delete 요청에 실패했습니다:", error);
    }
  };

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-80"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-center text-lg font-semibold mb-4">
          정말로 탈퇴하시겠습니까?
        </h3>
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
            onClick={clickDeleteAccount}
          >
            탈퇴하기
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 text-gray-600 hover:bg-gray-300 transition"
          >
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
