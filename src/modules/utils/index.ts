// `nuxt/kit` is a helper subpath import you can use when defining local modules
// that means you do not need to add `@nuxt/kit` to your project's dependencies
import { createResolver, defineNuxtModule, addServerHandler } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "utils",
  },
  setup() {
    const { resolve } = createResolver(import.meta.url);


  },
});
