
import { ModuleOptions } from './module'

declare module '@nuxt/schema' {
  interface NuxtConfig { ['datocms']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['datocms']?: ModuleOptions }
}


export { DatoCmsState, ModuleOptions, StructuredText, UseDatoCmsParams, default } from './module'
