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
      return ctx.prisma.poseta.create({
        data: {
          dolazak: new Date(),
          uput: input.uput,
          simptomi: input.simptomi,
          prioritet: input.prioritet,
          pacijentJMBG: input.pacijentJMBG,
        },
      });
    }),

  addHitno: publicProcedure
    .input(
      z.object({
        uput: z.string(),
        simptomi: z.string(),
        prioritet: z.number(),
        pacijentJMBG: z.bigint(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const solobodnaSokSOba = await ctx.prisma.sokSoba.findFirst({
        where: {
          zauzeta: false,
        },
      });
      if (solobodnaSokSOba == null) return null;

      return ctx.prisma.poseta.create({
        data: {
          dolazak: new Date(),
          uput: input.uput,
          simptomi: input.simptomi,
          prioritet: input.prioritet,
          pacijentJMBG: input.pacijentJMBG,
          sokSoba: {
            connect: {
              id: solobodnaSokSOba.id,
            },
          },
        },
      });
    }),

  getPoseteWithName: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.prisma.poseta.findMany({
        where: {
          pacijent: {
            ime: {
              contains: input,
            },
          },
        },
        include: { pacijent: true },
      });
    }),
  getMultipleWIthID: publicProcedure
    .input(z.string())
    .query(({ input, ctx }) => {
      return ctx.prisma.poseta.findMany({
        take: 20,
        include: {
          pacijent: true,
          sokSoba: {
            select: {
              zauzeta: true,
            },
          },
        },
        where: {
          id: {
            contains: input,
          },
        },
      });
    }),

  getCurrentAll: publicProcedure
    .input(z.number().int())
    .query(({ input, ctx }) => {
      return ctx.prisma.poseta.findMany({
        skip: input * 20,
        take: 20,
        include: { pacijent: true },
        where: {
          gotova: false,
        },
      });
    }),
  getHistoryAll: publicProcedure
    .input(z.number().int())
    .query(({ input, ctx }) => {
      return ctx.prisma.poseta.findMany({
        skip: input * 20,
        take: 20,
        include: { pacijent: true },
      });
    }),
  getOne: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.poseta.findUnique({
      where: {
        id: input,
      },
      include: {
        pacijent: true,
        pregledi: true,
        sokSoba: true,
      },
    });
  }),

  getOneForRedirect: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.prisma.poseta.findUnique({
        where: {
          id: input,
        },
        select: {
          pacijentJMBG: true,
        },
      });
    }),

  end: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.poseta.update({
      where: {
        id: input,
      },
      select: { odlazak: true, gotova: true },
      data: {
        odlazak: new Date(),
        gotova: true,
      },
    });
  }),
  endWithSok: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.poseta.update({
      where: {
        id: input,
      },
      select: {
        odlazak: true,
        gotova: true,
        sokSoba: { select: { zauzeta: true } },
      },
      data: {
        odlazak: new Date(),
        gotova: true,
        sokSoba: {
          update: {
            zauzeta: false,
          },
        },
      },
    });
  }),
});
