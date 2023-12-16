import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { employees } from "~/server/db/schema";

export const employeeRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.employees.findMany();
  }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.query.employees.findFirst({
        where(fields, operators) {
          return operators.eq(fields.id, input.id);
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        hireDate: z.date(),
        phone: z.string(),
        address: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const queryExecuted = await ctx.db
        .insert(employees)
        .values(input)
        .execute();

      return await ctx.db.query.employees.findFirst({
        where(fields, operators) {
          return operators.eq(fields.id, queryExecuted[0].insertId);
        },
      });
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .delete(employees)
        .where(eq(employees.id, input.id))
        .execute();
    }),
});
