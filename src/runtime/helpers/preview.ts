export interface EnabledPreview {
  enabled: true
  token: string
}

export interface DisabledPreview {
  enabled: false
}

export type Preview = EnabledPreview | DisabledPreview;

export const PREVIEW_MODE_COOKIE_NAME = '__datocms_preview_data';

// eslint-disable-next-line antfu/top-level-function
export const isEnabledPreview = (preview: Preview): preview is EnabledPreview => {
  return preview.enabled;
};
