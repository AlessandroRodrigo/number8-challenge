import { z } from "zod";
import type IValidator from "~/server/entities/@shared/validator.interface";
import { type Employee } from "~/server/entities/employee/employee.entity";

export class EmployeeZodValidator implements IValidator<Employee> {
  validate(entity: Employee): void {
    const result = z
      .object({
        firstName: z
          .string({
            required_error: "First name is required",
            invalid_type_error: "First name must be a string",
          })
          .min(3, {
            message: "First name must be at least 3 characters",
          })
          .max(255, {
            message: "First name must be at most 255 characters",
          }),
        lastName: z
          .string({
            required_error: "Last name is required",
            invalid_type_error: "Last name must be a string",
          })
          .min(3, {
            message: "Last name must be at least 3 characters",
          })
          .max(255, {
            message: "Last name must be at most 255 characters",
          }),
        hireDate: z
          .date({
            required_error: "Hire date is required",
            invalid_type_error: "Hire date must be a date",
          })
          .min(new Date("1900-01-01"), {
            message: "Hire date must be after 1900-01-01",
          })
          .max(new Date(), {
            message: "Hire date must be before today",
          }),
        phone: z
          .string({
            required_error: "Phone is required",
            invalid_type_error: "Phone must be a string",
          })
          .min(3, {
            message: "Phone must be at least 3 characters",
          })
          .max(255, {
            message: "Phone must be at most 255 characters",
          }),
        address: z
          .string({
            required_error: "Address is required",
            invalid_type_error: "Address must be a string",
          })
          .min(3, {
            message: "Address must be at least 3 characters",
          })
          .max(255, {
            message: "Address must be at most 255 characters",
          }),
        status: z.enum(["active", "inactive"], {
          errorMap: (error) => {
            if (error.code === z.ZodIssueCode.invalid_enum_value) {
              return {
                message: "Status must be either active or inactive",
              };
            }

            return { message: error.message ?? "Invalid status" };
          },
        }),
      })
      .safeParse(entity);

    if (!result.success) {
      result.error.errors.forEach((error) => {
        entity.notification.addError({
          context: "Employee",
          message: error.message,
        });
      });
    }
  }
}
