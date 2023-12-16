import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { department, departmentEmployee, employees } from "~/server/db/schema";

export class EmployeeService {
  async getAll() {
    const result = await db
      .select()
      .from(departmentEmployee)
      .innerJoin(employees, eq(employees.id, departmentEmployee.employeeId))
      .innerJoin(department, eq(departmentEmployee.departmentId, department.id))
      .execute();

    return result.map((item) => ({
      ...item.employee,
      department: item.department,
    }));
  }

  async getById(id: number) {
    const result = await db
      .select()
      .from(departmentEmployee)
      .innerJoin(employees, eq(employees.id, departmentEmployee.employeeId))
      .innerJoin(department, eq(departmentEmployee.departmentId, department.id))
      .where(eq(employees.id, id))
      .limit(1)
      .execute();

    return {
      ...result[0]?.employee,
      department: result[0]?.department,
    };
  }

  async create(input: {
    firstName: string;
    lastName: string;
    hireDate: Date;
    phone: string;
    address: string;
    departmentId: number;
  }) {
    const queryExecuted = await db.transaction(async (tx) => {
      const queryExecuted = await tx
        .insert(employees)
        .values({
          firstName: input.firstName,
          lastName: input.lastName,
          hireDate: input.hireDate,
          phone: input.phone,
          address: input.address,
        })
        .execute();

      await tx
        .insert(departmentEmployee)
        .values({
          departmentId: input.departmentId,
          employeeId: queryExecuted[0].insertId,
        })
        .execute();

      return queryExecuted;
    });

    return await db.query.employees.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, queryExecuted[0].insertId);
      },
    });
  }

  async delete(id: number) {
    return db.delete(employees).where(eq(employees.id, id)).execute();
  }

  async update(input: {
    id: number;
    firstName?: string;
    lastName?: string;
    hireDate?: Date;
    phone?: string;
    address?: string;
  }) {
    await db
      .update(employees)
      .set({
        firstName: input.firstName,
        lastName: input.lastName,
        hireDate: input.hireDate,
        phone: input.phone,
        address: input.address,
      })
      .where(eq(employees.id, input.id))
      .execute();

    return await db.query.employees.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, input.id);
      },
    });
  }

  async updateDepartment(input: { id: number; departmentId: number }) {
    await db
      .update(departmentEmployee)
      .set({
        departmentId: input.departmentId,
      })
      .where(eq(departmentEmployee.employeeId, input.id))
      .execute();

    return await db.query.employees.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, input.id);
      },
    });
  }
}
