import { getCookie } from "h3";
import { PREVIEW_MODE_COOKIE_NAME } from "../helpers/preview.mjs";
import { useRuntimeConfig } from "#imports";
export async function getPreviewTokenIfEnabled(event) {
  const runtimeConfig = useRuntimeConfig();
  const cookie = getCookie(event, PREVIEW_MODE_COOKIE_NAME);
  if (!cookie) {
    return { enabled: false };
  }
  const hash = runtimeConfig.datocms.previewModeEncryptionSecret;
  if (cookie === hash) {
    return {
      enabled: true,
      token: runtimeConfig.datocms.privateDraftEnabledToken
    };
  }
  console.warn("User has preview cookie but hash does not match previewModeEncryptionSecret - disabling preview mode for this user");
  return { enabled: false };
}
