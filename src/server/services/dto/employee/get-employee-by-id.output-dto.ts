import { z } from "zod";

export const GetEmployeeByIdOutputDto = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  hireDate: z.date(),
  phone: z.string(),
  address: z.string(),
  department: z.object({
    id: z.number(),
    name: z.string(),
  }),
  status: z.string(),
});

export type GetEmployeeByIdOutputDtoType = z.infer<
  typeof GetEmployeeByIdOutputDto
>;
