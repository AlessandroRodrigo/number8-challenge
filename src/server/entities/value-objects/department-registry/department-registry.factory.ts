import { type Department } from "~/server/entities/department/department.entity";
import { DepartmentRegistry } from "~/server/entities/value-objects/department-registry/department-registry.value-object";

export class DepartmentRegistryFactory {
  static create({
    department,
    startDate,
    endDate,
  }: {
    department: Department;
    startDate: Date;
    endDate: Date | null;
  }) {
    return new DepartmentRegistry(department, startDate, endDate);
  }
}
