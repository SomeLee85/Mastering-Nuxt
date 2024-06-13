import vsharp from 'vite-plugin-vsharp';

export default defineNuxtConfig({
  runtimeConfig: {
    stripeSecret: '',
    stripeWebhookSecret: '',
    public: {
      stripeKey: '',
    },
  },

  nitro: {
    prerender: {
      routes: ['/'],
    },
  },

  vite: {
    plugins: [vsharp()],
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
  ],
  supabase: {
    redirectOptions: {
      login: '/course',
      callback: '/confirm',
      exclude: ['/*'], // We implement our own auth behaviour in the auth middleware
    },
  },
});
