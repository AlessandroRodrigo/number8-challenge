import { faker } from "@faker-js/faker";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { db } from "~/server/db";
import { department, departmentEmployee, employees } from "~/server/db/schema";

async function createDepartment() {
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

async function createDepartmentEmployeeRelation(
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

async function createEmployee() {
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
  await db.transaction(async (tx) => {
    await tx.delete(departmentEmployee).execute();
    await tx.delete(employees).execute();
    await tx.delete(department).execute();
  });
}

async function prepareEmployeeWithDepartment() {
  const departmentCreated = await createDepartment();
  const employeeCreated = await createEmployee();

  if (!departmentCreated || !employeeCreated) {
    throw new Error("Department or employee not created");
  }

  await createDepartmentEmployeeRelation(
    departmentCreated.id,
    employeeCreated.id,
  );

  return {
    departmentCreated,
    employeeCreated,
  };
}

export function setup() {
  const ctx = createInnerTRPCContext({});
  const caller = appRouter.createCaller(ctx);

  return {
    caller,
    ctx,
    createEmployee,
    createDepartment,
    createDepartmentEmployeeRelation,
    prepareEmployeeWithDepartment,
    cleanDatabase,
  };
}
