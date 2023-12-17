import { z, type ZodError } from "zod";
import type IValidator from "~/server/entities/@shared/validator.interface";
import { type Department } from "~/server/entities/department/department.entity";

export class DepartmentZodValidator implements IValidator<Department> {
  validate(entity: Department): void {
    try {
      z.object({
        name: z
          .string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
          })
          .min(3, {
            message: "Name must be at least 3 characters",
          })
          .max(255, {
            message: "Name must be at most 255 characters",
          }),
      }).parse(entity);
    } catch (error) {
      const e = error as ZodError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "Department",
          message: error.message,
        });
      });
    }
  }
}
