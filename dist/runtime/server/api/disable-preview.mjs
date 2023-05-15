import { eventHandler } from "h3";
import { disablePreview } from "../disable-preview.mjs";
export default eventHandler(async (event) => {
  return disablePreview(event);
});
