import { http, HttpResponse } from "msw";
import { UserMockData, DuplicateMockData } from "./mockData.js";

export const userHandlers = [
  // 회원가입
  http.post("/api/v1/users", async ({ request }) => {
    const newUser: any = await request.json();
    console.log("회원가입", newUser);

    UserMockData.push({
      userId: newUser.length + 1,
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
    const { email, password }: any = await request.json();
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
            headers: { Authorization: "abc-123" },
          },
        );
      }
    }

    return HttpResponse.json({}, { status: 201 });
  }),

  http.post("/logout", async ({ cookies }) => {
    console.log("logout");
    if (cookies.authToken) return HttpResponse.json({}, { status: 201 });
    return HttpResponse.json({}, { status: 401 });
  }),
];
