// @ts-ignore
export default defineNuxtConfig({
  runtimeConfig: {
    stripeSecret: '',
    ssr: false,
    stripeWebhookSecret: '',
    public: {
      stripeKey: '',
    },
  },
  typescript: {
    typeCheck: false,
  },

  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', '@pinia/nuxt'],
});
