import { exampleRouter } from "@/server/api/routers/example";
import { createTRPCRouter } from "@/server/api/trpc";
import { pacijentiRouter } from "./routers/pacijenti";
import { posetaRouter } from "./routers/poseta";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  pacijent: pacijentiRouter,
  poseta: posetaRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
