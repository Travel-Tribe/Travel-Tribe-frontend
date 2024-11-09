import { http, HttpResponse } from "msw";
import { RecruitMockData, TravelPlan } from "./mockData";

export const recruitHandlers = [
  // 모집 글 목록 불러오기
  http.get("/api/v1/posts", async () => {
    console.log("모집 글 목록 불러오기");
    return HttpResponse.json({ post: RecruitMockData }, { status: 201 });
  }),

  // 모집 글 상세보기
  http.get("/api/v1/posts/:postId", async ({ params }) => {
    console.log("모집 글 상세보기");
    const postIdParam = Array.isArray(params.postId)
      ? params.postId[0]
      : params.postId;

    const postId = parseInt(postIdParam);

    return HttpResponse.json(
      RecruitMockData.filter(recruitment => recruitment.postId === postId),
      { status: 201 },
    );
  }),

  // 모집 글 삭제
  http.delete("/api/v1/posts/:postId", async ({ params }) => {
    console.log("모집 글 삭제");
    const postId = parseInt(params.postId as string);

    // 삭제할 게시글이 존재하는지 확인
    const postExists = RecruitMockData.some(
      recruitment => recruitment.postId === postId,
    );

    if (!postExists) {
      return new HttpResponse(null, { status: 404 }); // Not Found
    }

    // 게시글 삭제 (필터링)
    RecruitMockData.filter(recruitment => recruitment.postId !== postId);

    return new HttpResponse(null, { status: 204 }); // No Content
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
