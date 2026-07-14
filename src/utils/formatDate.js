const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Formats a "YYYY-MM" string (what <input type="month"> gives you) into
// "MMM YYYY", e.g. "2023-01" -> "Jan 2023".
//
// Deliberately NOT using `new Date("2023-01")` + toLocaleDateString() here.
// Parsing a year-month-only string creates a UTC midnight timestamp, and
// formatting it back out re-interprets that timestamp in the *local*
// timezone. For anyone west of UTC (most of the Americas), that silently
// rolls the month back by one — "2023-01" would render as "Dec 2022".
// Splitting the string ourselves avoids Date parsing entirely, so there's
// no timezone conversion to go wrong.
export function formatMonthYear(value) {
  if (!value) return "";
  const [year, month] = value.split("-");
  const monthIndex = Number(month) - 1;
  return `${MONTHS_SHORT[monthIndex]} ${year}`;
}