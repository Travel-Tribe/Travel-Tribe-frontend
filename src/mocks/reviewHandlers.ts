import { http, HttpResponse } from "msw";
import { reviewData, Review } from "./mockData";

export const reviewHandlers = [
  // 후기 조회
  http.get("api/v1/posts/:postId/reviews/:reviewId", async ({ params }) => {
    const postId = params.postId;
    const reviewId = params.reviewId;
    console.log("후기 글 불러오기");
    return HttpResponse.json(
      reviewData.find(review => review.reviewId === reviewId),
      { status: 201 },
    );
  }),
  // 후기 목록 조회
  http.get("api/v1/reviews", async () => {
    return HttpResponse.json({ reviews: reviewData }, { status: 201 });
  }),

  // 후기 글 등록
  http.post("api/v1/posts/{postId}/reviews", async ({ request }) => {
    console.log("후기 글 등록", request.json());
    const newReview = (await request.json()) as Review;

    reviewData.push(newReview);

    return HttpResponse.json(
      {
        data: null,
      },
      { status: 201 },
    );
  }),

  // 후기 수정
  http.put("api/v1/posts/:postId/reviews/:reviewId", async ({ params }) => {
    const postId = params.postId;
    const reviewId = params.reviewId;
  }),
];
