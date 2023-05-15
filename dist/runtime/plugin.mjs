import consola from "consola";
import { previewAndToken } from "./helpers/data-fetching.mjs";
import { disabledLogger } from "./helpers/logger.mjs";
import { defineNuxtPlugin, useRuntimeConfig, useState } from "#app";
export const DATO_STATE_KEY = "datocms";
let logger = disabledLogger;
export default defineNuxtPlugin(async (_NuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const { preview, token } = await previewAndToken(runtimeConfig);
  const state = useState(DATO_STATE_KEY, () => ({ preview, token }));
  setLogger(consola.withScope("datoCms"));
  return {
    provide: {
      datoCms: {
        state,
        logger,
        setLogger
      }
    }
  };
});
function setLogger(loggerObject) {
  logger = loggerObject;
}
