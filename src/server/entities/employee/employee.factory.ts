import { DepartmentFactory } from "~/server/entities/department/department.factory";
import {
  Employee,
  type EmployeeStatus,
} from "~/server/entities/employee/employee.entity";

export class EmployeeFactory {
  static create(input: {
    id?: number;
    firstName: string;
    lastName: string;
    hireDate: Date;
    phone: string;
    address: string;
    department: {
      id: number;
      name: string;
    } | null;
    status: EmployeeStatus;
  }) {
    const employee = new Employee(
      input.id ?? 0,
      input.firstName,
      input.lastName,
      input.hireDate,
      input.phone,
      input.address,
      input.status,
    );

    if (input.department)
      employee.setDepartment(DepartmentFactory.create(input.department));

    return employee;
  }
}
