// https://nuxt.com/docs/api/configuration/nuxt-config
import en from "./src/translations/en.json";
import es from "./src/translations/en.json";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      MAGICLINK_KEY: "pk_live_3537E2E4D3D38899",
      BASE_SITE: "https://clau-dev.com",
      BASE_API: "https://mlep1rdsr6.execute-api.us-east-1.amazonaws.com",
    },
  },
  srcDir: "src/",
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
    "@nuxtjs/i18n",
  ],

  tailwindcss: {
    config: {
      content: ["src/**/**.vue"],
    },
  },

  i18n: {
    locales: ["en", "es"], // used in URL path prefix
    defaultLocale: "en", // default locale of your project for Nuxt pages and routings
    vueI18n: {
      legacy: false,
      locale: "en",
      messages: { en, es },
    },
  },
});
