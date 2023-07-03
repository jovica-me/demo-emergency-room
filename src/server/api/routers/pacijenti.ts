import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Prisma } from "@prisma/client";
import { makelen13 } from "@/pages/pacijent";

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

BigInt.prototype.toJSON = function (): string {
  return this.toString();
};

export const pacijentiRouter = createTRPCRouter({
  add: publicProcedure
    .input(
      z.object({
        ime: z.string(),
        prezime: z.string(),
        jmbg: z.bigint(),
        datumRodj: z.date(),
        lbo: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.pacijent.create({ data: input });
    }),
  getOneWithIdAndPosete: publicProcedure
    .input(z.bigint())
    .query(({ input, ctx }) => {
      return ctx.prisma.pacijent.findUnique({
        where: {
          jmbg: input,
        },
        include: {
          posete: {
            include: {
              sokSoba: true,
            },
            orderBy: {
              gotova: "asc",
            },
          },
        },
      });
    }),

  getAll: publicProcedure.input(z.number().int()).query(({ input, ctx }) => {
    return ctx.prisma.pacijent.findMany({ skip: input * 20, take: 20 });
  }),
  getMultipleWIthID: publicProcedure
    .input(z.bigint())
    .query(({ input, ctx }) => {
      return ctx.prisma.pacijent.findMany({
        take: 20,
        where: {
          jmbg: {
            gte: makelen13(input),
          },
        },
      });
    }),
});
