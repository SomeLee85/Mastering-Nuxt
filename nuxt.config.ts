// @ts-ignore
export default defineNuxtConfig({
  runtimeConfig: {
    stripeSecret: '',
    stripeWebhookSecret: '',
    public: {
      stripeKey: '',
      apiUrl: process.env.API_URL || 'http://localhost:8888',
      prodApiUrl: process.env.PROD_API_URL || 'https://mastering-nuxt-netlify.netlify.app',
    },
  },
  ssr: false,
  typescript: {
    typeCheck: false,
  },

  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', '@pinia/nuxt'],
});
