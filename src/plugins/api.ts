import { createTRPCNuxtClient, httpBatchLink } from "trpc-nuxt/client";
import type { AppRouter } from "~/server/api/trpc/[trpc]";

export default defineNuxtPlugin(() => {
  const {  BASE_API } = useRuntimeConfig().public;

  const api = createTRPCNuxtClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${BASE_API}/api/trpc`,
      }),
    ],
  });

  return {
    provide: {
      api,
    },
  };
});
