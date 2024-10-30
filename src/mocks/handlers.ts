import { http, HttpResponse } from "msw";

export const handlers = [
  // 회원가입
  http.post("/api/v1/users", async ({ request }) => {
    const newUser: any = await request.json();
    console.log("New User", newUser);
    return HttpResponse.json(JSON.stringify({ message: "회원가입 성공" }), {
      status: 201,
    });
  }),

  // 내 정보 불러오기
  http.get("/api/v1/users/:userId/profile", async ({ request }) => {
    console.log("Get User");
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

  // 중복 검사
  // `/api/v1/users/duplicate?type=${type}&query=&{query}`
  http.post("/api/v1/users/duplicate", async ({ request }) => {
    const { type, query }: any = await request.json();
    console.log("duplicate", type, query);
    return HttpResponse.json(true, {
      status: 201,
    });
  }),

  // 로그인
  http.post("/login", async ({ request }) => {
    const { email, password }: any = await request.json();
    console.log("login", email, password);
    return HttpResponse.json(
      {
        header: {
          access: "Bearer token", // token?
        },
        body: {
          user_id: "123",
          profileCheck: "false",
        },
      },
      { status: 201 },
    );
  }),

  // 로그아웃 Cookie 전송?
  http.post("/logout", async ({ request }) => {
    console.log("logout");
    return HttpResponse.json(
      {
        header: {
          refreshToken: "Bearer token", // token?
        },
      },
      { status: 201 },
    );
  }),
];
