import * as _nuxt_schema from '@nuxt/schema';

interface UseDatoCmsParams {
    query: any;
    variables?: Record<string, any>;
    subscribe?: boolean | 'preview';
}
interface DatoCmsState {
    preview: boolean;
    token: string;
}
interface StructuredTextRoot {
    type: 'root';
    children: Array<StructuredTextNode>;
}
interface StructuredTextBranch {
    type: string;
    children: Array<StructuredTextNode>;
}
interface StructuredTextLeaf {
    type: string;
    [key: string]: any;
}
type StructuredTextNode = StructuredTextBranch | StructuredTextLeaf;
interface StructuredText {
    value: {
        schema: string;
        document: StructuredTextRoot;
    };
}

interface ModuleOptions {
    environment?: string;
    endpoint: string;
    publicReadOnlyToken: string | null;
    privateDraftEnabledToken?: string;
    privatePreviewModePassword?: string;
    privatePreviewModeEncryptionSecret?: string;
    disablePreviewPassword?: boolean;
    registerApiHandlers?: boolean;
    devtools?: boolean;
    datoAdminUrl?: string;
}
declare const _default: _nuxt_schema.NuxtModule<ModuleOptions>;

export { DatoCmsState, ModuleOptions, StructuredText, UseDatoCmsParams, _default as default };
