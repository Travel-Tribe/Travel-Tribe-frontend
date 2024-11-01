import { http, HttpResponse } from "msw";
import { UserMockData, DuplicateMockData } from "./mockData.js";

export const userHandlers = [
  // 회원가입
  http.post("/api/v1/users", async ({ request }) => {
    const newUser = (await request.json()) as {
      username: string;
      password: string;
      email: string;
      nickname: string;
      phone: string;
    };

    console.log("회원가입", newUser);

    UserMockData.push({
      userId: UserMockData.length + 1,
      profileCheck: false,
      ...newUser,
    });

    DuplicateMockData.email.push(newUser.email);
    DuplicateMockData.nickname.push(newUser.nickname);
    DuplicateMockData.phone.push(newUser.phone);

    return HttpResponse.json(
      {
        result: "SUCCESS",
        errors: null,
        data: null,
      },
      { status: 201 },
    );
  }),

  // 로그인
  http.post("/login", async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };
    console.log("login", email, password);

    for (const users of UserMockData) {
      if (users.email === email && users.password === password) {
        return HttpResponse.json(
          {
            result: "SUCCESS",
            errors: null,
            data: {
              id: users.userId,
              profileCheck: users.profileCheck,
            },
          },
          {
            headers: {
              authtoken: "abc-123",
              "Set-Cookie": "refresh=abc-123",
            },
          },
        );
      }
    }

    return HttpResponse.json({}, { status: 201 });
  }),

  // 로그아웃
  http.post("/logout", async ({ cookies }) => {
    console.log("logout");
<<<<<<< HEAD
    if (cookies.refresh) return HttpResponse.json({}, { status: 201 });
    return HttpResponse.json({}, { status: 401 });
=======
    if (cookies.authToken) return HttpResponse.json({}, { status: 201 });
    return HttpResponse.json(
      {
        result: "SUCCESS",
        errors: null,
        data: null,
      },
      { status: 401 },
    );
  }),

  // 내 정보 불러오기
  http.get("/api/v1/users", async () => {
    console.log("내 정보 불러오기");

    return HttpResponse.json(
      {
        result: "SUCCESS",
        errors: null,
        data: {
          id: 1,
          username: "seokseungmin",
          nickname: "SEOK",
          phone: "010-1111-1111",
          email: "seok@gmail.com",
          status: "ACTIVE",
        },
      },
      { status: 201 },
    );
  }),

  // 다른 사람 정보 불러오기
  http.get("/api/v1/users/:userId", async ({ params }) => {
    console.log("다른 사람 정보 불러오기");
    const userId = Number(params.userId);

    for (const users of UserMockData) {
      if (users.userId === userId) {
        return HttpResponse.json(
          {
            result: "SUCCESS",
            errors: null,
            data: {
              id: users.userId,
              username: users.username,
              nickname: users.nickname,
              phone: users.phone,
              email: users.email,
            },
          },
          { status: 201 },
        );
      }
    }
  }),

  // 회원탈퇴
  http.delete("/api/v1/users", async () => {
    console.log("회원탈퇴");

    return HttpResponse.json(
      {
        result: "SUCCESS",
        errors: null,
        data: null,
      },
      { status: 200 },
    );
  }),

  // 이메일 인증
  http.post("api/v1/users/change-email/request", async ({ request }) => {
    const data = (await request.json()) as { email: string };
    console.log("이메일 인증", data);

    return HttpResponse.json(
      {
        result: "SUCCESS",
        errors: null,
        data: null,
      },
      { status: 200 },
    );
  }),

  // 회원 이메일 인증 코드 검증 및 이메일 변경
  http.post("api/v1/users/change-email/verify", async ({ request }) => {
    const data = (await request.json()) as {
      code: string;
      email: string;
    };
    console.log("회원 이메일 인증 코드 검증 및 이메일 변경", data);

    return HttpResponse.json(
      {
        result: "SUCCESS",
        errors: null,
        data: null,
      },
      { status: 200 },
    );
  }),

  // 회원 비밀번호 정보 수정
  http.patch("api/v1/users/password", async ({ request }) => {
    const data = (await request.json()) as {
      password: string;
      newPassword: string;
    };
    console.log("회원 비밀번호 정보 수정", data);

    return HttpResponse.json(
      {
        result: "SUCCESS",
        errors: null,
        data: null,
      },
      { status: 200 },
    );
  }),

  // 비밀번호 초기화
  http.post("api/v1/users/reset-password", async ({ request }) => {
    const data = (await request.json()) as {
      email: string;
    };
    console.log("비밀번호 초기화", data);

    return HttpResponse.json(
      {
        result: "SUCCESS",
        errors: null,
        data: null,
      },
      { status: 200 },
    );
  }),

  // 회원 정보 수정
  http.patch("api/v1/users/Info", async ({ request }) => {
    const data = (await request.json()) as {
      nickname: string;
      phone: string;
    };
    console.log("회원 정보 수정", data);

    return HttpResponse.json(
      {
        result: "SUCCESS",
        errors: null,
        data: null,
      },
      { status: 200 },
    );
>>>>>>> f34d0bde6d4deaf3805c8c461c9c2472ee19cf4f
  }),
];
