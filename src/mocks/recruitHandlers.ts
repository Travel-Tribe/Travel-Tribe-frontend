import { http, HttpResponse } from "msw";
import { RecruitMockData, TravelPlan } from "./mockData";

export const recruitHandlers = [
  // 모집 글 목록 불러오기
  http.get("/api/v1/posts?page=:num", async ({ params }) => {
    console.log("모집 글 목록 불러오기");
    return HttpResponse.json(
      {
        data: { content: RecruitMockData },
        pageNumber: params.num, // 예: 0
        pageSize: 8, // 예: 8
        totalElements: RecruitMockData.length, // 예: 1
        totalPages: Math.ceil(RecruitMockData.length / 8), // 예: 1
        last: Math.ceil(RecruitMockData.length / 8) === Number(params.num), // 예: true
      },
      { status: 201 },
    );
  }),

  // 모집 글 상세보기
  http.get("/api/v1/posts/:postId", async ({ params }) => {
    console.log("모집 글 상세보기");
    const postIdParam = Array.isArray(params.postId)
      ? params.postId[0]
      : params.postId;

    const postId = parseInt(postIdParam);

    return HttpResponse.json(
      {
        data: RecruitMockData.find(
          recruitment => recruitment.postId === postId,
        ),
      },
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
      return new HttpResponse(null, { status: 404 });
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
    const newData = (await request.json()) as TravelPlan;

    RecruitMockData.push(newData);
    console.log("모집 글 등록", newData);
    console.log(RecruitMockData);

    return HttpResponse.json(
      {
        data: null,
      },
      { status: 201 },
    );
  }),
];
