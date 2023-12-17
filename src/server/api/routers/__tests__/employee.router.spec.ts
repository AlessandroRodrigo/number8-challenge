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
    const { caller, createEmployeeWithDepartment } = setup();

    const output = await caller.employees.getAll();

    expect(output).toEqual([]);

    const employeeCreated = await createEmployeeWithDepartment();

    const output2 = await caller.employees.getAll();

    expect(output2.length).toEqual(1);
    expect(output2[0]).toEqual(employeeCreated);
  });

  it("should get employee by id", async () => {
    const { caller, createEmployeeWithDepartment } = setup();

    const employeeCreated = await createEmployeeWithDepartment();

    const output = await caller.employees.getById({ id: employeeCreated.id });

    expect(output).toHaveProperty("id", employeeCreated.id);
    expect(output).toHaveProperty("firstName", employeeCreated.firstName);
    expect(output).toHaveProperty("lastName", employeeCreated.lastName);
    expect(output).toHaveProperty("hireDate", employeeCreated.hireDate);
    expect(output).toHaveProperty("phone", employeeCreated.phone);
    expect(output).toHaveProperty("address", employeeCreated.address);
    expect(output).toHaveProperty("department", employeeCreated.department);
    expect(output).toHaveProperty("status", employeeCreated.status);
  });

  it("should create employee", async () => {
    const { caller, createDepartment } = setup();

    const departmentCreated = await createDepartment();

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
    expect(output.department.id).toEqual(departmentCreated.id);
  });

  it("should delete employee", async () => {
    const { caller, createEmployeeWithDepartment } = setup();

    const employeeCreated = await createEmployeeWithDepartment();

    expect(() =>
      caller.employees.delete({ id: employeeCreated.id }),
    ).to.not.throw();
  });

  it("should update employee", async () => {
    const { caller, createEmployeeWithDepartment } = setup();

    const employeeCreated = await createEmployeeWithDepartment();

    type Input = inferProcedureInput<AppRouter["employees"]["update"]>;

    const input: Input = {
      id: employeeCreated.id,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      hireDate: faker.date.past(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      departmentId: employeeCreated.department?.id,
    };

    const output = await caller.employees.update(input);

    expect(output).toHaveProperty("firstName", input.firstName);
    expect(output).toHaveProperty("lastName", input.lastName);
    expect(output).toHaveProperty("hireDate", input.hireDate);
    expect(output).toHaveProperty("phone", input.phone);
    expect(output).toHaveProperty("address", input.address);
  });

  it("should update department of employee", async () => {
    const { caller, createEmployeeWithDepartment, createDepartment } = setup();

    const employeeCreated = await createEmployeeWithDepartment();

    type Input = inferProcedureInput<AppRouter["employees"]["update"]>;

    const newDepartmentCreated = await createDepartment();

    const input: Input = {
      id: employeeCreated.id,
      departmentId: newDepartmentCreated.id,
    };

    const beforeUser = await caller.employees.getById({ id: input.id });

    await caller.employees.update(input);

    const afterUser = await caller.employees.getById({ id: input.id });

    expect(afterUser.department?.id).not.toEqual(beforeUser.department?.id);
  });

  it("should retrieve department registry of employee", async () => {
    const { caller, createEmployeeWithDepartment, createDepartment } = setup();

    const employeeCreated = await createEmployeeWithDepartment();
    const newDepartmentCreated = await createDepartment();

    await caller.employees.update({
      id: employeeCreated.id,
      departmentId: newDepartmentCreated.id,
    });

    const output = await caller.employees.getDepartmentRegistry({
      employeeId: employeeCreated.id,
    });

    expect(output.length).toEqual(2);
    expect(output[0]).toHaveProperty("department");
    expect(output[0]).toHaveProperty("startDate");
    expect(output[0]).toHaveProperty("endDate");
  });

  it("should retrieve the current employee department first", async () => {
    const { caller, createEmployeeWithDepartment, createDepartment } = setup();

    const employeeCreated = await createEmployeeWithDepartment();
    const newDepartmentCreated = await createDepartment();

    await caller.employees.update({
      id: employeeCreated.id,
      departmentId: newDepartmentCreated.id,
    });

    const output = await caller.employees.getDepartmentRegistry({
      employeeId: employeeCreated.id,
    });

    expect(output.length).toEqual(2);
    expect(output[0]).toHaveProperty("department");
    expect(output[0]).toHaveProperty("startDate");
    expect(output[0]).toHaveProperty("endDate", null);
    expect(output[0]?.department.id).toEqual(newDepartmentCreated.id);
  });
});
