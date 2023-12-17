import { describe, expect, it } from "vitest";
import Notification from "~/server/entities/@shared/notification/notification";

describe("Notification", () => {
  it("should add an error", () => {
    const notification = new Notification();

    expect(notification.hasErrors()).toBe(false);

    notification.addError({
      context: "Department",
      message: "Name is required",
    });

    expect(notification.hasErrors()).toBe(true);
  });

  it("should get errors", () => {
    const notification = new Notification();

    notification.addError({
      context: "Department",
      message: "Name is required",
    });

    expect(notification.getErrors()).toEqual([
      {
        context: "Department",
        message: "Name is required",
      },
    ]);
  });

  it("should get messages", () => {
    const notification = new Notification();

    notification.addError({
      context: "Department",
      message: "Name is required",
    });

    expect(notification.messages()).toEqual(["Department: Name is required"]);

    notification.addError({
      context: "Department",
      message: "Name must be at least 3 characters",
    });

    expect(notification.messages()).toEqual([
      "Department: Name is required",
      "Department: Name must be at least 3 characters",
    ]);
  });
});
