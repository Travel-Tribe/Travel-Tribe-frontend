import React from "react";

interface EmailChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailChangeModal: React.FC<EmailChangeModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[504px]">
        <h3 className="text-center text-base mb-5 text-gray-500">이메일 변경</h3>
        <p className="text-center text-sm text-gray-600 mb-4">
          이메일을 수정하기 위해 인증 절차가 필요합니다.
        </p>
        <div className="flex items-center border rounded p-2 mb-4">
          <input
            type="email"
            placeholder="email1@gmail.com"
            className="flex-grow outline-none"
          />
          <button className="text-sm bg-gray-200 px-2 py-1 rounded ml-2">
            인증
          </button>
        </div>
        <input
          type="text"
          placeholder="인증번호 입력"
          className="w-full border rounded p-2 mb-4"
        />
        <div className="flex justify-center gap-4">
          <button className="bg-green-200 text-white px-4 py-2 rounded">
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
