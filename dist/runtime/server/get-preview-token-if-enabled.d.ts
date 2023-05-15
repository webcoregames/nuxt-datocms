import type { H3Event } from 'h3';
/**
 * Can be added to a serverless function to get the preview token, if preview is enabled.
 * We check an encrypted cookie to determine if preview mode is enabled already or not.
 * It is enabled and disabled via separate endpoints.
 */
export declare function getPreviewTokenIfEnabled(event: H3Event): Promise<{
    enabled: boolean;
    token?: undefined;
} | {
    enabled: boolean;
    token: any;
}>;
