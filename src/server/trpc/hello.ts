import { publicProcedure } from "~/server/trpc";
import { z } from "zod";

export const helloProcedure = publicProcedure
  .input(
    z.object({
      text: z.string().nullish(),
    })
  )
  .query(({ input }: any) => {
    return {
      greeting: `hello ${input?.text ?? "world"}`,
    };
  });
