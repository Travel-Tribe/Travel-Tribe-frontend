import { http, HttpResponse } from "msw";
import { ParticipationsData } from "./mockData";

export const participantionHandlers = [
  // 참여 조회
  http.get("api/v1/posts/:postId/participations", async () => {
    return HttpResponse.json(ParticipationsData, { status: 201 });
  }),

  // 참여 작성
  http.post("api/v1/posts/:postId/participations", async () => {
    return HttpResponse.json(ParticipationsData, { status: 201 });
  }),

  // 참여 삭제
  http.delete("api/v1/posts/:postId/participations", async () => {
    return HttpResponse.json(ParticipationsData, { status: 201 });
  }),
];
