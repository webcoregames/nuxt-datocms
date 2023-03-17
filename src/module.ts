import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addImports,
  addImportsDir,
  addComponent,
  useLogger,
  addServerHandler,
} from '@nuxt/kit';
import { defu } from 'defu';

// Module options TypeScript interface definition
export interface ModuleOptions {
  environment?: string
  endpoint: string
  publicReadOnlyToken: string | null
  privateDraftEnabledToken?: string
  privatePreviewModePassword?: string
  privatePreviewModeEncryptionSecret?: string
  disablePreviewPassword?: boolean,
  registerApiHandlers?: boolean,
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@hexdigital/nuxt-datocms',
    configKey: 'datocms'
  },
  // Default configuration options of the Nuxt module
  defaults: {
    endpoint: 'https://graphql.datocms.com',
    publicReadOnlyToken: null,
    disablePreviewPassword: false,
    registerApiHandlers: true,
    privatePreviewModePassword: 'showme',
  },
  setup (options, nuxt) {
    const logger = useLogger('nuxt-datocms');

    if (!options.publicReadOnlyToken) {
      logger.error('The module `@hexdigital/nuxt-datocms` requires a public, read-only access token to work correctly. Please check your Nuxt modules configuration and ensure one has been supplied. It should be supplied using the module config key `nuxt-datocms.publicReadOnlyToken`. For more information please see https://github.com/hex-digital/nuxt-datocms');
    }

    const { resolve } = createResolver(import.meta.url);

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolve('./runtime/plugin'));

    nuxt.options.runtimeConfig = nuxt.options.runtimeConfig || {};
    nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {};

    nuxt.options.runtimeConfig.datocms = defu(nuxt.options.runtimeConfig.datocms, {
      // A random string hash to encrypt the preview mode cookie - change to invalidate all existing preview cookies
      previewModeEncryptionSecret: options.privatePreviewModeEncryptionSecret,
      // A password that must be entered by a User when they want to switch to Preview mode
      previewModePassword: options.privatePreviewModePassword,
      // A read-only token, WITH Draft access, to be used in preview mode to view draft content
      privateDraftEnabledToken: options.privateDraftEnabledToken,
    });

    // PUBLIC runtime config
    // Anything within this object will be available to all app users via the window.__NUXT__ object.
    // Do not put any sensitive keys or passwords in this object!
    nuxt.options.runtimeConfig.public.datocms = defu(nuxt.options.runtimeConfig.public.datocms, {
      environment: options.environment,
      endpoint: options.endpoint,

      disablePreviewPassword: options.disablePreviewPassword,

      // A read-only token, without Draft access, to be used by all users when viewing regular, published content
      publicReadOnlyToken: options.publicReadOnlyToken,
    });

    const autoImports = {
      components: [
        'DatocmsImage',
        'DatocmsStructuredText',
      ],
      composables: [
        'useSiteSearch',
        'useQuerySubscription',
        'toHead',
      ],
    };
    for (const autoImportComponent of autoImports.components) {
      addComponent({ name: autoImportComponent, export: autoImportComponent, filePath: 'vue-datocms' });
    }
    for (const autoImportComposable of autoImports.composables) {
      addImports({ name: autoImportComposable, as: autoImportComposable, from: 'vue-datocms' });
    }
    addImportsDir(resolve('./runtime/composables'));

    if (options.registerApiHandlers) {
      addServerHandler({
        route: '/api/disable-preview',
        handler: resolve('./runtime/server/api/disable-preview.ts'),
      });
      addServerHandler({
        route: '/api/enable-preview',
        handler: resolve('./runtime/server/api/enable-preview.ts'),
      });
      addServerHandler({
        route: '/api/preview',
        handler: resolve('./runtime/server/api/preview.ts'),
      });
    }
  }
})
