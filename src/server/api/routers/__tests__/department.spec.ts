import { beforeEach } from "node:test";
import { afterAll, describe, expect, it } from "vitest";
import { setup } from "~/server/__tests__/setup-integration";

describe("Department router", () => {
  beforeEach(async () => {
    const { cleanDatabase } = setup();

    await cleanDatabase();
  });

  afterAll(async () => {
    const { cleanDatabase } = setup();

    await cleanDatabase();
  });

  it("should get all departments", async () => {
    const { caller, createDepartment } = setup();

    const output = await caller.departments.getAll();

    expect(output).toEqual([]);

    const departmentCreated = await createDepartment();

    if (!departmentCreated) {
      throw new Error("Department not created");
    }

    const output2 = await caller.departments.getAll();

    expect(output2.length).toEqual(1);

    expect(output2[0]).toEqual({
      id: departmentCreated.id,
      name: departmentCreated.name,
    });
  });
});
