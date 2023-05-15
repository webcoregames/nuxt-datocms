import { ref } from "vue";
import { fetchPublished, subscribeToContentUpdates } from "../../helpers/data-fetching.mjs";
import { useAsyncData, useNuxtApp, useRuntimeConfig } from "#imports";
export async function useDatoQuery({ query, variables = {}, subscribe = true }, asyncData = true, uniqueKey, useAsyncOptions = {}) {
  const { $datoCms } = useNuxtApp();
  const runtimeConfig = useRuntimeConfig();
  const endpoint = runtimeConfig.public.datocms.endpoint;
  const environment = runtimeConfig.public.datocms.environment;
  const { preview, token } = $datoCms.state.value;
  $datoCms.logger.debug("useDatoCms", variables, endpoint, environment);
  if (!token) {
    return { data: ref(null) };
  }
  let response;
  const fetchOptions = {
    endpoint,
    environment,
    token,
    query,
    variables,
    preview
  };
  if (!uniqueKey) {
    uniqueKey = `${JSON.stringify(query).split("{")[0]}${JSON.stringify(variables)}`;
  }
  if (asyncData) {
    response = await useAsyncData(
      uniqueKey,
      async () => {
        try {
          $datoCms.logger.info(`Running async query: ${uniqueKey}`);
          const { data } = await fetchPublished(fetchOptions);
          $datoCms.logger.trace(JSON.stringify(data.value, null, 2));
          $datoCms.logger.debug(`Async query complete: ${uniqueKey}`);
          return data.value;
        } catch (err) {
          $datoCms.logger.error(uniqueKey, err);
          throw err;
        }
      },
      useAsyncOptions
    );
    if (response.error.value) {
      return response;
    }
  } else {
    $datoCms.logger.info(`Running query: ${uniqueKey}`);
    response = await fetchPublished(fetchOptions);
    $datoCms.logger.success(`Query complete: ${uniqueKey}`);
  }
  if (process.client) {
    if (subscribe === true || subscribe === "preview" && preview) {
      return subscribeToContentUpdates({
        environment,
        token,
        query,
        variables,
        includeDrafts: preview,
        initialData: response.data.value
      });
    }
  }
  return response;
}
