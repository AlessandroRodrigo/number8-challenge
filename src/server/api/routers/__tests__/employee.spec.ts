import { beforeEach, describe, expect, it } from "vitest";
import { setup } from "~/server/__tests__/setup-integration";

describe("Employee router", () => {
  beforeEach(async () => {
    const { cleanDatabase } = setup();

    await cleanDatabase();
  });

  it("should get all employees", async () => {
    const { caller, createMockedEmployee } = setup();

    const output = await caller.employees.getAll();

    expect(output).toEqual([]);

    await createMockedEmployee();

    const output2 = await caller.employees.getAll();

    expect(output2.length).toEqual(1);
  });

  it("should get employee by id", async () => {
    const { caller, createMockedEmployee } = setup();

    const employeeCreated = await createMockedEmployee();

    if (!employeeCreated) {
      throw new Error("Employee not created");
    }

    const output = await caller.employees.getById({ id: employeeCreated.id });

    expect(output).toEqual(employeeCreated);
  });

  it("should create employee", async () => {
    const { caller, createMockedDepartment } = setup();

    const departmentCreated = await createMockedDepartment();

    if (!departmentCreated) {
      throw new Error("Department not created");
    }

    const output = await caller.employees.create({
      firstName: "John",
      lastName: "Doe",
      hireDate: new Date(),
      phone: "123456789",
      address: "123 Main St",
      departmentId: departmentCreated.id,
    });

    expect(output).toMatchObject({
      firstName: "John",
      lastName: "Doe",
      phone: "123456789",
      address: "123 Main St",
    });
  });

  it("should delete employee", async () => {
    const { caller, createMockedEmployee } = setup();

    const employeeCreated = await createMockedEmployee();

    if (!employeeCreated) {
      throw new Error("Employee not created");
    }

    const [output] = await caller.employees.delete({ id: employeeCreated.id });

    expect(output).toHaveProperty("affectedRows", 1);
  });
});
