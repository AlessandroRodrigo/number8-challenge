import { type Employee } from "~/server/entities/employee/employee.entity";
import { type IEmployeeRepository } from "~/server/entities/employee/employee.repository";

export class InMemoryEmployeeRepository implements IEmployeeRepository {
  private employees: Employee[] = [];

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
    const employee = { ...input, id: this.employees.length + 1 };

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

    this.employees = this.employees.map((item) =>
      item.id === input.id ? input : item,
    );

    return input;
  }
}
