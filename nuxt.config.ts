export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@vee-validate/nuxt',
    'vuetify-nuxt-module',
    '@nuxtjs/i18n',
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
      { code: 'fr',
        iso: 'fr-FR',
        name: 'Français',
        files: [
          'fr/error.json',
          'fr/base.json',
          'fr/client.json',
          'fr/worksite.json',
          'fr/home.json'
        ]
      },
      { code: 'en',
        iso: 'en-US',
        name: 'English',
        files: [
          'en/error.json',
          'en/base.json',
          'en/client.json',
          'en/worksite.json',
          'en/home.json'
        ]
      }
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
    vuetifyOptions: {
      theme: {
        themes: {
          light: {
            colors: {
              primary: '#022957',
              secondary: '#FF5703',
              tertiary: '#57A33B'
            }
          }
        }
      }
    }
  }
});
