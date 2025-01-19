import moment from "moment"

export function dateFormat(date) {
  return moment(date).format("ddd, MMMM Do YYYY")
} 

export function dateFormatDashboad(date) {
  return moment(date).format("ddd, MM/DD/YY")
}

export function dateFormatMonthDay(date) {
  return moment(date).format("MMMM Do")
}

export function dateFormatMonth(date) {
  return moment(date).format("MMM")
}

export function dateFormatDay(date) {
  return moment(date).format("Do")
}

export const timeFormat = (isoString) =>
  moment(isoString).format("h.mm A")