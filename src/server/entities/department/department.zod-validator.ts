import { z } from "zod";
import type IValidator from "~/server/entities/@shared/validator.interface";
import { type Department } from "~/server/entities/department/department.entity";

export class DepartmentZodValidator implements IValidator<Department> {
  validate(entity: Department): void {
    const result = z
      .object({
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
      })
      .safeParse(entity);

    if (!result.success) {
      result.error.errors.forEach((error) => {
        entity.notification.addError({
          context: "Department",
          message: error.message,
        });
      });
    }
  }
}
