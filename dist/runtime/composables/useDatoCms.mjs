import { useDatoQuery } from "./shared/useDatoQuery.mjs";
export async function useDatoCms({ query, variables = {}, subscribe = true }) {
  return useDatoQuery({ query, variables, subscribe }, false);
}
