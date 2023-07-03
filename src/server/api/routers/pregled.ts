import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Prisma } from "@prisma/client";

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

BigInt.prototype.toJSON = function (): string {
  return this.toString();
};

export const pregledRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        posetaId: z.string(),
        ordinacijaId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.pregled.create({
        data: {
          gotov: false,
          ...input,
        },
      });
    }),
  getOneWithIzvestajAndDatoteka: publicProcedure
    .input(z.string())
    .query(({ input, ctx }) => {
      return ctx.prisma.pregled.findMany({
        where: {
          posetaId: input,
        },
        include: {
          izvestaj: true,
        },
      });
    }),
});
