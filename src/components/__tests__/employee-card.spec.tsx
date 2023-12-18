import { faker } from "@faker-js/faker";
import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmployeeCard } from "~/components/employee-card";

function generateEmployee() {
  return {
    id: 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: faker.phone.number(),
    hireDate: faker.date.past(),
    address: faker.location.streetAddress(),
    status: "active",
    department: {
      id: 1,
      name: faker.person.jobArea(),
    },
  };
}

describe("EmployeeCard component", () => {
  beforeEach(() => {
    render(
      <MantineProvider>
        <EmployeeCard employee={generateEmployee()} />
      </MantineProvider>,
    );
  });

  it("should show employee's name", () => {
    const expected = screen.getByTestId("employee-name");

    expect(expected).not.toBeNull();
  });

  it("should show employee's department", () => {
    const expected = screen.getByTestId("employee-department");

    expect(expected).not.toBeNull();
  });

  it("should show employee's image", () => {
    const expected = screen.getByTestId("employee-image");

    expect(expected).not.toBeNull();
  });

  it("should has alt on employee's image", () => {
    const expected = screen.getByTestId("employee-image");

    expect(expected).toHaveProperty("alt");
  });

  it("should render view details button", () => {
    const expected = screen.getByTestId("employee-details-button");

    expect(expected).not.toBeNull();
  });
});
