import { http, HttpResponse } from "msw";

export const profileHandlers = [
  // 내 정보 불러오기
  http.get("/api/v1/users/:userId/profile", async ({ request }) => {
    console.log("내 정보 불러오기");
    return HttpResponse.json(
      JSON.stringify({
        introduction: "test",
        mbti: "ISTJ",
        smoking: "X",
        gender: "male",
        birth: "2000-01-09",
        fileAddress: "",
        countryName: ["한국", "일본", "베트남"],
        lang: ["영어"],
        rating_avg: 4.5,
      }),
      { status: 201 },
    );
  }),

  // 프로필 생성
  http.post("/api/v1/users/:userId/profile", async ({ request }) => {
    const {
      introduction,
      mbti,
      smoking,
      gender,
      birth,
      fileAddress,
      countryName,
      lang,
    }: any = request.json();
    console.log(
      "프로필 생성",
      introduction,
      mbti,
      smoking,
      gender,
      birth,
      fileAddress,
      countryName,
      lang,
    );

    return HttpResponse.json(JSON.stringify({}), { status: 201 });
  }),

  // 프로필 수정
  http.patch("/api/v1/users/:userId/profile", async ({ request }) => {
    const {
      introduction,
      mbti,
      smoking,
      gender,
      birth,
      fileAddress,
      countryName,
      lang,
    }: any = request.json();
    console.log(
      "프로필 수정",
      introduction,
      mbti,
      smoking,
      gender,
      birth,
      fileAddress,
      countryName,
      lang,
    );

    return HttpResponse.json(JSON.stringify({}), { status: 201 });
  }),
];
