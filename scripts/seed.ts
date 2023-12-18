import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "~/server/repositories/drizzle/schema";
dotenv.config({ path: "./.env" });

if (!("DATABASE_URL" in process.env))
  throw new Error("DATABASE_URL not found on .env.development");

const main = async () => {
  console.log(process.env.DATABASE_URL);
  const connection = await mysql.createConnection({
    uri: process.env.DATABASE_URL,
  });
  const db = drizzle(connection);
  const departmentsData: (typeof schema.department.$inferInsert)[] = [];
  const employeesData: (typeof schema.employees.$inferInsert)[] = [];

  console.log("Seed start");
  for (let i = 0; i < 20; i++) {
    await db.transaction(async (tx) => {
      try {
        const department: (typeof departmentsData)[number] = {
          name: faker.commerce.department(),
        };
        const departmentCreated = await tx
          .insert(schema.department)
          .values(department);

        const user: (typeof employeesData)[number] = {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          hireDate: faker.date.past(),
          phone: faker.phone.number(),
          address: faker.location.streetAddress(),
          status: "active",
        };
        const userCreated = await tx.insert(schema.employees).values(user);

        await tx.insert(schema.departmentEmployee).values({
          employeeId: userCreated[0].insertId,
          departmentId: departmentCreated[0].insertId,
          startDate: new Date(),
          endDate: null,
        });
      } catch (error) {
        tx.rollback();
        console.error(error);
      }
    });
  }
  console.log("Seed done");
  process.exit(0);
};

void main();
