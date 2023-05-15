import { useQuerySubscription } from "vue-datocms";
import { ref } from "vue";
import { PREVIEW_MODE_COOKIE_NAME, isEnabledPreview } from "./preview.mjs";
import { useCookie } from "#app";
export async function fetchPublished({
  endpoint,
  token,
  preview,
  query,
  variables,
  environment
}) {
  const data = ref(null);
  let fullEndpoint = endpoint;
  if (environment) {
    fullEndpoint = `${fullEndpoint}/environments/${environment}`;
  }
  if (preview) {
    fullEndpoint = `${fullEndpoint}/preview`;
  }
  const fetchedData = await fetch(
    fullEndpoint,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        query,
        variables
      })
    }
  ).then((response) => response.json());
  if ("errors" in fetchedData) {
    throw JSON.stringify(fetchedData.errors);
  }
  if ("data" in fetchedData) {
    data.value = fetchedData.data;
  }
  return { data };
}
export function subscribeToContentUpdates({
  query,
  variables = {},
  token,
  initialData,
  environment,
  includeDrafts = false
}) {
  return useQuerySubscription({
    query,
    variables,
    token,
    initialData,
    environment,
    includeDrafts
  });
}
export async function previewAndToken(runtimeConfig) {
  let preview = isPreviewEnabled(runtimeConfig);
  let token;
  if (preview) {
    token = await draftEnabledToken(runtimeConfig);
  }
  if (!token) {
    preview = false;
    token = await publicReadOnlyToken(runtimeConfig);
  }
  return {
    preview,
    token
  };
}
function isPreviewEnabled(_runtimeConfig) {
  const cookie = useCookie(PREVIEW_MODE_COOKIE_NAME);
  return !!cookie.value;
}
export async function draftEnabledToken(runtimeConfig) {
  if (process.server) {
    return runtimeConfig.datocms.privateDraftEnabledToken;
  }
  if (process.client) {
    const preview = await $fetch("/api/preview");
    if (isEnabledPreview(preview)) {
      return preview.token;
    }
  }
  return void 0;
}
export async function publicReadOnlyToken(runtimeConfig) {
  return runtimeConfig.public.datocms.publicReadOnlyToken;
}
