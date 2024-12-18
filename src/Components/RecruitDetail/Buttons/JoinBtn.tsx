import { useNavigate } from "react-router-dom";
import Modal from "../../common/Modal";
import { useParticipation } from "../../../hooks/usePayment";

interface JoinBtnProps {
  postId: number | undefined;
  status: string | undefined;
  userId: number | undefined;
}

export default function JoinBtn({ postId, status }: JoinBtnProps) {
  const navigate = useNavigate();
  const { handleParticipation, modalState, closeModal } = useParticipation();

  const handleJoin = async () => {
    if (!postId) return;

    try {
      const participationId = await handleParticipation(postId);
      if (participationId) {
        navigate(`/recruitment/${postId}/pay`);
      }
    } catch (error) {
      // 에러는 useParticipation 훅 내부에서 모달로 처리됨
      console.error("Participation failed:", error);
    }
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
        isOpen={modalState.isOpen}
        onClose={closeModal}
        message={modalState.message}
      />
    </>
  );
}
