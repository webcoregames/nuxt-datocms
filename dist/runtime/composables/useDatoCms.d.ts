/**
 * This file is originally based off of the DatoCMS Nuxt example. Permalink is here (check repo for updates):
 * https://github.com/datocms/nuxtjs-demo/blob/39dd69e1ecf5356fd1855a8cf8250e649cdc159b/composables/useGraphqlQuery.ts
 */
import type { UseDatoCmsParams } from '../types';
export declare function useDatoCms({ query, variables, subscribe }: UseDatoCmsParams): Promise<any>;
