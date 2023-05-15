import { createError, getQuery, sendError, sendRedirect, setCookie } from "h3";
import { PREVIEW_MODE_COOKIE_NAME } from "../helpers/preview.mjs";
import { useRuntimeConfig } from "#imports";
export async function enablePreview(event) {
  const runtimeConfig = useRuntimeConfig();
  const query = getQuery(event);
  const disablePreviewPassword = runtimeConfig.public.datocms.disablePreviewPassword;
  const password = runtimeConfig.datocms.previewModePassword;
  let error = null;
  if (!runtimeConfig.datocms.previewModeEncryptionSecret) {
    error = "previewModeEncryptionSecret key not set - cannot enable preview mode";
  }
  if (!disablePreviewPassword) {
    if (!password) {
      error = "No password set for preview mode - ensure it is set in the environment variables to access preview mode";
    } else if (query.secret !== password) {
      error = "Missing or invalid `secret` query string parameter!";
    }
  }
  if (error) {
    sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: error,
        message: error
      })
    );
    return;
  }
  const hash = runtimeConfig.datocms.previewModeEncryptionSecret;
  setCookie(event, PREVIEW_MODE_COOKIE_NAME, hash);
  let redirectUrl = Array.isArray(query.redirect) ? query.redirect[0] : typeof query.redirect === "string" ? query.redirect : "/";
  if (!redirectUrl || typeof redirectUrl !== "string") {
    redirectUrl = "/";
  }
  sendRedirect(event, redirectUrl);
  event.node.res.end();
}
