import { duplicateHandlers } from "./duplicateHandlers";
import { profileHandlers } from "./profileHandlers";
import { userHandlers } from "./userHandlers";
import { recruitHandlers } from "./recruitHandlers";
import { reviewHandlers } from "./reviewHandlers";
import { participationHandlers } from "./participationHandlers";
import { ratingHandler } from "./ratingHandler";
import { paymentHandlers } from "./paymentHandlers";
import { http, passthrough } from "msw";

export const handlers = [
  ...userHandlers,
  ...profileHandlers,
  ...duplicateHandlers,
  ...recruitHandlers,
  ...reviewHandlers,
  ...participationHandlers,
  ...ratingHandler,
  ...paymentHandlers,
  http.post("https://maps.googleapis.com/*", async ({}) => {
    return passthrough();
  }),
];
