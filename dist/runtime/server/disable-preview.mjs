import { deleteCookie, sendRedirect } from "h3";
import { PREVIEW_MODE_COOKIE_NAME } from "../helpers/preview.mjs";
export async function disablePreview(event) {
  deleteCookie(event, PREVIEW_MODE_COOKIE_NAME);
  const redirectUrl = "/";
  sendRedirect(event, redirectUrl);
  event.node.res.end();
}
