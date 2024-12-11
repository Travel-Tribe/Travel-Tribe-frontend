import { useState, useCallback } from "react";
import fetchCall from "../Utils/apiFetch";
import { ERROR } from "../Constants/MESSAGE";

interface ParticipationResponse {
  data: {
    data: {
      participationId: number;
    };
  };
}

interface PaymentReadyResponse {
  data: {
    data: {
      nextRedirectPcUrl: string;
    };
  };
}

interface PaymentApprovalResponse {
  data: {
    result: string;
  };
}

interface PaymentParams {
  postId: number;
  participationId?: number;
}

// 참여 로직을 처리하는 훅
export const useParticipation = () => {
  const [loading, setLoading] = useState(false);

  const handleParticipation = async (postId: number) => {
    setLoading(true);
    try {
      const participationData = await fetchCall<ParticipationResponse>(
        `/api/v1/posts/${postId}/participations`,
        "post",
      );

      if (!participationData?.data.data.participationId) {
        throw new Error(ERROR.PARTICIPATION);
      }

      return participationData.data.data.participationId;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.[0]?.errorMessage;
      alert(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { handleParticipation, loading };
};

// 결제 관련 모든 로직을 처리하는 통합된 훅
export const usePayment = () => {
  const [loading, setLoading] = useState(false);

  // 결제 요청
  const requestPayment = async ({ postId, participationId }: PaymentParams) => {
    setLoading(true);
    try {
      const paymentReadyData = await fetchCall<PaymentReadyResponse>(
        "/api/v1/pay/deposit/ready",
        "post",
        {
          postId,
          participationId,
          PGMethod: "KAKAOPAY",
        },
      );

      if (!paymentReadyData?.data?.data.nextRedirectPcUrl) {
        throw new Error(ERROR.PAY_LOAD_FAIL);
      }

      return paymentReadyData.data.data.nextRedirectPcUrl;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : ERROR.DEFAULT;
      alert(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 결제 승인
  const approvePayment = useCallback(
    async (pgToken: string, depositId: string) => {
      setLoading(true);
      try {
        if (!depositId) {
          throw new Error(ERROR.PAY_INFO_FAIL);
        }

        const response = await fetchCall<PaymentApprovalResponse>(
          "/api/v1/pay/deposit/success",
          "put",
          {
            pg_token: pgToken,
            depositId: depositId,
          },
        );

        if (response?.data.result === "SUCCESS") {
          return true;
        } else {
          throw new Error(ERROR.PAY_APPROVE_FAIL);
        }
      } catch (error) {
        console.error("Payment approval error:", error);

        try {
          if (depositId) {
            await fetchCall("/api/v1/pay/deposit/fail", "put", {
              depositId: depositId,
            });
          }
        } catch (failError) {
          console.error("Failed to record payment failure:", failError);
        }
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { requestPayment, approvePayment, loading };
};
