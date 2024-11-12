import { http, HttpResponse } from "msw";
import { ParticipationsData } from "./mockData";

export const participationHandlers = [
  // 참여 조회
  http.get("/api/v1/posts/:postId/participations", async ({ params }) => {
    const { postId } = params;

    const response = ParticipationsData.filter(
      participation => participation.postId.toString() === postId,
    ).map(participation => ({
      participationId: participation.participationId,
      postId: participation.postId,
      userId: participation.userId,
      ParticipationStatus: participation.ParticipationStatus,
    }));
    console.log(response);
    return HttpResponse.json(response, { status: 200 });
  }),

  // 참여 신청
  http.post(
    "/api/v1/posts/:postId/participations",
    async ({ request, params }) => {
      let currentParticipationId = ParticipationsData.length + 1;
      const postId = Number(params.postId);

      const response = (await request.json()) as {
        userId: string;
      };

      const newParticipation = {
        participationId: currentParticipationId++,
        postId: postId,
        userId: response.userId,
        ParticipationStatus: "JOIN",
        DepositStatus: "DEPOSIT_PAID",
        RatingStatus: "RATED",
        depositReturnDate: null,
      };

      // 생성된 참여 데이터를 ParticipationsData 배열에 추가
      ParticipationsData.push(newParticipation);

      return HttpResponse.json(newParticipation, { status: 201 });
    },
  ),

  // 참여 삭제
  http.delete("/api/v1/posts/:postId/participations", async () => {
    return HttpResponse.json(ParticipationsData, { status: 201 });
  }),
];
