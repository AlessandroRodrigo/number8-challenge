import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { DepartmentService } from "~/server/services/department.service";

const service = new DepartmentService();

export const departmentRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    return service.getAll();
  }),
});
