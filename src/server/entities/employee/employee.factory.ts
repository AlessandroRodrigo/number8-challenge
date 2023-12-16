import { Department } from "~/server/entities/department/department.entity";
import { Employee } from "~/server/entities/employee/employee.entity";

export class EmployeeFactory {
  static create(input: {
    id: number;
    firstName: string;
    lastName: string;
    hireDate: Date;
    phone: string;
    address: string;
    department: Department | null;
  }) {
    const employee = new Employee(
      input.id,
      input.firstName,
      input.lastName,
      input.hireDate,
      input.phone,
      input.address,
    );

    if (input.department) employee.setDepartment(input.department ?? null);

    return employee;
  }
}
