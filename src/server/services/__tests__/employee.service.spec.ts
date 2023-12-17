import { describe, expect, it } from "vitest";
import { EmployeeFactory } from "~/server/entities/employee/employee.factory";
import { InMemoryDepartmentRepository } from "~/server/repositories/in-memory/department.repository";
import { InMemoryEmployeeRepository } from "~/server/repositories/in-memory/employee.repository";
import { EmployeeService } from "~/server/services/employee.service";

describe("Employee service", () => {
  it("should get all employees", async () => {
    const employeeRepository = new InMemoryEmployeeRepository();
    const departmentRepository = new InMemoryDepartmentRepository();
    const service = new EmployeeService(
      employeeRepository,
      departmentRepository,
    );

    const output = await service.getAll();

    expect(output).toEqual([]);

    const departmentCreated = await departmentRepository.create({
      name: "Department name",
    });

    await employeeRepository.create(
      EmployeeFactory.create({
        firstName: "First name",
        lastName: "Last name",
        hireDate: new Date(),
        phone: "Phone",
        address: "Address",
        department: departmentCreated,
      }),
    );

    const output2 = await service.getAll();

    expect(output2.length).toEqual(1);
  });

  it("should get employee by id", async () => {
    const employeeRepository = new InMemoryEmployeeRepository();
    const departmentRepository = new InMemoryDepartmentRepository();
    const service = new EmployeeService(
      employeeRepository,
      departmentRepository,
    );

    const departmentCreated = await departmentRepository.create({
      name: "Department name",
    });

    const employeeCreated = await employeeRepository.create(
      EmployeeFactory.create({
        firstName: "First name",
        lastName: "Last name",
        hireDate: new Date(),
        phone: "Phone",
        address: "Address",
        department: departmentCreated,
      }),
    );

    const output = await service.getById(employeeCreated.id);

    expect(output).toEqual(employeeCreated);
  });

  it("should create employee", async () => {
    const employeeRepository = new InMemoryEmployeeRepository();
    const departmentRepository = new InMemoryDepartmentRepository();
    const service = new EmployeeService(
      employeeRepository,
      departmentRepository,
    );

    const departmentCreated = await departmentRepository.create({
      name: "Department name",
    });

    const input: Parameters<typeof service.create>[0] = {
      firstName: "First name",
      lastName: "Last name",
      hireDate: new Date(),
      phone: "Phone",
      address: "Address",
      departmentId: departmentCreated.id,
    };

    const output = await service.create(input);

    expect(output).toHaveProperty("id");
    expect(output).toHaveProperty("firstName", input.firstName);
    expect(output).toHaveProperty("lastName", input.lastName);
    expect(output).toHaveProperty("hireDate", input.hireDate);
    expect(output).toHaveProperty("phone", input.phone);
    expect(output).toHaveProperty("address", input.address);
    expect(output).toHaveProperty("department", departmentCreated);
  });

  it("should delete employee", async () => {
    const employeeRepository = new InMemoryEmployeeRepository();
    const departmentRepository = new InMemoryDepartmentRepository();
    const service = new EmployeeService(
      employeeRepository,
      departmentRepository,
    );

    const departmentCreated = await departmentRepository.create({
      name: "Department name",
    });

    const employeeCreated = await employeeRepository.create(
      EmployeeFactory.create({
        firstName: "First name",
        lastName: "Last name",
        hireDate: new Date(),
        phone: "Phone",
        address: "Address",
        department: departmentCreated,
      }),
    );

    expect(async () => await service.delete(employeeCreated.id)).not.toThrow();
  });

  it("should update employee", async () => {
    const employeeRepository = new InMemoryEmployeeRepository();
    const departmentRepository = new InMemoryDepartmentRepository();
    const service = new EmployeeService(
      employeeRepository,
      departmentRepository,
    );

    const departmentCreated = await departmentRepository.create({
      name: "Department name",
    });

    const employeeCreated = await employeeRepository.create(
      EmployeeFactory.create({
        firstName: "First name",
        lastName: "Last name",
        hireDate: new Date(),
        phone: "Phone",
        address: "Address",
        department: departmentCreated,
      }),
    );

    const input: Parameters<typeof service.update>[0] = {
      id: employeeCreated.id,
      firstName: "First name",
      lastName: "Last name",
      hireDate: new Date(),
      phone: "Phone",
      address: "Address",
      departmentId: departmentCreated.id,
    };

    const output = await service.update(input);

    expect(output).toHaveProperty("id", input.id);
    expect(output).toHaveProperty("firstName", input.firstName);
    expect(output).toHaveProperty("lastName", input.lastName);
    expect(output).toHaveProperty("hireDate", input.hireDate);
    expect(output).toHaveProperty("phone", input.phone);
    expect(output).toHaveProperty("address", input.address);
    expect(output).toHaveProperty("department", departmentCreated);
  });
});
