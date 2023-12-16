import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { department } from "~/server/db/schema";

export const departmentRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(department).execute();
  }),
});
