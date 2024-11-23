import { useParticipation, usePayment } from "./usePayment";

export const usePaymentFlow = () => {
  const { handleParticipation, loading: participationLoading } =
    useParticipation();
  const {
    requestPayment,
    approvePayment,
    loading: paymentLoading,
  } = usePayment();

  // Case 1: 참여부터 시작하는 케이스
  const handlePaymentWithParticipation = async (postId: number) => {
    try {
      const participationId = await handleParticipation(postId);
      const nextRedirectPcUrl = await requestPayment({
        postId,
        participationId,
      });
      window.location.href = nextRedirectPcUrl;
    } catch (error) {
      console.error("Payment flow failed:", error);
    }
  };

  // Case 2: 이미 참여 ID가 있는 케이스
  const handleDirectPayment = async (
    postId: number,
    participationId: number,
  ) => {
    try {
      const nextRedirectPcUrl = await requestPayment({
        postId,
        participationId,
      });
      window.location.href = nextRedirectPcUrl;
    } catch (error) {
      console.error("Direct payment failed:", error);
    }
  };

  return {
    handlePaymentWithParticipation,
    handleDirectPayment,
    approvePayment,
    loading: participationLoading || paymentLoading,
  };
};
