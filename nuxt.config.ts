import vsharp from 'vite-plugin-vsharp';

// @ts-ignore
export default defineNuxtConfig({
  runtimeConfig: {
    stripeSecret: '',
    stripeWebhookSecret: '',
    public: {
      stripeKey: '',
    },
  },
  typescript: {
    typeCheck: false,
  },

  vite: {
    plugins: [vsharp()],
  },

  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', '@pinia/nuxt'],
});
