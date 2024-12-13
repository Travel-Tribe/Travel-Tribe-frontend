import { useNavigate } from "react-router-dom";
import { STORAGE_KEYS } from "../../../constants/STORAGE_KEYS";
import { useRecruitPostStore } from "../../../store/recruitPostStore";
import { TravelPlanType } from "../../../type/types";
import { useCallback } from "react";

interface ButtonProps {
  postId?: number;
  userId?: number;
  travelPlan?: TravelPlanType;
}

export default function EditBtn({ postId, userId, travelPlan }: ButtonProps) {
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem(STORAGE_KEYS.USER_ID);
  const { setTravelData } = useRecruitPostStore();

  const handleEdit = useCallback(() => {
    if (travelPlan) {
      console.log("TravelPlan", travelPlan);
      setTravelData(travelPlan);
      navigate(`/recruitment/edit/${postId}`);
    }
  }, []);

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
