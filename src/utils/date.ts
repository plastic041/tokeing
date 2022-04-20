import "dayjs/locale/ko";

import type { Dayjs } from "dayjs";

export const parseDatePrimary = (date: Dayjs) => {
  const parsedDate = date.clone().locale("ko").format("M월 D일(ddd) A h시 m분");
  return parsedDate;
};

export const parseDateSecondary = (date: Dayjs) => {
  const parsedDate = date.clone().locale("ko").format("A h시 m분");
  return parsedDate;
};

export const addTime = (date: Dayjs, hour: number, minute: number) => {
  const newDate = date.add(hour, "hour").add(minute, "minute");
  return newDate;
};
