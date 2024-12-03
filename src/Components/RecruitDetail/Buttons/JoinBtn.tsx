import { useNavigate } from "react-router-dom";
import { STORAGE_KEYS } from "../../../Constants/STORAGE_KEYS";
import { useState } from "react";

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
    if (!postId) {
      alert("게시글 정보를 찾을 수 없습니다.");
      return;
    }

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

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <h3 className="font-bold text-lg">알림</h3>
            <p className="py-4">이미 참여한 여행입니다.</p>
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={() => setShowModal(false)}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
