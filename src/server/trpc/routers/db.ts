import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { PrismaClient } from "~/schema/generated/prisma-client/edge";

import axios from "axios";

export const dbRouter = router({
  db: publicProcedure
    .input(
      z
        .object({
          name: z.string().nullish(),
        })
        .nullish()
    )
    .query(async ({ input }) => {
      // const getFakeName = async () => {
      //   const {
      //     data: { name: fakeName },
      //   }: any = await axios("api.namefake.com");
      //   return fakeName;
      // };

      const { CLAU_PLATFORM_PROXY_DB } = useRuntimeConfig();

      const prisma = new PrismaClient({
        datasources: {
          db: { url: CLAU_PLATFORM_PROXY_DB },
        },
      });
      const fakeName: string = new Date().toISOString()
      const prismaResponse = await prisma.users.create({
        data: { name: input?.name || fakeName },
      });

      console.log(typeof prismaResponse);

      const result: { fakeName: string; prismaResponse: any; message: string } =
        {
          fakeName,
          prismaResponse,
          message: `Hello from API ${fakeName}`,
        };

      console.log({ result });

      return {
        result,
      };
    }),
});
