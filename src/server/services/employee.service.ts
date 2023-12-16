import { type IDepartmentRepository } from "~/server/entities/department/department.repository";
import { EmployeeFactory } from "~/server/entities/employee/employee.factory";
import { type IEmployeeRepository } from "~/server/entities/employee/employee.repository";
import { DepartmentRepository } from "~/server/repositories/drizzle/department.repository";
import { EmployeeRepository } from "~/server/repositories/drizzle/employee.repository";
import {
  CreateEmployeeDto,
  CreateEmployeeDtoType,
} from "~/server/services/dto/employee/create-employee.dto";
import {
  UpdateEmployeeDto,
  UpdateEmployeeDtoType,
} from "~/server/services/dto/employee/update-employee.dto";

export class EmployeeService {
  private employeeRepository: IEmployeeRepository = new EmployeeRepository();
  private departmentRepository: IDepartmentRepository =
    new DepartmentRepository();

  async getAll() {
    return await this.employeeRepository.getAll();
  }

  async getById(id: number) {
    return await this.employeeRepository.getById(id);
  }

  async create(input: CreateEmployeeDtoType) {
    const parsedInput = CreateEmployeeDto.parse(input);

    const department = await this.departmentRepository.getById(
      parsedInput.departmentId,
    );

    const employee = EmployeeFactory.create({
      id: 0,
      firstName: parsedInput.firstName,
      lastName: parsedInput.lastName,
      hireDate: parsedInput.hireDate,
      phone: parsedInput.phone,
      address: parsedInput.address,
      department,
    });

    return await this.employeeRepository.create(employee);
  }

  async delete(id: number) {
    return this.employeeRepository.delete(id);
  }

  async update(input: UpdateEmployeeDtoType) {
    const parsedInput = UpdateEmployeeDto.parse(input);

    const employeeFound = await this.employeeRepository.getById(parsedInput.id);

    const employee = EmployeeFactory.create({
      id: parsedInput.id,
      firstName: parsedInput.firstName ?? employeeFound.firstName,
      lastName: parsedInput.lastName ?? employeeFound.lastName,
      hireDate: parsedInput.hireDate ?? employeeFound.hireDate,
      phone: parsedInput.phone ?? employeeFound.phone,
      address: parsedInput.address ?? employeeFound.address,
      department: null,
    });

    if (parsedInput.departmentId) {
      const department = await this.departmentRepository.getById(
        parsedInput.departmentId,
      );

      employee.setDepartment(department);
    }

    return await this.employeeRepository.update(employee);
  }
}
