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

export const izvestajRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        misljenjeDoktora: z.string(),
        terapija: z.string(),
        datum: z.date(),
        kontrola: z.string(),
        pregledId: z.string(),
        datoteke: z
          .object({
            naziv: z.string(),
            path: z.string(),
            createdAt: z.date(),
          })
          .array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.izvestaj.create({
        include: {
          pregled: true,
        },

        data: {
          misljenjeDoktora: input.misljenjeDoktora,
          terapija: input.terapija,
          datum: input.datum,
          pregled: {
            connect: {
              id: input.pregledId,
            },
          },
          kontorla: input.kontrola,
          datoteke: {
            createMany: {
              data: input.datoteke,
            },
          },
        },
      });
      return ctx.prisma.pregled.update({
        where: {
          id: input.pregledId,
        },
        data: {
          gotov: true,
        },
      });
    }),
  getOne: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.izvestaj.findUnique({
      where: {
        id: input,
      },
      include: {
        datoteke: true,
      },
    });
  }),
});
