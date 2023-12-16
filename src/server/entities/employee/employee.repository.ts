import { type Employee } from "~/server/entities/employee/employee.entity";
import { type Repository } from "~/server/repositories/ports/repository.interface";

export interface IEmployeeRepository extends Repository<Employee> {
  updateDepartment(input: {
    id: number;
    departmentId: number;
  }): Promise<Employee>;
}
