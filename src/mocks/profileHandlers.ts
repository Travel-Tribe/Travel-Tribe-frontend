import { http, HttpResponse } from "msw";
import { UserProfileData } from "./mockData";

export const profileHandlers = [
  // 프로필 정보 불러오기
  http.get("/api/v1/users/:userId/profile", async ({ params }) => {
    console.log("프로필 불러오기");
    const userId = params.userId;
    return HttpResponse.json(UserProfileData[userId], { status: 201 });
  }),

  // 프로필 생성
  http.post("/api/v1/users/:userId/profile", async ({ request, params }) => {
    const userId = params.userId;
    const response: any = request.json();
    console.log("프로필 생성", response);

    UserProfileData[userId] = {
      id: Object.keys(UserProfileData).length + 1,
      ...response,
    };

    return HttpResponse.json(
      {
        result: "SUCCESS",
        errors: null,
        data: null,
      },
      { status: 201 },
    );
  }),

  // 프로필 수정
  http.patch("/api/v1/users/:userId/profile", async ({ request, params }) => {
    const userId = params.userId;
    const response: any = request.json();
    console.log("프로필 수정", response);

    UserProfileData[userId] = {
      ...response,
    };

    return HttpResponse.json(
      {
        result: "SUCCESS",
        errors: null,
        data: null,
      },
      { status: 201 },
    );
  }),
];
