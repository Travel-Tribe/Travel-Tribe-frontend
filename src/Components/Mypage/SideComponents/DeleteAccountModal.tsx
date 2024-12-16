import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../../../constants/STORAGE_KEYS";
import { deleteAccount } from "../../../apis/user";
import Modal from "../../Common/Modal";
import { SUCCESS, ERROR } from "../../../constants/MESSAGE";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [modalState, setModalState] = useState({ isOpen: false, message: "" });
  const [setToken] = useLocalStorage(STORAGE_KEYS.TOKEN);
  const navigate = useNavigate();

  const clickDeleteAccount = async () => {
    try {
      deleteAccount();
      // alert("탈퇴되었습니다.");
      setModalState({ isOpen: true, message: `${SUCCESS.CANCEL_MEMBERSHIP}` });
      if (typeof setToken === "function") {
        setToken(null);
      }
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      navigate("/");
    } catch (error) {
      setModalState({ isOpen: true, message: `${ERROR.CANCEL_MEMBERSHIP}` });
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
      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        message={modalState.message}
      />
    </div>
  );
};

export default DeleteAccountModal;
