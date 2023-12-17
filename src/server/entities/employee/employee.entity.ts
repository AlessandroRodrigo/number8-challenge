import { Entity } from "~/server/entities/@shared/entity.abstract";
import { type Department } from "~/server/entities/department/department.entity";

export type EmployeeStatus = "active" | "inactive";

export class Employee extends Entity {
  public department: Department | null = null;

  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public hireDate: Date,
    public phone: string,
    public address: string,
    public status: EmployeeStatus,
  ) {
    super();
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.hireDate = hireDate;
    this.phone = phone;
    this.address = address;
    this.status = status;
  }

  public setDepartment(department: Department) {
    this.department = department;
  }

  public activate() {
    this.status = "active";
  }

  public inactivate() {
    this.status = "inactive";
  }

  validate(): void {
    throw new Error("Method not implemented.");
  }
}
