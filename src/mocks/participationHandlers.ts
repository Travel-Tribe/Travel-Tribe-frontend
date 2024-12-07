import { http, HttpResponse } from "msw";
import { ParticipationsData } from "./mockData";
import { STORAGE_KEYS } from "../Constants/STORAGE_KEYS";

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
    }));
    console.log("Participations found:", response);
    return HttpResponse.json({ data: response }, { status: 200 });
  }),

  // 참여 신청
  http.post("/api/v1/posts/:postId/participations", async ({ params }) => {
    console.log("MSW: Creating new participation");

    const currentParticipationId = ParticipationsData.length + 1;
    const postId = Number(params.postId);

    // const response = (await request.json()) as {
    //   userId: string;
    // };

    const newParticipation = {
      participationId: currentParticipationId,
      postId: postId,
      userId: "test-user-id",
      ParticipationStatus: "JOIN",
      DepositStatus: "UNPAID",
      RatingStatus: "NOT_RATED",
      depositReturnDate: null,
    };

    // 생성된 참여 데이터를 ParticipationsData 배열에 추가
    ParticipationsData.push(newParticipation);
    console.log("New participation created:", newParticipation);
    return HttpResponse.json({ data: newParticipation }, { status: 201 });
  }),

  // 참여 삭제
  http.delete("/api/v1/posts/:postId/participations", async () => {
    return HttpResponse.json(
      {
        data: null,
      },
      { status: 201 },
    );
  }),

  // http.get("/api/v1/posts/participations", async () => {
  //   const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);

  //   const response = ParticipationsData.filter(
  //     participation => String(participation.userId) === String(userId),
  //     // &&participation.ParticipationStatus === "TRAVEL_FINISHED", // 타입 일치 비교
  //   ).map(participation => ({
  //     participationId: participation.participationId,
  //     postId: participation.postId,
  //     ParticipationStatus: participation.ParticipationStatus,
  //   }));

  //   console.log("Participations found:", response);
  //   return HttpResponse.json(response, { status: 200 });
  // }),

  http.get("/api/v1/posts/participations/by-travelfinished", async () => {
    const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);

    const response = ParticipationsData.filter(
      participation => String(participation.userId) === String(userId),
      // && participation.ParticipationStatus === "TRAVEL_FINISHED", // 타입 일치 비교
    ).map(participation => ({
      participationId: participation.participationId,
      postId: participation.postId,
      ParticipationStatus: participation.ParticipationStatus,
      ratingStatus: participation.ratingStatus,
    }));

    console.log("Participations found:", response);
    return HttpResponse.json(response, { status: 200 });
  }),

  http.get("/api/v1/posts/participations/by-join-joinready", async () => {
    const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);

    const response = ParticipationsData.filter(
      participation => String(participation.userId) === String(userId),
      // &&participation.ParticipationStatus === "TRAVEL_FINISHED", // 타입 일치 비교
    ).map(participation => ({
      participationId: participation.participationId,
      postId: participation.postId,
      ParticipationStatus: participation.ParticipationStatus,
      ratingStatus: participation.ratingStatus,
    }));

    console.log("Participations found:", response);
    return HttpResponse.json(response, { status: 200 });
  }),
];
