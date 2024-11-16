import { useCallback, useEffect, useState } from "react";
import fetchCall from "../../../Utils/apiFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { ParticipationsData } from "../../../mocks/mockData";

interface JoinBtnProps {
  postId: number | undefined;
}

export interface PaymentReadyRequest {
  postId: number;
  participationId: number;
  PGMethod: string;
}

export interface PaymentReadyResponse {
  data: {
    tid: string;
    postId: number;
    participationId: number;
    depositId: number;
    depositStatus: string;
    amount: number;
    userId: string;
    nextRedirectPcUrl: string;
  };
}

interface ParticipationResponse {
  data: ParticipationsData;
}

interface ParticipationsData {
  participationId: number;
  postId: number;
  userId: string;
  ParticipationStatus: string;
  DepositStatus: string;
  RatingStatus: string;
  depositReturnDate: string | null;
}

interface SuccessResponse {
  success: boolean;
  message?: string;
}

export default function JoinBtn({ postId }: JoinBtnProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handlePaymentApproval = useCallback(
    async (pgToken: string, depositId: string) => {
      try {
        if (!depositId) {
          throw new Error("결제 정보를 찾을 수 없습니다.");
        }

        const response = await fetchCall<SuccessResponse>(
          "/api/v1/pay/deposit/success",
          "put",
          {
            pg_token: pgToken,
            depositId: depositId,
          },
        );

        if (response?.success) {
          alert("결제가 완료되었습니다.");
        } else {
          throw new Error("결제 승인에 실패했습니다.");
        }
      } catch (error) {
        console.error("Payment approval error:", error);

        // 결제 실패 처리
        try {
          if (depositId) {
            await fetchCall<SuccessResponse>(
              "/api/v1/pay/deposit/fail",
              "put",
              { depositId: depositId },
            );
          }
        } catch (failError) {
          console.error("Failed to record payment failure:", failError);
        }

        alert(
          error instanceof Error
            ? error.message
            : "결제 처리 중 오류가 발생했습니다.",
        );
      } finally {
        navigate("/posts");
      }
    },
    [navigate],
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pgToken = searchParams.get("pg_token");
    const depositId = searchParams.get("depositId");

    if (pgToken && depositId) {
      handlePaymentApproval(pgToken, depositId);
    }
  }, [location, handlePaymentApproval]);

  // 유저 정보 확인
  const checkUserProfile = () => {
    const token = localStorage.getItem("TOKEN");
    const userProfile = localStorage.getItem("ProfileCheck") === "true";

    if (!token) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/signIn");
      return false;
    }

    if (!userProfile) {
      alert("프로필 작성이 필요합니다.");
      navigate("/mypage/myProfileEdit");
      return false;
    }

    return true;
  };

  // 참여하기
  const handleJoin = async () => {
    if (!postId) {
      alert("게시글 정보를 찾을 수 없습니다.");
      return;
    }

    if (!checkUserProfile()) return;

    setIsLoading(true);
    try {
      console.log("Starting join process for postId:", postId);

      // 1. 참여 신청
      const participationData = await fetchCall<ParticipationResponse>(
        `/api/v1/posts/${postId}/participations`,
        "post",
      );

      console.log("Participation response:", participationData);
      console.log(participationData.data.participationId);

      if (!participationData?.data.participationId) {
        throw new Error("참여 신청 처리 중 오류가 발생했습니다.");
      }

      // 2. 결제 준비 요청
      const paymentReadyRequest: PaymentReadyRequest = {
        postId: postId,
        participationId: participationData.data.participationId,
        PGMethod: "KAKAOPAY",
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

      // 카카오 결제 페이지로 리다이렉트
      // depositId를 sessionStorage에 저장
      // sessionStorage.setItem(
      //   "depositId",
      //   String(paymentReadyData.data.depositId),
      // );
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
