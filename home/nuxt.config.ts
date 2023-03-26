// https://nuxt.com/docs/api/configuration/nuxt-config
import en from "./src/translations/en.json";
import es from "./src/translations/en.json";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      MAGICLINK_KEY: "pk_live_3537E2E4D3D38899",
      BASE_SITE: "https://clau-dev.com",
      BASE_API: "https://api.clau-dev.com",
      BASE_BUCKET: "https://bucket.clau-dev.com",
      siteUrl: process.env.NUXT_PUBLIC_BASE_SITE || "https://clau-dev.com",
    },
  },
  srcDir: "src/",
  imports: {
    dirs: [
      // "modules/**/*.store.ts",
      // "modules/**/*.composable.ts",
      // "modules/**/utils/**/*.ts"
    ],
  },
  components: {
    dirs: [
      // {
      //   path: "~/components/global",
      //   global: true,
      // },
      // "~/components",
      // "~/modules",
    ],
  },
  modules: [
    "@nuxt/devtools",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-icon",
    "nuxt-headlessui",
    "@nuxtjs/i18n",
    /**
     * HINT: Currently doesn't work with DenoDeploy
     */
    // "@nuxt/image-edge",
    "@nuxtjs/device",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-schema-org",
    "magic-regexp/nuxt",
    /**
     * TODO: Customize to:
     * - log in console
     * - use remote images
     */
    // "nuxt-security",
    "nuxt-swiper",
    "nuxt-typed-router",
    "@nuxtjs/partytown",
    "@vue-macros/nuxt",
    "nuxt-viewport",
    "@sidebase/nuxt-pdf",
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

  // image: {
  //   domains: ["bucket.clau-dev.com"],
  // },
});
