import { http, HttpResponse } from "msw";
import { votingStarts } from "./mockData";
import { STORAGE_KEYS } from "../Constants/STORAGE_KEYS";

export const votingHandler = [
  http.get('api/v1/posts/:postId/voting-starts', async ({params}) => {
    const postId = params.postId;
    const response = votingStarts.map(voting => String(voting.postId) === postId)
    console.log(response);
    return HttpResponse.json(response, { status: 200 });
  })

];
