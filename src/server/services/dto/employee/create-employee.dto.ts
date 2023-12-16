import { z } from "zod";

export const CreateEmployeeDto = z.object({
  firstName: z.string().min(3).max(255),
  lastName: z.string().min(3).max(255),
  hireDate: z.date(),
  phone: z.string().min(3).max(255),
  address: z.string().min(3).max(255),
  departmentId: z.number().int(),
});

export type CreateEmployeeDtoType = z.infer<typeof CreateEmployeeDto>;
