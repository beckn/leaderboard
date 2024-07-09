import {
  formatDuration as _formatDuration,
  intervalToDuration,
  format,
} from "date-fns";
export const parseDateRangeSearchParam = (
  range?: string | null,
  relativeDaysBefore = 14,
) => {
  // Last 7 days
  const end = new Date();
  const start = new Date(end);
  start.setDate(end.getDate() - relativeDaysBefore);
  end.setHours(23, 59, 59);
  console.log(start, end)
  return [start, end] as const;
};
export const padZero = (num: number) => (num < 10 ? `0${num}` : num);

export const formatDuration = (duration_in_ms: number) =>
  _formatDuration(
    intervalToDuration({
      start: new Date(0),
      end: new Date(duration_in_ms),
    }),
  )
    .split(" ")
    .splice(0, 4)
    .join(" ");


    export const formatDate = (date: Date) => {
      return format(date, "MMM dd, yyyy");
    };