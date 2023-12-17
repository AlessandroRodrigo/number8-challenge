import { describe, expect, it, vi } from "vitest";
import { DateUtils } from "~/utils/date";

describe("Date utils", () => {
  it.each([
    ["2020-01-01", "Jan 1, 2020"],
    ["2021-02-02", "Feb 2, 2021"],
    ["2022-03-03", "Mar 3, 2022"],
    ["2023-04-04", "Apr 4, 2023"],
    ["2024-05-05", "May 5, 2024"],
    ["2025-06-06", "Jun 6, 2025"],
    ["2026-07-07", "Jul 7, 2026"],
    ["2027-08-08", "Aug 8, 2027"],
    ["2028-09-09", "Sep 9, 2028"],
    ["2029-10-10", "Oct 10, 2029"],
    ["2030-11-11", "Nov 11, 2030"],
    ["2031-12-12", "Dec 12, 2031"],
  ])("should format date %s to %s", (date, expected) => {
    expect(DateUtils.formatDate(date)).toBe(expected);
  });

  it("should calculate time of service", () => {
    vi.useFakeTimers({
      now: new Date("2021-01-01"),
    });
    const hireDate = new Date("2020-01-01");

    const result = DateUtils.timeOfService(hireDate);

    expect(result).toBe("1y - 0m - 6d");
  });
});
