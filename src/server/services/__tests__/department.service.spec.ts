import { describe, expect, it } from "vitest";
import { InMemoryDepartmentRepository } from "~/server/repositories/in-memory/department.repository";
import { DepartmentService } from "~/server/services/department.service";

describe("Department service", () => {
  it("should get all departments", async () => {
    const repository = new InMemoryDepartmentRepository();
    const service = new DepartmentService(repository);

    const output = await service.getAll();

    expect(output).toEqual([]);

    await repository.create({
      name: "Department name",
    });

    const output2 = await service.getAll();

    expect(output2.length).toEqual(1);
  });
});
