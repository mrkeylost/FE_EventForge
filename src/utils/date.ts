import { DateValue } from "@heroui/react";
import { parseAbsoluteToLocal } from "@internationalized/date";

const standardDateTimeFormat = (dateValue: number) => {
  if (dateValue < 10) {
    return `0${dateValue}`;
  } else {
    return dateValue;
  }
};

export const formatDateStandard = (date: DateValue) => {
  const year = date.year;
  const month = date.month;
  const day = date.day;

  const hour = "hour" in date ? date.hour : 0;
  const minute = "minute" in date ? date.minute : 0;
  const second = "second" in date ? date.second : 0;

  const result = `${year}-${standardDateTimeFormat(month)}-${standardDateTimeFormat(day)} ${standardDateTimeFormat(hour)}:${standardDateTimeFormat(minute)}:${standardDateTimeFormat(second)}`;

  return result;
};

export const toInputDate = (date: string) => {
  const [dateSplit, timeSplit] = date.split(" ");
  const isoString = `${dateSplit}T${timeSplit}+07:00`;

  return parseAbsoluteToLocal(isoString);
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
