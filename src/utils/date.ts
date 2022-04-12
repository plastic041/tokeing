import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs().locale("ko");

export const parseDatePrimary = (date: Date) => {
  const parsedDate = dayjs(date).locale("ko").format("M월 D일(ddd) A h시 m분");
  return parsedDate;
};

export const parseDateSecondary = (date: Date) => {
  const parsedDate = dayjs(date).locale("ko").format("A h시 m분");
  return parsedDate;
};

export const isDateSame = (dateA: Date, dateB: Date) => {
  const isSame = dayjs(dateA).isSame(dateB, "day");
  return isSame;
};

export const addTime = (date: Date, hour: number, minute: number) => {
  const newDate = dayjs(date).add(hour, "hour").add(minute, "minute");
  return newDate.toDate();
};
