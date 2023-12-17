import { type IDepartmentRepository } from "~/server/entities/department/department.repository";
import { EmployeeFactory } from "~/server/entities/employee/employee.factory";
import { type IEmployeeRepository } from "~/server/entities/employee/employee.repository";
import {
  CreateEmployeeDto,
  type CreateEmployeeDtoType,
} from "~/server/services/dto/employee/create-employee.dto";
import { GetAllEmployeeOutputDto } from "~/server/services/dto/employee/get-all-employee.output-dto";
import { GetDepartmentRegistryOutputDto } from "~/server/services/dto/employee/get-department-registry.output-dto";
import { GetEmployeeByIdOutputDto } from "~/server/services/dto/employee/get-employee-by-id.output-dto";
import {
  UpdateEmployeeDto,
  type UpdateEmployeeDtoType,
} from "~/server/services/dto/employee/update-employee.dto";

export class EmployeeService {
  constructor(
    private employeeRepository: IEmployeeRepository,
    private departmentRepository: IDepartmentRepository,
  ) {
    this.employeeRepository = employeeRepository;
    this.departmentRepository = departmentRepository;
  }

  async getAll() {
    const result = await this.employeeRepository.getAll();
    return GetAllEmployeeOutputDto.parse(result);
  }

  async getById(id: number) {
    const result = await this.employeeRepository.getById(id);
    return GetEmployeeByIdOutputDto.parse(result);
  }

  async create(input: CreateEmployeeDtoType) {
    const parsedInput = CreateEmployeeDto.parse(input);

    const department = await this.departmentRepository.getById(
      parsedInput.departmentId,
    );

    const employee = EmployeeFactory.create({
      firstName: parsedInput.firstName,
      lastName: parsedInput.lastName,
      hireDate: parsedInput.hireDate,
      phone: parsedInput.phone,
      address: parsedInput.address,
      department,
      status: "active",
    });

    const result = await this.employeeRepository.create(employee);
    return GetEmployeeByIdOutputDto.parse(result);
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
      status: employeeFound.status,
    });

    if (parsedInput.departmentId) {
      const department = await this.departmentRepository.getById(
        parsedInput.departmentId,
      );

      employee.setDepartment(department);
    }

    if (parsedInput.status) {
      switch (parsedInput.status) {
        case "active":
          employee.activate();
          break;
        case "inactive":
          employee.inactivate();
          break;
        default:
          throw new Error("Invalid status");
      }
    }

    const result = await this.employeeRepository.update(employee);
    return GetEmployeeByIdOutputDto.parse(result);
  }

  async getDepartmentRegistry(id: number) {
    const result = await this.employeeRepository.getDepartmentRegistry(id);
    return GetDepartmentRegistryOutputDto.parse(result);
  }
}
