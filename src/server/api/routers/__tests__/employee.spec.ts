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
    const { caller, prepareEmployeeWithDepartment } = setup();

    const output = await caller.employees.getAll();

    expect(output).toEqual([]);

    const { departmentCreated, employeeCreated } =
      await prepareEmployeeWithDepartment();

    const output2 = await caller.employees.getAll();

    expect(output2.length).toEqual(1);
    expect(output2[0]).toEqual({
      id: employeeCreated.id,
      firstName: employeeCreated.firstName,
      lastName: employeeCreated.lastName,
      hireDate: employeeCreated.hireDate,
      phone: employeeCreated.phone,
      address: employeeCreated.address,
      department: departmentCreated.name,
    });
  });

  it("should get employee by id", async () => {
    const { caller, prepareEmployeeWithDepartment } = setup();

    const { departmentCreated, employeeCreated } =
      await prepareEmployeeWithDepartment();

    const output = await caller.employees.getById({ id: employeeCreated.id });

    expect(output).toEqual({
      id: employeeCreated.id,
      firstName: employeeCreated.firstName,
      lastName: employeeCreated.lastName,
      hireDate: employeeCreated.hireDate,
      phone: employeeCreated.phone,
      address: employeeCreated.address,
      department: departmentCreated.name,
    });
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
  });

  it("should delete employee", async () => {
    const { caller, createEmployee } = setup();

    const employeeCreated = await createEmployee();

    if (!employeeCreated) {
      throw new Error("Employee not created");
    }

    const [output] = await caller.employees.delete({ id: employeeCreated.id });

    expect(output).toHaveProperty("affectedRows", 1);
  });

  it("should update employee", async () => {
    const { caller, createEmployee } = setup();

    const employeeCreated = await createEmployee();

    if (!employeeCreated) {
      throw new Error("Employee not created");
    }

    type Input = inferProcedureInput<AppRouter["employees"]["update"]>;

    const input: Input = {
      id: employeeCreated.id,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      hireDate: faker.date.past(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
    };

    const output = await caller.employees.update(input);

    expect(output).toEqual(input);
  });

  it("should update department of employee", async () => {
    const { caller, prepareEmployeeWithDepartment, createDepartment } = setup();

    const { employeeCreated, departmentCreated } =
      await prepareEmployeeWithDepartment();

    type Input = inferProcedureInput<
      AppRouter["employees"]["updateDepartment"]
    >;

    const newDepartmentCreated = await createDepartment();

    if (!newDepartmentCreated) {
      throw new Error("Department not created");
    }

    const input: Input = {
      id: employeeCreated.id,
      departmentId: newDepartmentCreated.id,
    };

    const beforeUser = await caller.employees.getById({ id: input.id });

    await caller.employees.updateDepartment(input);

    const afterUser = await caller.employees.getById({ id: input.id });

    expect(beforeUser).toHaveProperty("department", departmentCreated.name);
    expect(afterUser).toHaveProperty("department", newDepartmentCreated.name);
  });
});
