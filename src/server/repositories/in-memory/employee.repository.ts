import { type Employee } from "~/server/entities/employee/employee.entity";
import { EmployeeFactory } from "~/server/entities/employee/employee.factory";
import { type IEmployeeRepository } from "~/server/entities/employee/employee.repository";
import { type DepartmentRegistry } from "~/server/entities/value-objects/department-registry/department-registry.value-object";

export class InMemoryEmployeeRepository implements IEmployeeRepository {
  private employees: Employee[] = [];

  clean() {
    this.employees = [];
  }

  async getAll(): Promise<Employee[]> {
    return this.employees;
  }

  async getById(id: number): Promise<Employee> {
    const employeeFound = this.employees.find((item) => item.id === id);

    if (!employeeFound) {
      throw new Error("Employee not found");
    }

    return employeeFound;
  }

  async create(input: Omit<Employee, "id">): Promise<Employee> {
    const employee = EmployeeFactory.create({
      ...input,
      id: this.employees.length + 1,
    });

    this.employees.push(employee);

    return employee;
  }

  async delete(id: number): Promise<void> {
    const employeeFound = this.employees.find((item) => item.id === id);

    if (!employeeFound) {
      throw new Error("Employee not found");
    }

    this.employees = this.employees.filter((item) => item.id !== id);
  }

  async update(input: Employee): Promise<Employee> {
    const employeeFound = this.employees.find((item) => item.id === input.id);

    if (!employeeFound) {
      throw new Error("Employee not found");
    }

    this.employees = this.employees.map((item) => {
      if (item.id === input.id) {
        return EmployeeFactory.create({
          ...item,
          ...input,
        });
      }

      return item;
    });

    return input;
  }

  getDepartmentRegistry(id: number): Promise<DepartmentRegistry[]> {
    return Promise.resolve([]);
  }
}
