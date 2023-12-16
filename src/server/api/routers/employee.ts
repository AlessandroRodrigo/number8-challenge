import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const employeeRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.employees.findMany();
  }),
});
