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

export const sokSobaRouter = createTRPCRouter({
  getCurrentAll: publicProcedure
    .input(z.number().int())
    .query(({ input, ctx }) => {
      return ctx.prisma.sokSoba.findMany({
        skip: input * 20,
        take: 20,
      });
    }),
  brzoRezervisi: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const solobodnaSokSOba = await ctx.prisma.sokSoba.findFirst({
        where: {
          zauzeta: false,
        },
      });
      if (solobodnaSokSOba == null) return null;
      return ctx.prisma.poseta.update({
        where: {
          id: input,
        },
        data: {
          sokSoba: {
            connect: {
              id: solobodnaSokSOba.id,
            },
            update: {
              zauzeta: true,
            },
          },
        },
      });
    }),

  oslobodi: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.poseta.update({
        where: {
          id: input,
        },
        select: {
          sokSoba: { select: { zauzeta: true } },
        },
        data: {
          sokSoba: {
            update: {
              zauzeta: false,
            },
            disconnect: true,
          },
        },
      });
    }),
});
