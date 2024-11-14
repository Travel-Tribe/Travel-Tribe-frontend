import { http, HttpResponse } from "msw";

export const ratingHandler = [
  http.post("api/v1/posts/:postId/rating", async ({ request }) => {
    const response = await request.json();
    return HttpResponse.json(response, { status: 201 });
  }),
];
