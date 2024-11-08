import { useState } from "react";
import fetchCall from "../../Utils/apiFetch";

interface JoinBtnProps {
  postId: string | undefined;
}

export interface PaymentReadyRequest {
  postId: number;
  participationId: number;
  PGMethod: string;
}

export interface ParticipationResponse {
  data: {
    id: number;
  };
}

export interface PaymentReadyResponse {
  data: {
    postId: number;
    participationId: number;
    depositId: number;
    depositStatus: string;
    amount: number;
    userId: string;
    nextRedirectPcUrl: string;
  };
}

export default function JoinBtn({ postId }: JoinBtnProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleJoin = async () => {
    if (!postId) {
      alert("게시글 정보를 찾을 수 없습니다.");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Starting join process for postId:", postId);

      // 1. 참여 신청
      const participationData = await fetchCall<ParticipationResponse>(
        `/api/v1/posts/${postId}/participations`,
        "post",
      );

      console.log("Participation response:", participationData);

      if (!participationData?.data?.id) {
        throw new Error("참여 신청 처리 중 오류가 발생했습니다.");
      }

      // 2. 결제 준비 요청
      const numericPostId = parseInt(postId, 10);
      const paymentReadyRequest: PaymentReadyRequest = {
        postId: numericPostId,
        participationId: participationData.data.id,
        PGMethod: "KAKAO",
      };

      console.log("Sending payment ready request:", paymentReadyRequest);

      const paymentReadyData = await fetchCall<PaymentReadyResponse>(
        "/api/v1/pay/deposit/ready",
        "post",
        paymentReadyRequest,
      );

      console.log("Payment ready response:", paymentReadyData);

      if (!paymentReadyData?.data?.nextRedirectPcUrl) {
        throw new Error("결제 정보를 불러오는데 실패했습니다.");
      }

      // 결제 정보 저장
      const paymentInfo = {
        depositId: paymentReadyData.data.depositId,
        amount: paymentReadyData.data.amount,
        status: paymentReadyData.data.depositStatus,
      };

      console.log("Saving payment info:", paymentInfo);
      localStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));

      // 카카오페이 결제창으로 리다이렉트
      console.log("Redirecting to:", paymentReadyData.data.nextRedirectPcUrl);
      window.location.href = paymentReadyData.data.nextRedirectPcUrl;
    } catch (error) {
      console.error("Error in join process:", error);
      alert(
        error instanceof Error ? error.message : "처리 중 오류가 발생했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="btn btn-success btn-sm text-slate-50 ml-3"
      onClick={handleJoin}
      disabled={isLoading || !postId}
    >
      {isLoading ? "처리 중..." : "참여 신청하기"}
    </button>
  );
}
