import { faker } from "@faker-js/faker";
import { type inferProcedureInput } from "@trpc/server";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { setup } from "~/server/__tests__/setup-integration";
import { type AppRouter } from "~/server/api/root";

describe("Employee router", () => {
  beforeEach(async () => {
    const { cleanDatabase } = setup();

    await cleanDatabase();
  });

  afterAll(async () => {
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

    type Input = inferProcedureInput<AppRouter["employees"]["create"]>;

    const input: Input = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      hireDate: faker.date.past(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      departmentId: departmentCreated.id,
    };

    const output = await caller.employees.create(input);

    expect(output).toHaveProperty("firstName", input.firstName);
    expect(output).toHaveProperty("lastName", input.lastName);
    expect(output).toHaveProperty("hireDate", input.hireDate);
    expect(output).toHaveProperty("phone", input.phone);
    expect(output).toHaveProperty("address", input.address);
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
