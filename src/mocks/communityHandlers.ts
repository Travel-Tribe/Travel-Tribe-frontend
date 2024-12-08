import { http, HttpResponse } from "msw";
import { CommunityData } from "./mockData";
import { CommunityType } from "../type/types";

export const communityHandlers = [
  http.get("/api/v1/communities", async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "0", 10);
    const limit = 8;
    const start = page * limit;
    const end = start + limit;
    console.log("커뮤니티 글 목록");

    return HttpResponse.json(
      {
        data: {
          content: CommunityData.slice(start, end),
          pageNumber: page, // 예: 0
          pageSize: 8, // 예: 8
          totalElements: CommunityData.length, // 예: 1
          totalPages: Math.ceil(CommunityData.length / 8), // 예: 1
          last: Math.ceil(CommunityData.length / 8) === Number(page), // 예: true
        },
      },
      {
        status: 201,
      },
    );
  }),
  http.get("/api/v1/communities/:id", async ({ params }) => {
    console.log(`${params.id}번 커뮤니티 글`);

    return HttpResponse.json(
      {
        data: CommunityData.find(
          ({ communityId }) => communityId === Number(params.id),
        ),
      },
      {
        status: 201,
      },
    );
  }),

  http.delete("/api/v1/communities/:id", async ({ params }) => {
    console.log("커뮤니티 글 삭제");

    // 삭제할 게시글이 존재하는지 확인
    const postExists = CommunityData.some(
      data => data.communityId === Number(params.id),
    );

    if (!postExists) {
      return new HttpResponse(null, { status: 404 });
    }

    // 게시글 삭제 (필터링)
    CommunityData.filter(
      ({ communityId }) => communityId === Number(params.id),
    );

    return new HttpResponse(null, { status: 204 }); // No Content
  }),

  http.put("/api/v1/communities/:id", async ({ request, params }) => {
    console.log("커뮤니티 글 수정");
    const newPostData = (await request.json()) as CommunityType;
    const replaceIndex = CommunityData.reduce((indexes, cur, index) => {
      if (cur.communityId === Number(params.id)) {
        indexes.push(index);
      }
      return indexes;
    }, [] as number[]);

    CommunityData.splice(replaceIndex[0], 1, newPostData);

    return HttpResponse.json(
      {
        data: null,
      },
      { status: 201 },
    );
  }),

  http.post("/api/v1/communities", async ({ request }) => {
    const newData = (await request.json()) as CommunityType;

    CommunityData.push(newData);
    console.log("커뮤니티 글 등록", newData);
    console.log(CommunityData);

    return HttpResponse.json(
      {
        data: null,
      },
      { status: 201 },
    );
  }),
];
