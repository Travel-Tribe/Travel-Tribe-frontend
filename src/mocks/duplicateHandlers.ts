import { http, HttpResponse } from "msw";
import { DuplicateMockData } from "./mockData.js";

export const duplicateHandlers = [
  // 중복 검사
  // `/api/v1/users/duplicate?type=${type}&query=&{query}`
  http.post("/api/v1/users/duplicate", async ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    const query = url.searchParams.get("query");
    console.log("중복 검사", type, query);

    if (!DuplicateMockData[type].includes(query)) {
      return HttpResponse.json(false, {
        status: 409,
      });
    }

    return HttpResponse.json(true, {
      status: 201,
    });
  }),
];
