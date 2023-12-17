import { type Employee } from "~/server/entities/employee/employee.entity";
import { type Repository } from "~/server/repositories/repository.interface";

export interface IEmployeeRepository extends Repository<Employee> {}
