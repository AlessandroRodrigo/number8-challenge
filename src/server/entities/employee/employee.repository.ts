import { type Employee } from "~/server/entities/employee/employee.entity";
import { type DepartmentRegistry } from "~/server/entities/value-objects/department-registry/department-registry.value-object";
import { type Repository } from "~/server/repositories/repository.interface";

export interface IEmployeeRepository extends Repository<Employee> {
  getDepartmentRegistry(id: number): Promise<DepartmentRegistry[]>;
}
