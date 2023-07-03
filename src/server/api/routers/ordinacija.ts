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

export const ordinacijaRouter = createTRPCRouter({
  getCurrentAll: publicProcedure
    .input(z.number().int())
    .query(({ input, ctx }) => {
      return ctx.prisma.ordinacija.findMany({
        skip: input * 20,
        take: 20,
      });
    }),
  getOne: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.ordinacija.findFirst({
      where: {
        id: input,
      },
      include: {
        osoblje: true,
        pregledi: true,
      },
    });
  }),

  getMultipleWIthID: publicProcedure
    .input(z.string())
    .query(({ input, ctx }) => {
      return ctx.prisma.ordinacija.findMany({
        take: 20,
        where: {
          id: {
            contains: input,
          },
        },
      });
    }),
});
