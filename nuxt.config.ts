export default defineNuxtConfig({
  pages: true,
  experimental: {
    payloadExtraction: false,
  },
  modules: [
    "nuxt-icon",
    "nuxt-lodash",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
  ],
  runtimeConfig: {
    public: {
      stripePk: process.env.STRIPE_PK_KEY,
    },
  },
  app: {
    head: {
      script: [{ src: "https://js.stripe.com/v3/", defer: true }],
    },
  },
});
