import { http, HttpResponse } from "msw";
import { UserProfileData } from "./mockData";

export const profileHandlers = [
<<<<<<< HEAD
  // 내 정보 불러오기
  http.get("/api/v1/users/:userId/profile", async () => {
    return HttpResponse.json(
      {
        nickname: "테스트닉네임",
        introduction: "test",
        mbti: "ISTJ",
        smoking: "X",
        gender: "male",
        birth: "2000-01-09",
        fileAddress: "",
        countryName: ["한국", "일본", "베트남"],
        lang: ["영어"],
        rating_avg: 4.5,
=======
  // 프로필 정보 불러오기
  http.get("/api/v1/users/:userId/profile", async ({ params }) => {
    console.log("프로필 불러오기");
    const userId = params.userId;
    return HttpResponse.json(UserProfileData[userId], { status: 201 });
  }),

  // 프로필 생성
  http.post("/api/v1/users/:userId/profile", async ({ request, params }) => {
    const userId = params.userId;
    const response = (await request.json()) as {
      introduction: string;
      mbti: string;
      smoking: string;
      gender: string;
      birth: Date;
      fileAddress: string;
      countryName: string[];
      lang: string[];
    };
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
>>>>>>> 0a14c0a15bfa4f776f61c13e5a67e3b50500bbb2
      },
      { status: 201 },
    );
  }),

  // 프로필 수정
  http.patch("/api/v1/users/:userId/profile", async ({ request, params }) => {
    const userId = params.userId;
    const response = (await request.json()) as {
      introduction: string;
      mbti: string;
      smoking: string;
      gender: string;
      birth: Date;
      fileAddress: string;
      countryName: string[];
      lang: string[];
    };
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
