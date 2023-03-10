// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src/",
  // modulesDir: ["./modules"],
  modules: [
    "@nuxtjs/tailwindcss",

    // "@nuxtjs/i18n",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-icon",
    "nuxt-headlessui",
    "./src/modules/core",
  ],
  tailwindcss: {
    config: {
      /* Extend the Tailwind config here */
      content: ["src/**/**.vue"],
    },
  },
});
