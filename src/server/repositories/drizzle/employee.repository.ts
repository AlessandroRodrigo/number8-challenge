import { eq } from "drizzle-orm";
import { type Employee } from "~/server/entities/employee/employee.entity";
import { EmployeeFactory } from "~/server/entities/employee/employee.factory";
import { type IEmployeeRepository } from "~/server/entities/employee/employee.repository";
import { drizzleClient } from "~/server/repositories/drizzle/client";
import {
  department,
  departmentEmployee,
  employees,
} from "~/server/repositories/drizzle/schema";

export class EmployeeRepository implements IEmployeeRepository {
  async getAll(): Promise<Employee[]> {
    const result = await drizzleClient
      .select()
      .from(departmentEmployee)
      .innerJoin(employees, eq(employees.id, departmentEmployee.employeeId))
      .innerJoin(department, eq(departmentEmployee.departmentId, department.id))
      .execute();

    return result.map((item) =>
      EmployeeFactory.create({
        id: item.employee.id,
        firstName: item.employee.firstName,
        lastName: item.employee.lastName,
        hireDate: item.employee.hireDate,
        phone: item.employee.phone,
        address: item.employee.address,
        department: {
          id: item.department.id,
          name: item.department.name,
        },
      }),
    );
  }

  async getById(id: number): Promise<Employee> {
    const result = await drizzleClient
      .select()
      .from(departmentEmployee)
      .innerJoin(employees, eq(employees.id, departmentEmployee.employeeId))
      .innerJoin(department, eq(departmentEmployee.departmentId, department.id))
      .where(eq(employees.id, id))
      .limit(1)
      .execute();

    if (!result[0]?.employee && !result[0]?.department) {
      throw new Error("Employee not found");
    }

    return EmployeeFactory.create({
      id: result[0]?.employee.id,
      firstName: result[0]?.employee.firstName,
      lastName: result[0]?.employee.lastName,
      hireDate: result[0]?.employee.hireDate,
      phone: result[0]?.employee.phone,
      address: result[0]?.employee.address,
      department: {
        id: result[0]?.department.id,
        name: result[0]?.department.name,
      },
    });
  }

  async create(input: Employee): Promise<Employee> {
    const employeeCreatedId = await drizzleClient.transaction(async (tx) => {
      const queryResult = await tx
        .insert(employees)
        .values({
          firstName: input.firstName,
          lastName: input.lastName,
          hireDate: input.hireDate,
          phone: input.phone,
          address: input.address,
        })
        .execute();

      if (input.department) {
        await tx
          .insert(departmentEmployee)
          .values({
            departmentId: input.department.id,
            employeeId: queryResult[0].insertId,
          })
          .execute();
      }

      return queryResult[0].insertId;
    });

    return this.getById(employeeCreatedId);
  }

  async delete(id: number): Promise<void> {
    await drizzleClient.delete(employees).where(eq(employees.id, id)).execute();
  }

  async update(input: Employee): Promise<Employee> {
    await drizzleClient
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

    if (input.department) {
      await drizzleClient
        .update(departmentEmployee)
        .set({
          departmentId: input.department.id,
        })
        .where(eq(departmentEmployee.employeeId, input.id))
        .execute();
    }

    return this.getById(input.id);
  }
}
