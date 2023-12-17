import { faker } from "@faker-js/faker";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { EmployeeFactory } from "~/server/entities/employee/employee.factory";
import { InMemoryDepartmentRepository } from "~/server/repositories/in-memory/department.repository";
import { InMemoryEmployeeRepository } from "~/server/repositories/in-memory/employee.repository";

const departmentRepository = new InMemoryDepartmentRepository();
const employeeRepository = new InMemoryEmployeeRepository();

async function createDepartment() {
  return await departmentRepository.create({
    name: faker.commerce.department(),
  });
}

async function createEmployeeWithoutDepartment() {
  const employee = EmployeeFactory.create({
    id: 0,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    hireDate: faker.date.past(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    department: null,
  });

  return employeeRepository.create(employee);
}

async function createEmployeeWithDepartment() {
  const department = await createDepartment();

  const employee = EmployeeFactory.create({
    id: 0,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    hireDate: faker.date.past(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    department: {
      id: department.id,
      name: department.name,
    },
  });

  return employeeRepository.create(employee);
}

async function cleanDatabase() {
  departmentRepository.clean();
  employeeRepository.clean();
}

export function setup() {
  const ctx = createInnerTRPCContext({});
  const caller = appRouter.createCaller(ctx);

  return {
    caller,
    ctx,
    createDepartment,
    cleanDatabase,
    createEmployeeWithoutDepartment,
    createEmployeeWithDepartment,
    departmentRepository,
    employeeRepository,
  };
}
