import { describe, expect, it } from "vitest";
import { DepartmentFactory } from "~/server/entities/department/department.factory";
import { EmployeeFactory } from "~/server/entities/employee/employee.factory";

describe("Employee entity", () => {
  it("should be created", () => {
    const employee = EmployeeFactory.create({
      id: 1,
      firstName: "John",
      lastName: "Doe",
      hireDate: new Date(),
      phone: "1234567890",
      address: "123 Main St",
      status: "active",
      department: null,
    });

    expect(employee).toBeDefined();
  });

  it("should be created with a department", () => {
    const employee = EmployeeFactory.create({
      id: 1,
      firstName: "John",
      lastName: "Doe",
      hireDate: new Date(),
      phone: "1234567890",
      address: "123 Main St",
      status: "active",
      department: {
        id: 1,
        name: "Department 1",
      },
    });

    expect(employee).toBeDefined();
    expect(employee.department).toBeDefined();
  });

  it("should change department", () => {
    const employee = EmployeeFactory.create({
      id: 1,
      firstName: "John",
      lastName: "Doe",
      hireDate: new Date(),
      phone: "1234567890",
      address: "123 Main St",
      status: "active",
      department: {
        id: 1,
        name: "Department 1",
      },
    });

    const newDepartment = DepartmentFactory.create({
      id: 2,
      name: "Department 2",
    });

    employee.setDepartment(newDepartment);

    expect(employee.department).toBe(newDepartment);
  });

  it("should be activated", () => {
    const employee = EmployeeFactory.create({
      id: 1,
      firstName: "John",
      lastName: "Doe",
      hireDate: new Date(),
      phone: "1234567890",
      address: "123 Main St",
      status: "inactive",
      department: null,
    });

    employee.activate();

    expect(employee.status).toBe("active");
  });

  it("should be inactivated", () => {
    const employee = EmployeeFactory.create({
      id: 1,
      firstName: "John",
      lastName: "Doe",
      hireDate: new Date(),
      phone: "1234567890",
      address: "123 Main St",
      status: "active",
      department: null,
    });

    employee.inactivate();

    expect(employee.status).toBe("inactive");
  });

  it("should be invalid when first name is too short", () => {
    expect(() => {
      EmployeeFactory.create({
        id: 1,
        firstName: "J",
        lastName: "Doe",
        hireDate: new Date(),
        phone: "1234567890",
        address: "123 Main St",
        status: "active",
        department: null,
      });
    }).toThrowError("Employee: First name must be at least 3 characters");
  });

  it("should be invalid when first name is too long", () => {
    expect(() => {
      EmployeeFactory.create({
        id: 1,
        firstName: "J".repeat(256),
        lastName: "Doe",
        hireDate: new Date(),
        phone: "1234567890",
        address: "123 Main St",
        status: "active",
        department: null,
      });
    }).toThrowError("Employee: First name must be at most 255 characters");
  });

  it("should be invalid when last name is too short", () => {
    expect(() => {
      EmployeeFactory.create({
        id: 1,
        firstName: "John",
        lastName: "D",
        hireDate: new Date(),
        phone: "1234567890",
        address: "123 Main St",
        status: "active",
        department: null,
      });
    }).toThrowError("Employee: Last name must be at least 3 characters");
  });

  it("should be invalid when last name is too long", () => {
    expect(() => {
      EmployeeFactory.create({
        id: 1,
        firstName: "John",
        lastName: "D".repeat(256),
        hireDate: new Date(),
        phone: "1234567890",
        address: "123 Main St",
        status: "active",
        department: null,
      });
    }).toThrowError("Employee: Last name must be at most 255 characters");
  });

  it("should be invalid when hire date is too early", () => {
    expect(() => {
      EmployeeFactory.create({
        id: 1,
        firstName: "John",
        lastName: "Doe",
        hireDate: new Date("1899-12-31"),
        phone: "1234567890",
        address: "123 Main St",
        status: "active",
        department: null,
      });
    }).toThrowError("Employee: Hire date must be after 1900-01-01");
  });

  it("should be invalid when phone is too short", () => {
    expect(() => {
      EmployeeFactory.create({
        id: 1,
        firstName: "John",
        lastName: "Doe",
        hireDate: new Date(),
        phone: "12",
        address: "123 Main St",
        status: "active",
        department: null,
      });
    }).toThrowError("Employee: Phone must be at least 3 characters");
  });

  it("should be invalid when phone is too long", () => {
    expect(() => {
      EmployeeFactory.create({
        id: 1,
        firstName: "John",
        lastName: "Doe",
        hireDate: new Date(),
        phone: "1".repeat(256),
        address: "123 Main St",
        status: "active",
        department: null,
      });
    }).toThrowError("Employee: Phone must be at most 255 characters");
  });

  it("should be invalid when address is too short", () => {
    expect(() => {
      EmployeeFactory.create({
        id: 1,
        firstName: "John",
        lastName: "Doe",
        hireDate: new Date(),
        phone: "1234567890",
        address: "12",
        status: "active",
        department: null,
      });
    }).toThrowError("Employee: Address must be at least 3 characters");
  });

  it("should be invalid when address is too long", () => {
    expect(() => {
      EmployeeFactory.create({
        id: 1,
        firstName: "John",
        lastName: "Doe",
        hireDate: new Date(),
        phone: "1234567890",
        address: "1".repeat(256),
        status: "active",
        department: null,
      });
    }).toThrowError("Employee: Address must be at most 255 characters");
  });

  it("should be invalid when status is not valid", () => {
    expect(() => {
      EmployeeFactory.create({
        id: 1,
        firstName: "John",
        lastName: "Doe",
        hireDate: new Date(),
        phone: "1234567890",
        address: "123 Main St",
        status: "invalid" as "inactive",
        department: null,
      });
    }).toThrowError("Employee: Status must be either active or inactive");
  });

  it("should catch more than one error", () => {
    expect(() => {
      EmployeeFactory.create({
        id: 1,
        firstName: "J",
        lastName: "D",
        hireDate: new Date("1899-12-31"),
        phone: "12",
        address: "12",
        status: "invalid" as "inactive",
        department: null,
      });
    }).toThrowError(
      "Employee: First name must be at least 3 characters,Employee: Last name must be at least 3 characters,Employee: Hire date must be after 1900-01-01,Employee: Phone must be at least 3 characters,Employee: Address must be at least 3 characters,Employee: Status must be either active or inactive",
    );
  });
});
