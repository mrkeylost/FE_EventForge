import { DateValue } from "@heroui/react";
import { parseAbsoluteToLocal } from "@internationalized/date";

const standardTime = (time: number) => {
  if (time < 10) {
    return `0${time}`;
  } else {
    return time;
  }
};

export const formatDateStandard = (date: DateValue) => {
  const year = date.year;
  const month = date.month;
  const day = date.day;

  const hour = "hour" in date ? date.hour : 0;
  const minute = "minute" in date ? date.minute : 0;
  const second = "second" in date ? date.second : 0;

  const result = `${year}-${month}-${day} ${standardTime(hour)}:${standardTime(minute)}:${standardTime(second)}`;

  return result;
};

export const toInputDate = (date: string) => {
  const [dateSplit, timeSplit] = date.split(" ");
  if (!dateSplit || !timeSplit) return undefined;

  const [year, month, day] = dateSplit.split("-").map(Number);
  const isoString = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${timeSplit}+07:00`;

  try {
    return parseAbsoluteToLocal(isoString);
  } catch {
    return undefined;
  }
};

export const toGMTFormat = (date: string) => {
  if (!date) return "";

  const [dateSplit, timeSplit] = date.split(" ");

  const [year, month, day] = dateSplit.split("-").map(Number);
  const [hour, minute, second] = timeSplit.split(":").map(Number);

  const GMTDate = new Date(
    Date.UTC(year, month - 1, day, hour, minute, second),
  );

  return GMTDate.toUTCString();
};
