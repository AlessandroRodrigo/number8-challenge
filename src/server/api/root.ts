import { departmentRouter } from "~/server/api/routers/department";
import { employeeRouter } from "~/server/api/routers/employee";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  employees: employeeRouter,
  departments: departmentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
