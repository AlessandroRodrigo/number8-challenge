import { Entity } from "~/server/entities/@shared/entity.abstract";
import NotificationError from "~/server/entities/@shared/notification/notification-error";
import { DepartmentValidatorFactory } from "~/server/entities/department/department-validator.factory";

export class Department extends Entity {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    super();
    this.id = id;
    this.name = name;
    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  validate(): void {
    DepartmentValidatorFactory.createZodValidator().validate(this);
  }
}
