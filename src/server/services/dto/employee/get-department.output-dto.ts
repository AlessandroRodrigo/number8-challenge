import { z } from "zod";

export const GetDepartmentOutputDto = z.object({
  id: z.number(),
  name: z.string(),
});
