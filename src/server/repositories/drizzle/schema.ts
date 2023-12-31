import {
  bigint,
  index,
  mysqlEnum,
  mysqlTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const mysqlTable = mysqlTableCreator((name) => name);

export const employees = mysqlTable(
  "employee",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    firstName: varchar("first_name", { length: 256 }).notNull(),
    lastName: varchar("last_name", { length: 256 }).notNull(),
    hireDate: timestamp("hire_date", { mode: "date", fsp: 3 }).notNull(),
    phone: varchar("phone", { length: 256 }).notNull(),
    address: varchar("address", { length: 256 }).notNull(),
    status: mysqlEnum("status", ["active", "inactive"]).notNull(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.firstName, example.lastName),
  }),
);

export const department = mysqlTable(
  "department",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }).notNull(),
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
  startDate: timestamp("start_date", { mode: "date", fsp: 3 }).notNull(),
  endDate: timestamp("end_date", { mode: "date", fsp: 3 }),
});
