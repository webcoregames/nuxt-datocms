import { defineNuxtModule, useLogger, createResolver, addPlugin, addComponent, addImports, addImportsDir, addServerHandler } from '@nuxt/kit';
import { defu } from 'defu';

const module = defineNuxtModule({
  meta: {
    name: "@hexdigital/nuxt-datocms",
    configKey: "datocms"
  },
  // Default configuration options of the Nuxt module
  defaults: {
    environment: void 0,
    endpoint: "https://graphql.datocms.com",
    publicReadOnlyToken: null,
    privateDraftEnabledToken: void 0,
    privatePreviewModePassword: void 0,
    privatePreviewModeEncryptionSecret: void 0,
    disablePreviewPassword: false,
    registerApiHandlers: true,
    devtools: false,
    datoAdminUrl: void 0
  },
  async setup(options, nuxt) {
    const logger = useLogger("nuxt-datocms");
    if (!options.publicReadOnlyToken) {
      logger.error("The module `@hexdigital/nuxt-datocms` requires a public, read-only access token to work correctly. Please check your Nuxt modules configuration and ensure one has been supplied. It should be supplied using the module config key `nuxt-datocms.publicReadOnlyToken`. For more information please see https://github.com/hex-digital/nuxt-datocms");
    }
    const { resolve } = createResolver(import.meta.url);
    nuxt.options.build.transpile.push(resolve("./runtime"));
    nuxt.options.build.transpile.push("vue-datocms");
    nuxt.options.build.transpile.push("datocms-listen");
    addPlugin(resolve("./runtime/plugin"));
    nuxt.options.runtimeConfig = nuxt.options.runtimeConfig || {};
    nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {};
    nuxt.options.runtimeConfig.datocms = defu(nuxt.options.runtimeConfig.datocms, {
      // A random string hash to encrypt the preview mode cookie - change to invalidate all existing preview cookies
      previewModeEncryptionSecret: options.privatePreviewModeEncryptionSecret,
      // A password that must be entered by a User when they want to switch to Preview mode
      previewModePassword: options.privatePreviewModePassword,
      // A read-only token, WITH Draft access, to be used in preview mode to view draft content
      privateDraftEnabledToken: options.privateDraftEnabledToken
    });
    nuxt.options.runtimeConfig.public.datocms = defu(nuxt.options.runtimeConfig.public.datocms, {
      environment: options.environment,
      endpoint: options.endpoint,
      disablePreviewPassword: options.disablePreviewPassword,
      // A read-only token, without Draft access, to be used by all users when viewing regular, published content
      publicReadOnlyToken: options.publicReadOnlyToken
    });
    const autoImports = {
      components: [
        {
          name: "DatocmsImage",
          export: "Image",
          filePath: "vue-datocms"
        },
        {
          name: "DatocmsStructuredText",
          export: "StructuredText",
          filePath: "vue-datocms"
        }
      ],
      composables: [
        "useSiteSearch",
        "useQuerySubscription",
        "toHead"
      ]
    };
    for (const autoImportComponentObject of autoImports.components) {
      await addComponent(autoImportComponentObject);
    }
    for (const autoImportComposable of autoImports.composables) {
      addImports({ name: autoImportComposable, as: autoImportComposable, from: "vue-datocms" });
    }
    addImportsDir(resolve("./runtime/composables"));
    if (options.registerApiHandlers) {
      addServerHandler({
        route: "/api/disable-preview",
        handler: resolve("./runtime/server/api/disable-preview")
      });
      addServerHandler({
        route: "/api/enable-preview",
        handler: resolve("./runtime/server/api/enable-preview")
      });
      addServerHandler({
        route: "/api/preview",
        handler: resolve("./runtime/server/api/preview")
      });
    }
    if (options.devtools && options.datoAdminUrl) {
      nuxt.hook("devtools:customTabs", (iframeTabs) => {
        iframeTabs.push({
          name: "datocms",
          title: "DatoCMS",
          icon: "i-logos-datocms",
          view: {
            type: "iframe",
            src: options.datoAdminUrl
          }
        });
      });
    }
  }
});

export { module as default };
