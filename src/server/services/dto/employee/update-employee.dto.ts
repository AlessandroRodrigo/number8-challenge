import { z } from "zod";

export const UpdateEmployeeDto = z.object({
  id: z.number().int(),
  firstName: z.string().min(3).max(255).optional(),
  lastName: z.string().min(3).max(255).optional(),
  hireDate: z.date().optional(),
  phone: z.string().min(3).max(255).optional(),
  address: z.string().min(3).max(255).optional(),
  departmentId: z.number().int().optional(),
});

export type UpdateEmployeeDtoType = z.infer<typeof UpdateEmployeeDto>;
