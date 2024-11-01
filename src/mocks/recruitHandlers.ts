import { http, HttpResponse } from "msw";
import { RecruitMockData, TravelPlan } from "./mockData";

export const recruitHandlers = [
  // 모집 글 목록 불러오기
  http.get("api/v1/posts", async () => {
    console.log("모집 글 목록 불러오기");
    return HttpResponse.json(RecruitMockData, { status: 201 });
  }),

  // 모집 글 상세보기
  http.get("/api/v1/posts/:postId", async ({ params }) => {
    console.log("모집 글 상세보기");
    const postId = params.postId;
    return HttpResponse.json(
      RecruitMockData.find(recruitment => recruitment.id === postId),
      { status: 201 },
    );
  }),

  // 모집 글 삭제
  http.delete("/api/v1/posts/:postId", async ({ params }) => {
    console.log("모집 글 삭제");
    const postId = params.postId;
    return HttpResponse.json(
      RecruitMockData.filter(recruitment => recruitment.id !== postId),
      { status: 201 },
    );
  }),

  // 모집 글 수정
  http.put("/api/v1/posts/:postId", async ({ request, params }) => {
    console.log("모집 글 수정");
    const postId = params.postId;
    const newPostData = (await request.json()) as TravelPlan;
    const replaceIndex = RecruitMockData.reduce((indexes, plan, index) => {
      if (plan.title === postId) {
        indexes.push(index);
      }
      return indexes;
    }, [] as number[]);

    RecruitMockData.splice(replaceIndex[0], 1, newPostData);

    return HttpResponse.json(
      {
        data: null,
      },
      { status: 201 },
    );
  }),

  // 모집 글 등록
  http.post("/api/v1/posts", async ({ request }) => {
    console.log("모집 글 등록", request.json());
    const newData = (await request.json()) as TravelPlan;

    RecruitMockData.push(newData);

    return HttpResponse.json(
      {
        data: null,
      },
      { status: 201 },
    );
  }),
];
