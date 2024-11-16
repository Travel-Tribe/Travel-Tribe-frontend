import { useNavigate } from "react-router-dom";
import { TravelPlan } from "../../../mocks/mockData";
import { STORAGE_KEYS } from "../../../Constants/STORAGE_KEYS";
import { useRecruitPostStore } from "../../../store/recruitPostStore";

interface ButtonProps {
  postId?: number;
  userId?: number;
  travelPlan?: TravelPlan;
}

export default function EditBtn({ postId, userId, travelPlan }: ButtonProps) {
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem(STORAGE_KEYS.USER_ID);
  const { setTravelData } = useRecruitPostStore();

  const handleEdit = () => {
    if (travelPlan) {
      setTravelData(travelPlan);
      navigate(`/recruitment/edit/:${postId}`);
    }
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
