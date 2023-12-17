import Notification from "~/server/entities/@shared/notification/notification";

export abstract class Entity {
  public id = 0;
  protected notification: Notification;

  constructor() {
    this.notification = new Notification();
  }

  abstract validate(): void;
}
