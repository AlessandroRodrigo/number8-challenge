// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  bigint,
  index,
  mysqlTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => name);

export const employees = mysqlTable(
  "employee",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    firstName: varchar("first_name", { length: 256 }),
    lastName: varchar("last_name", { length: 256 }),
    hireDate: timestamp("hire_date"),
    phone: varchar("phone", { length: 256 }),
    address: varchar("address", { length: 256 }),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.firstName, example.lastName),
  }),
);

export const department = mysqlTable(
  "department",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const departmentEmployee = mysqlTable("department_employee", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  departmentId: bigint("department_id", { mode: "number" }).references(
    () => department.id,
  ),
  employeeId: bigint("employee_id", { mode: "number" }).references(
    () => employees.id,
  ),
});
