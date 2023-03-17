/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import { createNuxtApiHandler } from "trpc-nuxt";
import { router } from "~/server/trpc";
import { hello } from "~/server/trpc/hello";

export const appRouter = router({
  hello,
});

export type AppRouter = typeof appRouter;

// export API handler
export default createNuxtApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
