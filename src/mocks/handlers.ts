import { duplicateHandlers } from "./duplicateHandlers";
import { profileHandlers } from "./profileHandlers";
import { userHandlers } from "./userHandlers";
import { recruitHandlers } from "./recruitHandlers";
import { reviewHandlers } from "./reviewHandlers";
import { participationHandlers } from "./participationHandlers";
import { ratingHandler } from "./ratingHandler";
import { paymentHandlers } from "./paymentHandlers";
import { fileHandler } from "./fileHandler";
import { http, passthrough } from "msw";

export const handlers = [
  ...userHandlers,
  ...profileHandlers,
  ...duplicateHandlers,
  ...participationHandlers,
  ...recruitHandlers,
  ...reviewHandlers,
  ...ratingHandler,
  ...paymentHandlers,
  ...fileHandler,
  http.post("https://maps.googleapis.com/*", async ({}) => {
    return passthrough();
  }),
];
