import { http, HttpResponse } from "msw";
import { DuplicateMockData } from "./mockData.js";

export const duplicateHandlers = [
  // 중복 검사
  http.get("/api/v1/users/duplicate", async ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    const query = url.searchParams.get("query");
    console.log("중복 검사");

    if (DuplicateMockData[type].includes(query)) {
      return HttpResponse.json(true, {
        status: 409,
      });
    }

    return HttpResponse.json(false, {
      status: 201,
    });
  }),
];
