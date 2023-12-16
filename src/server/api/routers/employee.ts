import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { department, departmentEmployee, employees } from "~/server/db/schema";

export const employeeRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select()
      .from(departmentEmployee)
      .innerJoin(employees, eq(employees.id, departmentEmployee.employeeId))
      .innerJoin(department, eq(departmentEmployee.departmentId, department.id))
      .execute();

    return result.map((item) => ({
      ...item.employee,
      department: item.department.name,
    }));
  }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(departmentEmployee)
        .innerJoin(employees, eq(employees.id, departmentEmployee.employeeId))
        .innerJoin(
          department,
          eq(departmentEmployee.departmentId, department.id),
        )
        .where(eq(employees.id, input.id))
        .limit(1)
        .execute();

      return {
        ...result[0]?.employee,
        department: result[0]?.department.name,
      };
    }),
  create: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        hireDate: z.date(),
        phone: z.string(),
        address: z.string(),
        departmentId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const queryExecuted = await ctx.db.transaction(async (tx) => {
        const queryExecuted = await tx
          .insert(employees)
          .values({
            firstName: input.firstName,
            lastName: input.lastName,
            hireDate: input.hireDate,
            phone: input.phone,
            address: input.address,
          })
          .execute();

        await tx
          .insert(departmentEmployee)
          .values({
            departmentId: input.departmentId,
            employeeId: queryExecuted[0].insertId,
          })
          .execute();

        return queryExecuted;
      });

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
  update: publicProcedure
    .input(
      z
        .object({
          firstName: z.string(),
          lastName: z.string(),
          hireDate: z.date(),
          phone: z.string(),
          address: z.string(),
        })
        .partial()
        .extend({ id: z.number() }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(employees)
        .set({
          firstName: input.firstName,
          lastName: input.lastName,
          hireDate: input.hireDate,
          phone: input.phone,
          address: input.address,
        })
        .where(eq(employees.id, input.id))
        .execute();

      return await ctx.db.query.employees.findFirst({
        where(fields, operators) {
          return operators.eq(fields.id, input.id);
        },
      });
    }),
});
