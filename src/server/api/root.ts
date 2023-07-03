import { exampleRouter } from "@/server/api/routers/example";
import { createTRPCRouter } from "@/server/api/trpc";
import { pacijentiRouter } from "./routers/pacijenti";
import { posetaRouter } from "./routers/poseta";
import { pregledRouter } from "./routers/pregled";
import { ordinacijaRouter } from "./routers/ordinacija";
import { sokSobaRouter } from "./routers/sokSoba";
import { izvestajRouter } from "./routers/izvestaj";
import { osobljeRouter } from "./routers/osoblje";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  pacijent: pacijentiRouter,
  poseta: posetaRouter,
  pregled: pregledRouter,
  ordinacije: ordinacijaRouter,
  sokSoba: sokSobaRouter,
  izvestaj: izvestajRouter,
  osoblje: osobljeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
