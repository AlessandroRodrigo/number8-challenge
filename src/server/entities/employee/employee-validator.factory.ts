import type IValidator from "~/server/entities/@shared/validator.interface";
import { type Employee } from "~/server/entities/employee/employee.entity";
import { EmployeeZodValidator } from "~/server/entities/employee/employee.zod-validator";

export class EmployeeValidatorFactory {
  static createZodValidator(): IValidator<Employee> {
    return new EmployeeZodValidator();
  }
}
