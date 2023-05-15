import { useDatoQuery } from "./shared/useDatoQuery.mjs";
export async function useAsyncDatoCms({ query, variables = {}, subscribe = true }, uniqueKey, useAsyncOptions = {}) {
  return useDatoQuery({ query, variables, subscribe }, true, uniqueKey, useAsyncOptions);
}
