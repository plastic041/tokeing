import store from "store2";
import type { Clock } from "../typings/clock";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs().locale("ko");

export const getClocks = () => {
  const clocks: Clock[] = JSON.parse(store.get("clocks") || "[]");
  return clocks;
};

export const parseDatePrimary = (date: Date) => {
  const parsedDate = dayjs(date).locale("ko").format("M월 D일(ddd) A h시 m분");
  return parsedDate;
};

export const parseDateSecondary = (date: Date) => {
  const parsedDate = dayjs(date).locale("ko").format("A h시 m분");
  return parsedDate;
};

export const isDateSame = (dateA: Date, dateB: Date) => {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
};

export const addHour = (date: Date, hour: number, minute: number) => {
  // use dayjs
  const newDate = dayjs(date).add(hour, "hour").add(minute, "minute");
  return newDate.toDate();
};
