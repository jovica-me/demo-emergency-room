import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const posetaRouter = createTRPCRouter({
  add: publicProcedure
    .input(
      z.object({
        uput: z.string(),
        simptomi: z.string(),
        prioritet: z.number(),
        pacijentJMBG: z.bigint(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.poseta.create({ data: input });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.poseta.findMany();
  }),
  end: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.poseta.update({
        data: {
          gotova: true,
          odlazak: new Date(),
        },
        where: {
          id: input.id,
        },
      });
    }),
});
