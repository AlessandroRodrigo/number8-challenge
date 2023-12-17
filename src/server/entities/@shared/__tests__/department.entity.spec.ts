import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { DepartmentFactory } from "~/server/entities/department/department.factory";

describe("Department entity", () => {
  it("should successfully create a department", () => {
    const department = DepartmentFactory.create({
      name: faker.commerce.department(),
    });

    expect(department).toBeDefined();
  });

  it("should throw an error when creating a department with an empty name", () => {
    expect(() => {
      DepartmentFactory.create({
        name: undefined as unknown as string,
      });
    }).toThrow("Department: Name is required");
  });

  it("should throw an error when creating a department with a name that is too short", () => {
    expect(() => {
      DepartmentFactory.create({
        name: "ab",
      });
    }).toThrow("Department: Name must be at least 3 characters");
  });

  it("should throw an error when creating a department with a name that is too long", () => {
    expect(() => {
      DepartmentFactory.create({
        name: "a".repeat(256),
      });
    }).toThrow("Department: Name must be at most 255 characters");
  });

  it("should throw an error when creating a department with a name that is not a string", () => {
    expect(() => {
      DepartmentFactory.create({
        name: 123 as unknown as string,
      });
    }).toThrow("Department: Name must be a string");
  });
});
