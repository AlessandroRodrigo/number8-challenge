import { describe, expect, it } from "vitest";
import { setup } from "~/server/__tests__/setup-integration";

describe("Employee router", () => {
  it("should get all employees", async () => {
    const { caller } = setup();

    const output = await caller.employees.getAll();

    expect(output).toEqual([]);
  });
});
