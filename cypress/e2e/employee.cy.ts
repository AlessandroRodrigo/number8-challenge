describe("template spec", () => {
  beforeEach(() => {
    cy.intercept("GET", "**employees.getAll**").as("getEmployees");
    cy.intercept("GET", "**employees.getById**").as("getEmployee");
    cy.intercept("GET", "**employees.getDepartmentRegistry**").as(
      "getEmployee",
    );
    cy.intercept("GET", "**employees.getDepartmentRegistry**").as(
      "getDepartmentRegistry",
    );
    cy.intercept("POST", "**employees.update**").as("updateEmployee");
    cy.visit("/");
  });

  it("should render a list of employees", () => {
    cy.wait("@getEmployees").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

    cy.get("article").should("have.length.greaterThan", 0);
  });

  it("should access the employee details page", () => {
    cy.wait("@getEmployees");

    cy.get("article").first().contains("View details").click();

    cy.url().should("include", "/employees/");
  });

  it("should change an employee status", () => {
    cy.wait("@getEmployees");

    cy.get("article").first().contains("View details").click();

    cy.wait("@getEmployee");

    cy.get("button[role='toggle-status']").click();

    cy.wait("@updateEmployee").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

    cy.get("button").contains("Activate").should("exist");
  });

  it("should change the employee department", () => {
    cy.wait("@getEmployees");

    cy.get("article").first().contains("View details").click();

    cy.wait("@getEmployee");
    cy.wait("@getDepartmentRegistry");

    cy.wait("@getEmployee");

    cy.get("label").contains("Select a department").click();

    cy.get("div[role='option']").last().click();

    cy.get("button").contains("Update").click();

    cy.wait("@updateEmployee").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

    cy.get("label").contains("Select a department").click();

    cy.get("div[role='option']").first().click();

    cy.get("button").contains("Update").click();

    cy.wait("@updateEmployee").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  });
});