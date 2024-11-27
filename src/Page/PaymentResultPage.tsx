import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePayment } from "../Hooks/usePayment";

type PaymentStatus = {
  isSuccess: boolean;
  isComplete: boolean;
};

export default function PaymentResultPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({
    isSuccess: false,
    isComplete: false,
  });
  const { approvePayment, loading } = usePayment();

  useEffect(() => {
    const processPayment = async () => {
      const pgToken = searchParams.get("pg_token");
      const depositId = searchParams.get("depositId");

      if (pgToken && depositId) {
        const success = await approvePayment(pgToken, depositId);
        setPaymentStatus({
          isSuccess: success,
          isComplete: true,
        });
      }
    };

    processPayment();
  }, [searchParams, approvePayment]);

  if (loading || !paymentStatus.isComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-info/10 p-6 text-center">
              <div className="mx-auto w-16 h-16 bg-info rounded-full flex items-center justify-center mb-4">
                <div className="animate-spin">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-info">
                결제 승인 진행 중
              </h2>
              <p className="text-gray-600 mt-2">
                결제 승인을 진행하고 있습니다. 잠시만 기다려주세요...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 결제 처리가 완료된 경우에만 결과 화면을 보여줌
  if (paymentStatus.isComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div
              className={`${
                paymentStatus.isSuccess ? "bg-success/10" : "bg-error/10"
              } p-6 text-center`}
            >
              <div
                className={`mx-auto w-16 h-16 ${
                  paymentStatus.isSuccess ? "bg-success" : "bg-error"
                } rounded-full flex items-center justify-center mb-4`}
              >
                {paymentStatus.isSuccess ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <h2
                className={`text-2xl font-bold ${
                  paymentStatus.isSuccess ? "text-success" : "text-error"
                }`}
              >
                {paymentStatus.isSuccess ? "결제 완료" : "결제 실패"}
              </h2>
              <p className="text-gray mt-2">
                {paymentStatus.isSuccess
                  ? "결제가 성공적으로 완료되었습니다!"
                  : "결제가 취소되었거나 실패했습니다."}
              </p>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex flex-col gap-3">
                {!paymentStatus.isSuccess && (
                  <button
                    onClick={() => navigate(-2)}
                    className="btn btn-error text-white hover:bg-error/90 transition-colors duration-200"
                  >
                    다시 시도하기
                  </button>
                )}
                <button
                  onClick={() => navigate("/recruitment")}
                  className={`btn ${
                    paymentStatus.isSuccess ? "btn-white" : "btn-ghost"
                  } hover:bg-success/90 transition-colors duration-200`}
                >
                  여행 목록으로 이동
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
