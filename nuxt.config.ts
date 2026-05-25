// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      title: 'NovaMart — Premium Shopping',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Discover premium products at NovaMart.' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap',
        },
      ],
    },
  },

  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@vueuse/nuxt'],

  css: ['~/assets/css/main.css'],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  pinia: {
    storesDirs: ['./stores/**'],
  },

  runtimeConfig: {
    public: {
      fakeStoreApi: 'https://fakestoreapi.com',
    },
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
})
