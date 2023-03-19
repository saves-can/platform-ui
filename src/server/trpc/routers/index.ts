import { mergeRouters } from '~/server/trpc/trpc'
import { dbRouter } from "./db";
import { helloRouter } from "./hello";
import { pusherRouter } from "./pusher";

export const appRouter = mergeRouters(dbRouter, helloRouter, pusherRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
