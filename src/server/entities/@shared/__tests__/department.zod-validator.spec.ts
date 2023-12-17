import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { DepartmentFactory } from "~/server/entities/department/department.factory";
import { DepartmentZodValidator } from "~/server/entities/department/department.zod-validator";

describe("Department zod validator", () => {
  it("should successful validate", () => {
    const department = DepartmentFactory.create({
      name: faker.commerce.department(),
    });
    const validator = new DepartmentZodValidator();

    validator.validate(department);

    expect(department.notification.hasErrors()).toBe(false);
  });

  it("should catch with name less than 3 characters", () => {
    const department = DepartmentFactory.create({
      name: "ab",
    });
    const validator = new DepartmentZodValidator();

    validator.validate(department);

    expect(department.notification.hasErrors()).toBe(true);
    expect(department.notification.getErrors()).toEqual([
      {
        context: "Department",
        message: "Name must be at least 3 characters",
      },
    ]);
  });

  it("should catch with name more than 255 characters", () => {
    const department = DepartmentFactory.create({
      name: faker.lorem.words(100),
    });
    const validator = new DepartmentZodValidator();

    validator.validate(department);

    expect(department.notification.hasErrors()).toBe(true);
    expect(department.notification.getErrors()).toEqual([
      {
        context: "Department",
        message: "Name must be at most 255 characters",
      },
    ]);
  });

  it("should catch with name not a string", () => {
    const department = DepartmentFactory.create({
      name: 123 as unknown as string,
    });
    const validator = new DepartmentZodValidator();

    validator.validate(department);

    expect(department.notification.hasErrors()).toBe(true);
    expect(department.notification.getErrors()).toEqual([
      {
        context: "Department",
        message: "Name must be a string",
      },
    ]);
  });

  it("should catch with name required", () => {
    const department = DepartmentFactory.create({
      name: undefined as unknown as string,
    });
    const validator = new DepartmentZodValidator();

    validator.validate(department);

    expect(department.notification.hasErrors()).toBe(true);
    expect(department.notification.getErrors()).toEqual([
      {
        context: "Department",
        message: "Name is required",
      },
    ]);
  });
});
