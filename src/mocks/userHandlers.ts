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
              access: "abc-123",
            },
          },
          {
            headers: {
              access: "abc-123",
              "Set-Cookie": "refresh=abc-123",
            },
          },
        );
      }
    }

    return HttpResponse.json({}, { status: 401 });
  }),

  // 로그아웃
  http.post("/logout", async ({ cookies }) => {
    console.log("logout", cookies);
    if (cookies.refresh)
      return HttpResponse.json(
        {
          result: "SUCCESS",
          errors: null,
          data: null,
        },
        { status: 201 },
      );
    return HttpResponse.json({}, { status: 401 });
  }),

  // 내 정보 불러오기
  http.get("/api/v1/users", async () => {
    console.log("내 정보 불러오기");
    const userID = Number(localStorage.getItem("USER_ID"));

    for (const users of UserMockData) {
      if (users.userId === userID) {
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
              status: "ACTIVE",
            },
          },
          { status: 201 },
        );
      }
    }
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
              mbti: users.mbti,
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
  http.post("/api/v1/users/change-email/request", async ({ request }) => {
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
  http.post("/api/v1/users/change-email/verify", async ({ request }) => {
    const data = (await request.json()) as {
      code: string;
      email: string;
    };
    console.log("인증코드 검증 및 이메일 변경", data);

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
  http.patch("/api/v1/users/password", async ({ request }) => {
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
  http.post("/api/v1/users/reset-password", async ({ request }) => {
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
  http.patch("/api/v1/users/info", async ({ request }) => {
    const userId = Number(localStorage.getItem("USER_ID"));
    console.log("유저 닉네임 변경", userId);

    const data = (await request.json()) as {
      nickname: string;
      phone: string;
    };
    console.log("회원 정보 수정", data);

    // userId에 해당하는 인덱스 찾기
    const userIndex = UserMockData.findIndex(user => user.userId === userId);

    if (userIndex !== -1) {
      // 해당 인덱스의 데이터 업데이트
      UserMockData[userIndex] = {
        ...UserMockData[userIndex], // 기존 데이터 유지
        ...data, // 수정할 데이터 덮어쓰기
      };

      return HttpResponse.json(
        {
          result: "SUCCESS",
          errors: null,
          data: null,
        },
        { status: 200 },
      );
    } else {
      console.error("해당 userId를 가진 사용자가 없습니다.");
      return HttpResponse.json(
        {
          result: "FAILURE",
          errors: "User not found",
          data: null,
        },
        { status: 404 },
      );
    }
  }),
];
