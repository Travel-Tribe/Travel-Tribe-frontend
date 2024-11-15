import { http, HttpResponse } from "msw";
import { PaymentsData } from "./mockData";

// 결제 준비 핸들러
export const paymentHandlers = [
  http.post("/api/v1/pay/deposit/ready", async ({ request }) => {
    console.log("MSW: Processing payment ready request");

    // Request body 파싱
    const requestData = (await request.json()) as {
      postId: number;
      participationId: number;
      PGMethod: "KAKAOPAY";
    };

    console.log("Payment ready request data:", requestData);

    // // 새로운 결제 데이터 생성
    // const newPayment = {
    //   depositId: kakaoPayReadyResponse.depositId,
    //   postId: requestData.postId,
    //   participationId: requestData.participationId,
    //   userId: "test-user-id", // 테스트용
    //   amount: 10000,
    //   depositStatus: "UNPAID",
    // };

    // // 결제 데이터 저장
    // PaymentsData.push(newPayment);

    // API 응답
    const response = {
      postId: requestData.postId,
      participationId: requestData.participationId,
      depositId: 12345,
      amount: 10000,
      userId: "test-user-id",
      nextRedirectPcUrl: "https://mockup-kakaopay.com/ready",
    };

    return HttpResponse.json(response, { status: 200 });
  }),

  // 결제 승인 핸들러
  http.put("/api/v1/pay/deposit/success", async ({ request }) => {
    console.log("MSW: Processing payment approval request");

    const requestData = (await request.json()) as {
      pg_token: string;
      depositId: number;
    };

    if (!requestData.pg_token || !requestData.depositId) {
      return new HttpResponse(
        JSON.stringify({
          status: "FAIL",
          errorMessage: "필수 파라미터가 누락되었습니다.",
        }),
        { status: 400 },
      );
    }
    // const payment = PaymentsData.find(
    //   p => p.depositId === String(requestData.depositId),
    // );

    // if (!payment) {
    //   return new HttpResponse(
    //     JSON.stringify({
    //       status: "FAIL",
    //       errorMessage: "결제 정보를 찾을 수 없습니다.",
    //     }),
    //     { status: 404 },
    //   );
    // }

    // // 성공 응답
    // const response = {
    //   data: {
    //     postId: payment.postId,
    //     participationId: payment.participationId,
    //     depositId: payment.depositId,
    //     amount: payment.amount,
    //     paymentMethod: "KAKAOPAY",
    //     status: "SUCCESS",
    //   },
    // };

    return HttpResponse.json({ status: 200 });
  }),

  // 결제 실패 핸들러
  http.put("/api/v1/pay/deposit/fail", async ({ request }) => {
    console.log("MSW: Processing payment failure request");

    // Request body 파싱
    const requestData = (await request.json()) as {
      depositId: number;
    };

    if (!requestData.depositId) {
      return new HttpResponse(
        JSON.stringify({
          status: "FAIL",
          errorMessage: "결제 정보가 누락되었습니다.",
        }),
        { status: 400 },
      );
    }

    // depositId로 결제 정보 찾기
    const payment = PaymentsData.find(
      p => p.depositId === String(requestData.depositId),
    );

    if (!payment) {
      return new HttpResponse(
        JSON.stringify({
          status: "FAIL",
          errorMessage: "결제 정보를 찾을 수 없습니다.",
        }),
        { status: 404 },
      );
    }
    // 실패 응답
    const response = {
      data: {
        status: "FAIL",
        errorMessage: "결제가 취소되었습니다.",
      },
    };

    return HttpResponse.json(response, { status: 200 });
  }),
];
