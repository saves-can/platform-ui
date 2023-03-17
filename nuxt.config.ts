// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      MAGICLINK_KEY: "pk_live_3537E2E4D3D38899",
      BASE_SITE: "https://clau-dev.com",
    },
  },
  srcDir: "src/",
  serverDir: "",
  imports: {
    dirs: ["modules/**/*.store.ts"],
  },
  components: {
    dirs: [
      {
        path: "~/components/global",
        global: true,
      },
      "~/components",
      "~/modules",
    ],
  },
  build: {
    transpile: ["trpc-nuxt"],
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-icon",
    "nuxt-headlessui",
  ],

  tailwindcss: {
    config: {
      /* Extend the Tailwind config here */
      content: ["src/**/**.vue"],
    },
  },
});
