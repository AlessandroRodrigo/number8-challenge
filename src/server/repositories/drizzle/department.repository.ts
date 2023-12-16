import { eq } from "drizzle-orm";
import { type Department } from "~/server/entities/department/department.entity";
import { DepartmentFactory } from "~/server/entities/department/department.factory";
import { type IDepartmentRepository } from "~/server/entities/department/department.repository";
import { drizzleClient } from "~/server/repositories/drizzle/client";
import { department } from "~/server/repositories/drizzle/schema";

export class DepartmentRepository implements IDepartmentRepository {
  async getAll(): Promise<Department[]> {
    const result = await drizzleClient.select().from(department).execute();

    return result.map((item) => DepartmentFactory.create(item));
  }

  async getById(id: number): Promise<Department> {
    const result = await drizzleClient
      .select()
      .from(department)
      .where(eq(department.id, id))
      .limit(1)
      .execute();

    if (!result[0]) {
      throw new Error(`Department with id ${id} not found`);
    }

    return DepartmentFactory.create(result[0]);
  }
  create(input: Department): Promise<Department> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(input: Department): Promise<Department> {
    throw new Error("Method not implemented.");
  }
}
