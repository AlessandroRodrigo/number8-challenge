import { Department } from "~/server/entities/department/department.entity";

export class DepartmentFactory {
  static create(input: { id?: number; name: string }) {
    return new Department(input.id ?? 0, input.name);
  }
}
