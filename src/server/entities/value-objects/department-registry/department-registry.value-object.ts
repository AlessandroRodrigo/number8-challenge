import { type Department } from "~/server/entities/department/department.entity";

export class DepartmentRegistry {
  constructor(
    public department: Department,
    public startDate: Date,
    public endDate: Date | null,
  ) {
    this.department = department;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
