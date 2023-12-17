import { setup } from "~/server/__tests__/setup-integration";

export async function populate() {
  const { createEmployeeWithDepartment } = setup();

  for (let i = 0; i < 10; i++) {
    void createEmployeeWithDepartment();
  }
}
