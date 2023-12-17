import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { DepartmentRepository } from "~/server/repositories/drizzle/department.repository";
import { EmployeeRepository } from "~/server/repositories/drizzle/employee.repository";
import { CreateEmployeeDto } from "~/server/services/dto/employee/create-employee.dto";
import { UpdateEmployeeDto } from "~/server/services/dto/employee/update-employee.dto";
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
  create: publicProcedure.input(CreateEmployeeDto).mutation(({ input }) => {
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
  update: publicProcedure.input(UpdateEmployeeDto).mutation(({ input }) => {
    return service.update(input);
  }),
  getDepartmentRegistry: publicProcedure
    .input(
      z.object({
        employeeId: z.number(),
      }),
    )
    .query(({ input }) => {
      return service.getDepartmentRegistry(input.employeeId);
    }),
});
