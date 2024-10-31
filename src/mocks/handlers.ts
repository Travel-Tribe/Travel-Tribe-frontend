import { duplicateHandlers } from "./duplicateHandlers";
import { profileHandlers } from "./profileHandlers";
import { userHandlers } from "./userHandlers";

export const handlers = [
  ...userHandlers,
  ...profileHandlers,
  ...duplicateHandlers,
];
