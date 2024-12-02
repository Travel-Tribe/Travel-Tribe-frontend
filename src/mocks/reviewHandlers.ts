import { http, HttpResponse } from "msw";
import { ReviewData, ReviewTypes } from "./mockData";

export const reviewHandlers = [
  // 후기 조회
  http.get(
    "/api/v1/posts/:postId/reviews/:reviewId/view",
    async ({ params }) => {
      const reviewId = params.reviewId;
      console.log("후기 글 불러오기");
      return HttpResponse.json(
        { data: ReviewData.find(review => review.reviewId === reviewId) },
        { status: 201 },
      );
    },
  ),
  // 후기 목록 조회
  http.get("/api/v1/reviews", async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "0", 10);
    const limit = 8;
    const start = page * limit;
    const end = start + limit;

    console.log("responseData");

    return HttpResponse.json(
      {
        data: {
          reviews: ReviewData.slice(start, end),
          pageNumber: page, // 예: 0
          pageSize: 8, // 예: 8
          totalElements: ReviewData.length, // 예: 1
          totalPages: Math.ceil(ReviewData.length / 8), // 예: 1
          last: Math.ceil(ReviewData.length / 8) === Number(page), // 예: true
        },
      },
      { status: 201 },
    );
  }),

  // 후기 글 등록
  http.post("/api/v1/posts/{postId}/reviews", async ({ request }) => {
    console.log("후기 글 등록", request.json());
    const newReview = (await request.json()) as ReviewTypes;

    ReviewData.push(newReview);

    return HttpResponse.json(
      {
        data: null,
      },
      { status: 201 },
    );
  }),

  // 후기 수정
  http.put(
    "/api/v1/posts/:postId/reviews/:reviewId",
    async ({ request, params }) => {
      const postId = params.postId;
      const reviewId = params.reviewId;
      const response = (await request.json()) as ReviewTypes;

      ReviewData[reviewId] = { ...response };

      return HttpResponse.json(
        {
          result: "SUCCESS",
          errors: null,
          data: null,
        },
        { status: 201 },
      );
    },
  ),
];
