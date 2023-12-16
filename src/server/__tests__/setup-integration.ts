import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { db } from "~/server/db";
import { department, employees } from "~/server/db/schema";

async function createMockedDepartment() {
  const queryExecuted = await db
    .insert(department)
    .values({
      name: "IT",
    })
    .execute();

  return await db.query.department.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, queryExecuted[0].insertId);
    },
  });
}

async function createMockedEmployee() {
  const queryExecuted = await db
    .insert(employees)
    .values({
      firstName: "John",
      lastName: "Doe",
      hireDate: new Date(),
      phone: "123456789",
      address: "123 Main St",
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
    cleanDatabase,
  };
}
