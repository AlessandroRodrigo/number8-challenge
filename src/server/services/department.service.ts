import { type IDepartmentRepository } from "~/server/entities/department/department.repository";

export class DepartmentService {
  constructor(private departmentRepository: IDepartmentRepository) {
    this.departmentRepository = departmentRepository;
  }

  async getAll() {
    return await this.departmentRepository.getAll();
  }
}
