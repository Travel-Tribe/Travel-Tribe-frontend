import { useNavigate } from "react-router-dom";

interface JoinBtnProps {
  postId: number | undefined;
}

export default function JoinBtn({ postId }: JoinBtnProps) {
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!postId) {
      alert("게시글 정보를 찾을 수 없습니다.");
      return;
    }
    navigate(`/recruitment/${postId}/pay`);
  };

  return (
    <button
      className="btn btn-success btn-sm text-slate-50"
      onClick={handleJoin}
      disabled={!postId}
    >
      참여 신청하기
    </button>
  );
}
