import { useState } from "react";
import EmailChangeModal from "./sideComponents/EmailChangeModal";
import PasswordChangeModal from "./sideComponents/PasswordChangeModal";
import DeleteAccountModal from "./sideComponents/DeleteAccountModal";

const MyAccountSettings = (): JSX.Element => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);

  return (
    <main className="flex flex-col w-[660px] ml-[60px] py-5 relative">
      <div className="border-b border-gray-300 flex justify-between items-center mt-10 pb-1">
        <div className="flex items-center">
          <h2 className="text-3xl mr-2">계정 설정</h2>
        </div>
      </div>
      <div className="w-full mt-6 bg-white rounded-lg drop-shadow-lg">
        <div className="rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <span>이메일 변경</span>
            <button
              className="btn btn-sm text-sm px-4 py-1 rounded hover:text-white hover:bg-custom-teal-green"
              onClick={() => setIsEmailModalOpen(true)}
            >
              변경
            </button>
          </div>

          <hr className="my-2 border-t border-gray-300" />
          <div className="flex justify-between items-center">
            <span>비밀번호 변경</span>
            <button
              className="btn btn-sm text-sm px-4 py-1 rounded hover:text-white hover:bg-custom-teal-green"
              onClick={() => setIsPasswordModalOpen(true)}
            >
              변경
            </button>
          </div>
        </div>
        <div className="text-gray-500 text-sm p-4">
          <a
            href="#"
            className="hover:underline"
            onClick={() => setIsDeleteAccountModalOpen(true)}
          >
            회원탈퇴 &gt;
          </a>
        </div>
      </div>
      <EmailChangeModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
      <PasswordChangeModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
      <DeleteAccountModal
        isOpen={isDeleteAccountModalOpen}
        onClose={() => setIsDeleteAccountModalOpen(false)}
      />
    </main>
  );
};

export default MyAccountSettings;
