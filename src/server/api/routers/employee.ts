import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { DepartmentRepository } from "~/server/repositories/drizzle/department.repository";
import { EmployeeRepository } from "~/server/repositories/drizzle/employee.repository";
import { EmployeeService } from "~/server/services/employee.service";

const employeeRepository = new EmployeeRepository();
const departmentRepository = new DepartmentRepository();

const service = new EmployeeService(employeeRepository, departmentRepository);

export const employeeRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    return service.getAll();
  }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(({ input }) => {
      return service.getById(input.id);
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
    .mutation(({ input }) => {
      return service.create(input);
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(({ input }) => {
      return service.delete(input.id);
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
    .mutation(({ input }) => {
      return service.update(input);
    }),
});
