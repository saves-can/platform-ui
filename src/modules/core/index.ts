import { defineNuxtModule, addComponentsDir, createResolver } from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "clau-core",
  },
  async setup(moduleOptions, nuxt) {
    // -- Add your module logic here --
    const resolver = createResolver(import.meta.url);

    console.log("clau-core", {});

    await addComponentsDir({
      path: resolver.resolve("components"),
    });
  },
});
