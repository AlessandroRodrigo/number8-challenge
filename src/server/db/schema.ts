import {
  bigint,
  index,
  mysqlTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const mysqlTable = mysqlTableCreator((name) => name);

export const employees = mysqlTable(
  "employee",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    firstName: varchar("first_name", { length: 256 }),
    lastName: varchar("last_name", { length: 256 }),
    hireDate: timestamp("hire_date", { mode: "date", fsp: 3 }),
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
    { onDelete: "cascade", onUpdate: "cascade" },
  ),
  employeeId: bigint("employee_id", { mode: "number" }).references(
    () => employees.id,
    { onDelete: "cascade", onUpdate: "cascade" },
  ),
});
