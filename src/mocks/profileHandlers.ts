import { http, HttpResponse } from "msw";
import { UserProfileData, UserMockData } from "./mockData";
import { STORAGE_KEYS } from "../constants/STORAGE_KEYS";

const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
export const profileHandlers = [
  // 프로필 정보 불러오기
  http.get("/api/v1/users/:userId/profile", async ({ params }) => {
    console.log("프로필 불러오기");
    const userId = params.userId;
    return HttpResponse.json(
      { data: UserProfileData[userId] },
      { status: 201 },
    );
  }),

  // 프로필 생성
  http.post("/api/v1/users/profile", async ({ request }) => {
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

    const index = UserMockData.findIndex(
      user => user.userId === Number(userId),
    );

    // 인덱스가 존재하는 경우에만 값 업데이트하기
    if (index !== -1) {
      UserMockData[index].profileCheck = true;
      localStorage.setItem("ProfileCheck", JSON.stringify(true));
    }

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
  http.patch("/api/v1/users/profile", async ({ request }) => {
    const response = (await request.json()) as {
      introduction: string;
      mbti: string;
      smoking: string;
      gender: string;
      birth: Date;
      fileAddress: string;
      visitedCountries: string[];
      langAbilities: string[];
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
