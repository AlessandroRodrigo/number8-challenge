import { faker } from "@faker-js/faker";
import { MantineProvider } from "@mantine/core";
import { EmployeeCard } from "./index";

function generateEmployee() {
  return {
    id: 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    department: {
      id: 1,
      name: faker.commerce.department(),
    },
    address: faker.location.streetAddress(),
    hireDate: faker.date.past(),
    phone: faker.phone.number(),
    status: "active",
  };
}

describe("<EmployeeCard />", () => {
  it("renders", () => {
    cy.mount(
      <MantineProvider>
        <EmployeeCard employee={generateEmployee()} />
      </MantineProvider>,
    );
  });

  it("renders employee name", () => {
    const employee = generateEmployee();
    cy.mount(
      <MantineProvider>
        <EmployeeCard employee={employee} />
      </MantineProvider>,
    );
    cy.contains(`${employee.firstName}`);
  });

  it("renders employee department", () => {
    const employee = generateEmployee();
    cy.mount(
      <MantineProvider>
        <EmployeeCard employee={employee} />
      </MantineProvider>,
    );
    cy.contains(`${employee.department.name}`);
  });

  it("there is a button to see details", () => {
    const employee = generateEmployee();
    cy.mount(
      <MantineProvider>
        <EmployeeCard employee={employee} />
      </MantineProvider>,
    );
    cy.contains("View details");
  });

  it("renders employee avatar", () => {
    const employee = generateEmployee();
    cy.mount(
      <MantineProvider>
        <EmployeeCard employee={employee} />
      </MantineProvider>,
    );
    cy.get("img");
  });
});
