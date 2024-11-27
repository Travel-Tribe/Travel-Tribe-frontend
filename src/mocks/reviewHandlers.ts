import { http, HttpResponse } from "msw";
import { ReviewData, ReviewTypes } from "./mockData";

export const reviewHandlers = [
  // 후기 조회
  http.get(
    "/api/v1/posts/:postId/reviews/:reviewId/view",
    async ({ params }) => {
      const postId = params.postId;
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
    const title = url.searchParams.get("title");
    const content = url.searchParams.get("content");
    const continent = url.searchParams.get("continent");
    const country = url.searchParams.get("country");
    const userId = url.searchParams.get("userId");
    const responseData = ReviewData.filter(review => {
      return (
        (title ? review.title.includes(title) : true) &&
        (content ? review.contents.includes(content) : true) &&
        (continent ? review.continent === continent : true) &&
        (country ? review.country === country : true) &&
        (userId ? review.userId === Number(userId) : true)
      );
    }).map(review => ({
      userId: review.userId,
      postId: review.postId,
      reviewId: review.reviewId,
      continent: review.continent,
      country: review.country,
      region: review.region,
      title: review.title,
      contents: review.contents,
      fileAddress: review.files[0]?.fileAddress || null,
    }));
    console.log("responseData", responseData);
    return HttpResponse.json(
      { data: { reviews: responseData } },
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
