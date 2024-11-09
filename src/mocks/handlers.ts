import { duplicateHandlers } from "./duplicateHandlers";
import { profileHandlers } from "./profileHandlers";
import { userHandlers } from "./userHandlers";
import { recruitHandlers } from "./recruitHandlers";
import { http, passthrough } from "msw";

export const handlers = [
  ...userHandlers,
  ...profileHandlers,
  ...duplicateHandlers,
  ...recruitHandlers,

  http.post("https://maps.googleapis.com/*", async ({}) => {
    return passthrough();
  }),
];
