import { http, HttpResponse } from "msw";
import { votingStarts } from "./mockData";

export const votingHandler = [
  http.get("/api/v1/posts/:postId/voting-starts", async ({ params }) => {
    const postId = params.postId;
    if (votingStarts.postId === postId) {
      return HttpResponse.json(votingStarts, { status: 200 });
    }
  }),
];
