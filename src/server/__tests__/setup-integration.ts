import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { db } from "~/server/db";
import { employees } from "~/server/db/schema";

function createMockedEmployee(caller: ReturnType<typeof setup>["caller"]) {
  return caller.employees.create({
    firstName: "John",
    lastName: "Doe",
    hireDate: new Date(),
    phone: "123456789",
    address: "123 Main St",
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
    createMockedEmployee: () => createMockedEmployee(caller),
    cleanDatabase,
  };
}
