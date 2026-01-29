export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@vee-validate/nuxt',
    'vuetify-nuxt-module',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    'nuxt-auth-sanctum'
  ],
  ssr: false,
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/': { prerender: true }
  },
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: {
        semi: true,
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  i18n: {
    lazy: true,
    Types: 'composition',
    langDir: 'locales',
    strategy: 'no_prefix',
    locales: [
      { code: 'fr', iso: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'fr'
  },
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage'
    }
  },
  vuetify: {
    moduleOptions: {
    },
    vuetifyOptions: {
    }
  }
});