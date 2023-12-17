import { type IDepartmentRepository } from "~/server/entities/department/department.repository";
import { GetAllDepartmentOutputDto } from "~/server/services/dto/employee/get-all-department.output-dto";

export class DepartmentService {
  constructor(private departmentRepository: IDepartmentRepository) {
    this.departmentRepository = departmentRepository;
  }

  async getAll() {
    const result = await this.departmentRepository.getAll();
    return GetAllDepartmentOutputDto.parse(result);
  }
}
