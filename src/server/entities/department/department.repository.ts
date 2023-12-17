import { type Department } from "~/server/entities/department/department.entity";
import { type Repository } from "~/server/repositories/repository.interface";

export interface IDepartmentRepository extends Repository<Department> {}
