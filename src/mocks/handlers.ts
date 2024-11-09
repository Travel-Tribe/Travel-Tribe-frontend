import { duplicateHandlers } from "./duplicateHandlers";
import { profileHandlers } from "./profileHandlers";
import { userHandlers } from "./userHandlers";
import { recruitHandlers } from "./recruitHandlers";
import { reviewHandlers } from "./reviewHandlers";

export const handlers = [
  ...userHandlers,
  ...profileHandlers,
  ...duplicateHandlers,
  ...recruitHandlers,
  ...reviewHandlers,
];
