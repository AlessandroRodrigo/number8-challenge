import { type NotificationErrorProps } from "~/server/entities/@shared/notification/notification-error";

export default class Notification {
  private errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  getErrors(): NotificationErrorProps[] {
    return this.errors;
  }

  messages(context?: string): string[] {
    if (context) {
      return this.errors
        .filter((error) => error.context === context)
        .map((error) => `${error.context}: ${error.message}`);
    }

    return this.errors.map((error) => `${error.context}: ${error.message}`);
  }
}
