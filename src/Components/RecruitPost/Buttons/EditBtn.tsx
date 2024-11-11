import { useNavigate } from "react-router-dom";

interface ButtonProps {
  postId?: number;
  userId?: number;
}

export default function EditBtn({ postId, userId }: ButtonProps) {
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("USER_ID");
  // console.log("작성자ID:", userId);
  // console.log("현재 사용자:", currentUserId);

  const handleEdit = () => {
    navigate(`/recruitment/edit/:${postId}`);
  };

  if (currentUserId?.toString() !== userId?.toString()) {
    return (
      <button className="btn btn-sm btn-ghost pointer-events-none opacity-0 cursor-default"></button>
    );
  }

  return (
    <button
      className="btn btn-sm text-slate-50 btn-warning"
      onClick={handleEdit}
    >
      수정하기
    </button>
  );
}
