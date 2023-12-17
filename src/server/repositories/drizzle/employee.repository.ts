import { desc, eq, isNull } from "drizzle-orm";
import { DepartmentFactory } from "~/server/entities/department/department.factory";
import { type Employee } from "~/server/entities/employee/employee.entity";
import { EmployeeFactory } from "~/server/entities/employee/employee.factory";
import { type IEmployeeRepository } from "~/server/entities/employee/employee.repository";
import { DepartmentRegistryFactory } from "~/server/entities/value-objects/department-registry/department-registry.factory";
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
      .where(isNull(departmentEmployee.endDate))
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
        status: item.employee.status,
      }),
    );
  }

  async getById(id: number): Promise<Employee> {
    const result = await drizzleClient
      .select()
      .from(departmentEmployee)
      .innerJoin(employees, eq(employees.id, departmentEmployee.employeeId))
      .leftJoin(department, eq(departmentEmployee.departmentId, department.id))
      .where(eq(employees.id, id) && isNull(departmentEmployee.endDate))
      .limit(1)
      .execute();

    if (!result[0]?.employee) {
      throw new Error("Employee not found");
    }

    return EmployeeFactory.create({
      id: result[0]?.employee.id,
      firstName: result[0]?.employee.firstName,
      lastName: result[0]?.employee.lastName,
      hireDate: result[0]?.employee.hireDate,
      phone: result[0]?.employee.phone,
      address: result[0]?.employee.address,
      department: result[0]?.department ?? null,
      status: result[0]?.employee.status,
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
          status: input.status,
        })
        .execute();

      if (input.department) {
        await tx
          .insert(departmentEmployee)
          .values({
            departmentId: input.department.id,
            employeeId: queryResult[0].insertId,
            startDate: new Date(),
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
        status: input.status,
      })
      .where(eq(employees.id, input.id))
      .execute();

    if (input.department) {
      await this.changeEmployeeDepartment(input.id, input.department.id);
    }

    return this.getById(input.id);
  }

  async getDepartmentRegistry(id: number) {
    const result = await drizzleClient
      .select()
      .from(departmentEmployee)
      .innerJoin(employees, eq(employees.id, departmentEmployee.employeeId))
      .innerJoin(department, eq(departmentEmployee.departmentId, department.id))
      .where(eq(employees.id, id))
      .orderBy(desc(departmentEmployee.startDate))
      .execute();

    return result.map((item) =>
      DepartmentRegistryFactory.create({
        department: DepartmentFactory.create({
          id: item.department.id,
          name: item.department.name,
        }),
        startDate: item.department_employee.startDate,
        endDate: item.department_employee.endDate,
      }),
    );
  }

  private changeEmployeeDepartment(employeeId: number, departmentId: number) {
    return drizzleClient.transaction(async (tx) => {
      try {
        await tx
          .update(departmentEmployee)
          .set({
            endDate: new Date(),
          })
          .where(eq(departmentEmployee.employeeId, employeeId))
          .execute();

        await tx
          .insert(departmentEmployee)
          .values({
            departmentId,
            employeeId,
            startDate: new Date(),
          })
          .execute();
      } catch (error) {
        tx.rollback();
        throw error;
      }
    });
  }
}
