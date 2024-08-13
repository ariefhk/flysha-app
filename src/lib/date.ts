import dayjs from "dayjs";

export const dateFormat = (date: Date | string, format = "DD MMM YYYY HH:mm") => {
  if (!date) {
    return "";
  }

  const dateformat = dayjs(date).format(format);

  return dateformat;
};
