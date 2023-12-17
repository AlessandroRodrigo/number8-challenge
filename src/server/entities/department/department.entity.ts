import { type Entity } from "~/server/entities/entity.abstract";

export class Department implements Entity {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
