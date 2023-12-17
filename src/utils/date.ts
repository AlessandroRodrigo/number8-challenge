import dayjs from "dayjs";

function formatDate(
  date: string | number | Date | null | undefined,
  format = "MMM D, YYYY",
): string {
  return dayjs(date).format(format);
}

function timeOfService(hireDate: string | Date | null | undefined) {
  const today = dayjs();
  const hire = dayjs(hireDate);
  const years = today.diff(hire, "year");
  const months = today.diff(hire, "month") % 12;
  const days = today.diff(hire, "day") % 30;

  return `${years}y - ${months}m - ${days}d`;
}

export const DateUtils = {
  formatDate,
  timeOfService,
};
