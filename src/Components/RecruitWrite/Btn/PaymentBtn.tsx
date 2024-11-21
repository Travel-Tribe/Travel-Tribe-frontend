import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fetchCall from "../../../Utils/apiFetch";
import {
  PaymentReadyRequest,
  PaymentReadyResponse,
  SuccessResponse,
} from "../../RecruitDetail/Buttons/JoinBtn";

interface PaymentBtnProps {
  postId?: number;
  participationId?: number;
}

const PaymentBtn = React.memo(
  ({ postId, participationId }: PaymentBtnProps) => {
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

          if (response?.data.result === "SUCCESS") {
            alert("결제가 완료되었습니다.");
          } else {
            throw new Error("결제 승인에 실패했습니다.");
          }
        } catch (error) {
          console.error("Payment approval error:", error);

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
          navigate("/");
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

    const handlePost = async () => {
      setIsLoading(true);
      try {
        // 3. 결제 준비 요청
        const paymentReadyRequest: PaymentReadyRequest = {
          postId: postId,
          participationId: participationId,
          PGMethod: "KAKAOPAY",
        };

        const paymentReadyData = await fetchCall<PaymentReadyResponse>(
          "/api/v1/pay/deposit/ready",
          "post",
          paymentReadyRequest,
        );

        if (!paymentReadyData?.data?.data.nextRedirectPcUrl) {
          throw new Error("결제 정보를 불러오는데 실패했습니다.");
        }

        // 4. 결제 페이지로 이동
        window.location.href = paymentReadyData.data.data.nextRedirectPcUrl;
      } catch (error) {
        console.error("Error in process:", error);
        alert(
          error instanceof Error
            ? error.message
            : "처리 중 오류가 발생했습니다.",
        );
        navigate("/recruitment"); // 에러 발생 시 목록으로 이동
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <button
        className="btn w-[130px] h-[35px] bg-custom-green text-white"
        onClick={handlePost}
        disabled={isLoading}
      >
        {isLoading ? "처리 중..." : "등록하기"}
      </button>
    );
  },
);

export default PaymentBtn;
