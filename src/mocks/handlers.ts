import { duplicateHandlers } from "./duplicateHandlers";
import { profileHandlers } from "./profileHandlers";
import { userHandlers } from "./userHandlers";
import { recruitHandlers } from "./recruitHandlers";
import { reviewHandlers } from "./reviewHandlers";
import { participationHandlers } from "./participationHandlers";
import { http, passthrough } from "msw";
import { paymentHandlers } from "./paymentHandlers";

export const handlers = [
  ...userHandlers,
  ...profileHandlers,
  ...duplicateHandlers,
  ...recruitHandlers,
  ...reviewHandlers,
  ...participationHandlers,
  ...paymentHandlers,
  http.post("https://maps.googleapis.com/*", async ({}) => {
    return passthrough();
  }),
];
