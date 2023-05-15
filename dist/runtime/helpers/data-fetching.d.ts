import type { RuntimeConfig } from '@nuxt/schema';
import type { Ref } from 'vue';
import type { ConnectionStatus } from 'datocms-listen';
export declare function fetchPublished({ endpoint, token, preview, query, variables, environment, }: {
    endpoint: string;
    token: string;
    preview: boolean;
    query: any;
    variables: Record<string, any>;
    environment?: string;
}): Promise<{
    data: Ref<any>;
}>;
export declare function subscribeToContentUpdates({ query, variables, token, initialData, environment, includeDrafts, }: {
    query: any;
    variables?: Record<string, any>;
    token: string;
    initialData: any;
    environment?: string;
    includeDrafts?: boolean;
}): {
    data: Ref<any>;
    status: Ref<ConnectionStatus>;
    error: Ref<{
        code: string;
        message: string;
        fatal: boolean;
        response?: any;
    } | null>;
};
/**
 * Retrieve an object containing a boolean for preview mode, and a string for the token to use for this request.
 * The token retrieved is dependent on if preview mode is active or not. If it's active (a preview-cookie is found)
 * then it will attempt to retrieve a preview-enabled token from the server to make the request with.
 * If it cannot be retrieved, this function will error.
 */
export declare function previewAndToken(runtimeConfig: RuntimeConfig): Promise<{
    preview: boolean;
    token: string;
}>;
/**
 * Get a token that can be used in preview mode to view drafts
 * For security, we do not bundle this in the client distributable. So, from the client, we must use
 * retrieve it from a serverless function, where we can access the private token from env.
 */
export declare function draftEnabledToken(runtimeConfig: RuntimeConfig): Promise<any>;
/**
 * Get the read-only, non-draft token for regular use of the CMS.
 */
export declare function publicReadOnlyToken(runtimeConfig: RuntimeConfig): Promise<string>;
