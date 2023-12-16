import { type IDepartmentRepository } from "~/server/entities/department/department.repository";
import { DepartmentRepository } from "~/server/repositories/drizzle/department.repository";

export class DepartmentService {
  private departmentRepository: IDepartmentRepository =
    new DepartmentRepository();

  async getAll() {
    return await this.departmentRepository.getAll();
  }
}
