import { z } from "zod";

export const GetDepartmentRegistryOutputDto = z
  .object({
    department: z.object({
      id: z.number(),
      name: z.string(),
    }),
    startDate: z.date(),
    endDate: z.date().nullable(),
  })
  .array();
