import { http, HttpResponse } from "msw";
import { votingStarts } from "./mockData";
import { STORAGE_KEYS } from "../Constants/STORAGE_KEYS";

export const votingHandler = [
  http.get('/api/v1/posts/:postId/voting-starts', async ({params}) => {
    const postId = params.postId;
    if(votingStarts.postId === postId){
      return HttpResponse.json(votingStarts, { status: 200 });
    }
    // const response = votingStarts.map(voting => String(voting.postId) === postId)
    // return HttpResponse.json(votingStarts, { status: 200 });
  })
];
