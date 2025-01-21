import moment from "moment";

export function dateFormat(date: string) {
  return moment(date).format("ddd, MMMM Do YYYY");
}