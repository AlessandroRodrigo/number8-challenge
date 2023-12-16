import { faker } from "@faker-js/faker";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { db } from "~/server/db";
import { department, departmentEmployee, employees } from "~/server/db/schema";

async function createMockedDepartment() {
  const queryExecuted = await db
    .insert(department)
    .values({
      name: faker.commerce.department(),
    })
    .execute();

  return await db.query.department.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, queryExecuted[0].insertId);
    },
  });
}

async function createMockedDepartmentEmployeeRelation(
  departmentId: number,
  employeeId: number,
) {
  await db
    .insert(departmentEmployee)
    .values({
      departmentId,
      employeeId,
    })
    .execute();
}

async function createMockedEmployee() {
  const queryExecuted = await db
    .insert(employees)
    .values({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      hireDate: faker.date.past(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
    })
    .execute();

  return await db.query.employees.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, queryExecuted[0].insertId);
    },
  });
}

async function cleanDatabase() {
  await db.delete(employees);
}

export function setup() {
  const ctx = createInnerTRPCContext({});
  const caller = appRouter.createCaller(ctx);

  return {
    caller,
    ctx,
    createMockedEmployee,
    createMockedDepartment,
    createMockedDepartmentEmployeeRelation,
    cleanDatabase,
  };
}
