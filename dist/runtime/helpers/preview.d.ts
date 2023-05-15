export interface EnabledPreview {
    enabled: true;
    token: string;
}
export interface DisabledPreview {
    enabled: false;
}
export type Preview = EnabledPreview | DisabledPreview;
export declare const PREVIEW_MODE_COOKIE_NAME = "__datocms_preview_data";
export declare const isEnabledPreview: (preview: Preview) => preview is EnabledPreview;
