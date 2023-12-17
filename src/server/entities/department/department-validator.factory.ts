import type IValidator from "~/server/entities/@shared/validator.interface";
import { type Department } from "~/server/entities/department/department.entity";
import { DepartmentZodValidator } from "~/server/entities/department/department.zod-validator";

export class DepartmentValidatorFactory {
  static createZodValidator(): IValidator<Department> {
    return new DepartmentZodValidator();
  }
}
