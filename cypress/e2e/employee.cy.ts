function waitForResponse(alias: string, statusCode: number) {
  cy.wait(alias).then((interception) => {
    expect(interception.response?.statusCode).to.equal(statusCode);
  });
}

function selectRandomElement(selector: string) {
  cy.get(selector).then(($elements) => {
    const randomIndex = Math.floor(Math.random() * $elements.length);
    cy.wrap($elements).eq(randomIndex).click();
  });
}

describe("Employee E2E", () => {
  beforeEach(() => {
    cy.intercept("GET", "**employees.getAll**").as("getEmployees");
    cy.intercept("GET", "**employees.getById**").as("getEmployee");
    cy.intercept("GET", "**employees.getDepartmentRegistry**").as(
      "getEmployee",
    );
    cy.intercept("POST", "**employees.update**").as("updateEmployee");
    cy.visit("/");
  });

  it("should render a list of employees", () => {
    waitForResponse("@getEmployees", 200);

    cy.get("article").should("have.length.greaterThan", 0);
  });

  it("should access the employee details page", () => {
    waitForResponse("@getEmployees", 200);

    cy.get("article").first().contains("View details").click();

    cy.url().should("include", "/employees/");
  });

  it("should change an employee status", () => {
    waitForResponse("@getEmployees", 200);

    selectRandomElement("button:contains('View details')");

    waitForResponse("@getEmployee", 200);

    cy.get("button[role='toggle-status']").click();

    waitForResponse("@updateEmployee", 200);
  });

  it("should change the employee department", () => {
    waitForResponse("@getEmployees", 200);

    selectRandomElement("button:contains('View details')");

    waitForResponse("@getEmployee", 200);

    cy.get("label").contains("Select a department").click();

    selectRandomElement("div[role='option']");

    cy.get("button").contains("Update").click();

    waitForResponse("@updateEmployee", 200);
  });
});
