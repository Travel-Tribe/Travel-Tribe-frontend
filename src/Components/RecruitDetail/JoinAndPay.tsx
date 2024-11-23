import Check from "../../assets/icons/check.svg";
import Back from "../../assets/icons/arrow_back.svg";
import { usePaymentFlow } from "../../Hooks/usePaymentFlow";
import { useNavigate, useParams } from "react-router-dom";

export default function JoinAndPay() {
  const navigate = useNavigate();
  const { postId, participationId } = useParams();
  const parsedPostId = postId ? parseInt(postId) : undefined;
  const parsedParticipationId = participationId
    ? parseInt(participationId)
    : undefined;

  const { handlePaymentWithParticipation, handleDirectPayment, loading } =
    usePaymentFlow();

  const handlePayment = async () => {
    if (loading || !parsedPostId) return;

    if (parsedParticipationId) {
      // participationId가 있는 경우 (게시글 작성 후)
      await handleDirectPayment(parsedPostId, parsedParticipationId);
    } else {
      // participationId가 없는 경우 (일반 참여)
      await handlePaymentWithParticipation(parsedPostId);
    }
  };

  const handleBack = () => {
    navigate(`/recruitment/${postId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-success/10 p-6">
            <h2 className="text-2xl font-bold text-success">여행 참여 신청</h2>
            <p className="text-gray-600 mt-2">
              즐거운 여행의 시작을 함께하세요!
            </p>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-base-200 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-success"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="font-medium">
                  {parsedParticipationId
                    ? "게시글 등록을 위한 보증금이 필요합니다"
                    : "참여 신청 시 보증금이 필요합니다"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-warning"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="font-medium">카카오페이로 결제가 진행됩니다</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handlePayment}
                disabled={loading}
                className="btn btn-success text-white hover:bg-success/90 transition-colors duration-200"
              >
                <img src={Check} alt="check icon" />
                {loading
                  ? "처리중..."
                  : parsedParticipationId
                    ? "결제하기"
                    : "참여 신청 및 결제하기"}
              </button>

              <button
                onClick={handleBack}
                className="btn btn-ghost hover:bg-gray-100 transition-colors duration-200"
              >
                <img src={Back} alt="arrow-back icon" />
                돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
