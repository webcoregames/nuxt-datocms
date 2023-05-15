import { eventHandler } from "h3";
import { getPreviewTokenIfEnabled } from "../get-preview-token-if-enabled.mjs";
export default eventHandler(async (event) => {
  return getPreviewTokenIfEnabled(event);
});
