// @ts-ignore
export default defineNuxtConfig({
  runtimeConfig: {
    stripeSecret: '',
    stripeWebhookSecret: '',
    public: {
      stripeKey: '',
      apiUrl: process.env.API_URL || 'http://localhost:8888',
    },
  },
  ssr: false,
  typescript: {
    typeCheck: false,
  },

  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', '@pinia/nuxt'],
});
