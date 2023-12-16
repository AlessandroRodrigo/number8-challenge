import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { DepartmentRepository } from "~/server/repositories/drizzle/department.repository";
import { DepartmentService } from "~/server/services/department.service";

const departmentRepository = new DepartmentRepository();

const service = new DepartmentService(departmentRepository);

export const departmentRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    return service.getAll();
  }),
});
