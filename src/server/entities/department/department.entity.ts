import { Entity } from "~/server/entities/@shared/entity.abstract";

export class Department extends Entity {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    super();
    this.id = id;
    this.name = name;
  }

  validate(): void {
    throw new Error("Method not implemented.");
  }
}
