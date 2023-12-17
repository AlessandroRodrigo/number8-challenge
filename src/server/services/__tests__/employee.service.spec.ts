import { describe, expect, it } from "vitest";
import { DepartmentFactory } from "~/server/entities/department/department.factory";
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

    const departmentCreated = await departmentRepository.create(
      DepartmentFactory.create({
        name: "Department name",
      }),
    );

    await employeeRepository.create(
      EmployeeFactory.create({
        firstName: "First name",
        lastName: "Last name",
        hireDate: new Date(),
        phone: "Phone",
        address: "Address",
        department: departmentCreated,
        status: "active",
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

    const departmentCreated = await departmentRepository.create(
      DepartmentFactory.create({
        name: "Department name",
      }),
    );

    const employeeCreated = await employeeRepository.create(
      EmployeeFactory.create({
        firstName: "First name",
        lastName: "Last name",
        hireDate: new Date(),
        phone: "Phone",
        address: "Address",
        department: departmentCreated,
        status: "active",
      }),
    );

    const output = await service.getById(employeeCreated.id);

    expect(output).toEqual({
      id: employeeCreated.id,
      firstName: employeeCreated.firstName,
      lastName: employeeCreated.lastName,
      hireDate: employeeCreated.hireDate,
      phone: employeeCreated.phone,
      address: employeeCreated.address,
      department: {
        id: departmentCreated.id,
        name: departmentCreated.name,
      },
      status: employeeCreated.status,
    });
  });

  it("should create employee", async () => {
    const employeeRepository = new InMemoryEmployeeRepository();
    const departmentRepository = new InMemoryDepartmentRepository();
    const service = new EmployeeService(
      employeeRepository,
      departmentRepository,
    );

    const departmentCreated = await departmentRepository.create(
      DepartmentFactory.create({
        name: "Department name",
      }),
    );

    const input: Parameters<typeof service.create>[0] = {
      firstName: "First name",
      lastName: "Last name",
      hireDate: new Date(),
      phone: "Phone",
      address: "Address",
      departmentId: departmentCreated.id,
    };

    const output = await service.create(input);

    expect(output).toEqual({
      id: output.id,
      firstName: input.firstName,
      lastName: input.lastName,
      hireDate: input.hireDate,
      phone: input.phone,
      address: input.address,
      department: {
        id: departmentCreated.id,
        name: departmentCreated.name,
      },
      status: "active",
    });
  });

  it("should delete employee", async () => {
    const employeeRepository = new InMemoryEmployeeRepository();
    const departmentRepository = new InMemoryDepartmentRepository();
    const service = new EmployeeService(
      employeeRepository,
      departmentRepository,
    );

    const departmentCreated = await departmentRepository.create(
      DepartmentFactory.create({
        name: "Department name",
      }),
    );

    const employeeCreated = await employeeRepository.create(
      EmployeeFactory.create({
        firstName: "First name",
        lastName: "Last name",
        hireDate: new Date(),
        phone: "Phone",
        address: "Address",
        department: departmentCreated,
        status: "active",
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

    const departmentCreated = await departmentRepository.create(
      DepartmentFactory.create({
        name: "Department name",
      }),
    );

    const employeeCreated = await employeeRepository.create(
      EmployeeFactory.create({
        firstName: "First name",
        lastName: "Last name",
        hireDate: new Date(),
        phone: "Phone",
        address: "Address",
        department: departmentCreated,
        status: "active",
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

    expect(output).toEqual({
      id: input.id,
      firstName: input.firstName,
      lastName: input.lastName,
      hireDate: input.hireDate,
      phone: input.phone,
      address: input.address,
      department: {
        id: departmentCreated.id,
        name: departmentCreated.name,
      },
      status: "active",
    });
  });

  it("should update employee status", async () => {
    const employeeRepository = new InMemoryEmployeeRepository();
    const departmentRepository = new InMemoryDepartmentRepository();
    const service = new EmployeeService(
      employeeRepository,
      departmentRepository,
    );

    const departmentCreated = await departmentRepository.create(
      DepartmentFactory.create({
        name: "Department name",
      }),
    );

    const employeeCreated = await employeeRepository.create(
      EmployeeFactory.create({
        firstName: "First name",
        lastName: "Last name",
        hireDate: new Date(),
        phone: "Phone",
        address: "Address",
        department: departmentCreated,
        status: "active",
      }),
    );

    const output = await service.update({
      ...employeeCreated,
      status: "inactive",
      departmentId: departmentCreated.id,
    });

    expect(output).toEqual({
      id: employeeCreated.id,
      firstName: employeeCreated.firstName,
      lastName: employeeCreated.lastName,
      hireDate: employeeCreated.hireDate,
      phone: employeeCreated.phone,
      address: employeeCreated.address,
      department: {
        id: departmentCreated.id,
        name: departmentCreated.name,
      },
      status: "inactive",
    });
  });

  it("should change employee department", async () => {
    const employeeRepository = new InMemoryEmployeeRepository();
    const departmentRepository = new InMemoryDepartmentRepository();
    const service = new EmployeeService(
      employeeRepository,
      departmentRepository,
    );

    const departmentCreated = await departmentRepository.create(
      DepartmentFactory.create({
        name: "Department name",
      }),
    );

    const departmentCreated2 = await departmentRepository.create(
      DepartmentFactory.create({
        name: "Department name 2",
      }),
    );

    const employeeCreated = await employeeRepository.create(
      EmployeeFactory.create({
        firstName: "First name",
        lastName: "Last name",
        hireDate: new Date(),
        phone: "Phone",
        address: "Address",
        department: departmentCreated,
        status: "active",
      }),
    );

    const output = await service.update({
      ...employeeCreated,
      departmentId: departmentCreated2.id,
    });

    expect(output).toEqual({
      id: employeeCreated.id,
      firstName: employeeCreated.firstName,
      lastName: employeeCreated.lastName,
      hireDate: employeeCreated.hireDate,
      phone: employeeCreated.phone,
      address: employeeCreated.address,
      department: {
        id: departmentCreated2.id,
        name: departmentCreated2.name,
      },
      status: "active",
    });
  });
});
