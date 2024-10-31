import { useState } from "react";
import EmailChangeModal from "./SideComponents/EmailChangeModal";
import PasswordChangeModal from "./SideComponents/PasswordChangeModal";

const MyAccountSettings = (): JSX.Element => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const password = 'qwer1234';

  return (
    <>
      <div className="border-b border-gray-300 flex justify-between items-center mt-10 pb-1">
        <div className="flex items-center">
          <h2 className="text-3xl mr-2">계정 설정</h2>
        </div>
      </div>
      <div className="w-full mt-6">
        <div className="border border-green-500 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <span>이메일 변경</span>
            <button
              className="text-sm border border-green-500 px-4 py-1 rounded hover:text-white hover:bg-green-500"
              onClick={() => setIsEmailModalOpen(true)}
            >
              수정
            </button>
            <EmailChangeModal
              isOpen={isEmailModalOpen}
              onClose={() => setIsEmailModalOpen(false)}
            />
          </div>
          <hr className="my-2 border-t border-gray-300" />
          <div className="flex justify-between items-center">
            <span>비밀번호 변경</span>
            <button
              className="text-sm border border-green-500 px-4 py-1 rounded hover:text-white hover:bg-green-500"
              onClick={() => setIsPasswordModalOpen(true)}
            >
              수정
            </button>
            <PasswordChangeModal
              isOpen={isPasswordModalOpen}
              onClose={() => setIsPasswordModalOpen(false)}
              userPassword={password}
            />
          </div>
        </div>
        <div className="mt-4 text-gray-500 text-sm">
          <a href="#" className="hover:underline">
            회원탈퇴 &gt;
          </a>
        </div>
      </div>
    </>
  );
};

export default MyAccountSettings;
