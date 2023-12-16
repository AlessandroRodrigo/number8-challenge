import { type Department } from "~/server/entities/department/department.entity";
import { type IDepartmentRepository } from "~/server/entities/department/department.repository";

export class InMemoryDepartmentRepository implements IDepartmentRepository {
  private departments: Department[] = [];

  async getAll(): Promise<Department[]> {
    return this.departments;
  }

  async getById(id: number): Promise<Department> {
    const departmentFound = this.departments.find((item) => item.id === id);

    if (!departmentFound) {
      throw new Error("Department not found");
    }

    return departmentFound;
  }

  async create(input: Omit<Department, "id">): Promise<Department> {
    const department = { ...input, id: this.departments.length + 1 };

    this.departments.push(department);

    return department;
  }

  async delete(id: number): Promise<void> {
    const departmentFound = this.departments.find((item) => item.id === id);

    if (!departmentFound) {
      throw new Error("Department not found");
    }

    this.departments = this.departments.filter((item) => item.id !== id);
  }

  async update(input: Department): Promise<Department> {
    const departmentFound = this.departments.find(
      (item) => item.id === input.id,
    );

    if (!departmentFound) {
      throw new Error("Department not found");
    }

    this.departments = this.departments.map((item) =>
      item.id === input.id ? input : item,
    );

    return input;
  }
}
