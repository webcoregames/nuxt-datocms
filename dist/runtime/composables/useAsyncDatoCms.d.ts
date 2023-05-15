import type { UseDatoCmsParams } from '../types';
import type { AsyncDataOptions } from '#app';
export declare function useAsyncDatoCms({ query, variables, subscribe }: UseDatoCmsParams, uniqueKey?: string, useAsyncOptions?: AsyncDataOptions<any>): Promise<any>;
