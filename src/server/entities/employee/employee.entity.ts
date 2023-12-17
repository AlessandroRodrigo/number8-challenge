import { type Department } from "~/server/entities/department/department.entity";

export class Employee {
  public department: Department | null = null;

  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public hireDate: Date,
    public phone: string,
    public address: string,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.hireDate = hireDate;
    this.phone = phone;
    this.address = address;
  }

  public setDepartment(department: Department) {
    this.department = department;
  }
}