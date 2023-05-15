import type { UseDatoCmsParams } from '../../types';
import type { AsyncDataOptions } from '#app';
export declare function useDatoQuery({ query, variables, subscribe }: UseDatoCmsParams, asyncData?: boolean, uniqueKey?: string, useAsyncOptions?: AsyncDataOptions<any>): Promise<any>;
