import { faker } from "@faker-js/faker";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { EmployeeFactory } from "~/server/entities/employee/employee.factory";
import { drizzleClient } from "~/server/repositories/drizzle/client";
import { DepartmentRepository } from "~/server/repositories/drizzle/department.repository";
import { EmployeeRepository } from "~/server/repositories/drizzle/employee.repository";
import { department, employees } from "~/server/repositories/drizzle/schema";

const departmentRepository = new DepartmentRepository();
const employeeRepository = new EmployeeRepository();

async function createDepartment() {
  return await departmentRepository.create({
    name: faker.commerce.department(),
  });
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
  await Promise.all([
    drizzleClient.delete(employees),
    drizzleClient.delete(department),
  ]);
}

export function setup() {
  const ctx = createInnerTRPCContext({});
  const caller = appRouter.createCaller(ctx);

  return {
    caller,
    ctx,
    createDepartment,
    cleanDatabase,
    createEmployeeWithDepartment,
    departmentRepository,
    employeeRepository,
  };
}
