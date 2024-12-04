import { useNavigate } from "react-router-dom";
import { STORAGE_KEYS } from "../../../Constants/STORAGE_KEYS";
import { useState } from "react";
import Modal from "../../Common/Modal";

interface JoinBtnProps {
  postId: number | undefined;
  status: string | undefined;
  userId: number | undefined;
}

export default function JoinBtn({ postId, status, userId }: JoinBtnProps) {
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem(STORAGE_KEYS.USER_ID);
  const [showModal, setShowModal] = useState(false);

  const handleJoin = () => {
    if (userId?.toString() === currentUserId?.toString()) {
      setShowModal(true);
      return;
    }

    navigate(`/recruitment/${postId}/pay`);
  };

  return (
    <>
      <button
        className="btn btn-success btn-sm text-slate-50"
        onClick={handleJoin}
        disabled={!postId || status !== "모집중"}
      >
        참여 신청하기
      </button>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message="작성자는 이미 참여중입니다."
      />
    </>
  );
}
