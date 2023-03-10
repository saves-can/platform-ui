// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      MAGICLINK_KEY: "pk_live_3537E2E4D3D38899",
    },
  },
  srcDir: "src/",
  imports: {
    dirs: [
      "stores/**/*.ts",
    ],
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
  modules: [
    "@nuxtjs/tailwindcss",

    // "@nuxtjs/i18n",
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
