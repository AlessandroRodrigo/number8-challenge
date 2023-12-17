import { type z } from "zod";
import { GetEmployeeByIdOutputDto } from "~/server/services/dto/employee/get-employee-by-id.output-dto";

export const GetAllEmployeeOutputDto = GetEmployeeByIdOutputDto.array();

export type GetAllEmployeeOutputDtoType = z.infer<
  typeof GetAllEmployeeOutputDto
>;
